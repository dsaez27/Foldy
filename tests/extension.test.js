import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { $, $$, click, loadExtension, sleep } from './helpers/load-extension.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const bundle = join(root, 'extension', 'content.js');

const STORAGE_KEYS = {
  gemini: 'gcm_folders_data_v2',
  chatgpt: 'gcm_chatgpt_folders_data_v1',
  claude: 'gcm_claude_folders_data_v1',
  deepseek: 'gcm_deepseek_folders_data_v1',
  opencode: 'gcm_opencode_folders_data_v1'
};

for (const platform of ['gemini', 'chatgpt', 'claude', 'deepseek', 'opencode']) {
  test(`${platform}: inyecta panel, barra y checkboxes`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1100);
    assert.ok($(w, '#gcm-folders-box'), 'panel de carpetas');
    assert.ok($(w, '#gcm-toolbar'), 'barra superior');
    assert.ok($(w, '#gcm-folders-box svg.gcm-svg-logo'), 'logo SVG en el encabezado del panel');
    assert.ok($$(w, '#gcm-toolbar svg.gcm-svg-icon').length >= 4, 'iconos SVG en la barra superior');
    assert.ok($$(w, '#gcm-folders-box .gcm-panel-footer svg.gcm-svg-icon').length === 2, 'iconos SVG en los 2 botones del pie del panel');
    assert.equal($$(w, '.gcm-checkbox:not(#gcm-select-all)').length, platform === 'gemini' ? 4 : 3);
    w.close();
  });

  test(`${platform}: auto-clasifica por palabras clave y filtra por carpeta`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1100);
    const data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS[platform]));
    assert.equal(data.assignments.aaaaa11111, 'f_work');
    click(w, $$(w, '.gcm-folder-pill')[1]); // primera carpeta (Programación / Coding)
    await sleep(250);
    const hidden = $$(w, '.gcm-hidden-by-filter');
    assert.ok(hidden.length >= 1, 'oculta lo que no es de la carpeta');
    w.close();
  });

  test(`${platform}: la barra superior se contrae, cambia entre horizontal/vertical y recuerda su estado`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1100);
    click(w, $(w, '#gcm-toolbar-orient'));
    assert.ok($(w, '#gcm-toolbar').classList.contains('gcm-vertical'), 'modo vertical activado');
    let data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS[platform]));
    assert.equal(data.view.toolbarVertical, true);

    click(w, $(w, '#gcm-toolbar-toggle'));
    assert.ok($(w, '#gcm-toolbar').classList.contains('gcm-collapsed'));
    data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS[platform]));
    assert.equal(data.view.toolbarCollapsed, true);
    w.close();
  });
}

test('proteger conversaciones seleccionadas las marca con candado', async () => {
  const w = loadExtension(bundle, 'gemini');
  await sleep(1100);
  const first = $$(w, '.gcm-checkbox:not(#gcm-select-all)')[0];
  click(w, first);
  await sleep(100);
  click(w, $(w, '#gcm-protect-btn'));
  await sleep(250);
  assert.equal($$(w, '.gcm-lock-icon').length, 1);
  w.close();
});

test('bóveda de prompts abre el modal e inserta prompt en el chat activo', async () => {
  const w = loadExtension(bundle, 'gemini');
  await sleep(1100);
  const promptsBtn = $(w, '#gcm-prompts-btn');
  assert.ok(promptsBtn, 'botón de prompts existe');
  click(w, promptsBtn);
  await sleep(100);
  const items = $$(w, '.gcm-prompt-item');
  assert.equal(items.length, 3);
  click(w, items[0]);
  await sleep(100);
  const textarea = $(w, '#chat-input');
  assert.ok(textarea.value.includes('Ingeniero de Software Senior'));
  w.close();
});

