// Estructuras de Plantillas de Email y Configuración de Bloques de la UNSAM

export const BASE_LAYOUT = {
  header: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{emailTitle}}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0f4fa; width: 100%; margin: 0; padding: 40px 0;">
    <tr>
      <td align="center" style="padding: 0 10px;">
        <table width="650" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; width: 650px; max-width: 100%; border-radius: 8px; border: 1px solid #c6d5ed; border-collapse: separate; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">`,
  footer: `        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
};

export const BLOCK_TEMPLATES = {
  header: {
    name: "Banner Principal",
    schema: {
      headerImageUrl: { type: "text", label: "URL de la Imagen" },
      headerImageAlt: { type: "text", label: "Texto Alternativo (Alt)" }
    },
    render: (data) => `
      <!-- Cabecera (Header con Imagen) -->
      <tr>
        <td style="background-color: #254194; padding: 0; text-align: center;">
          <img src="${data.headerImageUrl}" alt="${data.headerImageAlt}" width="650" style="display: block; width: 650px; max-width: 100%; height: auto; border: 0;" />
        </td>
      </tr>`
  },

  subheader: {
    name: "Imagen Secundaria",
    schema: {
      subHeaderImageUrl: { type: "text", label: "URL de la Imagen Secundaria" },
      subHeaderImageAlt: { type: "text", label: "Texto Alternativo (Alt)" }
    },
    render: (data) => `
      <!-- Imagen Secundaria Cabecera -->
      <tr>
        <td style="padding: 0; text-align: center; background-color: #ffffff;">
          <img src="${data.subHeaderImageUrl}" alt="${data.subHeaderImageAlt}" width="650" style="display: block; width: 650px; max-width: 100%; height: auto; border: 0;" />
        </td>
      </tr>`
  },

  intro: {
    name: "Saludo e Introducción",
    schema: {
      saludo: { type: "text", label: "Saludo" },
      saludoColor: { type: "color", label: "Color del Saludo" },
      introText: { type: "textarea", label: "Texto de Introducción (HTML permitido)" }
    },
    render: (data) => `
      <!-- Introducción y Saludo -->
      <tr>
        <td style="padding: 40px 40px 25px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="font-size: 16px; color: ${data.saludoColor || '#254194'}; font-weight: 600; margin-bottom: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.saludo}
          </div>
          <div style="margin-bottom: 0; text-align: justify; color: #475569; font-size: 15px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.introText}
          </div>
        </td>
      </tr>`
  },

  alert: {
    name: "Alerta de Estado",
    schema: {
      alertType: { type: "select", label: "Tipo de Alerta", options: ["success", "danger"] },
      alertTitle: { type: "text", label: "Título de la Alerta" },
      alertContent: { type: "textarea", label: "Contenido (HTML permitido)" }
    },
    render: (data) => {
      const isSuccess = data.alertType === "success";
      const bgColor = isSuccess ? "#ecfdf5" : "#fef2f2";
      const borderColor = isSuccess ? "#10b981" : "#ef4444";
      const textColor = isSuccess ? "#047857" : "#991b1b";
      const bodyColor = isSuccess ? "#065f46" : "#7f1d1d";
      return `
      <!-- Alerta de Estado -->
      <tr>
        <td style="padding: 0 40px 25px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgColor}; border-left: 4px solid ${borderColor}; border-radius: 4px; border-collapse: separate;">
            <tr>
              <td style="padding: 15px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-weight: 700; color: ${textColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.alertTitle}
                </div>
                <div style="color: ${bodyColor}; font-size: 14px; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.alertContent}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    }
  },

  generalInfo: {
    name: "Información General y Cursada",
    schema: {
      sectionTitle: { type: "text", label: "Título de Sección" },
      titleColor: { type: "color", label: "Color de Título de Sección" },
      card1Label: { type: "text", label: "Ficha 1 - Etiqueta" },
      card1Value: { type: "text", label: "Ficha 1 - Valor Principal" },
      card1Text: { type: "textarea", label: "Ficha 1 - Descripción" },
      card2Label: { type: "text", label: "Ficha 2 - Etiqueta" },
      card2Value: { type: "text", label: "Ficha 2 - Valor Principal" },
      card2Text: { type: "textarea", label: "Ficha 2 - Descripción (HTML permitido)" },
      card3Label: { type: "text", label: "Ficha Horarios - Etiqueta" },
      card3Bullet1: { type: "text", label: "Horario - Viñeta 1 (HTML permitido)" },
      card3Bullet2: { type: "text", label: "Horario - Viñeta 2 (HTML permitido)" },
      card3Footer: { type: "text", label: "Horario - Aclaración Final" },
      cardLabelColor: { type: "color", label: "Color de Etiquetas" },
      cardValueColor: { type: "color", label: "Color de Valores Principales" }
    },
    render: (data) => `
      <!-- Información General y Cursada -->
      <tr>
        <td style="padding: 0 40px 30px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="font-size: 18px; color: ${data.titleColor || '#6a3189'}; font-weight: 700; border-bottom: 2px solid #c6d5ed; padding-bottom: 8px; margin-bottom: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.sectionTitle}
          </div>

          <!-- Ficha de Datos Principales (2 Columnas) -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px; border-collapse: separate;">
            <tr>
              <!-- Columna 1 -->
              <td width="48%" valign="top" style="background-color: #f5f7fb; border: 1px solid #c6d5ed; border-radius: 6px; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-size: 11px; font-weight: bold; color: ${data.cardLabelColor || '#974594'}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.card1Label}
                </div>
                <div style="font-size: 15px; font-weight: bold; color: ${data.cardValueColor || '#254194'}; margin-bottom: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.card1Value}
                </div>
                <div style="font-size: 13px; color: #475569; line-height: 1.4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.card1Text}
                </div>
              </td>

              <!-- Espaciador -->
              <td width="4%">&nbsp;</td>

              <!-- Columna 2 -->
              <td width="48%" valign="top" style="background-color: #f5f7fb; border: 1px solid #c6d5ed; border-radius: 6px; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-size: 11px; font-weight: bold; color: ${data.cardLabelColor || '#974594'}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.card2Label}
                </div>
                <div style="font-size: 15px; font-weight: bold; color: ${data.cardValueColor || '#254194'}; margin-bottom: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.card2Value}
                </div>
                <div style="font-size: 13px; color: #475569; line-height: 1.4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.card2Text}
                </div>
              </td>
            </tr>
          </table>

          <!-- Ficha de Horarios Detallados -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate;">
            <tr>
              <td style="background-color: #f5f7fb; border: 1px solid #c6d5ed; border-radius: 6px; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-size: 11px; font-weight: bold; color: ${data.cardLabelColor || '#974594'}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.card3Label}
                </div>
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="5%" valign="top" style="color: ${data.cardValueColor || '#254194'}; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">&bull;</td>
                    <td width="95%" style="font-size: 13px; color: #475569; padding-bottom: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      ${data.card3Bullet1}
                    </td>
                  </tr>
                  <tr>
                    <td width="5%" valign="top" style="color: ${data.cardValueColor || '#254194'}; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">&bull;</td>
                    <td width="95%" style="font-size: 13px; color: #475569; padding-bottom: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      ${data.card3Bullet2}
                    </td>
                  </tr>
                </table>
                <div style="font-size: 11px; color: #64748b; font-style: italic; margin-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.card3Footer}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
  },

  targetAudience: {
    name: "Perfil del Destinatario (GETEC)",
    schema: {
      sectionTitle: { type: "text", label: "Título de Sección" },
      titleColor: { type: "color", label: "Color de Título de Sección" },
      introText: { type: "textarea", label: "Texto de Introducción" },
      bulletColor: { type: "color", label: "Color de Viñetas" },
      item1Title: { type: "text", label: "Item 1 - Negrita" },
      item1Text: { type: "textarea", label: "Item 1 - Cuerpo" },
      item2Title: { type: "text", label: "Item 2 - Negrita" },
      item2Text: { type: "textarea", label: "Item 2 - Cuerpo" },
      item3Title: { type: "text", label: "Item 3 - Negrita" },
      item3Text: { type: "textarea", label: "Item 3 - Cuerpo" },
      item4Title: { type: "text", label: "Item 4 - Negrita" },
      item4Text: { type: "textarea", label: "Item 4 - Cuerpo" },
      item5Title: { type: "text", label: "Item 5 - Negrita" },
      item5Text: { type: "textarea", label: "Item 5 - Cuerpo" }
    },
    render: (data) => `
      <!-- ¿A quién está dirigido? -->
      <tr>
        <td style="padding: 0 40px 30px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="font-size: 18px; color: ${data.titleColor || '#6a3189'}; font-weight: 700; border-bottom: 2px solid #c6d5ed; padding-bottom: 8px; margin-bottom: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.sectionTitle}
          </div>
          <div style="font-size: 14px; color: #475569; text-align: justify; line-height: 1.6; margin-bottom: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.introText}
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate;">
            <tr>
              <td style="font-size: 13.5px; color: #475569; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="20" valign="top" style="color: ${data.bulletColor || '#6a3189'}; font-weight: bold; font-size: 16px; padding: 2px 0;">&bull;</td>
                    <td valign="top" style="padding: 2px 0 6px 0;"><strong>${data.item1Title}</strong> ${data.item1Text}</td>
                  </tr>
                  <tr>
                    <td width="20" valign="top" style="color: ${data.bulletColor || '#6a3189'}; font-weight: bold; font-size: 16px; padding: 2px 0;">&bull;</td>
                    <td valign="top" style="padding: 2px 0 6px 0;"><strong>${data.item2Title}</strong> ${data.item2Text}</td>
                  </tr>
                  <tr>
                    <td width="20" valign="top" style="color: ${data.bulletColor || '#6a3189'}; font-weight: bold; font-size: 16px; padding: 2px 0;">&bull;</td>
                    <td valign="top" style="padding: 2px 0 6px 0;"><strong>${data.item3Title}</strong> ${data.item3Text}</td>
                  </tr>
                  <tr>
                    <td width="20" valign="top" style="color: ${data.bulletColor || '#6a3189'}; font-weight: bold; font-size: 16px; padding: 2px 0;">&bull;</td>
                    <td valign="top" style="padding: 2px 0 6px 0;"><strong>${data.item4Title}</strong> ${data.item4Text}</td>
                  </tr>
                  <tr>
                    <td width="20" valign="top" style="color: ${data.bulletColor || '#6a3189'}; font-weight: bold; font-size: 16px; padding: 2px 0;">&bull;</td>
                    <td valign="top" style="padding: 2px 0 6px 0;"><strong>${data.item5Title}</strong> ${data.item5Text}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
  },

  about: {
    name: "Sobre la Carrera / Programa",
    schema: {
      sectionTitle: { type: "text", label: "Título de Sección" },
      titleColor: { type: "color", label: "Color de Título de Sección" },
      descriptionText: { type: "textarea", label: "Descripción (HTML permitido)" }
    },
    render: (data) => `
      <!-- Propósito y Enfoque -->
      <tr>
        <td style="padding: 0 40px 30px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="font-size: 18px; color: ${data.titleColor || '#6a3189'}; font-weight: 700; border-bottom: 2px solid #c6d5ed; padding-bottom: 8px; margin-bottom: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.sectionTitle}
          </div>
          <div style="font-size: 14px; color: #475569; text-align: justify; line-height: 1.6; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.descriptionText}
          </div>
        </td>
      </tr>`
  },

  admission: {
    name: "Admisión y Requisitos",
    schema: {
      sectionTitle: { type: "text", label: "Título de Sección" },
      titleColor: { type: "color", label: "Color de Título de Sección" },
      admissionCondition: { type: "textarea", label: "Condición de Admisión (HTML permitido)" },
      requirementsTitle: { type: "text", label: "Título de Lista de Requisitos" },
      doc1: { type: "text", label: "Documento 1" },
      doc2: { type: "text", label: "Documento 2" },
      doc3: { type: "text", label: "Documento 3" },
      doc4: { type: "text", label: "Documento 4" },
      doc5: { type: "text", label: "Documento 5" },
      doc6: { type: "text", label: "Documento 6" },
      doc7: { type: "text", label: "Documento 7" },
      doc8: { type: "text", label: "Documento 8" },
      extraInfoTitle: { type: "text", label: "Título Alerta de Títulos Extranjeros" },
      extraInfoText: { type: "textarea", label: "Texto Alerta de Títulos Extranjeros (HTML permitido)" },
      alertBgColor: { type: "color", label: "Color de Fondo de Alerta" },
      alertBorderColor: { type: "color", label: "Color de Borde de Alerta" },
      alertTitleColor: { type: "color", label: "Color del Título de Alerta" }
    },
    render: (data) => {
      const docs = [data.doc1, data.doc2, data.doc3, data.doc4, data.doc5, data.doc6, data.doc7, data.doc8].filter(Boolean);
      const docsRows = docs.map(doc => `
        <tr>
          <td width="24" valign="top" style="color: #10b981; font-weight: bold; font-size: 16px; padding: 3px 0; font-family: Arial, sans-serif;">✓</td>
          <td valign="top" style="padding: 3px 0 6px 0; color: #475569; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${doc}
          </td>
        </tr>
      `).join('');

      return `
      <!-- Requisitos de Admisión y Documentación -->
      <tr>
        <td style="padding: 0 40px 30px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="font-size: 18px; color: ${data.titleColor || '#6a3189'}; font-weight: 700; border-bottom: 2px solid #c6d5ed; padding-bottom: 8px; margin-bottom: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.sectionTitle}
          </div>

          <div style="font-size: 14px; color: #475569; margin-bottom: 15px; text-align: justify; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.admissionCondition}
          </div>

          <div style="font-size: 14px; font-weight: bold; color: ${data.titleColor || '#6a3189'}; margin-bottom: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.requirementsTitle}
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px; border-collapse: separate;">
            <tr>
              <td style="font-size: 14px; color: #475569; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${docsRows}
                </table>
              </td>
            </tr>
          </table>

          <!-- Cuadro Alerta de Títulos Extranjeros -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${data.alertBgColor || '#dfcce3'}; border-left: 4px solid ${data.alertBorderColor || '#974594'}; border-radius: 4px; border-collapse: separate;">
            <tr>
              <td style="padding: 15px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-weight: 700; color: ${data.alertTitleColor || '#6a3189'}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.extraInfoTitle}
                </div>
                <div style="color: #475569; font-size: 13px; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.extraInfoText}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    }
  },

  curriculum: {
    name: "Plan de Estudio y Carga Horaria",
    schema: {
      sectionTitle: { type: "text", label: "Título de Sección" },
      titleColor: { type: "color", label: "Color de Título de Sección" },
      headerBgColor: { type: "color", label: "Fondo de Encabezado Tabla" },
      groupBgColor: { type: "color", label: "Fondo de Áreas" },
      groupTextColor: { type: "color", label: "Texto de Áreas" },
      totalHoursText: { type: "text", label: "Texto Total Horas" },
      totalHoursValue: { type: "text", label: "Valor Total Horas" },
      totalCreditsValue: { type: "text", label: "Valor Total Créditos" }
    },
    // We will store the structure of areas in data.areas, editable in detail
    render: (data) => {
      const areasRows = (data.areas || []).map(area => {
        const subjectsHtml = (area.subjects || []).map((sub, index) => `
          <tr style="font-size: 12px; color: #334155; ${index % 2 === 1 ? 'background-color: #f5f7fb;' : ''}">
            <td style="padding: 7px 10px; border-bottom: 1px solid #c6d5ed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${sub.name}
            </td>
            <td align="center" style="padding: 7px 10px; border-bottom: 1px solid #c6d5ed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${sub.duration}
            </td>
            <td align="center" style="padding: 7px 10px; border-bottom: 1px solid #c6d5ed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${sub.weekly}
            </td>
            <td align="center" style="padding: 7px 10px; border-bottom: 1px solid #c6d5ed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${sub.total}
            </td>
            <td align="center" style="padding: 7px 10px; border-bottom: 1px solid #c6d5ed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${sub.credits}
            </td>
          </tr>
        `).join('');

        return `
          <!-- GRUPO: ${area.name} -->
          <tr style="background-color: ${data.groupBgColor || '#c6d5ed'}; color: ${data.groupTextColor || '#254194'}; font-weight: bold; font-size: 11px;">
            <td colspan="5" style="padding: 8px 10px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid ${data.groupBgColor || '#96a8d5'}; border-top: 1px solid ${data.groupBgColor || '#96a8d5'}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${area.name}
            </td>
          </tr>
          ${subjectsHtml}
          <tr style="font-size: 11px; font-weight: bold; color: ${data.groupTextColor || '#575ea7'}; background-color: #f5f7fb;">
            <td colspan="3" align="right" style="padding: 6px 10px; border-bottom: 1px solid ${data.groupBgColor || '#96a8d5'}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${area.totalLabel}
            </td>
            <td align="center" style="padding: 6px 10px; border-bottom: 1px solid ${data.groupBgColor || '#96a8d5'}; font-weight: bold; color: ${data.groupTextColor || '#254194'}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${area.totalHours}
            </td>
            <td align="center" style="padding: 6px 10px; border-bottom: 1px solid ${data.groupBgColor || '#96a8d5'}; font-weight: bold; color: ${data.groupTextColor || '#254194'}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${area.totalCredits}
            </td>
          </tr>
        `;
      }).join('');

      return `
      <!-- Plan de Estudios y Carga Horaria -->
      <tr>
        <td style="padding: 0 40px 30px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="font-size: 18px; color: ${data.titleColor || '#6a3189'}; font-weight: 700; border-bottom: 2px solid #c6d5ed; padding-bottom: 8px; margin-bottom: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.sectionTitle}
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid ${data.groupBgColor || '#96a8d5'}; border-radius: 4px; overflow: hidden; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <!-- Encabezados Tabla -->
            <tr style="background-color: ${data.headerBgColor || '#254194'}; color: #ffffff; font-weight: bold; font-size: 12px;">
              <td style="padding: 8px 10px; font-weight: bold; border-bottom: 1.5px solid #974594; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Cód. / Asignatura
              </td>
              <td align="center" style="padding: 8px 10px; font-weight: bold; border-bottom: 1.5px solid #974594; width: 18%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Dedicación
              </td>
              <td align="center" style="padding: 8px 10px; font-weight: bold; border-bottom: 1.5px solid #974594; width: 14%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Semanal
              </td>
              <td align="center" style="padding: 8px 10px; font-weight: bold; border-bottom: 1.5px solid #974594; width: 14%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Total H.
              </td>
              <td align="center" style="padding: 8px 10px; font-weight: bold; border-bottom: 1.5px solid #974594; width: 14%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Créditos
              </td>
            </tr>
            
            ${areasRows}

            <!-- RESUMEN TOTAL -->
            <tr style="background-color: ${data.headerBgColor || '#254194'}; color: #ffffff; font-weight: bold; font-size: 13px;">
              <td colspan="3" align="right" style="padding: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                ${data.totalHoursText}
              </td>
              <td align="center" style="padding: 10px; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                ${data.totalHoursValue}
              </td>
              <td align="center" style="padding: 10px; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                ${data.totalCreditsValue}
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    }
  },

  tuition: {
    name: "Aranceles y Medios de Pago",
    schema: {
      sectionTitle: { type: "text", label: "Título de Sección" },
      titleColor: { type: "color", label: "Color de Título de Sección" },
      residentTitle: { type: "text", label: "Residentes - Título" },
      residentCuotas: { type: "text", label: "Residentes - Cuotas" },
      residentMonto: { type: "text", label: "Residentes - Monto" },
      residentObs: { type: "text", label: "Residentes - Observación" },
      nonResidentTitle: { type: "text", label: "Extranjeros - Título" },
      nonResidentCuotas: { type: "text", label: "Extranjeros - Cuotas" },
      nonResidentMonto: { type: "text", label: "Extranjeros - Monto" },
      nonResidentObs: { type: "text", label: "Extranjeros - Observación" },
      cardLabelColor: { type: "color", label: "Color de Etiquetas" },
      cardValueColor: { type: "color", label: "Color de Cuotas" },
      montoColor: { type: "color", label: "Color del Monto" },
      discountText: { type: "textarea", label: "Beneficios y Descuentos (HTML permitido)" },
      paymentText: { type: "textarea", label: "Medios de Pago (HTML permitido)" }
    },
    render: (data) => `
      <!-- Aranceles y Medios de Pago -->
      <tr>
        <td style="padding: 0 40px 30px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="font-size: 18px; color: ${data.titleColor || '#6a3189'}; font-weight: 700; border-bottom: 2px solid #c6d5ed; padding-bottom: 8px; margin-bottom: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.sectionTitle}
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f7fb; border: 1px solid #c6d5ed; border-radius: 6px; overflow: hidden; border-collapse: separate;">
            <tr>
              <td style="padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <!-- Columna Residentes -->
                    <td width="48%" valign="top" style="border-right: 1px solid #c6d5ed; padding-right: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      <div style="font-size: 11px; font-weight: bold; color: ${data.cardLabelColor || '#575ea7'}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.residentTitle}
                      </div>
                      <div style="font-size: 15px; font-weight: bold; color: ${data.cardValueColor || '#254194'}; margin-bottom: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.residentCuotas}
                      </div>
                      <div style="font-size: 18px; font-weight: 800; color: ${data.montoColor || '#974594'}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.residentMonto} <span style="font-size: 11px; font-weight: normal; color: ${data.cardLabelColor || '#6674b6'};">c/u</span>
                      </div>
                      <div style="font-size: 11px; color: #94a3b8; font-style: italic; margin-top: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.residentObs}
                      </div>
                    </td>

                    <!-- Columna Extranjeros -->
                    <td width="48%" valign="top" style="padding-left: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      <div style="font-size: 11px; font-weight: bold; color: ${data.cardLabelColor || '#575ea7'}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.nonResidentTitle}
                      </div>
                      <div style="font-size: 15px; font-weight: bold; color: ${data.cardValueColor || '#254194'}; margin-bottom: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.nonResidentCuotas}
                      </div>
                      <div style="font-size: 18px; font-weight: 800; color: ${data.montoColor || '#974594'}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.nonResidentMonto} <span style="font-size: 11px; font-weight: normal; color: ${data.cardLabelColor || '#6674b6'};">c/u</span>
                      </div>
                      <div style="font-size: 11px; color: #94a3b8; font-style: italic; margin-top: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.nonResidentObs}
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Divisor Interno -->
                <div style="border-top: 1px solid #c6d5ed; margin: 15px 0;"></div>

                <!-- Información sobre Descuentos y SIRO -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-size: 13px; color: #475569; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      <div style="margin-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.discountText}
                      </div>
                      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.paymentText}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
  },

  bannerImage: {
    name: "Imagen de Banner / Testimonio",
    schema: {
      bannerImageUrl: { type: "text", label: "URL del Banner" },
      bannerImageAlt: { type: "text", label: "Texto Alternativo (Alt)" }
    },
    render: (data) => `
      <!-- Imagen Intermedia Banner -->
      <tr>
        <td style="padding: 0; text-align: center; background-color: #ffffff;">
          <img src="${data.bannerImageUrl}" alt="${data.bannerImageAlt}" width="650" style="display: block; width: 650px; max-width: 100%; height: auto; border: 0;" />
        </td>
      </tr>`
  },

  cta: {
    name: "Llamados a la Acción (CTA)",
    schema: {
      sectionTitle: { type: "text", label: "Título de Sección" },
      titleColor: { type: "color", label: "Color del Título de Sección" },
      charlaLabel: { type: "text", label: "Charla - Etiqueta" },
      charlaUrl: { type: "text", label: "Charla - URL del Formulario" },
      charlaBtnText: { type: "text", label: "Charla - Texto del Botón" },
      charlaBtnBgColor: { type: "color", label: "Color del Botón de Charla" },
      whatsappLabel: { type: "text", label: "WhatsApp - Etiqueta" },
      whatsappUrl: { type: "text", label: "WhatsApp - URL" },
      whatsappBtnText: { type: "text", label: "WhatsApp - Texto del Botón" },
      videoLabel: { type: "textarea", label: "Grabación - Descripción (HTML permitido)" },
      videoUrl: { type: "text", label: "Grabación - URL del Video" },
      videoBtnText: { type: "text", label: "Grabación - Texto del Link" },
      videoTitleColor: { type: "color", label: "Color de Enlace de Video" }
    },
    render: (data) => `
      <!-- Enlaces de Interés y WhatsApp (Llamados a la Acción) -->
      <tr>
        <td style="padding: 30px 40px 30px 40px; text-align: center; background-color: #f5f7fb; border-top: 1px solid #c6d5ed; border-bottom: 1px solid #c6d5ed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="font-size: 16px; font-weight: bold; color: ${data.titleColor || '#6a3189'}; margin-bottom: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.sectionTitle}
          </div>

          <!-- Botones en 2 Columnas -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate;">
            <tr>
              <!-- Columna Charla Informativa -->
              <td width="48%" align="center" valign="top" style="padding: 5px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-size: 13px; color: #475569; margin-bottom: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.charlaLabel}
                </div>
                <!-- Botón Charla -->
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%;">
                  <tr>
                    <td align="center" style="background-color: ${data.charlaBtnBgColor || '#254194'}; border-radius: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      <a href="${data.charlaUrl}" target="_blank" style="display: block; color: #ffffff; background-color: ${data.charlaBtnBgColor || '#254194'}; border: solid 1px ${data.charlaBtnBgColor || '#254194'}; border-radius: 4px; padding: 10px 15px; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.charlaBtnText}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>

              <!-- Espaciador -->
              <td width="4%">&nbsp;</td>

              <!-- Columna WhatsApp -->
              <td width="48%" align="center" valign="top" style="padding: 5px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-size: 13px; color: #475569; margin-bottom: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.whatsappLabel}
                </div>
                <!-- Botón WhatsApp -->
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%;">
                  <tr>
                    <td align="center" style="background-color: #25d366; border-radius: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      <a href="${data.whatsappUrl}" target="_blank" style="display: block; color: #ffffff; background-color: #25d366; border: solid 1px #25d366; border-radius: 4px; padding: 10px 15px; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        ${data.whatsappBtnText}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Última Charla Informativa Link -->
          <div style="margin-top: 25px; font-size: 13px; color: #475569; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.videoLabel}<br>
            <a href="${data.videoUrl}" target="_blank" style="color: ${data.videoTitleColor || '#6a3189'}; font-weight: bold; text-decoration: underline; display: inline-block; margin-top: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${data.videoBtnText}
            </a>
          </div>
        </td>
      </tr>`
  },

  closing: {
    name: "Cierre y Despedida",
    schema: {
      closingText: { type: "textarea", label: "Texto de Cierre (HTML permitido)" }
    },
    render: (data) => `
      <!-- Cierre y Firma -->
      <tr>
        <td style="padding: 40px 40px 20px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="font-size: 14px; color: #475569; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${data.closingText}
          </div>
        </td>
      </tr>`
  },

  signature: {
    name: "Imagen de Firma",
    schema: {
      signatureImageUrl: { type: "text", label: "URL de la Imagen de Firma" },
      signatureImageAlt: { type: "text", label: "Texto Alternativo (Alt)" }
    },
    render: (data) => `
      <!-- Bloque de Firma Imagen -->
      <tr>
        <td style="padding: 0; text-align: center; background-color: #ffffff;">
          <img src="${data.signatureImageUrl}" alt="${data.signatureImageAlt}" width="650" style="display: block; width: 650px; max-width: 100%; height: auto; border: 0;" />
        </td>
      </tr>`
  },

  footer: {
    name: "Pie de Página e Info Legal",
    schema: {
      linkedinUrl: { type: "text", label: "URL LinkedIn" },
      instagramUrl: { type: "text", label: "URL Instagram" },
      twitterUrl: { type: "text", label: "URL Twitter/X" },
      webUrl: { type: "text", label: "URL Web UNSAM" },
      copyright: { type: "text", label: "Copyright y Datos Legales" }
    },
    render: (data) => `
      <!-- Pie de Página (Redes y Legal) -->
      <tr>
        <td style="padding: 25px 40px 40px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate;">
            <tr>
              <td align="center" style="font-size: 12px; color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="font-weight: 600; color: #64748b; margin-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  Seguinos en nuestras redes
                </div>
                <div style="margin-bottom: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  <a href="${data.linkedinUrl}" target="_blank" style="color: #254194; text-decoration: none; font-weight: bold; margin: 0 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">LinkedIn</a>
                  |
                  <a href="${data.instagramUrl}" target="_blank" style="color: #e1306c; text-decoration: none; font-weight: bold; margin: 0 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Instagram</a>
                  |
                  <a href="${data.twitterUrl}" target="_blank" style="color: #254194; text-decoration: none; font-weight: bold; margin: 0 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Twitter/X</a>
                  |
                  <a href="${data.webUrl}" target="_blank" style="color: #254194; text-decoration: none; font-weight: bold; margin: 0 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Web UNSAM</a>
                </div>
                <div style="font-size: 11px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.copyright}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
  }
};

