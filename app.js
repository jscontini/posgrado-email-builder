// Lógica del editor interactivo UNSAM Email Builder
import { BASE_LAYOUT, BLOCK_TEMPLATES, DEFAULT_TEMPLATES } from './templates.js';

// ESTADO GLOBAL DE LA APLICACIÓN
let state = {
  currentTemplateId: 'finanzas_abiertas',
  blocks: [],
  selectedBlockId: null,
  viewMode: 'design', // 'design' | 'preview'
  emailTitle: ''
};

// Referencias a elementos del DOM
const templateBaseSelector = document.getElementById('templateBaseSelector');
const addBlocksContainer = document.getElementById('addBlocksContainer');
const sortableBlocksContainer = document.getElementById('sortableBlocksContainer');
const designCanvasWrapper = document.getElementById('designCanvasWrapper');
const previewCanvasWrapper = document.getElementById('previewCanvasWrapper');
const previewIframe = document.getElementById('previewIframe');
const tabDesign = document.getElementById('tabDesign');
const tabPreview = document.getElementById('tabPreview');
const dynamicBlockForm = document.getElementById('dynamicBlockForm');
const emptyEditorState = document.getElementById('emptyEditorState');
const selectedBlockBadge = document.getElementById('selectedBlockBadge');
const loadIdInput = document.getElementById('loadIdInput');
const loadBtn = document.getElementById('loadBtn');
const btnCopyHtml = document.getElementById('btnCopyHtml');
const btnDownloadHtml = document.getElementById('btnDownloadHtml');
const btnSaveKV = document.getElementById('btnSaveKV');
const saveStatusDetail = document.getElementById('saveStatusDetail');
const toastContainer = document.getElementById('toastContainer');
const historyListContainer = document.getElementById('historyListContainer');
const refreshHistoryBtn = document.getElementById('refreshHistoryBtn');