test('S-11 / S-12: insertPromptIntoChat inserta párrafos <p> en editor contenteditable ProseMirror y los modales cierran con Escape', async () => {
  const richHtml = `<body><nav aria-label="Sidebar"><ul>
    <li><a href="/chat/aaaaa11111"><span>Python API error</span></a></li>
  </ul></nav><main><div class="ProseMirror" contenteditable="true"><p>Texto previo</p></div></main></body>`;
  const w = loadExtension(bundle, 'claude', { html: richHtml });
  await sleep(1100);

  // Abrir y cerrar modal de Prompts con Escape (S-12)
  click(w, $(w, '#gcm-prompts-btn'));
  await sleep(80);
  assert.ok($(w, '#gcm-modal-overlay'), 'modal de prompts abierto');
  assert.equal($(w, '#gcm-modal-overlay .gcm-modal-card').getAttribute('role'), 'dialog');
  w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await sleep(80);
  assert.equal($(w, '#gcm-modal-overlay'), null, 'modal cerrado con tecla Escape');

  // Reabrir e insertar prompt en editor ProseMirror contenteditable="true" (S-11)
  click(w, $(w, '#gcm-prompts-btn'));
  await sleep(80);
  click(w, $$(w, '.gcm-prompt-item')[0]);
  await sleep(100);
  const editor = $(w, '.ProseMirror');
  const paragraphs = Array.from(editor.querySelectorAll('p'));
  assert.ok(paragraphs.length >= 2, 'creó nodos <p> dentro del editor ProseMirror');
  assert.equal(paragraphs[0].textContent, 'Texto previo');
  assert.ok(editor.textContent.includes('Ingeniero de Software Senior'));
  w.close();
});

test('L-09 / L-10: selección por rango Shift+Clic y toggleSelectAll(false) limpia selectedMap incluso con chats ocultos por filtro', async () => {
  const w = loadExtension(bundle, 'gemini');
  await sleep(1100);

  const cbs = $$(w, '.gcm-checkbox:not(#gcm-select-all)');
  assert.equal(cbs.length, 4);

  // L-10: clic en el primero y Shift+Clic en el tercero selecciona del 0 al 2
  click(w, cbs[0]);
  await sleep(50);
  click(w, cbs[2], { shiftKey: true });
  await sleep(80);
  assert.equal($$(w, '.gcm-checkbox.gcm-checked:not(#gcm-select-all)').length, 3, 'Shift+Clic seleccionó el rango de 3 conversaciones');

  // Filtrar por la primera carpeta (oculta conversaciones que no pertenecen a ella)
  click(w, $$(w, '.gcm-folder-pill')[1]);
  await sleep(150);
  assert.ok($$(w, '.gcm-hidden-by-filter').length >= 2, 'hay conversaciones seleccionadas que ahora están ocultas por el filtro');

  // L-09: Desmarcar #gcm-select-all debe limpiar TODAS las selecciones en selectedMap, incluyendo las ocultas
  const selectAll = $(w, '#gcm-select-all');
  selectAll.checked = false;
  selectAll.dispatchEvent(new w.Event('change', { bubbles: true }));
  await sleep(100);

  // Volver a la vista "Todos" y comprobar que ninguna conversación quedó marcada
  click(w, $$(w, '.gcm-folder-pill')[0]);
  await sleep(150);
  assert.equal($$(w, '.gcm-checkbox.gcm-checked:not(#gcm-select-all)').length, 0, 'ningún chat oculto quedó seleccionado en selectedMap');
  assert.equal($(w, '#gcm-delete-btn').disabled, true, 'botón borrar deshabilitado al tener 0 seleccionados');
  w.close();
});

