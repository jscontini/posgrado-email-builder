// Cloudflare Pages Function: Cargar Plantilla desde KV
import { localMemoryCache } from './save.js';

export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "Falta el parámetro id" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Si es un chequeo rápido de estado
    if (id === 'check_env_status') {
      return new Response(
        JSON.stringify({ success: true, kvAvailable: !!context.env.TEMPLATE_KV }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    let templateJson = null;
    const kvNamespace = context.env.TEMPLATE_KV;

    if (kvNamespace) {
      templateJson = await kvNamespace.get(id);
    } else {
      // Fallback a caché en memoria local
      const cachedData = localMemoryCache.get(id);
      if (cachedData) {
        templateJson = JSON.stringify(cachedData);
      }
    }

    if (!templateJson) {
      return new Response(
        JSON.stringify({ success: false, error: "Plantilla no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      templateJson,
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