// Valores por defecto para la creación de nuevos bloques individuales
const BLOCK_DEFAULTS = {
  header: {
    headerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1713991868/headmodificado_n6fnas.jpg",
    headerImageAlt: "Encabezado UNSAM"
  },
  subheader: {
    subHeaderImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1772817421/Sin_t%C3%ADtulo_7_u9qfqt.png",
    subHeaderImageAlt: "Subencabezado"
  },
  intro: {
    saludo: "Estimado/a,",
    introText: "Nos complace ponernos en contacto para compartirte novedades del posgrado..."
  },
  alert: {
    alertType: "success",
    alertTitle: "Novedades Abiertas",
    alertContent: "El período de inscripciones se encuentra habilitado."
  },
  generalInfo: {
    sectionTitle: "Información General y Cursada",
    card1Label: "Duración",
    card1Value: "2 Años",
    card1Text: "Cursada híbrida con presencialidad programada.",
    card2Label: "Sede",
    card2Value: "Edificio Volta (UNSAM)",
    card2Text: "Av. Presidente Roque Sáenz Peña 832, CABA.",
    card3Label: "Esquema Horario",
    card3Bullet1: "Clases virtuales semanales.",
    card3Bullet2: "Clases presenciales mensuales intensivas.",
    card3Footer: "* Los horarios definitivos serán informados oportunamente."
  },
  targetAudience: {
    sectionTitle: "¿A quién está dirigido?",
    introText: "El programa está orientado a los siguientes perfiles:",
    item1Title: "Profesionales de grado:",
    item1Text: "En áreas afines.",
    item2Title: "Gente del sector privado:",
    item2Text: "Que busque herramientas de gestión.",
    item3Title: "Funcionarios públicos:",
    item3Text: "De áreas de planeamiento y tecnología.",
    item4Title: "Investigadores:",
    item4Text: "Ligados al desarrollo y vinculación.",
    item5Title: "Emprendedores:",
    item5Text: "Que impulsen proyectos innovadores."
  },
  about: {
    sectionTitle: "Sobre la Carrera",
    descriptionText: "Este posgrado tiene como objetivo brindar herramientas analíticas y prácticas para potenciar tus competencias profesionales y académicas."
  },
  admission: {
    sectionTitle: "Admisión y Requisitos",
    admissionCondition: "Graduados universitarios con título de grado de 4 años mínimo.",
    requirementsTitle: "Lista de Documentación Obligatoria a Presentar:",
    doc1: "<strong>CV académico y profesional</strong> actualizado.",
    doc2: "<strong>Ficha de preinscripción</strong> de SIU-Guaraní.",
    doc3: "<strong>DNI</strong> escaneado legible.",
    doc4: "<strong>Título de grado</strong> escaneado frente y dorso.",
    doc5: "<strong>Certificado analítico de grado</strong> detallado.",
    doc6: "<strong>Partida de Nacimiento</strong> completa.",
    doc7: "<strong>Acreditación de inglés</strong> o carta declaratoria.",
    doc8: "<strong>Dos cartas de recomendación</strong> académicas y/o profesionales.",
    extraInfoTitle: "Títulos obtenidos en el extranjero:",
    extraInfoText: "Deben contar con Apostilla de La Haya o legalizaciones correspondientes del país emisor."
  },
  curriculum: {
    sectionTitle: "Plan de Estudio y Carga Horaria",
    totalHoursText: "CARGA HORARIA TOTAL DE CURSADA:",
    totalHoursValue: "540 hs",
    totalCreditsValue: "32,40",
    areas: [
      {
        name: "Área Formativa Principal",
        totalLabel: "Total Área Formativa:",
        totalHours: "100 hs",
        totalCredits: "6,00",
        subjects: [
          { name: "Asignatura de Prueba 1", duration: "Cuatrimestral", weekly: "2 hs", total: "40 hs", credits: "2,5" },
          { name: "Asignatura de Prueba 2", duration: "Cuatrimestral", weekly: "3 hs", total: "60 hs", credits: "3,5" }
        ]
      }
    ]
  },
  tuition: {
    sectionTitle: "Aranceles y Medios de Pago",
    residentTitle: "Postulantes Residentes",
    residentCuotas: "20 Cuotas Mensuales",
    residentMonto: "$500.000",
    residentObs: "* Arancel vigente sujeto a modificación.",
    nonResidentTitle: "Extranjeros No Residentes",
    nonResidentCuotas: "20 Cuotas Mensuales",
    nonResidentMonto: "400 USD",
    nonResidentObs: "* Arancel vigente sujeto a modificación.",
    discountText: "<strong>Descuento Comunidad UNSAM:</strong> 50% de beneficio para egresados, docentes y nodocentes.",
    paymentText: "<strong>Medios de Pago:</strong> Cobros electrónicos habilitados por sistema SIRO."
  },
  bannerImage: {
    bannerImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1781018644/mariela_b6smiw.png",
    bannerImageAlt: "Banner Intermedio"
  },
  cta: {
    sectionTitle: "¿Deseás recibir asesoramiento o asistir a charlas?",
    charlaLabel: "Notificaciones de la próxima charla:",
    charlaUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeOFIgYiN4uoG3lNVX-ObqbHlOPtWrGgsz6AgwL90KUc5QftA/viewform",
    charlaBtnText: "INSCRIBIRME AQUÍ",
    whatsappLabel: "Contacto directo por WhatsApp:",
    whatsappUrl: "https://wa.me/541168083537",
    whatsappBtnText: "WHATSAPP INFORMATIVO",
    videoLabel: "Te compartimos la grabación de nuestra última Charla Informativa:",
    videoUrl: "https://example.com/grabacion-charla",
    videoBtnText: "Ver Grabación de la Charla Informativa →"
  },
  closing: {
    closingText: "Quedamos a tu entera disposición ante cualquier consulta.<br><br>Atentamente,"
  },
  signature: {
    signatureImageUrl: "https://res.cloudinary.com/dinnx4lo9/image/upload/v1713991851/signaturefooter_lxydwu.png",
    signatureImageAlt: "Firma UNSAM"
  },
  footer: {
    linkedinUrl: "https://www.linkedin.com/school/unsam/",
    instagramUrl: "https://www.instagram.com/unsamoficial/",
    twitterUrl: "https://twitter.com/unsamoficial",
    webUrl: "https://unsam.edu.ar",
    copyright: "&copy; 2026 Escuela de Economía y Negocios - UNSAM. Todos los derechos reservados."
  }
};

// Generador de UUID corto para instancias de bloques
function generateId() {
  return 'block_' + Math.random().toString(36).substr(2, 9);
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  setupBaseTemplatesSelector();
  setupAddBlockPanel();
  setupSortable();
  setupEventListeners();
  loadTemplate(state.currentTemplateId);
  checkKVStatus();
  loadHistory();
  if (refreshHistoryBtn) {
    refreshHistoryBtn.addEventListener('click', loadHistory);
  }
});

// 1. Cargar el selector de plantillas base en el panel izquierdo
function setupBaseTemplatesSelector() {
  templateBaseSelector.innerHTML = '';
  Object.keys(DEFAULT_TEMPLATES).forEach(key => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = DEFAULT_TEMPLATES[key].name;
    templateBaseSelector.appendChild(option);
  });

  templateBaseSelector.value = state.currentTemplateId;
  templateBaseSelector.addEventListener('change', (e) => {
    if (confirm('¿Estás seguro de cambiar de plantilla base? Perderás los cambios no guardados en el canvas.')) {
      state.currentTemplateId = e.target.value;
      loadTemplate(state.currentTemplateId);
    } else {
      templateBaseSelector.value = state.currentTemplateId;
    }
  });
}