test('S-04: quitar un chat de carpeta manualmente no lo re-clasifica por eco de chrome.storage.onChanged', async () => {
  const w = loadExtension(bundle, 'gemini');
  try {
    await sleep(1100);

    // aaaaa11111 fue auto-clasificado en f_work por la palabra clave "Python"
    let data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS.gemini));
    assert.equal(data.assignments.aaaaa11111, 'f_work');

    // Seleccionar aaaaa11111 y quitarlo de la carpeta desde el popover
    const firstCb = $(w, '.gcm-checkbox[data-conv-id="aaaaa11111"]');
    click(w, firstCb);
    await sleep(80);
    click(w, $(w, '#gcm-folder-btn'));
    await sleep(80);
    const popItems = $$(w, '#gcm-folder-popover .gcm-popover-item');
    const removeBtn = popItems[popItems.length - 2]; // botón "Quitar de carpeta"
    click(w, removeBtn);
    await sleep(200);

    data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS.gemini));
    assert.equal(data.assignments.aaaaa11111, undefined, 'el chat permanece sin carpeta y no fue re-clasificado por el eco de onChanged');
  } finally {
    w.close();
  }
});

test('S-06 / S-15: importación directa de backup JSON vía IMPORT_BACKUP y exportación a Markdown', async () => {
  const w = loadExtension(bundle, 'chatgpt');
  try {
    await sleep(1100);

    let capturedMarkdown = '';
    const OrigBlob = w.Blob;
    w.Blob = class extends OrigBlob {
      constructor(parts, options) {
        super(parts, options);
        if (options?.type?.includes('text/markdown')) {
          capturedMarkdown = Array.isArray(parts) ? parts.join('') : String(parts);
        }
      }
    };

    // S-06: enviar mensaje IMPORT_BACKUP con rawJson desde el popup simulado
    const backupPayload = JSON.stringify({
      lang: 'es',
      folders: [{ id: 'f_custom', name: 'Arquitectura', color: '#a142f4', keywords: ['arquitectura'] }],
      prompts: [{ id: 'p_custom', title: 'Revisión', content: 'Revisa este diseño' }],
      assignments: { aaaaa11111: 'f_custom' },
      protectedIds: { aaaaa11111: true }
    });
    w.chrome.__mock.sendRuntimeMessage({ action: 'IMPORT_BACKUP', rawJson: backupPayload });
    await sleep(250);

    const stored = JSON.parse(w.localStorage.getItem(STORAGE_KEYS.chatgpt));
    assert.equal(stored.folders.length, 1);
    assert.equal(stored.folders[0].name, 'Arquitectura');
    assert.equal(stored.assignments.aaaaa11111, 'f_custom');
    assert.equal(stored.protectedIds.aaaaa11111, true);

    // S-15: seleccionar un chat y exportar a Markdown
    click(w, $(w, '.gcm-checkbox[data-conv-id="aaaaa11111"]'));
    await sleep(80);
    click(w, $(w, '#gcm-export-btn'));
    await sleep(150);

    assert.ok(capturedMarkdown.length > 0, 'se generó contenido Markdown');
    assert.ok(capturedMarkdown.includes('Fix javascript bug'), 'incluye el título de la conversación seleccionada en el índice');
    assert.ok(capturedMarkdown.includes('Arquitectura'), 'incluye el nombre de la carpeta asignada');
    assert.ok(capturedMarkdown.includes('hola') && capturedMarkdown.includes('mundo'), 'incluye los mensajes de la conversación activa');
  } finally {
    w.close();
  }
});

test('V-01: sincroniza automáticamente data-gcm-theme en documentElement según el tema del host', async () => {
  const lightHtml = `<body class="light"><nav><conversations-list>
    <div data-test-id="conversation"><a href="/app/aaaaa11111"><span class="conversation-title">Chat en modo claro</span></a></div>
  </conversations-list></nav><main><textarea id="chat-input"></textarea></main></body>`;
  const w = loadExtension(bundle, 'gemini', { html: lightHtml });
  await sleep(1100);
  assert.equal(w.document.documentElement.getAttribute('data-gcm-theme'), 'light');
  w.close();
});

test('atajo de teclado Alt+Shift+F minimiza y expande el panel', async () => {
  const w = loadExtension(bundle, 'gemini');
  await sleep(1100);
  const box = $(w, '#gcm-folders-box');
  assert.equal(box.classList.contains('gcm-minimized'), false);
  w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'F', altKey: true, shiftKey: true, bubbles: true }));
  await sleep(100);
  assert.equal(box.classList.contains('gcm-minimized'), true);
  w.close();
});

