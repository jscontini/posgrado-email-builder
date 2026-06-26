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
      alertType: { type: "select", label: "Tipo de Alerta", options: ["success", "danger", "warning", "info"] },
      alertTitle: { type: "text", label: "Título de la Alerta" },
      alertContent: { type: "textarea", label: "Contenido (HTML permitido)" }
    },
    render: (data) => {
      let bgColor = "#fef2f2";
      let borderColor = "#ef4444";
      let textColor = "#991b1b";
      let bodyColor = "#7f1d1d";

      if (data.alertType === "success") {
        bgColor = "#ecfdf5";
        borderColor = "#10b981";
        textColor = "#047857";
        bodyColor = "#065f46";
      } else if (data.alertType === "warning") {
        bgColor = "#fffbeb";
        borderColor = "#f59e0b";
        textColor = "#b45309";
        bodyColor = "#78350f";
      } else if (data.alertType === "info") {
        bgColor = "#f5f7fb";
        borderColor = "#254194";
        textColor = "#254194";
        bodyColor = "#475569";
      }

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
    render: (data) => {
      const items = [
        { title: data.item1Title, text: data.item1Text },
        { title: data.item2Title, text: data.item2Text },
        { title: data.item3Title, text: data.item3Text },
        { title: data.item4Title, text: data.item4Text },
        { title: data.item5Title, text: data.item5Text }
      ].filter(item => item.title || item.text);

      const itemsRows = items.map(item => `
        <tr>
          <td width="20" valign="top" style="color: ${data.bulletColor || '#6a3189'}; font-weight: bold; font-size: 16px; padding: 2px 0;">&bull;</td>
          <td valign="top" style="padding: 2px 0 6px 0;"><strong>${item.title || ''}</strong> ${item.text || ''}</td>
        </tr>
      `).join('');

      return `
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
                  ${itemsRows}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    }
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
      doc9: { type: "text", label: "Documento 9" },
      doc10: { type: "text", label: "Documento 10" },
      extraInfoTitle: { type: "text", label: "Título Alerta de Títulos Extranjeros" },
      extraInfoText: { type: "textarea", label: "Texto Alerta de Títulos Extranjeros (HTML permitido)" },
      alertBgColor: { type: "color", label: "Color de Fondo de Alerta" },
      alertBorderColor: { type: "color", label: "Color de Borde de Alerta" },
      alertTitleColor: { type: "color", label: "Color del Título de Alerta" }
    },
    render: (data) => {
      const docs = [data.doc1, data.doc2, data.doc3, data.doc4, data.doc5, data.doc6, data.doc7, data.doc8, data.doc9, data.doc10].filter(Boolean);
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
  },

  singleButton: {
    name: "Botón de Llamado a la Acción",
    schema: {
      btnText: { type: "text", label: "Texto del Botón" },
      btnUrl: { type: "text", label: "Enlace (URL)" },
      btnBgColor: { type: "color", label: "Color de Fondo del Botón" }
    },
    render: (data) => `
      <!-- Botón de Acceso CTA -->
      <tr>
        <td align="center" style="padding: 10px 40px 25px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; max-width: 400px;">
            <tr>
              <td align="center" style="background-color: ${data.btnBgColor || '#254194'}; border-radius: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <a href="${data.btnUrl}" target="_blank" style="display: block; color: #ffffff; background-color: ${data.btnBgColor || '#254194'}; border: solid 1px ${data.btnBgColor || '#254194'}; border-radius: 4px; padding: 12px 20px; text-decoration: none; font-size: 14px; font-weight: bold; letter-spacing: 0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${data.btnText}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
  },

  infoBox: {
    name: "Nota Aclaratoria / Recuadro",
    schema: {
      text: { type: "textarea", label: "Contenido (HTML permitido)" }
    },
    render: (data) => `
      <!-- Cuadro de Aclaración Institucional (footnote) -->
      <tr>
        <td style="padding: 0 40px 30px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; border-collapse: separate;">
            <tr>
              <td style="padding: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12.5px; color: #64748b; line-height: 1.5; text-align: justify;">
                ${data.text}
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
  },

  maestria_getec_abierta: {
    name: "Maestría en GETEC - Inscripciones Abiertas",
    emailTitle: "Maestría en Diseño y Gestión de la Tecnología y la Innovación - UNSAM",
    blocks: [
      {
        type: "header",
        data: {
          headerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1713991868/headmodificado_n6fnas.jpg",
          headerImageAlt: "Maestría en Diseño y Gestión de la Tecnología y la Innovación - UNSAM"
        }
      },
      {
        type: "subheader",
        data: {
          subHeaderImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1781825599/unnamed_a7g1ca.jpg",
          subHeaderImageAlt: "Detalle Cabecera"
        }
      },
      {
        type: "intro",
        data: {
          saludo: "Estimado/a, es un gusto saludarte.",
          introText: `A continuación, te compartimos toda la información necesaria para que puedas efectuar tu postulación a la <a href="https://www.unsam.edu.ar/escuelas/eeyn/701/economia/tecnologia-innovacion" target="_blank" rel="noopener noreferrer" style="color: #254194; font-weight: bold; text-decoration: underline;"><strong>Maestría en Diseño y Gestión de la Tecnología y la Innovación</strong></a> de la UNSAM. Consideramos esta información crucial y valiosa para ayudarte a tomar una decisión informada sobre la continuidad de tus estudios.<br><br>El principal objetivo de la Maestría es contribuir a la formación de nuevos actores dinamizadores de la innovación tecnológica y el desarrollo económico y social, tanto en sus aspectos estratégico-empresariales, como en los de diseño de nuevas políticas e instituciones públicas.`
        }
      },
      {
        type: "alert",
        data: {
          alertType: "success",
          alertTitle: "Período de Postulación",
          alertContent: "Las postulaciones estarán habilitadas <strong>del 03/02/2026 al 07/03/2026</strong>. Para efectuar tu postulación, deberás enviar la documentación solicitada, en su conjunto y en formato PDF, respondiendo a esta casilla de correo electrónico."
        }
      },
      {
        type: "generalInfo",
        data: {
          sectionTitle: "Información General y Cursada",
          card1Label: "Duración y Modalidad",
          card1Value: "2 Años",
          card1Text: "La duración total es de <strong>2 años</strong>. Modalidad de cursada quincenal combinando encuentros presenciales y virtuales.",
          card2Label: "Sede de Cursada",
          card2Value: "Edificio Volta (UNSAM)",
          card2Text: `<a href="https://www.google.com/maps/place/Unsam+Posgrados/@-34.6055625,-58.3784183,15z/data=!4m6!3m5!1s0x95bccace13e1d0cd:0x3d2442f10b919226!8m2!3d-34.6055625!4d-58.3784183!16s%2Fg%2F11b_02bj05?entry=ttu" target="_blank" rel="noopener noreferrer" style="color: #254194; text-decoration: underline;">Piso 2, Av. Presidente Roque Sáenz Peña 832, CABA. Escuela de Economía y Negocios.</a>`,
          card3Label: "Esquema de Cursada (Cada 15 Días)",
          card3Bullet1: "<strong>Encuentros Presenciales:</strong> 1 Jueves y 1 Viernes por mes, en modalidad intensiva de 9:00 a 18:00 Hs.",
          card3Bullet2: "<strong>Encuentros Virtuales:</strong> 1 Jueves y 1 Viernes por mes, de 18:00 a 21:00 Hs.",
          card3Footer: "* Los horarios pueden sufrir modificaciones según necesidades del programa académico."
        }
      },
      {
        type: "targetAudience",
        data: {
          sectionTitle: "¿A quién está dirigido?",
          introText: "El posgrado está especialmente orientado y diseñado para potenciar las competencias de los siguientes perfiles profesionales:",
          item1Title: "Ámbito Empresarial y PyMEs:",
          item1Text: "Gerentes de desarrollo, gerentes de proyectos, emprendedores, empresarios, representantes de cámaras empresariales y profesionales del sector PyME.",
          item2Title: "Sector Gubernamental:",
          item2Text: "Funcionarios nacionales, provinciales y municipales a cargo del diseño y la ejecución de políticas orientadas al desarrollo productivo and la innovación, o a cargo de unidades de vinculación tecnológica (UVT).",
          item3Title: "Ecosistema Tecnológico:",
          item3Text: "Gerentes y promotores de parques y polos tecnológicos o industriales, así como de incubadoras de empresas.",
          item4Title: "Investigación y Desarrollo:",
          item4Text: "Tecnólogos e investigadores ligados con áreas de gestión en Investigación y Desarrollo (I+D) que busquen vincularse con el entramado socio-productivo.",
          item5Title: "Graduados Universitarios:",
          item5Text: "Egresados de Licenciaturas en Administración, Comercio Internacional, Contador Público, Información Ambiental, Sistemas de Información y otras afines, así como de Ingenierías (Agronómica, Industrial, en Alimentos, entre otras)."
        }
      },
      {
        type: "admission",
        data: {
          sectionTitle: "Admisión y Documentación",
          admissionCondition: `<strong>Condiciones de Admisión:</strong> Podrán inscribirse en la Maestría en Diseño y Gestión de la Tecnología y la Innovación:
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px; border-collapse: separate;">
  <tr>
    <td width="20" valign="top" style="color: #6a3189; font-weight: bold; padding: 2px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">a)</td>
    <td valign="top" style="padding: 2px 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Egresadas y egresados de carreras universitarias de grado de 4 años de duración como mínimo, en ciencia política, sociología, economía, arquitectura, relaciones internacionales, trabajo social, ingenierías, comunicación social, antropología, historia, psicología, administración de empresas, comercialización, contador público, derecho, administración pública, arte.</td>
  </tr>
  <tr>
    <td width="20" valign="top" style="color: #6a3189; font-weight: bold; padding: 2px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">b)</td>
    <td valign="top" style="padding: 2px 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Egresadas y egresados de carreras de grado de otras disciplinas no mencionadas anterior punto que en su desempeño profesional requieran herramientas de gestión vinculadas a los objetivos de la Maestría. Estos casos serán evaluados por el Comité Académico.</td>
  </tr>
  <tr>
    <td width="20" valign="top" style="color: #6a3189; font-weight: bold; padding: 2px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">c)</td>
    <td valign="top" style="padding: 2px 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Postulantes que posean título oficial de carreras de nivel superior no universitario de cuatro (4) años de duración como mínimo.</td>
  </tr>
  <tr>
    <td width="20" valign="top" style="color: #6a3189; font-weight: bold; padding: 2px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">d)</td>
    <td valign="top" style="padding: 2px 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Podrán efectuar la postulación a la Maestría las/los graduadas/os de carreras cuya duración no sea inferior a 4 años y 2600 horas. Las excepciones sobre esta cuestión serán evaluadas por el Comité Académico, quien determinará si la/el postulante reúne las condiciones necesarias para ser admitido/a a la carrera e indicará las actividades formativas que eventualmente en cada caso tengan que realizar cada uno de los/las postulantes.</td>
  </tr>
  <tr>
    <td width="20" valign="top" style="color: #6a3189; font-weight: bold; padding: 2px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">e)</td>
    <td valign="top" style="padding: 2px 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Las solicitudes de postulantes que se encuentren en las condiciones de excepción previstas, podrán ser admisibles, siempre que demuestren poseer preparación y experiencia laboral acorde con los estudios de posgrado que se proponen iniciar, así como aptitudes y conocimientos suficientes para cursarlos satisfactoriamente.</td>
  </tr>