// 2. Cargar botones en el panel de añadir bloques del panel izquierdo
function setupAddBlockPanel() {
  addBlocksContainer.innerHTML = '';
  Object.keys(BLOCK_TEMPLATES).forEach(type => {
    const button = document.createElement('button');
    button.className = "w-full text-left bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 py-3 rounded-lg border border-editorBorder hover:border-slate-500 flex items-center justify-between transition-all group active:scale-[0.98]";
    button.innerHTML = `
      <span class="font-medium">${BLOCK_TEMPLATES[type].name}</span>
      <span class="text-[10px] text-slate-500 font-bold group-hover:text-unsamPink">+ Añadir</span>
    `;
    button.addEventListener('click', () => {
      addBlockToCanvas(type);
    });
    addBlocksContainer.appendChild(button);
  });
}

// 3. Inicializar SortableJS para drag & drop vertical en el Canvas
function setupSortable() {
  Sortable.create(sortableBlocksContainer, {
    animation: 200,
    handle: '.drag-handle',
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    onEnd: (evt) => {
      // Reordenar el arreglo en memoria segun el nuevo orden del DOM
      const domChildren = Array.from(sortableBlocksContainer.children);
      const newBlocksOrder = domChildren.map(child => {
        const id = child.dataset.id;
        return state.blocks.find(b => b.id === id);
      }).filter(Boolean);
      
      state.blocks = newBlocksOrder;
      
      // Si estamos en vista previa, regenerar el iframe
      if (state.viewMode === 'preview') {
        updatePreview();
      }
      
      showToast('Bloques reordenados', 'info');
    }
  });
}

// 4. Configurar escuchadores de eventos para los botones de acción globales y tabs
function setupEventListeners() {
  // Pestañas (Design vs Preview)
  tabDesign.addEventListener('click', () => {
    switchViewMode('design');
  });

  tabPreview.addEventListener('click', () => {
    switchViewMode('preview');
  });

  // Acciones globales
  btnCopyHtml.addEventListener('click', copyCompiledHTML);
  btnDownloadHtml.addEventListener('click', downloadCompiledHTML);
  btnSaveKV.addEventListener('click', saveToCloudflareKV);
  loadBtn.addEventListener('click', loadFromCloudflareKV);
}

// 5. Cargar plantilla base seleccionada en el estado
function loadTemplate(templateId) {
  const baseTpl = DEFAULT_TEMPLATES[templateId];
  if (!baseTpl) return;

  state.emailTitle = baseTpl.emailTitle;
  
  // Clonar en profundidad los bloques por defecto para evitar mutaciones directas
  state.blocks = baseTpl.blocks.map(b => ({
    id: generateId(),
    type: b.type,
    data: JSON.parse(JSON.stringify(b.data))
  }));

  state.selectedBlockId = null;
  renderCanvas();
  renderEditor();
  
  if (state.viewMode === 'preview') {
    updatePreview();
  }
}

// 6. Añadir un nuevo bloque de forma dinámica al final del canvas
function addBlockToCanvas(type) {
  const defaultData = JSON.parse(JSON.stringify(BLOCK_DEFAULTS[type] || {}));
  
  const newBlock = {
    id: generateId(),
    type: type,
    data: defaultData
  };

  state.blocks.push(newBlock);
  renderCanvas();
  
  // Seleccionar y hacer scroll al nuevo bloque
  selectBlock(newBlock.id);
  
  const blockElement = sortableBlocksContainer.querySelector(`[data-id="${newBlock.id}"]`);
  if (blockElement) {
    blockElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  showToast(`Bloque "${BLOCK_TEMPLATES[type].name}" añadido`, 'success');
}

// 7. Renderizar la lista de bloques en el Canvas de Diseño
function renderCanvas() {
  sortableBlocksContainer.innerHTML = '';

  if (state.blocks.length === 0) {
    sortableBlocksContainer.innerHTML = `
      <div class="p-12 text-center text-slate-400 select-none block w-full bg-white">
        <p class="font-medium text-slate-500">El canvas está vacío</p>
        <p class="text-[11px] text-slate-400 mt-1">Hacé clic en los bloques de la izquierda para comenzar a construir el correo.</p>
      </div>
    `;
    return;
  }

  state.blocks.forEach(block => {
    const tplConfig = BLOCK_TEMPLATES[block.type];
    if (!tplConfig) return;

    // Crear wrapper del bloque
    const blockWrapper = document.createElement('tr');
    blockWrapper.className = `canvas-block block w-full ${state.selectedBlockId === block.id ? 'is-selected' : ''}`;
    blockWrapper.dataset.id = block.id;

    // Renderizar el contenido HTML del bloque con sus datos actuales
    let blockContentHtml = '';
    try {
      blockContentHtml = tplConfig.render(block.data);
    } catch (e) {
      blockContentHtml = `<tr><td style="color:red; padding:20px;">Error al renderizar bloque: ${e.message}</td></tr>`;
    }

    // Agregar badges y botones de edición rápidos
    blockWrapper.innerHTML = `
      <td class="block w-full relative">
        <!-- Badge de Tipo de Bloque -->
        <div class="block-badge-type">
          ${tplConfig.name}
        </div>

        <!-- Botones de Acción Flotantes -->
        <div class="block-actions-overlay">
          <!-- Botón de Mover -->
          <button class="block-action-btn drag-handle" title="Reordenar Bloque">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 8h16M4 16h16"></path>
            </svg>
          </button>
          <!-- Botón de Duplicar -->
          <button class="block-action-btn btn-duplicate" title="Duplicar Bloque">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
            </svg>
          </button>
          <!-- Botón de Eliminar -->
          <button class="block-action-btn btn-delete" title="Eliminar Bloque">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>

        <!-- HTML Real del Email en Tablas -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
          <tbody>
            ${blockContentHtml}
          </tbody>
        </table>
      </td>
    `;

    // Asignar eventos interactivos en el bloque
    blockWrapper.addEventListener('click', (e) => {
      // Si el click fue en un botón de acción, no seleccionar el bloque
      if (e.target.closest('.block-actions-overlay')) return;
      selectBlock(block.id);
    });

    // Evento Duplicar
    blockWrapper.querySelector('.btn-duplicate').addEventListener('click', (e) => {
      e.stopPropagation();
      duplicateBlock(block.id);
    });

    // Evento Eliminar
    blockWrapper.querySelector('.btn-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteBlock(block.id);
    });

    sortableBlocksContainer.appendChild(blockWrapper);
  });
}

