// Cloudflare Pages Function: Obtener el Historial de Versiones Guardadas
import { localMemoryCache } from './save.js';

export async function onRequestGet(context) {
  try {
    let historyJson = null;
    const kvNamespace = context.env.TEMPLATE_KV;

    if (kvNamespace) {
      const historyStr = await kvNamespace.get('historial_versiones');
      historyJson = historyStr ? JSON.parse(historyStr) : [];
    } else {
      // Fallback a caché en memoria local
      const cachedHistory = localMemoryCache.get('historial_versiones') || [];
      historyJson = cachedHistory;
    }

    return new Response(
      JSON.stringify(historyJson),
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