export const DEFAULT_TEMPLATES = {
  finanzas_abiertas: {
    name: "Maestría en Finanzas - Inscripciones Abiertas",
    emailTitle: "Maestría en Finanzas - UNSAM (Inscripciones Abiertas)",
    blocks: [
      {
        type: "header",
        data: {
          headerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1713991868/headmodificado_n6fnas.jpg",
          headerImageAlt: "Maestría en Finanzas - UNSAM"
        }
      },
      {
        type: "subheader",
        data: {
          subHeaderImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1772817421/Sin_t%C3%ADtulo_7_u9qfqt.png",
          subHeaderImageAlt: "Detalle Cabecera"
        }
      },
      {
        type: "intro",
        data: {
          saludo: "Estimado/a,",
          introText: `Nos complace saber que la <a href="https://www.unsam.edu.ar/escuelas/eeyn/697/economia/finanzas" target="_blank" rel="noopener noreferrer" style="color: #254194; font-weight: bold; text-decoration: underline;"><strong>Maestría en Finanzas</strong></a> de la UNSAM ha despertado tu interés para continuar tu formación académica. A continuación, te compartimos toda la información detallada del programa académico, el cronograma de cursada y los requisitos necesarios para efectuar tu postulación.`
        }
      },
      {
        type: "alert",
        data: {
          alertType: "success",
          alertTitle: "Inscripciones Abiertas",
          alertContent: `El período de postulación a la Maestría en Finanzas se encuentra <strong>abierto desde el 20 de octubre hasta el 12 de diciembre</strong>. Para efectuar tu postulación, deberás enviar la documentación obligatoria detallada a continuación, en su conjunto y en formato PDF, respondiendo a esta casilla de correo.`
        }
      },
      {
        type: "generalInfo",
        data: {
          sectionTitle: "Información General y Cursada",
          card1Label: "Duración y Modalidad",
          card1Value: "2 Años - Híbrida",
          card1Text: "Cursada mixta: <strong>55% presencial</strong> y <strong>45% virtual</strong>. La semana que se cursa presencial, no se cursa virtual.",
          card2Label: "Sede de Cursada",
          card2Value: "Edificio Volta (UNSAM)",
          card2Text: `<a href="https://www.google.com/maps/place/Unsam+Posgrados/@-34.6055625,-58.3784183,15z/data=!4m6!3m5!1s0x95bccace13e1d0cd:0x3d2442f10b919226!8m2!3d-34.6055625!4d-58.3784183!16s%2Fg%2F11b_02bj05?entry=ttu" target="_blank" rel="noopener noreferrer" style="color: #254194; text-decoration: underline;">Piso 2, Av. Presidente Roque Sáenz Peña 832, CABA. Ubicación céntrica y de fácil acceso.</a>`,
          card3Label: "Esquema Horario",
          card3Bullet1: "<strong>Modalidad Virtual:</strong> Martes y Jueves de 18:00 a 21:00 Hs.",
          card3Bullet2: "<strong>Modalidad Presencial (Intensivo mensual):</strong> Una sola vez al mes. Se cursa el 3er Viernes del mes de 9:00 a 18:00 Hs y el 3er Sábado del mes de 10:00 a 13:00 Hs.",
          card3Footer: "* Los horarios y el cronograma definitivo están sujetos a modificaciones."
        }
      },
      {
        type: "about",
        data: {
          sectionTitle: "Sobre la Carrera",
          descriptionText: `La Maestría en Finanzas pretende colaborar en la ponderación de las finanzas como herramienta indispensable y necesaria para el proceso de desarrollo económico del país, y ser referente en la formación de profesionales de las finanzas vinculadas al desarrollo y la producción, valiéndose de las características, los antecedentes y la estrecha vinculación de la institución con actores del sector privado y público. En ese sentido, busca contribuir a la formación de profesionales que permitan lograr una mayor vinculación entre las instituciones del sector financiero (bancos, sociedades de bolsa, aseguradoras) y las necesidades de financiamiento de los distintos sectores de la economía real (industria, sector agropecuario, comercio, pymes).`
        }
      },
      {
        type: "admission",
        data: {
          sectionTitle: "Admisión y Documentación",
          admissionCondition: "Podrán postularse graduados/as de carreras universitarias de grado con planes de estudio de no menos de 4 años de duración y 2600 horas reloj. Excepciones a este requisito serán evaluadas de forma individual por el Comité Académico.",
          requirementsTitle: "Lista de Documentación a Presentar:",
          doc1: "<strong>CV académico y profesional</strong> actualizado, con foto digital integrada.",
          doc2: "<strong>Ficha de preinscripción</strong> con código QR visible. No se admitirán capturas de pantalla de la misma. El trámite se inicia en el portal <a href='https://guarani3.unsam.edu.ar/preinscripcion/unsam/acceso' target='_blank' style='color: #254194; font-weight: bold; text-decoration: underline;'>SIU-Preinscripción</a>.",
          doc3: "<strong>DNI</strong> escaneado legible (frente y dorso).",
          doc4: "<strong>Partida de Nacimiento</strong> completa.",
          doc5: "<strong>Título de grado</strong> de 4 años de duración o superior (frente y dorso).",
          doc6: "<strong>Certificado analítico de grado</strong> detallado (frente y dorso).",
          doc7: "<strong>Acreditación de inglés:</strong> Constancia de capacidad de lectura y comprensión de textos en inglés. En su defecto, se puede presentar una carta firmada declarando formalmente dicha capacidad de lecto-comprensión.",
          doc8: "<strong>Dos cartas de recomendación</strong> académicas y/o profesionales debidamente firmadas.",
          extraInfoTitle: "Títulos obtenidos en el extranjero:",
          extraInfoText: `El diploma de grado y certificado analítico deben contar con las firmas legalizadas de la autoridad educativa del país emisor, visadas por el Consulado respectivo de la República Argentina o validadas con la <strong>Apostilla de La Haya</strong>.<br><br>Si la documentación original estuviese en un idioma distinto al español, deberá adjuntar la traducción pública correspondiente efectuada por un/a traductor/a público/a de registro, legalizada por el Colegio de Traductores Públicos (Av. Callao 289, CABA).`
        }
      },
      {
        type: "curriculum",
        data: {
          sectionTitle: "Plan de Estudio y Carga Horaria",
          totalHoursText: "CARGA HORARIA TOTAL DE CURSADA:",
          totalHoursValue: "540 hs",
          totalCreditsValue: "32,40",
          areas: [
            {
              name: "Área Formativa: Mercado de Capitales",
              totalLabel: "Total Área Mercado de Capitales:",
              totalHours: "108 hs",
              totalCredits: "6,75",
              subjects: [
                { name: "1.1 Instrumentos de Renta Fija y Renta Variable", duration: "Cuatrimestral", weekly: "2 hs", total: "36 hs", credits: "2,25" },
                { name: "1.2 Tópicos de Macrofinanzas", duration: "Cuatrimestral", weekly: "2 hs", total: "36 hs", credits: "2,25" },
                { name: "1.3 Derivados Financieros", duration: "Cuatrimestral", weekly: "2 hs", total: "36 hs", credits: "2,25" }
              ]
            },
            {
              name: "Área Formativa: Finanzas Corporativas",
              totalLabel: "Total Área Finanzas Corporativas:",
              totalHours: "108 hs",
              totalCredits: "6,75",
              subjects: [
                { name: "2.1 Fundamentos del Análisis Financiero", duration: "Cuatrimestral", weekly: "2 hs", total: "36 hs", credits: "2,25" },
                { name: "2.2 Valuación de empresas", duration: "Cuatrimestral", weekly: "2 hs", total: "36 hs", credits: "2,25" },
                { name: "2.3 Finanzas y Management Corporativo", duration: "Cuatrimestral", weekly: "2 hs", total: "36 hs", credits: "2,25" }
              ]
            },
            {
              name: "Área Formativa: Formación Complementaria",
              totalLabel: "Total Formación Complementaria:",
              totalHours: "180 hs",
              totalCredits: "10,80",
              subjects: [
                { name: "3.1 a 3.6 Materias Optativas (1 al 6)", duration: "Cuatrimestral", weekly: "2 hs (c/u)", total: "180 hs", credits: "10,80" }
              ]
            },
            {
              name: "Área Formativa: Práctica Profesional",
              totalLabel: "Total Área Práctica Profesional:",
              totalHours: "144 hs",
              totalCredits: "8,10",
              subjects: [
                { name: "4.1 Taller de Práctica Profesional", duration: "Anual", weekly: "2 hs", total: "72 hs", credits: "4,50" },
                { name: "4.2 Taller de Trabajo Final I", duration: "Cuatrimestral", weekly: "3 hs", total: "36 hs", credits: "1,80" },
                { name: "4.3 Taller de Trabajo Final II", duration: "Cuatrimestral", weekly: "3 hs", total: "36 hs", credits: "1,80" }
              ]
            }
          ]
        }
      },
      {
        type: "tuition",
        data: {
          sectionTitle: "Aranceles y Medios de Pago",
          residentTitle: "Postulantes Residentes",
          residentCuotas: "20 Cuotas Mensuales",
          residentMonto: "$500.000",
          residentObs: "* Arancel vigente sujeto a modificación.",
          nonResidentTitle: "Extranjeros No Residentes",
          nonResidentCuotas: "20 Cuotas Mensuales",
          nonResidentMonto: "400 USD",
          nonResidentObs: "* Arancel vigente sujeto a modificación.",
          discountText: "<strong>Beneficio Comunidad UNSAM:</strong> Se otorga un <strong>50% de descuento</strong> sobre las cuotas mensuales para miembros activos de la comunidad universitaria (egresados/as, docentes y nodocentes de UNSAM).",
          paymentText: "<strong>Medios de Pago:</strong> Las opciones de pago se procesan a través del sistema <strong>SIRO</strong> (incluyendo cobros mediante código QR y diversas billeteras virtuales)."
        }
      },
      {
        type: "bannerImage",
        data: {
          bannerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1781018644/mariela_b6smiw.png",
          bannerImageAlt: "Testimonio"
        }
      },
      {
        type: "cta",
        data: {
          sectionTitle: "¿Deseás recibir asesoramiento o asistir a charlas?",
          charlaLabel: "Notificaciones de la próxima charla:",
          charlaUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeOFIgYiN4uoG3lNVX-ObqbHlOPtWrGgsz6AgwL90KUc5QftA/viewform",
          charlaBtnText: "INSCRIBIRME AQUÍ",
          whatsappLabel: "Contacto directo por mensajería:",
          whatsappUrl: "https://wa.me/541168083537",
          whatsappBtnText: "WHATSAPP INFORMATIVO",
          videoLabel: "¿Querés ver de qué se trata? Te compartimos la grabación de nuestra última Charla Informativa del <strong>19/02/2026</strong>:",
          videoUrl: "https://universidadnaciona-my.sharepoint.com/:v:/g/personal/posgrado_eeyn_unsam_edu_ar/IQAxBant6sp2SLahckw5szB7Ad2ZWINbjH0J6daxCg9ZVps?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHAiOiJWZWIiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=sq3QvM",
          videoBtnText: "Ver Grabación de la Charla Informativa →"
        }
      },
      {
        type: "closing",
        data: {
          closingText: "Quedamos a tu entera disposición para resolver cualquier duda que tengas sobre la cursada o sobre el proceso de postulación.<br><br>Atentamente,"
        }
      },
      {
        type: "signature",
        data: {
          signatureImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1713991851/signaturefooter_lxydwu.png",
          signatureImageAlt: "Firma y Contacto"
        }
      },
      {
        type: "footer",
        data: {
          linkedinUrl: "https://www.linkedin.com/school/unsam/",
          instagramUrl: "https://www.instagram.com/unsamoficial/",
          twitterUrl: "https://twitter.com/unsamoficial",
          webUrl: "https://unsam.edu.ar",
          copyright: "&copy; 2026 Escuela de Economía y Negocios - UNSAM. Todos los derechos reservados."
        }
      }
    ]
  },

  finanzas_cerradas: {
    name: "Maestría en Finanzas - Inscripciones Cerradas",
    emailTitle: "Maestría en Finanzas - UNSAM",
    blocks: [] // will be loaded dynamically by copying finanzas_abiertas and modifying the alert
  },

  especializacion_getec_abierta: {
    name: "Especialización en GETEC - Inscripciones Abiertas",
    emailTitle: "Especialización en Gestión de la Tecnología y la Innovación - UNSAM",
    blocks: [
      {
        type: "header",
        data: {
          headerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1713991868/headmodificado_n6fnas.jpg",
          headerImageAlt: "Especialización en GETEC - UNSAM"
        }
      },
      {
        type: "subheader",
        data: {
          subHeaderImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1781030429/esp-getec_mbp6ox.jpg",
          subHeaderImageAlt: "Detalle Cabecera GETEC"
        }
      },
      {
        type: "intro",
        data: {
          saludo: "Estimado/a,",
          introText: `Es un gusto saludarte. A continuación, te compartimos toda la información necesaria para que puedas efectuar tu postulación a la <a href="https://www.unsam.edu.ar/escuelas/eeyn/696/economia/gestion-tecnologia-innovacion" target="_blank" rel="noopener noreferrer" style="color: #254194; font-weight: bold; text-decoration: underline;"><strong>Especialización en Gestión de la Tecnología y la Innovación</strong></a> de la UNSAM. Consideramos esta información crucial y valiosa para ayudarte a tomar una decisión informada sobre la continuidad de tus estudios.<br><br>El principal objetivo de la Especialización es contribuir a la formación de nuevos actores dinamizadores de la innovación tecnológica y el desarrollo económico y social, tanto en sus aspectos estratégico-empresariales, como en los de diseño de nuevas políticas e instituciones públicas.`
        }
      },
      {
        type: "alert",
        data: {
          alertType: "success",
          alertTitle: "Período de Postulación",
          alertContent: "Las postulaciones estarán habilitadas <strong>del 03/02/2026 al 14/03/2026</strong>. Para efectuar tu postulación, deberás enviar la documentación solicitada, en su conjunto y en formato PDF, respondiendo a esta casilla de correo electrónico."
        }
      },
      {
        type: "generalInfo",
        data: {
          sectionTitle: "Información General y Cursada",
          card1Label: "Duración y Modalidad",
          card1Value: "3 Cuatrimestres",
          card1Text: "La duración total es de <strong>3 cuatrimestres</strong>. Modalidad de cursada quincenal combinando encuentros presenciales y virtuales.",
          card2Label: "Sede de Cursada",
          card2Value: "Edificio Volta (UNSAM)",
          card2Text: `<a href="https://www.google.com/maps/place/Unsam+Posgrados/@-34.6055625,-58.3784183,15z/data=!4m6!3m5!1s0x95bccace13e1d0cd:0x3d2442f10b919226!8m2!3d-34.6055625!4d-58.3784183!16s%2Fg%2F11b_02bj05?entry=ttu" target="_blank" rel="noopener noreferrer" style="color: #254194; text-decoration: underline;">Piso 2, Av. Presidente Roque Sáenz Peña 832, CABA. Ubicación céntrica y de fácil acceso.</a>`,
          card3Label: "Esquema Horario",
          card3Bullet1: "Clases sincrónicas virtuales y presenciales cada 15 días.",
          card3Bullet2: "<strong>Días de cursada:</strong> Viernes de 18:00 a 21:30 Hs y Sábados de 9:00 a 13:30 Hs.",
          card3Footer: "* Cronograma y distribución horaria sujetos a modificaciones."
        }
      },
      {
        type: "targetAudience",
        data: {
          sectionTitle: "¿A quién está dirigido?",
          introText: "El posgrado está especialmente orientado y diseñado para potenciar las competencias de los siguientes perfiles profesionales:",
          item1Title: "Ámbitos Empresarial y PyMEs:",
          item1Text: "Gerentes de desarrollo, gerentes de proyectos, emprendedores, empresarios, representantes de cámaras empresariales y profesionales del sector PyME.",
          item2Title: "Sector Gubernamental:",
          item2Text: "Funcionarios nacionales, provinciales y municipales a cargo del diseño y la ejecución de políticas orientadas al desarrollo productivo y la innovación, o a cargo de unidades de vinculación tecnológica (UVT).",
          item3Title: "Ecosistema Tecnológico:",
          item3Text: "Gerentes y promotores de parques y polos tecnológicos o industriales, así como de incubadoras de empresas.",
          item4Title: "Investigación y Desarrollo:",
          item4Text: "Tecnólogos e investigadores ligados con áreas de gestión en Investigación y Desarrollo (I+D) que busquen vincularse con el entramado socio-productivo.",
          item5Title: "Graduados Universitarios:",
          item5Text: "Egresados de Licenciaturas en Administración, Comercio Internacional, Contador Público, Información Ambiental, Sistemas de Información y otras afines, así como de Ingenierías (Agronómica, Industrial, en Alimentos, entre otras)."
        }
      },
      {
        type: "about",
        data: {
          sectionTitle: "Sobre la Especialización",
          descriptionText: "La Especialización en Gestión de la Tecnología y la Innovación de la UNSAM ofrece una formación sistemática para profesionales que busquen diseñar e implementar estrategias tecnológicas a nivel empresarial, institucional o gubernamental. Con una visión interdisciplinaria, se analizan los desafíos locales y globales de la innovación en la era del conocimiento."
        }
      },
      {
        type: "admission",
        data: {
          sectionTitle: "Admisión y Documentación",
          admissionCondition: "Podrán inscribirse egresados/as de carreras universitarias de grado de 4 años de duración como mínimo en áreas de ciencias sociales, económicas, ingenierías u otras disciplinas cuyos roles profesionales exijan gestión tecnológica. También aplicable a egresados de carreras terciarias de 4 años mínimos (sujeto a evaluación).",
          requirementsTitle: "Lista de Documentación Obligatoria a Presentar:",
          doc1: "<strong>CV académico y profesional</strong> actualizado, con foto digital integrada.",
          doc2: "<strong>Ficha de preinscripción</strong> impresa con el código QR visible. No se admitirán capturas de pantalla de la misma. El trámite se inicia en el portal <a href='https://guarani3.unsam.edu.ar/preinscripcion/unsam/acceso' target='_blank' style='color: #254194; font-weight: bold; text-decoration: underline;'>SIU-Preinscripción</a>.",
          doc3: "<strong>DNI</strong> escaneado en alta definición (frente y dorso).",
          doc4: "<strong>Título de grado</strong> de 4 años de duración o superior (frente y dorso).",
          doc5: "<strong>Certificado analítico de grado</strong> detallado (frente y dorso).",
          doc6: "<strong>Partida de Nacimiento</strong> completa (frente y dorso).",
          doc7: "<strong>Acreditación de inglés:</strong> Acreditar capacidad para leer y comprender textos editados en idioma inglés (o en su defecto, una carta declaratoria de lecto comprensión firmada).",
          doc8: "<strong>Dos cartas de recomendación</strong> académicas y/o profesionales.",
          extraInfoTitle: "Títulos obtenidos en el extranjero:",
          extraInfoText: `El diploma de grado y certificado analítico deben contar con las firmas legalizadas de la autoridad educativa del país emisor, visadas por el Consulado respectivo de la República Argentina o validadas con la <strong>Apostilla de La Haya</strong>.<br><br>Si la documentación original estuviese en un idioma distinto al español, deberá adjuntar la traducción pública correspondiente efectuada por un/a traductor/a público/a de registro, legalizada por el Colegio de Traductores Públicos (Av. Callao 289, CABA).`
        }
      },
      {
        type: "tuition",
        data: {
          sectionTitle: "Aranceles y Medios de Pago",
          residentTitle: "Postulantes Residentes",
          residentCuotas: "15 Cuotas Mensuales",
          residentMonto: "$300.000",
          residentObs: "* Materias externas: $300.000 c/u.",
          nonResidentTitle: "Extranjeros No Residentes",
          nonResidentCuotas: "15 Cuotas Mensuales",
          nonResidentMonto: "240 USD",
          nonResidentObs: "* Materias externas: 240 USD c/u.",
          discountText: "<strong>Beneficio Comunidad UNSAM:</strong> Se otorga un <strong>50% de descuento</strong> sobre las cuotas mensuales para egresados, docentes y personal no docente de la Universidad Nacional de San Martín.",
          paymentText: "<strong>Aclaraciones:</strong> Los precios están sujetos a modificación. Las opciones de pago son las provistas mediante el sistema SIRO para la Escuela de Economía y Negocios."
        }
      },
      {
        type: "bannerImage",
        data: {
          bannerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1781030608/Merediz_thqg1p.png",
          bannerImageAlt: "Testimonio GETEC"
        }
      },
      {
        type: "cta",
        data: {
          sectionTitle: "¿Deseás recibir asesoramiento o asistir a charlas?",
          charlaLabel: "Notificaciones de la próxima charla:",
          charlaUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeOFIgYiN4uoG3lNVX-ObqbHlOPtWrGgsz6AgwL90KUc5QftA/viewform",
          charlaBtnText: "INSCRIBIRME AQUÍ",
          whatsappLabel: "Contacto directo por WhatsApp:",
          whatsappUrl: "https://wa.me/541168083537",
          whatsappBtnText: "WHATSAPP INFORMATIVO",
          videoLabel: "Te compartimos la grabación de nuestra última Charla Informativa del <strong>25/02/2026</strong>:",
          videoUrl: "https://example.com/grabacion-charla-gti",
          videoBtnText: "Ver Grabación de la Charla Informativa →"
        }
      },
      {
        type: "closing",
        data: {
          closingText: "Quedamos a tu entera disposición ante cualquier consulta y/o inquietud.<br><br>¡Esperamos que puedas sumarte!<br><br>Atentamente,"
        }
      },
      {
        type: "signature",
        data: {
          signatureImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1713991851/signaturefooter_lxydwu.png",
          signatureImageAlt: "Firma y Contacto"
        }
      },
      {
        type: "footer",
        data: {
          linkedinUrl: "https://www.linkedin.com/school/unsam/",
          instagramUrl: "https://www.instagram.com/unsamoficial/",
          twitterUrl: "https://twitter.com/unsamoficial",
          webUrl: "https://unsam.edu.ar",
          copyright: "&copy; 2026 Escuela de Economía y Negocios - UNSAM. Todos los derechos reservados."
        }
      }
    ]
  },

  especializacion_getec_cerrada: {
    name: "Especialización en GETEC - Inscripciones Cerradas",
    emailTitle: "Especialización en Gestión de la Tecnología y la Innovación - UNSAM",
    blocks: [] // will be loaded dynamically by copying getec_abierta and modifying the alert
  }
};