// 8. Seleccionar un bloque específico y cargar sus campos en el editor derecho
function selectBlock(blockId) {
  state.selectedBlockId = blockId;
  
  // Actualizar clases de seleccion visual en los bloques del DOM
  const blockElements = sortableBlocksContainer.querySelectorAll('.canvas-block');
  blockElements.forEach(el => {
    if (el.dataset.id === blockId) {
      el.classList.add('is-selected');
    } else {
      el.classList.remove('is-selected');
    }
  });

  renderEditor();
}

// 9. Duplicar un bloque
function duplicateBlock(blockId) {
  const blockIndex = state.blocks.findIndex(b => b.id === blockId);
  if (blockIndex === -1) return;

  const originalBlock = state.blocks[blockIndex];
  const duplicatedBlock = {
    id: generateId(),
    type: originalBlock.type,
    data: JSON.parse(JSON.stringify(originalBlock.data))
  };

  state.blocks.splice(blockIndex + 1, 0, duplicatedBlock);
  renderCanvas();
  selectBlock(duplicatedBlock.id);
  
  if (state.viewMode === 'preview') {
    updatePreview();
  }

  showToast('Bloque duplicado', 'success');
}

// 10. Eliminar un bloque
function deleteBlock(blockId) {
  const blockIndex = state.blocks.findIndex(b => b.id === blockId);
  if (blockIndex === -1) return;

  const type = state.blocks[blockIndex].type;
  state.blocks.splice(blockIndex, 1);

  if (state.selectedBlockId === blockId) {
    state.selectedBlockId = null;
  }

  renderCanvas();
  renderEditor();
  
  if (state.viewMode === 'preview') {
    updatePreview();
  }

  showToast(`Bloque "${BLOCK_TEMPLATES[type].name}" eliminado`, 'info');
}