test('datos guardados corruptos no rompen la carga', async () => {
  const w = loadExtension(bundle, 'gemini', { storage: { gcm_folders_data_v2: '{"folders":"no-es-array","assignments":[1,2]}' } });
  await sleep(1100);
  assert.ok($(w, '#gcm-folders-box'));
  w.close();
});

test('chatgpt: detecta y borra tareas remotas (/codex/tasks/task_...) via API', async () => {
  const w = loadExtension(bundle, 'chatgpt');
  const calledUrls = [];
  w.fetch = async (url) => {
    calledUrls.push(url);
    if (url === '/api/auth/session') {
      return { ok: true, status: 200, json: async () => ({ accessToken: 'tok_test_123' }) };
    }
    if (url.startsWith('/backend-api/wham/tasks/')) {
      return { ok: true, status: 200 };
    }
    return { ok: false, status: 404 };
  };
  await sleep(1100);
  const taskCb = $(w, '.gcm-checkbox[data-conv-id="task_e_ccccc33333"]');
  assert.ok(taskCb, 'checkbox inyectado en la tarea remota');
  click(w, taskCb);
  await sleep(100);
  click(w, $(w, '#gcm-delete-btn'));
  await sleep(150);
  const confirmBtn = $(w, '#gcm-modal-overlay .gcm-btn-danger');
  assert.ok(confirmBtn, 'modal de confirmación abierto');
  click(w, confirmBtn);
  await sleep(600);
  assert.ok(calledUrls.includes('/backend-api/wham/tasks/task_e_ccccc33333'), 'llamó al endpoint de borrado de tareas remotas');
  assert.equal($(w, 'a[href*="/codex/tasks/task_e_ccccc33333"]'), null, 'fila eliminada del DOM');
  w.close();
});

test('chatgpt: si DELETE de tarea remota devuelve 403, usa fallback POST /archive y elimina la fila', async () => {
  const w = loadExtension(bundle, 'chatgpt');
  const calledUrls = [];
  w.fetch = async (url, init) => {
    calledUrls.push(`${init?.method || 'GET'} ${url}`);
    if (url === '/api/auth/session') {
      return { ok: true, status: 200, json: async () => ({ accessToken: 'tok_test_123' }) };
    }
    if (url === '/backend-api/wham/tasks/task_e_ccccc33333' && init?.method === 'DELETE') {
      return { ok: false, status: 403 };
    }
    if (url === '/backend-api/wham/tasks/task_e_ccccc33333/archive' && init?.method === 'POST') {
      return { ok: true, status: 200 };
    }
    return { ok: false, status: 404 };
  };
  await sleep(1100);
  const taskCb = $(w, '.gcm-checkbox[data-conv-id="task_e_ccccc33333"]');
  click(w, taskCb);
  await sleep(100);
  click(w, $(w, '#gcm-delete-btn'));
  await sleep(150);
  click(w, $(w, '#gcm-modal-overlay .gcm-btn-danger'));
  await sleep(600);
  assert.ok(calledUrls.includes('POST /backend-api/wham/tasks/task_e_ccccc33333/archive'), 'usó fallback /archive tras 403 en DELETE');
  assert.equal($(w, 'a[href*="/codex/tasks/task_e_ccccc33333"]'), null, 'fila eliminada del DOM');
  w.close();
});