</table>`,
          requirementsTitle: "Lista de Documentación Obligatoria a Presentar:",
          doc1: "<strong>CV académico y profesional</strong> actualizado, con foto digital integrada.",
          doc2: "<strong>Ficha de preinscripción</strong> impresa con el código QR visible. No se admitirán capturas de pantalla de la misma. El trámite se inicia en el portal <a href='https://guarani3.unsam.edu.ar/preinscripcion/unsam/acceso' target='_blank' style='color: #254194; font-weight: bold; text-decoration: underline;'>SIU-Preinscripción</a>.",
          doc3: "<strong>DNI</strong> escaneado en alta definición (frente y dorso).",
          doc4: "<strong>Título de grado</strong> de 4 años de duración o superior (frente y dorso).",
          doc5: "<strong>Certificado analítico de grado</strong> detallado (frente y dorso).",
          doc6: "<strong>Acreditación de inglés:</strong> Acreditar capacidad para leer y comprender textos editados en idioma inglés (en caso de no contar con un certificado, puede redactar una carta donde deje asentado su capacidad de lecto comprensión en dicho idioma).",
          doc7: "<strong>Dos cartas de recomendación:</strong> Las mismas pueden ser del ámbito académico y/o profesional.",
          doc8: "",
          extraInfoTitle: "Títulos obtenidos en el extranjero:",
          extraInfoText: `El diploma de grado y certificado analítico deben contar con las firmas legalizadas de la autoridad educativa del país emisor, visadas por el Consulado respectivo de la República Argentina o validadas con la <strong>Apostilla de La Haya</strong>.<br><br>Si la documentación original estuviese en un idioma distinto al español, deberá adjuntar la traducción pública correspondiente efectuada por un/a traductor/a público/a de registro, legalizada por el Colegio de Traductores Públicos (Av. Callao 289, CABA).`
        }
      },
      {
        type: "tuition",
        data: {
          sectionTitle: "Aranceles y Medios de Pago",
          residentTitle: "Postulantes Residentes",
          residentCuotas: "20 Cuotas Mensuales",
          residentMonto: "$350.000",
          residentObs: "* Materias externas: $350.000 c/u.",
          nonResidentTitle: "Extranjeros No Residentes",
          nonResidentCuotas: "20 Cuotas Mensuales",
          nonResidentMonto: "280 USD",
          nonResidentObs: "* Materias externas: 220 USD c/u.",
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

  maestria_getec_cerrada: {
    name: "Maestría en GETEC - Inscripciones Cerradas",
    emailTitle: "Maestría en Diseño y Gestión de la Tecnología y la Innovación - UNSAM",
    blocks: [] // will be loaded dynamically by copying getec_abierta and modifying the alert
  },

  doctorado_ciencias_economicas_abierta: {
    name: "Doctorado en Ciencias Económicas - Inscripciones Abiertas",
    emailTitle: "Doctorado en Ciencias Económicas - UNSAM (Inscripciones Abiertas)",
    blocks: [
      {
        type: "header",
        data: {
          headerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1713991868/headmodificado_n6fnas.jpg",
          headerImageAlt: "Doctorado en Ciencias Económicas - UNSAM"
        }
      },
      {
        type: "subheader",
        data: {
          subHeaderImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1781894252/Encabezado_Doc._Cs._Eco_-_Editado_b9biqd.jpg",
          subHeaderImageAlt: "Detalle Cabecera"
        }
      },
      {
        type: "intro",
        data: {
          saludo: "Estimado/a,",
          introText: `Nos complace saber que el <a href="https://www.unsam.edu.ar/escuelas/eeyn/695/economia/doctorado-ciencias-economicas" target="_blank" rel="noopener noreferrer" style="color: #254194; font-weight: bold; text-decoration: underline;"><strong>Doctorado en Ciencias Económicas</strong></a> de la UNSAM ha despertado tu interés para continuar tu formación académica. A continuación, te compartimos toda la información necesaria para que puedas efectuar tu postulación. Consideramos esta información crucial y valiosa para ayudarte a tomar una decisión informada sobre la continuidad de tus estudios.<br><br>El Doctorado en Ciencias Económicas busca impulsar el progreso de las mismas en la Argentina y en la región, formando investigadores con la habilidad para conceptualizar, diseñar e implementar investigación de calidad.`
        }
      },
      {
        type: "alert",
        data: {
          alertType: "success",
          alertTitle: "Período de Postulación",
          alertContent: "Las postulaciones estarán habilitadas <strong>del 03/02/2026 al 07/03/2026</strong>. Para efectuar tu postulación, deberás enviar la documentación solicitada, en su conjunto y en formato PDF, respondiendo a esta casilla de correo electrónico."
        }
      },
      {
        type: "generalInfo",
        data: {
          sectionTitle: "Información General y Cursada",
          card1Label: "Duración y Modalidad",
          card1Value: "4 Años",
          card1Text: "La duración total es de <strong>4 años</strong>. Modalidad de cursada presencial con parte de la carga virtual.",
          card2Label: "Sede de Cursada",
          card2Value: "Edificio Volta (UNSAM)",
          card2Text: `<a href="https://www.google.com/maps/place/Unsam+Posgrados/@-34.6055625,-58.3784183,15z/data=!4m6!3m5!1s0x95bccace13e1d0cd:0x3d2442f10b919226!8m2!3d-34.6055625!4d-58.3784183!16s%2Fg%2F11b_02bj05?entry=ttu" target="_blank" rel="noopener noreferrer" style="color: #254194; text-decoration: underline;">Piso 2, Av. Presidente Roque Sáenz Peña 832, CABA. Escuela de Economía y Negocios.</a>`,
          card3Label: "Esquema de Cursada Semanal",
          card3Bullet1: "<strong>Días de dictado:</strong> Generalmente los Lunes, Miércoles o Jueves.",
          card3Bullet2: "<strong>Horario de cursada:</strong> De 18:00 a 21:00 Hs.",
          card3Footer: "* Los días y horarios pueden sufrir modificaciones según necesidades del programa académico."
        }
      },
      {
        type: "targetAudience",
        data: {
          sectionTitle: "¿A quién está destinado?",
          introText: "El Doctorado está destinado a estudiantes que cuenten con título de grado en disciplinas afines y busquen una formación avanzada en investigación.",
          item1Title: "Campos Profesionales Admitidos:",
          item1Text: "Economía, Contador Público, Administración, Turismo, Ingeniería, Relaciones Internacionales, Ciencia Política, Administración Pública o Sociología.",
          item2Title: "Requisitos de Carga Horaria de Grado:",
          item2Text: "Las carreras universitarias de procedencia deben contar con un mínimo de <strong>4 años de duración y 2600 horas reloj</strong>."
        }
      },
      {
        type: "about",
        data: {
          sectionTitle: "Proceso de Admisión",
          descriptionText: `El ingreso al Doctorado consta de un proceso estructurado en etapas:
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">
  <tr>
    <td width="5%" valign="top" style="color: #254194; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">1.</td>
    <td width="95%" style="font-size: 13.5px; color: #475569; padding-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: justify;"><strong>Preinscripción y Envío:</strong> Cada interesada/o debe enviar la totalidad de la documentación solicitada (ver lista más abajo) a esta casilla de correo electrónico en formato PDF.</td>
  </tr>
  <tr>
    <td width="5%" valign="top" style="color: #254194; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">2.</td>
    <td width="95%" style="font-size: 13.5px; color: #475569; padding-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: justify;"><strong>Evaluación del Comité:</strong> Una vez cerrado el período de postulaciones, el Comité Académico evalúa las presentaciones y realiza una <strong>entrevista personal</strong> con el/la postulante junto con el/la Director/a del Doctorado.</td>
  </tr>
  <tr>
    <td width="5%" valign="top" style="color: #254194; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">3.</td>
    <td width="95%" style="font-size: 13.5px; color: #475569; padding-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: justify;"><strong>Admisión e Inscripción:</strong> Se comunican formalmente las admisiones a los seleccionados. Junto con la carta de admisión, se enviará el instructivo para inscribirse a las materias correspondientes y el procedimiento para abonar la primera cuota.</td>
  </tr>