// 11. Renderizar el editor del panel derecho según el bloque seleccionado
function renderEditor() {
  if (!state.selectedBlockId) {
    emptyEditorState.classList.remove('hidden');
    dynamicBlockForm.classList.add('hidden');
    selectedBlockBadge.classList.add('hidden');
    return;
  }

  const block = state.blocks.find(b => b.id === state.selectedBlockId);
  if (!block) return;

  const tplConfig = BLOCK_TEMPLATES[block.type];
  if (!tplConfig) return;

  emptyEditorState.classList.add('hidden');
  dynamicBlockForm.classList.remove('hidden');
  selectedBlockBadge.textContent = tplConfig.name;
  selectedBlockBadge.classList.remove('hidden');

  dynamicBlockForm.innerHTML = '';

  // 11.A Renderizar los inputs comunes definidos en el schema
  Object.keys(tplConfig.schema).forEach(key => {
    const field = tplConfig.schema[key];
    const value = block.data[key] || '';
    const wrapper = document.createElement('div');
    wrapper.className = "space-y-1.5";

    let inputHtml = '';
    if (field.type === 'text') {
      inputHtml = `<input type="text" data-key="${key}" value="${escapeHtml(value)}" class="w-full bg-editorDarkLighter border border-editorBorder hover:border-slate-500 focus:border-unsamPink text-slate-200 text-xs rounded-lg px-3 py-2 outline-none transition-colors">`;
    } else if (field.type === 'textarea') {
      inputHtml = `<textarea data-key="${key}" rows="4" class="w-full bg-editorDarkLighter border border-editorBorder hover:border-slate-500 focus:border-unsamPink text-slate-200 text-xs rounded-lg px-3 py-2 outline-none transition-colors resize-y">${escapeHtml(value)}</textarea>`;
    } else if (field.type === 'select') {
      const optionsHtml = field.options.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt.toUpperCase()}</option>`).join('');
      inputHtml = `<select data-key="${key}" class="w-full bg-editorDarkLighter border border-editorBorder text-slate-200 text-xs rounded-lg px-3 py-2 outline-none cursor-pointer">${optionsHtml}</select>`;
    }

    wrapper.innerHTML = `
      <label class="block text-[11px] font-semibold text-slate-400">${field.label}</label>
      ${inputHtml}
    `;

    // Vincular evento de actualización
    const inputElement = wrapper.querySelector('input, textarea, select');
    inputElement.addEventListener('input', (e) => {
      block.data[key] = e.target.value;
      
      // Si es la cabecera o cambia el title, sincronizar el title
      if (block.type === 'header' && key === 'headerImageAlt') {
        state.emailTitle = e.target.value;
      }
      
      debounceRender();
    });

    dynamicBlockForm.appendChild(wrapper);
  });

  // 11.B Formulario especial para el Plan de Estudios (Tabla interactiva)
  if (block.type === 'curriculum') {
    const tableEditorWrapper = document.createElement('div');
    tableEditorWrapper.className = "mt-5 border-t border-editorBorder pt-4 space-y-4";
    tableEditorWrapper.innerHTML = `
      <h3 class="text-xs font-bold text-slate-300 uppercase tracking-wider">Asignaturas por Áreas</h3>
    `;

    // Por cada área de asignaturas, renderizar su panel de campos editables
    (block.data.areas || []).forEach((area, areaIdx) => {
      const areaPanel = document.createElement('div');
      areaPanel.className = "bg-editorDarkLighter border border-editorBorder rounded-lg p-3 space-y-3";
      
      let subjectsInputsHtml = area.subjects.map((sub, subIdx) => `
        <div class="subject-grid-input gap-1.5" data-area="${areaIdx}" data-sub="${subIdx}">
          <input type="text" value="${escapeHtml(sub.name)}" placeholder="Nombre" data-field="name" class="bg-editorDark border border-editorBorder text-slate-200 text-[10px] p-1.5 rounded outline-none w-full">
          <input type="text" value="${escapeHtml(sub.duration)}" placeholder="Período" data-field="duration" class="bg-editorDark border border-editorBorder text-slate-200 text-[10px] p-1.5 rounded outline-none w-full text-center">
          <input type="text" value="${escapeHtml(sub.weekly)}" placeholder="Semanal" data-field="weekly" class="bg-editorDark border border-editorBorder text-slate-200 text-[10px] p-1.5 rounded outline-none w-full text-center">
          <input type="text" value="${escapeHtml(sub.total)}" placeholder="Total H." data-field="total" class="bg-editorDark border border-editorBorder text-slate-200 text-[10px] p-1.5 rounded outline-none w-full text-center">
          <input type="text" value="${escapeHtml(sub.credits)}" placeholder="Créditos" data-field="credits" class="bg-editorDark border border-editorBorder text-slate-200 text-[10px] p-1.5 rounded outline-none w-full text-center">
        </div>
      `).join('');

      areaPanel.innerHTML = `
        <div class="space-y-1.5">
          <label class="block text-[10px] font-bold text-unsamPink uppercase">Área ${areaIdx + 1}</label>
          <input type="text" value="${escapeHtml(area.name)}" data-area-field="name" placeholder="Título del Área" class="w-full bg-editorDark border border-editorBorder hover:border-slate-500 focus:border-unsamPink text-slate-200 text-xs rounded-lg px-2.5 py-1.5 outline-none font-semibold">
        </div>

        <div class="space-y-2 mt-2">
          <div class="subject-grid-headers">
            <span>Asignatura</span>
            <span class="text-center">Duración</span>
            <span class="text-center">Semanal</span>
            <span class="text-center">Total H</span>
            <span class="text-center">Crédito</span>
          </div>
          <div class="space-y-1.5">
            ${subjectsInputsHtml}
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-editorBorder/50">
          <div>
            <label class="block text-[9px] text-slate-400 font-semibold">Etiqueta Total</label>
            <input type="text" value="${escapeHtml(area.totalLabel)}" data-area-field="totalLabel" class="w-full bg-editorDark border border-editorBorder text-slate-200 text-[10px] p-1 rounded outline-none">
          </div>
          <div>
            <label class="block text-[9px] text-slate-400 font-semibold">Total Horas</label>
            <input type="text" value="${escapeHtml(area.totalHours)}" data-area-field="totalHours" class="w-full bg-editorDark border border-editorBorder text-slate-200 text-[10px] p-1 rounded outline-none text-center">
          </div>
          <div>
            <label class="block text-[9px] text-slate-400 font-semibold">Total Créditos</label>
            <input type="text" value="${escapeHtml(area.totalCredits)}" data-area-field="totalCredits" class="w-full bg-editorDark border border-editorBorder text-slate-200 text-[10px] p-1 rounded outline-none text-center">
          </div>
        </div>
      `;

      // Registrar los eventos para este panel de área
      // 1. Cambios en campos principales del área
      areaPanel.querySelectorAll('[data-area-field]').forEach(input => {
        input.addEventListener('input', (e) => {
          const field = e.target.dataset.areaField;
          block.data.areas[areaIdx][field] = e.target.value;
          debounceRender();
        });
      });

      // 2. Cambios en las celdas de las asignaturas
      areaPanel.querySelectorAll('[data-field]').forEach(input => {
        input.addEventListener('input', (e) => {
          const rowEl = e.target.closest('[data-sub]');
          const subIdx = parseInt(rowEl.dataset.sub);
          const field = e.target.dataset.field;
          block.data.areas[areaIdx].subjects[subIdx][field] = e.target.value;
          debounceRender();
        });
      });

      tableEditorWrapper.appendChild(areaPanel);
    });

    dynamicBlockForm.appendChild(tableEditorWrapper);
  }
}

// 12. Debounce para evitar renderizados excesivos en tiempo real mientras el usuario escribe
let renderTimeout;
function debounceRender() {
  clearTimeout(renderTimeout);
  renderTimeout = setTimeout(() => {
    // Buscar la posicion de scroll actual del Canvas para mantenerla y evitar saltos molestos de pantalla
    const currentScroll = designCanvasWrapper.parentElement.scrollTop;
    
    renderCanvas();
    
    if (state.viewMode === 'preview') {
      updatePreview();
    }
    
    // Restaurar el scroll
    designCanvasWrapper.parentElement.scrollTop = currentScroll;
  }, 100);
}

// 13. Alternar pestañas de visualización (Diseño vs Vista Previa)
function switchViewMode(mode) {
  state.viewMode = mode;
  
  if (mode === 'design') {
    tabDesign.className = "px-4 py-1 text-xs font-medium rounded-md transition-all bg-unsamPurple text-white shadow-sm";
    tabPreview.className = "px-4 py-1 text-xs font-medium rounded-md transition-all text-slate-400 hover:text-slate-200";
    designCanvasWrapper.classList.remove('hidden');
    previewCanvasWrapper.classList.add('hidden');
  } else {
    tabPreview.className = "px-4 py-1 text-xs font-medium rounded-md transition-all bg-unsamPurple text-white shadow-sm";
    tabDesign.className = "px-4 py-1 text-xs font-medium rounded-md transition-all text-slate-400 hover:text-slate-200";
    designCanvasWrapper.classList.add('hidden');
    previewCanvasWrapper.classList.remove('hidden');
    updatePreview();
  }
}

// 14. Compilar y actualizar la Vista Previa (Iframe)
function updatePreview() {
  const finalHtml = compileFinalHTML();
  previewIframe.srcdoc = finalHtml;
}

// 15. Compilar la estructura completa del email
function compileFinalHTML() {
  // Unir los fragmentos HTML de todos los bloques
  const blocksCompiledHtml = state.blocks.map(block => {
    const config = BLOCK_TEMPLATES[block.type];
    if (!config) return '';
    return config.render(block.data);
  }).join('\n');

  // Reemplazar variables globales (como el título del email) en la estructura base
  let headerHtml = BASE_LAYOUT.header.replace('{{emailTitle}}', state.emailTitle || 'Template UNSAM');
  
  return `${headerHtml}\n${blocksCompiledHtml}\n${BASE_LAYOUT.footer}`;
}

// 16. Copiar el HTML compilado al portapapeles
function copyCompiledHTML() {
  const compiledHtml = compileFinalHTML();
  navigator.clipboard.writeText(compiledHtml)
    .then(() => {
      showToast('HTML unificado copiado al portapapeles', 'success');
    })
    .catch(err => {
      console.error(err);
      showToast('Error al copiar el HTML', 'danger');
    });
}

// 17. Descargar el archivo HTML compilado directamente en el cliente
function downloadCompiledHTML() {
  const compiledHtml = compileFinalHTML();
  const blob = new Blob([compiledHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.currentTemplateId}_editado.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Archivo HTML descargado', 'success');
}

// 18. Guardar configuración JSON en Cloudflare KV
async function saveToCloudflareKV() {
  const originalContent = btnSaveKV.innerHTML;
  btnSaveKV.disabled = true;
  btnSaveKV.innerHTML = `
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>Guardando...</span>
  `;

  const payload = {
    templateId: state.currentTemplateId,
    emailTitle: state.emailTitle,
    blocks: state.blocks
  };

  try {
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      loadIdInput.value = result.id;
      showToast(`Guardado con éxito. ID: ${result.id}`, 'success');
      loadHistory();
      
      if (result.kvSaved) {
        saveStatusDetail.textContent = 'Guardado en Cloudflare KV';
        saveStatusDetail.className = 'text-[10px] text-emerald-400';
      } else {
        saveStatusDetail.textContent = 'Guardado en memoria (Fallback Local)';
        saveStatusDetail.className = 'text-[10px] text-amber-400';
      }
    } else {
      throw new Error(result.error || 'Respuesta fallida del servidor');
    }
  } catch (error) {
    console.error('Error al guardar en Cloudflare:', error);
    showToast('Guardado fallido, usando fallback en cliente...', 'warning');
    
    // Fallback: Guardar en localStorage
    const localId = 'local_' + Date.now();
    localStorage.setItem(`template_${localId}`, JSON.stringify(payload));
    loadIdInput.value = localId;
    saveStatusDetail.textContent = 'Guardado local (localStorage)';
    saveStatusDetail.className = 'text-[10px] text-amber-500';
    showToast(`Guardado en localStorage. ID: ${localId}`, 'info');
    loadHistory();
  } finally {
    btnSaveKV.disabled = false;
    btnSaveKV.innerHTML = originalContent;
  }
}

// 19. Cargar configuración JSON por ID desde Cloudflare KV
async function loadFromCloudflareKV() {
  const id = loadIdInput.value.trim();
  if (!id) {
    showToast('Ingresá un ID válido para cargar', 'warning');
    return;
  }

  // Si es un ID local de fallback
  if (id.startsWith('local_')) {
    const localData = localStorage.getItem(`template_${id}`);
    if (localData) {
      const config = JSON.parse(localData);
      state.currentTemplateId = config.templateId || 'finanzas_abiertas';
      templateBaseSelector.value = state.currentTemplateId;
      state.emailTitle = config.emailTitle || '';
      state.blocks = config.blocks || [];
      state.selectedBlockId = null;
      renderCanvas();
      renderEditor();
      showToast('Configuración local cargada con éxito', 'success');
      saveStatusDetail.textContent = 'Trabajando en modo local';
      saveStatusDetail.className = 'text-[10px] text-amber-500';
      return;
    } else {
      showToast('ID local no encontrado', 'danger');
      return;
    }
  }

  const originalText = loadBtn.textContent;
  loadBtn.disabled = true;
  loadBtn.textContent = 'Cargando...';

  try {
    const response = await fetch(`/api/load?id=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const config = await response.json();
    
    if (config.blocks) {
      state.currentTemplateId = config.templateId || 'finanzas_abiertas';
      templateBaseSelector.value = state.currentTemplateId;
      state.emailTitle = config.emailTitle || '';
      state.blocks = config.blocks.map(b => ({
        id: b.id || generateId(),
        type: b.type,
        data: b.data
      }));
      state.selectedBlockId = null;
      renderCanvas();
      renderEditor();
      
      if (state.viewMode === 'preview') {
        updatePreview();
      }
      
      showToast(`Configuración ${id} cargada con éxito`, 'success');
      saveStatusDetail.textContent = 'Cargado desde Cloudflare KV';
      saveStatusDetail.className = 'text-[10px] text-emerald-400';
    } else {
      throw new Error('Formato de datos devuelto incorrecto');
    }
  } catch (error) {
    console.error('Error al cargar de Cloudflare:', error);
    showToast('Error al cargar la plantilla desde la nube', 'danger');
  } finally {
    loadBtn.disabled = false;
    loadBtn.textContent = originalText;
  }
}

// 20. Comprobar si Wrangler/Cloudflare Pages está corriendo en local
async function checkKVStatus() {
  try {
    const res = await fetch('/api/load?id=check_env_status');
    if (res.ok) {
      document.getElementById('statusIndicator').className = 'w-2.5 h-2.5 rounded-full bg-emerald-500';
      saveStatusDetail.textContent = 'Conectado a Cloudflare';
    }
  } catch (e) {
    // Si falla, el backend no está corriendo (el usuario abrió el index.html directamente como archivo local)
    document.getElementById('statusIndicator').className = 'w-2.5 h-2.5 rounded-full bg-amber-500';
    saveStatusDetail.textContent = 'Servidor local desconectado';
  }
}

// 21. Cargar el historial de versiones recientes (Híbrido: Local + Cloud)
async function loadHistory() {
  if (!historyListContainer) return;
  historyListContainer.innerHTML = '<p class="text-[11px] text-slate-500 italic text-center py-2 select-none animate-pulse">Cargando versiones...</p>';

  let cloudHistory = [];
  try {
    const response = await fetch('/api/history');
    if (response.ok) {
      cloudHistory = await response.json();
    }
  } catch (error) {
    console.warn("No se pudo obtener el historial de Cloudflare:", error);
  }

  // Obtener historial local de localStorage
  let localHistory = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('template_local_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        const localId = key.replace('template_', '');
        const timestampMs = parseInt(localId.replace('local_', ''));
        const dateObj = new Date(timestampMs);
        const timestamp = isNaN(dateObj.getTime()) 
          ? "Fecha desconocida" 
          : dateObj.toLocaleString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });
        const templateName = DEFAULT_TEMPLATES[data.templateId]?.name || data.templateId || "Plantilla Local";
        localHistory.push({
          id: localId,
          templateId: data.templateId,
          templateName: templateName + " (Local)",
          timestamp: timestamp,
          sortTime: timestampMs
        });
      } catch (e) {
        console.error("Error al parsear item local del historial:", e);
      }
    }
  }

  // Ordenar local por fecha descendente
  localHistory.sort((a, b) => b.sortTime - a.sortTime);

  // Combinar y limitar a 30 elementos en total
  const combinedHistory = [...localHistory, ...cloudHistory].slice(0, 30);

  historyListContainer.innerHTML = '';

  if (combinedHistory.length === 0) {
    historyListContainer.innerHTML = '<p class="text-[11px] text-slate-500 italic text-center py-2 select-none">No hay versiones recientes.</p>';
    return;
  }

  combinedHistory.forEach(item => {
    // Crear contenedor div
    const itemContainer = document.createElement('div');
    itemContainer.className = "w-full flex items-stretch space-x-1 group/item";

    // Botón principal
    const itemBtn = document.createElement('button');
    itemBtn.className = "flex-1 text-left bg-slate-800/40 hover:bg-slate-700/60 border border-editorBorder hover:border-slate-500/80 rounded p-2 transition-all text-[11px] flex flex-col space-y-0.5 active:scale-[0.98] min-w-0";
    itemBtn.innerHTML = `
      <div class="font-semibold text-slate-200 group-hover/item:text-unsamPink truncate">${item.templateName}</div>
      <div class="flex justify-between items-center text-[9px] text-slate-500">
        <span>${item.timestamp}</span>
        <span class="bg-slate-900 text-slate-400 font-mono px-1.5 py-0.5 rounded border border-editorBorder text-[9px]">${item.id}</span>
      </div>
    `;
    itemBtn.addEventListener('click', () => {
      loadIdInput.value = item.id;
      loadFromCloudflareKV();
    });

    // Botón borrar (tacho de basura)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = "px-2 bg-slate-800/40 hover:bg-red-950 border border-editorBorder hover:border-red-500/50 rounded flex items-center justify-center text-slate-500 hover:text-red-400 transition-all active:scale-[0.95] shrink-0";
    deleteBtn.title = "Eliminar de historial";
    deleteBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
      </svg>
    `;
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteHistoryItem(item.id, item.templateName);
    });

    itemContainer.appendChild(itemBtn);
    itemContainer.appendChild(deleteBtn);
    historyListContainer.appendChild(itemContainer);
  });
}

// 22. Eliminar una versión del historial (Local o Cloudflare KV)
async function deleteHistoryItem(id, name) {
  if (!confirm(`¿Estás seguro de que deseas eliminar la versión "${name}" (ID: ${id})?`)) {
    return;
  }

  if (id.startsWith('local_')) {
    // Eliminar de localStorage
    localStorage.removeItem(`template_${id}`);
    showToast('Versión local eliminada', 'success');
    loadHistory();
    return;
  }

  // Eliminar de Cloudflare KV
  try {
    const response = await fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.success) {
      showToast(`Versión ${id} eliminada con éxito`, 'success');
      loadHistory();
    } else {
      throw new Error(result.error || 'Respuesta fallida del servidor');
    }
  } catch (error) {
    console.error('Error al eliminar de Cloudflare:', error);
    showToast('No se pudo eliminar la versión de la nube', 'danger');
  }
}

// FUNCIONES AUXILIARES
function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast-animate flex items-center w-full max-w-xs p-4 text-slate-100 rounded-lg shadow pointer-events-auto border transition-all ${
    type === 'success' ? 'bg-emerald-950 border-emerald-500' :
    type === 'danger' ? 'bg-red-950 border-red-500' :
    type === 'warning' ? 'bg-amber-950 border-amber-500' :
    'bg-slate-900 border-slate-700'
  }`;

  const iconColor = type === 'success' ? 'text-emerald-400' : type === 'danger' ? 'text-red-400' : 'text-slate-400';

  toast.innerHTML = `
    <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${iconColor}">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <div class="ml-3 text-xs font-semibold">${message}</div>
  `;

  toastContainer.appendChild(toast);

  // Eliminar el toast después de 4 segundos
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 4000);
}