test('chatgpt: detecta tareas en la nube con ícono SVG a la derecha sin href y las borra resolviendo ID por título', async () => {
  const w = loadExtension(bundle, 'chatgpt');
  const calledUrls = [];
  w.fetch = async (url, init) => {
    calledUrls.push(`${init?.method || 'GET'} ${url}`);
    if (url === '/api/auth/session') {
      return { ok: true, status: 200, json: async () => ({ accessToken: 'tok_test_123' }) };
    }
    if (url === '/backend-api/wham/tasks' && (!init?.method || init.method === 'GET')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          items: [{ id: 'task_e_68731280c5748321949876161175f394', title: 'Crear nuevo tema con colores diferentes' }]
        })
      };
    }
    if (url === '/backend-api/wham/tasks/task_e_68731280c5748321949876161175f394' && init?.method === 'DELETE') {
      return { ok: true, status: 200 };
    }
    return { ok: false, status: 404 };
  };
  await sleep(1100);

  // Insertar una fila de tarea en la nube de Codex sin atributo href (solo texto + ícono de nube SVG a la derecha)
  const nav = $(w, 'nav');
  const cloudRow = w.document.createElement('div');
  cloudRow.className = 'group __menu-item';
  cloudRow.innerHTML =
    '<div class="truncate"><span dir="auto">Crear nuevo tema con colores diferentes</span></div><svg viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>';
  nav.appendChild(cloudRow);

  await sleep(750);
  const cloudCb = cloudRow.querySelector('.gcm-checkbox');
  assert.ok(cloudCb, 'checkbox inyectado en fila de tarea en la nube sin href');

  click(w, cloudCb);
  await sleep(100);
  click(w, $(w, '#gcm-delete-btn'));
  await sleep(150);
  click(w, $(w, '#gcm-modal-overlay .gcm-btn-danger'));
  await sleep(650);

  assert.ok(
    calledUrls.includes('DELETE /backend-api/wham/tasks/task_e_68731280c5748321949876161175f394'),
    'resolvió el ID real por título y llamó a DELETE /backend-api/wham/tasks/{id}'
  );
  assert.equal(cloudRow.isConnected, false, 'fila de nube eliminada del DOM');
  w.close();
});

test('al marcar Todo (#gcm-select-all), carga automáticamente el historial hacia abajo y marca los chats nuevos que van apareciendo', async () => {
  const w = loadExtension(bundle, 'chatgpt');
  await sleep(1100);

  const selectAll = $(w, '#gcm-select-all');
  selectAll.checked = true;
  selectAll.dispatchEvent(new w.Event('change', { bubbles: true }));
  await sleep(150);

  assert.equal($$(w, '.gcm-checkbox.gcm-checked:not(#gcm-select-all)').length, 3, 'marca los 3 chats iniciales');
  assert.ok($(w, '#gcm-autoscroll-btn').classList.contains('active'), 'activa la carga automática del historial hacia abajo');

  // Simular que al hacer scroll hacia abajo aparecen 2 conversaciones nuevas en la barra lateral
  const nav = $(w, 'nav');
  const newChat1 = w.document.createElement('a');
  newChat1.href = '/c/ddddd44444';
  newChat1.textContent = 'Chat antiguo cargado 1';
  const newChat2 = w.document.createElement('a');
  newChat2.href = '/c/eeeee55555';
  newChat2.textContent = 'Chat antiguo cargado 2';
  nav.appendChild(newChat1);
  nav.appendChild(newChat2);

  await sleep(1500);
  assert.equal($$(w, '.gcm-checkbox.gcm-checked:not(#gcm-select-all)').length, 5, 'los chats nuevos se marcan automáticamente a medida que cargan');
  assert.equal(selectAll.checked, true, 'el checkbox Todo permanece marcado');

  // Al desmarcar Todo, detiene el auto-scroll y desmarca todos
  selectAll.checked = false;
  selectAll.dispatchEvent(new w.Event('change', { bubbles: true }));
  await sleep(150);
  assert.equal($$(w, '.gcm-checkbox.gcm-checked:not(#gcm-select-all)').length, 0);
  w.close();
});