// Initialize closed templates by cloning open ones and changing the alert block
DEFAULT_TEMPLATES.finanzas_cerradas.blocks = JSON.parse(JSON.stringify(DEFAULT_TEMPLATES.finanzas_abiertas.blocks));
const finAlertBlock = DEFAULT_TEMPLATES.finanzas_cerradas.blocks.find(b => b.type === "alert");
if (finAlertBlock) {
  finAlertBlock.data.alertType = "danger";
  finAlertBlock.data.alertTitle = "Estado de postulaciones";
  finAlertBlock.data.alertContent = "Actualmente las preincripciones y postulaciones se encuentran <strong>cerradas</strong> (abrirán nuevamente en <strong>octubre de 2026</strong>). Podés aprovechar este lapso para reunir la documentación detallada a continuación. La postulación se realiza enviando toda la documentación completa en un único archivo PDF a esta casilla de correo.";
}

DEFAULT_TEMPLATES.especializacion_getec_cerrada.blocks = JSON.parse(JSON.stringify(DEFAULT_TEMPLATES.especializacion_getec_abierta.blocks));
const getecAlertBlock = DEFAULT_TEMPLATES.especializacion_getec_cerrada.blocks.find(b => b.type === "alert");
if (getecAlertBlock) {
  getecAlertBlock.data.alertType = "danger";
  getecAlertBlock.data.alertTitle = "Estado de postulaciones";
  getecAlertBlock.data.alertContent = "Actualmente las preinscripciones y postulaciones se encuentran <strong>cerradas</strong>. Podés aprovechar este lapso para reunir la documentación obligatoria detallada a continuación. La postulación se realiza enviando toda la documentación completa en un único archivo PDF a esta casilla de correo.";
}
