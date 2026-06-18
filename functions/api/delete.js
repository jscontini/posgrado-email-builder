// Cloudflare Pages Function: Eliminar Plantilla de KV y del Historial
import { localMemoryCache } from './save.js';

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const id = data.id;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "Falta el ID del template a eliminar" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const kvNamespace = context.env.TEMPLATE_KV;
    let kvDeleted = false;

    if (kvNamespace) {
      // 1. Eliminar la plantilla individual en KV
      await kvNamespace.delete(id);
      kvDeleted = true;

      // 2. Eliminar del historial central en KV
      try {
        const historyStr = await kvNamespace.get('historial_versiones');
        if (historyStr) {
          let history = JSON.parse(historyStr);
          if (Array.isArray(history)) {
            // Filtrar dejando fuera el ID a eliminar
            history = history.filter(item => item.id !== id);
            await kvNamespace.put('historial_versiones', JSON.stringify(history));
          }
        }
      } catch (histErr) {
        console.error("Error al actualizar historial en KV al eliminar:", histErr);
      }
    } else {
      // Fallback a memoria local de la función
      localMemoryCache.delete(id);
      
      // Actualizar historial local en memoria
      let history = localMemoryCache.get('historial_versiones') || [];
      if (Array.isArray(history)) {
        history = history.filter(item => item.id !== id);
        localMemoryCache.set('historial_versiones', history);
      }
      
      console.warn("Cloudflare KV 'TEMPLATE_KV' no está enlazado. Eliminando de memoria temporal.");
    }

    return new Response(
      JSON.stringify({ success: true, kvDeleted: kvDeleted }),
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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