test('búsqueda global instantánea (#gcm-search-input) filtra chats en tiempo real y limpia con Escape', async () => {
  const w = loadExtension(bundle, 'gemini');
  try {
    await sleep(1100);
    const searchWrap = $(w, '#gcm-folders-box .gcm-search-wrap');
    const searchInput = $(w, '#gcm-search-input');
    assert.ok(searchWrap, 'existe contenedor .gcm-search-wrap');
    assert.ok(searchInput, 'existe #gcm-search-input');

    searchInput.value = 'empanadas';
    searchInput.dispatchEvent(new w.Event('input', { bubbles: true }));

    // Sin debounce: el filtrado debe aplicarse de inmediato
    assert.equal($$(w, '.gcm-chat-row.gcm-hidden-by-filter').length, 3, 'oculta los 3 chats que no coinciden');

    searchInput.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert.equal(searchInput.value, '', 'Escape limpia el buscador');
    assert.equal($$(w, '.gcm-chat-row.gcm-hidden-by-filter').length, 0, 'vuelven a mostrarse los 4 chats');
  } finally {
    w.close();
  }
});

test('drag & drop asigna un chat a una carpeta y el toast Undo (5s) revierte la asignación', async () => {
  const w = loadExtension(bundle, 'gemini');
  try {
    await sleep(1100);

    const row = $(w, '.gcm-chat-row[data-gcm-conv-id="ccccc33333"]');
    const targetPill = $(w, '.gcm-folder-pill.gcm-drop-target[data-folder-id="f_work"]');
    assert.ok(row && row.draggable === true, 'la fila de chat es draggable');
    assert.ok(targetPill, 'la píldora de carpeta es drop target');

    let data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS.gemini));
    assert.equal(data.assignments.ccccc33333, undefined, 'el chat comienza sin carpeta');

    const dtStore = {};
    const dataTransfer = {
      effectAllowed: '',
      dropEffect: '',
      setData(k, v) { dtStore[k] = v; },
      getData(k) { return dtStore[k] || ''; }
    };

    const dragStart = new w.Event('dragstart', { bubbles: true, cancelable: true });
    Object.defineProperty(dragStart, 'dataTransfer', { value: dataTransfer });
    row.dispatchEvent(dragStart);
    assert.ok(row.classList.contains('gcm-dragging'), 'aplica .gcm-dragging al iniciar el arrastre');

    const dragOver = new w.Event('dragover', { bubbles: true, cancelable: true });
    Object.defineProperty(dragOver, 'dataTransfer', { value: dataTransfer });
    targetPill.dispatchEvent(dragOver);
    assert.ok(targetPill.classList.contains('gcm-drop-active'), 'aplica .gcm-drop-active sobre la píldora');

    const dropEvt = new w.Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(dropEvt, 'dataTransfer', { value: dataTransfer });
    targetPill.dispatchEvent(dropEvt);
    assert.equal(targetPill.classList.contains('gcm-drop-active'), false, 'quita .gcm-drop-active al soltar');

    row.dispatchEvent(new w.Event('dragend', { bubbles: true }));
    assert.equal(row.classList.contains('gcm-dragging'), false, 'quita .gcm-dragging al finalizar');

    data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS.gemini));
    assert.equal(data.assignments.ccccc33333, 'f_work', 'asigna el chat a la carpeta destino');

    const undoToast = $(w, '.gcm-toast-undo');
    const undoProgress = $(w, '.gcm-toast-undo .gcm-toast-progress');
    const undoBtn = $(w, '.gcm-toast-undo .gcm-toast-undo-btn');
    assert.ok(undoToast && undoProgress && undoBtn, 'muestra toast Undo con barra de progreso');

    click(w, undoBtn);
    await sleep(50);
    assert.equal($(w, '.gcm-toast-undo'), null, 'cierra el toast Undo al hacer clic');

    data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS.gemini));
    assert.equal(data.assignments.ccccc33333, undefined, 'revierte la asignación tras pulsar Deshacer');
  } finally {
    w.close();
  }
});