</table>`
        }
      },
      {
        type: "admission",
        data: {
          sectionTitle: "Documentación Requerida",
          admissionCondition: "A los fines de efectuar tu postulación, deberás adjuntar en un mismo correo la siguiente documentación obligatoria en formato PDF:",
          requirementsTitle: "",
          doc1: "<strong>CV académico y profesional</strong> actualizado, con foto digital integrada.",
          doc2: "<strong>Ficha de preinscripción</strong> impresa con el código QR correspondiente. No se admitirán capturas de pantalla. El trámite se inicia en el portal <a href='https://guarani3.unsam.edu.ar/preinscripcion/unsam/acceso' target='_blank' style='color: #254194; font-weight: bold; text-decoration: underline;'>SIU-Preinscripción</a>.",
          doc3: "<strong>DNI</strong> escaneado en alta definición (frente y dorso).",
          doc4: "<strong>Título de grado</strong> de 4 años de duración o superior y mínimo 2600 horas (frente y dorso).",
          doc5: "<strong>Certificado analítico de grado</strong> completo (frente y dorso).",
          doc6: "<strong>Partida de Nacimiento</strong> completa (frente y dorso).",
          doc7: "<strong>Acreditación de inglés:</strong> Acreditar capacidad para leer y comprender textos editados en idioma inglés. En caso de no contar con un certificado de idiomas, se puede adjuntar una carta redactada por el/la postulante donde declare y asiente dicha capacidad de lecto-comprensión.",
          doc8: "<strong>Dos cartas de recomendación:</strong> Se tomarán como válidas aquellas provenientes tanto del ámbito académico como del profesional.",
          doc9: "<strong>Carta de motivación:</strong> Documento (máximo dos carillas) en el que se fundamenten los motivos por los cuales te interesa realizar el Doctorado en Ciencias Económicas.",
          doc10: "<strong>Plan de trabajo preliminar:</strong> Documento de no más de 5 páginas que incluya: título, justificación breve del problema de investigación (antecedentes), planteo de la pregunta u objetivos de investigación, metodología propuesta y cronograma de actividades preliminares.",
          extraInfoTitle: "Títulos obtenidos en el extranjero:",
          extraInfoText: `El diploma de grado y el certificado analítico deben contar con las firmas legalizadas de la autoridad educativa del país emisor, visadas por el Consulado respectivo de la República Argentina o validadas con la <strong>Apostilla de La Haya</strong>.<br><br>Si la documentación original estuviese en un idioma distinto al español, deberá adjuntar la traducción pública correspondiente efectuada por un/a traductor/a público/a de registro, legalizada por el Colegio de Traductores Públicos (Av. Callao 289, CABA).`
        }
      },
      {
        type: "tuition",
        data: {
          sectionTitle: "Aranceles y Medios de Pago",
          residentTitle: "Postulantes Residentes",
          residentCuotas: "20 Cuotas Mensuales",
          residentMonto: "$250.000",
          residentObs: "Y posteriormente, hasta la finalización de la tesis, cuotas de <strong>$125.000</strong>.<br>* Materias para externos: $250.000 c/u.",
          nonResidentTitle: "Extranjeros No Residentes",
          nonResidentCuotas: "20 Cuotas Mensuales",
          nonResidentMonto: "220 USD",
          nonResidentObs: "Y posteriormente, hasta la finalización de la tesis, cuotas de <strong>110 USD</strong>.<br>* Materias para externos: 220 USD c/u.",
          discountText: "<strong>Beneficio Comunidad UNSAM:</strong> Se otorga un <strong>50% de descuento</strong> sobre las cuotas mensuales para egresados, docentes y personal no docente de la Universidad Nacional de San Martín.",
          paymentText: "<strong>Aclaraciones:</strong> Los precios están expresados a modo de referencia y sujetos a modificación. Las opciones de pago son las provistas mediante el sistema SIRO para la Escuela de Economía y Negocios."
        }
      },
      {
        type: "bannerImage",
        data: {
          bannerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1781894252/kulfas_zxfdeq.png",
          bannerImageAlt: "Testimonio Doctorado"
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
          videoLabel: "Te compartimos la grabación de nuestra última Charla Informativa del <strong>31/10/2025</strong>:",
          videoUrl: "https://universidadnaciona-my.sharepoint.com/:v:/g/personal/posgrado_eeyn_unsam_edu_ar/EcV9Hn72cuxBooIxrm4PDy0BA__ZW3xWstV9B6uhjQx-JQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHAQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=rMTYS2",
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

  doctorado_ciencias_economicas_cerrada: {
    name: "Doctorado en Ciencias Económicas - Inscripciones Cerradas",
    emailTitle: "Doctorado en Ciencias Económicas - UNSAM",
    blocks: [] // will be loaded dynamically by copying doctorado_ciencias_economicas_abierta and modifying the alert
  },

  doctorado_economia_innovacion_abierta: {
    name: "Doctorado en Economía de la Innovación - Inscripciones Abiertas",
    emailTitle: "Doctorado en Economía de la Innovación - UNSAM (Inscripciones Abiertas)",
    blocks: [
      {
        type: "header",
        data: {
          headerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1713991868/headmodificado_n6fnas.jpg",
          headerImageAlt: "Doctorado en Economía de la Innovación - UNSAM"
        }
      },
      {
        type: "subheader",
        data: {
          subHeaderImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1781901986/Encabezado_Doc._Eco._Innov_-_Editado_migugq.jpg",
          subHeaderImageAlt: "Detalle Cabecera"
        }
      },
      {
        type: "intro",
        data: {
          saludo: "Estimado/a,",
          introText: `En respuesta a tu consulta, te informamos que el <a href="https://unsam.edu.ar/escuelas/eeyn/670/economia/doctorado-economia-innovacion" target="_blank" rel="noopener noreferrer" style="color: #254194; font-weight: bold; text-decoration: underline;"><strong>Doctorado en Economía de la Innovación</strong></a> de la UNSAM ha despertado tu interés para continuar tu formación académica. A continuación, te compartimos toda la información necesaria para que puedas efectuar tu postulación. Consideramos esta información crucial y valiosa para ayudarte a tomar una decisión informada sobre la continuidad de tus estudios.<br><br>El Doctorado en Economía de la Innovación está especialmente orientado a formar investigadores capaces de aportar al análisis y diseño de políticas de ciencia, tecnología y sustentabilidad.`
        }
      },
      {
        type: "alert",
        data: {
          alertType: "success",
          alertTitle: "Período de Postulación",
          alertContent: "Las postulaciones estarán habilitadas <strong>del 03/02/2026 al 07/03/2026</strong>. Para efectuar tu postulación, deberás enviar la documentación solicitada, en su conjunto y en formato PDF, respondiendo a esta casilla de correo electrónico."
        }
      },
      {
        type: "generalInfo",
        data: {
          sectionTitle: "Información General y Cursada",
          card1Label: "Duración y Modalidad",
          card1Value: "4 Años",
          card1Text: "La duración total es de <strong>4 años</strong>. Modalidad de cursada presencial, intensiva y virtual.",
          card2Label: "Sedes de Cursada",
          card2Value: "Volta / Campus Miguelete",
          card2Text: `Se cursa conjuntamente en el <strong><a href="https://www.google.com/maps/place/Unsam+Posgrados/@-34.6055625,-58.3784183,15z/data=!4m6!3m5!1s0x95bccace13e1d0cd:0x3d2442f10b919226!8m2!3d-34.6055625!4d-58.3784183!16s%2Fg%2F11b_02bj05?entry=ttu" target="_blank" rel="noopener noreferrer" style="color: #254194; text-decoration: underline;">Edificio Volta</a></strong> (Diagonal Norte 832, Piso 2, CABA) y en el <strong>Campus Miguelete</strong> (25 de Mayo y Francia, San Martín).`,
          card3Label: "Cronograma y Requisitos de Avance",
          card3Bullet1: "<strong>Asignaturas:</strong> Se estipula cursar entre 2 y 3 materias por cuatrimestre, completando las áreas teóricas, de investigación y complementarias en un máximo de 2 años.",
          card3Bullet2: "<strong>Horarios generales:</strong> Miércoles, Jueves y Viernes de 16:00 a 20:00 Hs. Adicionalmente, se podría cursar algún sábado de 9:00 a 13:00 Hs.",
          card3Bullet3: "<strong>Taller de Tesis:</strong> Es requisito indispensable haber aprobado el Taller de Proyecto de Tesis y registrar un avance mínimo del 40% en la escritura de la misma.",
          card3Footer: "* Los días de cursada específicos se definen en función de cada asignatura y están sujetos a modificaciones."
        }
      },
      {
        type: "targetAudience",
        data: {
          sectionTitle: "¿A quién está destinado?",
          introText: "El Doctorado en Economía de la Innovación busca atraer a graduadas y graduados universitarios orientados a la investigación del cambio tecnológico y el desarrollo.",
          item1Title: "Campos Profesionales Admitidos:",
          item1Text: "Graduadas/os en ciencias económicas, sociales o ambientales que demuestren afinidad con las temáticas de ciencia, tecnología e innovación.",
          item2Title: "Requisitos de Carga Horaria de Grado:",
          item2Text: "Las carreras universitarias de procedencia deben acreditar un mínimo de <strong>4 años de duración y 2600 horas reloj</strong>."
        }
      },
      {
        type: "about",
        data: {
          sectionTitle: "Proceso de Admisión",
          descriptionText: `El ingreso al Doctorado consta de un proceso estructurado en etapas:
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">
  <tr>
    <td width="5%" valign="top" style="color: #254194; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">1.</td>
    <td width="95%" style="font-size: 13.5px; color: #475569; padding-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: justify;"><strong>Preinscripción y Envío:</strong> Cada interesada/o debe enviar la totalidad de la documentación solicitada (ver lista más abajo) a esta casilla de correo electrónico en formato PDF.</td>
  </tr>
  <tr>
    <td width="5%" valign="top" style="color: #254194; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">2.</td>
    <td width="95%" style="font-size: 13.5px; color: #475569; padding-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: justify;"><strong>Evaluación del Comité:</strong> Una vez cerrado el período de postulaciones, el Comité Académico evalúa las presentaciones y realiza una <strong>entrevista personal</strong> con el/la postulante junto con las autoridades del Doctorado.</td>
  </tr>
  <tr>
    <td width="5%" valign="top" style="color: #254194; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">3.</td>
    <td width="95%" style="font-size: 13.5px; color: #475569; padding-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: justify;"><strong>Admisión e Inscripción:</strong> Se comunican formalmente las admisiones a los seleccionados. Junto con la carta de admisión, se enviará el instructivo para inscribirse a las materias correspondientes y el procedimiento para abonar la primera cuota.</td>
  </tr>
