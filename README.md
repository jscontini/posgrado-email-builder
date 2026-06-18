# Posgrado Email Builder 📧

Una aplicación web **serverless** interactiva y modular diseñada para editar, reordenar y consolidar plantillas de correos electrónicos institucionales (inscripciones de posgrados de la UNSAM). Optimizada para ser desplegada de forma 100% gratuita en **Cloudflare Pages** y con almacenamiento persistente en **Cloudflare KV**.

---

## 🚀 Características Principales

* **Selección de Plantilla Base:** Carga instantánea de la estructura inicial para múltiples programas (ej. Maestría en Finanzas, Especialización en GETEC) tanto en modalidad de inscripciones abiertas como cerradas.
* **Canvas de Diseño Drag & Drop:** Reordenamiento vertical interactivo de los bloques mediante gestos de arrastre impulsados por **SortableJS**.
* **Editor de Propiedades Dinámico:** Formulario inteligente que detecta los campos editables del bloque seleccionado (textos, enlaces y arrays estructurados).
* **Historial de Versiones Recientes:** Guardado de versiones con IDs únicos. Soporte híbrido que muestra de forma unificada las versiones almacenadas en **Cloudflare KV** y en el almacenamiento local del navegador (`localStorage`).
* **Borrado Reactivo del Historial:** Posibilidad de eliminar versiones obsoletas directamente desde la interfaz con actualización en vivo.
* **Exportación Rápida:** Opciones para copiar el código HTML compilado al portapapeles o descargarlo como archivo físico.
* **Aislamiento de Previsualización:** Renderizado de la previsualización final del correo dentro de un `<iframe>` aislado para evitar conflictos de estilos CSS con la aplicación editora.

---

## 🛠️ Arquitectura Técnica

El proyecto sigue una arquitectura desacoplada en tres capas principales:

1. **Catálogo de Bloques Modulares (`templates.js`):** Cada sección del email (Cabecera, Alerta, Datos Cursada, Plan de Estudios, Aranceles, CTAs, Firma, Footer) está aislada como un fragmento HTML parametrizado.
2. **Lógica de Estado en Cliente (`app.js`):** Gestiona la reactividad en tiempo real (Single Page App). A medida que el usuario escribe, el lienzo se actualiza de forma fluida y sin recargas de página.
3. **Servicios Edge Serverless (`functions/`):**
   * `/api/save` (POST): Genera un ID aleatorio, escribe la plantilla en Cloudflare KV, actualiza el registro de historial central e inyecta las variables en el layout base.
   * `/api/load` (GET): Lee la clave KV asociada a un ID y devuelve el JSON de configuración de bloques.
   * `/api/history` (GET): Recupera la lista central de versiones recientes guardadas.
   * `/api/delete` (POST): Remueve una versión de KV y limpia la referencia en el historial de versiones.

---

## ✉️ Compatibilidad Extrema con Clientes de Correo (Outlook, Gmail, Apple Mail)

El HTML compilado por la herramienta cumple con los estándares más estrictos de compatibilidad en email marketing para asegurar que se visualice idéntico en cualquier bandeja de entrada (incluyendo versiones antiguas de Microsoft Outlook que utilizan el motor de Word):

* **Maquetación Rígida con Tablas:** Se evita el uso de `div`, Flexbox o Grid en la estructura del email. Toda la maquetación se realiza con tablas anidadas (`<table>`, `<tr>`, `<td>`).
* **Estilos En Línea (Inline CSS):** Los estilos visuales se inyectan directamente en cada elemento utilizando atributos `style="..."` para evitar que los proveedores de correo eliminen las hojas de estilo declaradas en la cabecera.
* **Reset de Márgenes y Padding:** Todas las tablas declaran explícitamente `cellpadding="0"`, `cellspacing="0"`, `border="0"` y `style="border-collapse: collapse;"` para neutralizar el comportamiento arbitrario de espaciado de los clientes de correo.
* **Ancho Fijo Estándar:** El lienzo central del email está configurado con un ancho exacto de `650px` con alineación centrada para garantizar legibilidad óptima y evitar el desborde horizontal.
* **Fuentes Web Seguras:** Empleo de una pila de fuentes del sistema (`sans-serif` con respaldos) para asegurar que el diseño no se rompa si la fuente preferida no está instalada en el dispositivo de lectura.

---

## 💻 Ejecución Local

### Opción 1: Modo Cliente (Apertura Directa)
Podés simplemente abrir el archivo `index.html` en tu navegador. El editor funcionará de forma 100% interactiva utilizando `localStorage` en lugar de Cloudflare KV para persistir tu historial local.

### Opción 2: Modo Local Serverless (Con emulación de KV)
Para probar los endpoints API locales emulando a Cloudflare:
1. Asegúrate de tener Node.js instalado.
2. Levanta el servidor local con Wrangler:
   ```bash
   npx wrangler pages dev . --kv=TEMPLATE_KV
   ```
3. El editor estará disponible en `http://localhost:8788`.

---

## ☁️ Despliegue en Cloudflare Pages

1. **Creación del Proyecto:**
   * Vincula este repositorio de Git en tu panel de Cloudflare Pages o sube la carpeta directamente.
   * Cloudflare detectará automáticamente la carpeta `/functions` y levantará la API serverless.
2. **Crear e Instalar KV Binding:**
   * En tu panel de Cloudflare, ve a **Workers & Pages** -> **KV** y crea un namespace (ej. `unsam-email-kv`).
   - Ve a la configuración de tu proyecto de Pages: **Settings** -> **Functions** -> **KV namespace bindings**.
   - Añade un enlace nuevo:
     - **Variable name**: `TEMPLATE_KV` *(importante: usar este nombre exacto)*
     - **KV namespace**: El namespace que creaste en el paso anterior.
   * Realiza una nueva compilación (Redeploy) en Pages y el sistema estará operativo en la nube al 100%.