test('bóveda de prompts abre modal de variables {{var}} y sustituye valores antes de insertar', async () => {
  const initialData = JSON.stringify({
    lang: 'es',
    folders: [{ id: 'f_work', name: 'Programación', color: '#4285f4', keywords: ['python'] }],
    prompts: [{ id: 'p_var', title: 'Explicar tema', content: 'Explica {{tema}} para nivel {{nivel}}.' }],
    assignments: {},
    protectedIds: {}
  });
  const w = loadExtension(bundle, 'gemini', { storage: { [STORAGE_KEYS.gemini]: initialData } });
  try {
    await sleep(1100);
    click(w, $(w, '#gcm-prompts-btn'));
    await sleep(80);
    click(w, $(w, '.gcm-prompt-item'));
    await sleep(80);

    const varModal = $(w, '.gcm-modal-card.gcm-var-modal');
    assert.ok(varModal, 'abre el modal de variables .gcm-var-modal');
    const inputs = $$(w, '.gcm-var-modal .gcm-var-input');
    assert.equal(inputs.length, 2, 'crea un campo por cada variable única');

    inputs[0].value = 'TypeScript';
    inputs[1].value = 'avanzado';
    inputs[1].dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await sleep(80);

    assert.equal($(w, '.gcm-modal-card.gcm-var-modal'), null, 'cierra el modal al enviar con Enter');
    assert.equal($(w, '#chat-input').value, 'Explica TypeScript para nivel avanzado.');
  } finally {
    w.close();
  }
});

test('SET_THEME_PRESET actualiza data-gcm-style en vivo para los 5 presets y aplica fallback adaptive', async () => {
  const w = loadExtension(bundle, 'gemini');
  try {
    await sleep(1100);
    assert.equal(w.document.documentElement.getAttribute('data-gcm-style'), 'adaptive');

    for (const preset of ['neo-brutal', 'terminal', 'minimal-flat', 'neon-synth', 'adaptive']) {
      w.chrome.__mock.sendRuntimeMessage({ type: 'SET_THEME_PRESET', preset });
      await sleep(30);
      assert.equal(w.document.documentElement.getAttribute('data-gcm-style'), preset);
      assert.equal(w.localStorage.getItem('gcm_ui_theme_preset'), preset);
    }

    w.chrome.__mock.sendRuntimeMessage({ type: 'SET_THEME_PRESET', preset: 'unknown-style' });
    await sleep(30);
    assert.equal(w.document.documentElement.getAttribute('data-gcm-style'), 'adaptive');
  } finally {
    w.close();
  }
});

test('gcm_shared_config_v1 sincroniza carpetas/prompts/tema entre plataformas sin sobrescribir asignaciones locales', async () => {
  const localChatGpt = JSON.stringify({
    lang: 'es',
    folders: [{ id: 'f_work', name: 'Coding', color: '#4285f4', keywords: ['javascript'] }],
    prompts: [{ id: 'p_local', title: 'Local', content: 'Local prompt' }],
    assignments: { aaaaa11111: 'f_work' },
    protectedIds: { bbbbb22222: true }
  });
  const sharedConfig = {
    folders: [{ id: 'f_shared', name: 'Shared Cross-Platform', color: '#34a853', keywords: ['shared'] }],
    prompts: [{ id: 'p_shared', title: 'Shared Prompt', content: 'Shared content' }],
    lang: 'en',
    themePreset: 'terminal',
    updatedAt: 1700000000000
  };

  const w = loadExtension(bundle, 'chatgpt', {
    storage: { [STORAGE_KEYS.chatgpt]: localChatGpt },
    initialSync: { gcm_shared_config_v1: sharedConfig }
  });
  try {
    await sleep(1100);
    assert.equal(w.document.documentElement.getAttribute('data-gcm-style'), 'terminal');

    const stored = JSON.parse(w.localStorage.getItem(STORAGE_KEYS.chatgpt));
    assert.equal(stored.folders.some((f) => f.id === 'f_shared'), true, 'incorpora carpeta compartida');
    assert.equal(stored.prompts.some((p) => p.id === 'p_shared'), true, 'incorpora prompt compartido');
    assert.equal(stored.assignments.aaaaa11111, 'f_work', 'conserva assignments de la plataforma');
    assert.equal(stored.protectedIds.bbbbb22222, true, 'conserva protectedIds de la plataforma');
  } finally {
    w.close();
  }
});