</table>`
        }
      },
      {
        type: "admission",
        data: {
          sectionTitle: "Documentación Requerida",
          admissionCondition: "A los fines de efectuar tu postulación, deberás adjuntar en un mismo correo la siguiente documentación obligatoria en formato PDF:",
          requirementsTitle: "",
          doc1: "<strong>CV académico y profesional</strong> actualizado, con foto digital integrada.",
          doc2: "<strong>Ficha de preinscripción</strong> impresa con el código QR correspondiente. No se admitirán capturas de pantalla. El trámite se inicia en el portal <a href=\"https://guarani3.unsam.edu.ar/preinscripcion/unsam/acceso\" target=\"_blank\" style=\"color: #254194; font-weight: bold; text-decoration: underline;\">SIU-Preinscripción</a>.",
          doc3: "<strong>DNI</strong> escaneado en alta definición (frente y dorso).",
          doc4: "<strong>Título de grado</strong> de 4 años de duración o superior y mínimo 2600 horas (frente y dorso).",
          doc5: "<strong>Certificado analítico de grado</strong> completo (frente y dorso).",
          doc6: "<strong>Partida de Nacimiento</strong> completa (frente y dorso).",
          doc7: "<strong>Acreditación de inglés:</strong> Acreditar capacidad para leer y comprender textos editados en idioma inglés. En caso de no contar con un certificado de idiomas, se puede adjuntar una carta redactada por el/la postulante donde declare y asiente dicha capacidad de lecto-comprensión.",
          doc8: "<strong>Dos cartas de recomendación:</strong> Se tomarán como válidas aquellas provenientes tanto del ámbito académico como del profesional.",
          doc9: "<strong>Carta de motivación:</strong> Documento (máximo dos carillas) en el que se fundamenten los motivos por los cuales te interesa realizar el Doctorado en Economía de la Innovación.",
          doc10: "<strong>Plan de trabajo preliminar:</strong> Documento de no más de 5 páginas que incluya: título, justificación breve del problema de investigación (antecedentes), planteo de la pregunta u objetivos de investigación, metodología propuesta y cronograma de actividades preliminares.",
          extraInfoTitle: "Títulos obtenidos en el extranjero:",
          extraInfoText: `El diploma de grado y el certificado analítico deben contar con las firmas legalizadas de la autoridad educativa del país emisor, visadas por el Consulado respectivo de la República Argentina o validadas con la <strong>Apostilla de La Haya</strong>.<br><br>Si la documentación original estuviese en un idioma distinto al español, deberá adjuntar la traducción pública correspondiente efectuada por un/a traductor/a público/a de registro, legalizada por el Colegio de Traductores Públicos (Av. Callao 289, CABA).`
        }
      },
      {
        type: "tuition",
        data: {
          sectionTitle: "Aranceles y Medios de Pago",
          residentTitle: "Postulantes Residentes",
          residentCuotas: "20 Cuotas Mensuales",
          residentMonto: "$250.000",
          residentObs: "Y posteriormente, hasta la finalización de la tesis, cuotas de <strong>$125.000</strong>.<br>* Materias para externos: $250.000 c/u.",
          nonResidentTitle: "Extranjeros No Residentes",
          nonResidentCuotas: "20 Cuotas Mensuales",
          nonResidentMonto: "220 USD",
          nonResidentObs: "Y posteriormente, hasta la finalización de la tesis, cuotas de <strong>110 USD</strong>.<br>* Materias para externos: 220 USD c/u.",
          discountText: "<strong>Beneficio Comunidad UNSAM:</strong> Se otorga un <strong>50% de descuento</strong> sobre las cuotas mensuales para egresados, docentes y personal no docente de la Universidad Nacional de San Martín.",
          paymentText: "<strong>Aclaraciones:</strong> Los precios están expresados a modo de referencia y sujetos a modificación. Las opciones de pago son las provistas mediante el sistema SIRO para la Escuela de Economía y Negocios."
        }
      },
      {
        type: "bannerImage",
        data: {
          bannerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1781901987/arza_znbbf2.png",
          bannerImageAlt: "Testimonio Doctorado"
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
          videoLabel: "Te compartimos la grabación de nuestra última Charla Informativa del <strong>31/10/2025</strong>:",
          videoUrl: "https://universidadnaciona-my.sharepoint.com/:v:/g/personal/posgrado_eeyn_unsam_edu_ar/IQCNHWZbXlRRTYbRWSKAax_BAcSGpu-Vg1mMaNwY6dElZSg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHAQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=E0QmHC",
          videoBtnText: "Ver Grabación de la Charla Informativa &rarr;"
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

  doctorado_economia_innovacion_cerrada: {
    name: "Doctorado en Economía de la Innovación - Inscripciones Cerradas",
    emailTitle: "Doctorado en Economía de la Innovación - UNSAM",
    blocks: [] // will be loaded dynamically by copying doctorado_economia_innovacion_abierta and modifying the alert
  },

  invitacion_charla_informativa: {
    name: "Invitación a Charla Informativa",
    emailTitle: "Invitación a Charla Informativa - UNSAM",
    blocks: [
      {
        type: "header",
        data: {
          headerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1733852426/head-tall_ki4s6p.png",
          headerImageAlt: "Charla Informativa - UNSAM"
        }
      },
      {
        type: "intro",
        data: {
          saludo: "Estimado/a,",
          introText: `Te recordamos que hoy a las <strong>11:00 Hs</strong> se realizará una nueva charla informativa virtual correspondiente al: <a href="https://eeyn.unsam.edu.ar/" target="_blank" style="color: #254194; font-weight: bold; text-decoration: underline;"><strong>Doctorado en Economía de la Innovación</strong></a> de la Escuela de Economía y Negocios.<br><br>Le compartimos a continuación el enlace para poder ingresar a la reunión:`
        }
      },
      {
        type: "singleButton",
        data: {
          btnText: "ACCEDER A LA CHARLA VIRTUAL",
          btnUrl: "https://example.com/enlace-charla-virtual",
          btnBgColor: "#254194"
        }
      },
      {
        type: "alert",
        data: {
          alertType: "warning",
          alertTitle: "IMPORTANTE",
          alertContent: "La reunión <strong>no cuenta con sala de espera</strong>, por lo que le pedimos aguardar unos minutos con paciencia; todos los participantes serán admitidos una vez que la charla comience."
        }
      },
      {
        type: "infoBox",
        data: {
          text: "<strong>Nota aclaratoria:</strong> La participación en las charlas informativas de posgrado de la Escuela de Economía y Negocios no es válida ni computable para el cumplimiento del módulo “Habitar la Universidad”."
        }
      },
      {
        type: "closing",
        data: {
          closingText: `<div style="font-size: 14px; color: #475569; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: bold; text-align: center;">
            ¡Esperamos contar con su presencia!
          </div>`
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
          linkedinUrl: "https://ar.linkedin.com/company/eeyn-unsam",
          instagramUrl: "https://www.instagram.com/eeyn_unsam",
          twitterUrl: "https://x.com/eeyn_unsam",
          webUrl: "https://unsam.edu.ar",
          copyright: "&copy; 2026 Escuela de Economía y Negocios - UNSAM. Todos los derechos reservados."
        }
      }
    ]
  },

  plantilla_para_todo_uso: {
    name: "Plantilla Genérica / Todo Uso",
    emailTitle: "Plantilla Genérica de Correo - UNSAM",
    blocks: [
      {
        type: "header",
        data: {
          headerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1782495483/unnamed_sc5anc.jpg",
          headerImageAlt: "Cabecera Oficial - UNSAM"
        }
      },
      {
        type: "intro",
        data: {
          saludo: "Estimado/a,",
          introText: `Este es un párrafo de ejemplo para que puedas redactar el contenido de tu correo electrónico. Puedes modificar directamente este texto una vez que pegues el diseño dentro del editor de Gmail o de tu cliente de correos preferido.<br><br>La estructura modular de esta plantilla te permite agregar múltiples párrafos, listas con viñetas o botones de llamado a la acción según las necesidades específicas de la comunicación.`
        }
      },
      {
        type: "alert",
        data: {
          alertType: "info",
          alertTitle: "Bloque Destacado / Aclaración",
          alertContent: "Este cuadro es ideal para destacar información clave, avisos administrativos, fechas límites o requisitos específicos. Su fondo grisáceo suave y el borde izquierdo azul atraen la atención del lector de manera elegante."
        }
      },
      {
        type: "targetAudience",
        data: {
          sectionTitle: "Listado de Puntos Importantes:",
          introText: "",
          item1Title: "Punto principal uno:",
          item1Text: "Aquí puedes ingresar detalles de cursada, horarios o requisitos específicos.",
          item2Title: "Punto principal dos:",
          item2Text: "Un renglón de texto adicional para describir aranceles, plazos o documentación.",
          item3Title: "Punto principal tres:",
          item3Text: "Cualquier otra aclaración institucional que requiera un orden visual limpio."
        }
      },
      {
        type: "singleButton",
        data: {
          btnText: "BOTÓN DE ACCIÓN / ENLACE WEB",
          btnUrl: "https://eeyn.unsam.edu.ar/",
          btnBgColor: "#254194"
        }
      },
      {
        type: "closing",
        data: {
          closingText: "Quedamos a tu entera disposición ante cualquier consulta o inquietud.<br><br>Atentamente,"
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
          linkedinUrl: "https://ar.linkedin.com/company/eeyn-unsam",
          instagramUrl: "https://www.instagram.com/eeyn_unsam",
          twitterUrl: "https://x.com/eeyn_unsam",
          webUrl: "https://unsam.edu.ar",
          copyright: "&copy; 2026 Escuela de Economía y Negocios - UNSAM. Todos los derechos reservados."
        }
      }
    ]
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

DEFAULT_TEMPLATES.maestria_getec_cerrada.blocks = JSON.parse(JSON.stringify(DEFAULT_TEMPLATES.maestria_getec_abierta.blocks));
const maestriaAlertBlock = DEFAULT_TEMPLATES.maestria_getec_cerrada.blocks.find(b => b.type === "alert");
if (maestriaAlertBlock) {
  maestriaAlertBlock.data.alertType = "danger";
  maestriaAlertBlock.data.alertTitle = "Estado de postulaciones";
  maestriaAlertBlock.data.alertContent = "Actualmente las preinscripciones y postulaciones se encuentran <strong>cerradas</strong>. Podés aprovechar este lapso para reunir la documentación obligatoria detallada a continuación. La postulación se realiza enviando toda la documentación completa en un único archivo PDF a esta casilla de correo.";
}

DEFAULT_TEMPLATES.doctorado_ciencias_economicas_cerrada.blocks = JSON.parse(JSON.stringify(DEFAULT_TEMPLATES.doctorado_ciencias_economicas_abierta.blocks));
const doctoradoAlertBlock = DEFAULT_TEMPLATES.doctorado_ciencias_economicas_cerrada.blocks.find(b => b.type === "alert");
if (doctoradoAlertBlock) {
  doctoradoAlertBlock.data.alertType = "danger";
  doctoradoAlertBlock.data.alertTitle = "Estado de postulaciones";
  doctoradoAlertBlock.data.alertContent = "Actualmente las preinscripciones y postulaciones se encuentran <strong>cerradas</strong>. Podés aprovechar este lapso para reunir la documentación obligatoria detallada a continuación. La postulación se realiza enviando toda la documentación completa en un único archivo PDF a esta casilla de correo.";
}

DEFAULT_TEMPLATES.doctorado_economia_innovacion_cerrada.blocks = JSON.parse(JSON.stringify(DEFAULT_TEMPLATES.doctorado_economia_innovacion_abierta.blocks));
const ecoInnovAlertBlock = DEFAULT_TEMPLATES.doctorado_economia_innovacion_cerrada.blocks.find(b => b.type === "alert");
if (ecoInnovAlertBlock) {
  ecoInnovAlertBlock.data.alertType = "danger";
  ecoInnovAlertBlock.data.alertTitle = "Estado de postulaciones";
  ecoInnovAlertBlock.data.alertContent = "Actualmente las preinscripciones y postulaciones se encuentran <strong>cerradas</strong>. Podés aprovechar este lapso para reunir la documentación obligatoria detallada a continuación. La postulación se realiza enviando toda la documentación completa en un único archivo PDF a esta casilla de correo.";
}



