import { BASE_LAYOUT, BLOCK_TEMPLATES, DEFAULT_TEMPLATES } from '../../templates.js';

// Memoria caché temporal en caso de que KV no esté configurado (desarrollo local sin binding)
const localMemoryCache = new Map();

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    
    if (!data.blocks || !Array.isArray(data.blocks)) {
      return new Response(
        JSON.stringify({ success: false, error: "Estructura de bloques inválida" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generar un ID único corto (6 caracteres alfanuméricos)
    const id = Math.random().toString(36).substring(2, 8);
    
    // Obtener fecha y hora de Argentina
    const timestamp = new Date().toLocaleString("es-AR", { 
      timeZone: "America/Argentina/Buenos_Aires",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const templateName = DEFAULT_TEMPLATES[data.templateId]?.name || data.templateId || "Plantilla Personalizada";
    const historyEntry = {
      id: id,
      templateId: data.templateId || 'custom',
      templateName: templateName,
      timestamp: timestamp
    };

    // Intentar guardar en Cloudflare KV si el namespace existe
    let kvSaved = false;
    const kvNamespace = context.env.TEMPLATE_KV;
    
    if (kvNamespace) {
      await kvNamespace.put(id, JSON.stringify(data), {
        expirationTtl: 60 * 60 * 24 * 30 // Expiración en 30 días para no saturar
      });
      kvSaved = true;

      // Guardar en el historial central en KV
      try {
        const historyStr = await kvNamespace.get('historial_versiones');
        let history = historyStr ? JSON.parse(historyStr) : [];
        if (!Array.isArray(history)) history = [];
        
        history.unshift(historyEntry);
        if (history.length > 50) {
          history = history.slice(0, 50); // Limitar a las últimas 50 versiones
        }
        await kvNamespace.put('historial_versiones', JSON.stringify(history));
      } catch (histErr) {
        console.error("Error al actualizar historial en KV:", histErr);
      }
    } else {
      // Fallback a memoria local de la función
      localMemoryCache.set(id, data);
      
      // Actualizar historial local en memoria
      let history = localMemoryCache.get('historial_versiones') || [];
      if (!Array.isArray(history)) history = [];
      history.unshift(historyEntry);
      if (history.length > 50) {
        history = history.slice(0, 50);
      }
      localMemoryCache.set('historial_versiones', history);
      
      console.warn("Cloudflare KV 'TEMPLATE_KV' no está enlazado. Usando caché en memoria temporal.");
    }

    // Compilar el HTML final estructurado para el email
    const compiledHtml = compileHtmlOnServer(data);

    return new Response(
      JSON.stringify({
        success: true,
        id: id,
        kvSaved: kvSaved,
        html: compiledHtml
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Soporte para preflight request CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

// Exportar la caché de memoria local para que load.js pueda leer de ella
export { localMemoryCache };

function compileHtmlOnServer(data) {
  const blocksCompiledHtml = data.blocks.map(block => {
    const config = BLOCK_TEMPLATES[block.type];
    if (!config) return '';
    return config.render(block.data);
  }).join('\n');

  const emailTitle = data.emailTitle || 'Template UNSAM';
  const headerHtml = BASE_LAYOUT.header.replace('{{emailTitle}}', emailTitle);
  
  return `${headerHtml}\n${blocksCompiledHtml}\n${BASE_LAYOUT.footer}`;
}
