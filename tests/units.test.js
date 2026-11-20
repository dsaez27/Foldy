import assert from 'node:assert/strict';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';
import { createChromeMock } from './helpers/chrome-storage-mock.js';

// Los módulos leen `location`/`localStorage` al cargarse: se simula un entorno mínimo antes de importarlos.
const dom = new JSDOM('<!doctype html><html lang="es"><body></body></html>', { url: 'https://gemini.google.com/app/test' });
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  location: dom.window.location,
  localStorage: dom.window.localStorage,
  Element: dom.window.Element,
  NodeFilter: dom.window.NodeFilter,
  Event: dom.window.Event,
  InputEvent: dom.window.InputEvent || dom.window.Event,
  CustomEvent: dom.window.CustomEvent,
  KeyboardEvent: dom.window.KeyboardEvent,
  MouseEvent: dom.window.MouseEvent,
  MutationObserver: dom.window.MutationObserver || class {
    observe() {}
    disconnect() {}
    takeRecords() { return []; }
  },
  PointerEvent: dom.window.PointerEvent || dom.window.MouseEvent
});
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });

const { SHARED_CONFIG_KEY, normalizeStoredState, saveFolderData, initCloudSync } = await import('../src/storage.js');
const { decodeSyncCode, encodeSyncCode, sanitizeMap } = await import('../src/backup.js');
const { GIST_FILENAME, GIST_STORAGE_KEY, syncWithGist } = await import('../src/gist-sync.js');
const {
  THEME_PRESETS,
  THEME_STORAGE_KEY,
  applyThemePreset,
  detectHostTheme,
  detectPlatform,
  normalizeThemePreset,
  syncHostTheme
} = await import('../src/platform.js');
const { parseConvId } = await import('../src/sidebar.js');
const { resolveChatGptIdByTitle } = await import('../src/deletion.js');
const { extractPromptVariables, substitutePromptVariables } = await import('../src/prompts.js');
const { saveView, state } = await import('../src/state.js');

test('normalizeStoredState descarta datos corruptos y aplica valores por defecto', () => {
  const s = normalizeStoredState({ lang: 'fr', folders: [{ id: 1 }, { id: 'a', name: 'X', keywords: ['A', 3] }], assignments: [], pos: { left: 'x' } }, 'es');
  assert.equal(s.lang, 'es');
  assert.deepEqual(s.folders, [{ id: 'a', name: 'X', color: '#4285f4', keywords: ['a'] }]);
  assert.equal(Array.isArray(s.prompts), true);
  assert.equal(s.prompts.length, 3);
  assert.deepEqual(s.assignments, {});
  assert.equal(s.pos, null);
  assert.equal(s.toolbarPos, null);
  assert.deepEqual(s.view, { filter: 'ALL', sort: 'DEFAULT', toolbarCollapsed: false, toolbarVertical: false });
});

test('normalizeStoredState conserva una vista válida', () => {
  const s = normalizeStoredState({ toolbarPos: { left: 120, top: 24 }, view: { filter: 'PROTECTED', sort: 'AZ', toolbarCollapsed: true, toolbarVertical: true } }, 'en');
  assert.deepEqual(s.toolbarPos, { left: 120, top: 24 });
  assert.deepEqual(s.view, { filter: 'PROTECTED', sort: 'AZ', toolbarCollapsed: true, toolbarVertical: true });
});

test('sanitizeMap bloquea claves peligrosas, arrays y valores inválidos', () => {
  const src = JSON.parse('{"__proto__": "x", "constructor": "y", "ok": "f1", "bad": 5}');
  const out = sanitizeMap(src, (v) => (typeof v === 'string' ? v : undefined));
  assert.deepEqual(Object.keys(out), ['ok']);
  assert.deepEqual(sanitizeMap([1, 2], (v) => v), {});
  assert.deepEqual(sanitizeMap(null, (v) => v), {});
});

test('S-05: normalizeStoredState bloquea __proto__/constructor en assignments y protectedIds y normaliza colores hex inválidos', () => {
  const raw = JSON.parse(
    '{"folders":[{"id":"f1","name":"Valid","color":"#34a853"},{"id":"f2","name":"BadColor","color":"javascript:alert(1)"},{"id":"f3","name":"ShortHex","color":"#fff"}],' +
      '"assignments":{"__proto__":"f1","constructor":"f1","prototype":"f1","c1":"f1","c2":""},' +
      '"protectedIds":{"__proto__":true,"constructor":true,"c1":true,"c2":false}}'
  );
  const s = normalizeStoredState(raw, 'es');
  assert.equal(s.folders[0].color, '#34a853');
  assert.equal(s.folders[1].color, '#4285f4');
  assert.equal(s.folders[2].color, '#4285f4');
  assert.deepEqual(Object.keys(s.assignments), ['c1']);
  assert.deepEqual(Object.keys(s.protectedIds), ['c1']);
  assert.equal(({}).c1, undefined);
});

test('S-01 / S-02: saveFolderData respeta QUOTA_BYTES_PER_ITEM (8 KB) con cientos de asignaciones y saveView() no escribe en sync', () => {
  const chromeMock = createChromeMock({ quotaBytesPerItem: 8192 });
  globalThis.chrome = chromeMock;

  const assignments = {};
  for (let i = 0; i < 400; i++) {
    assignments[`conversation_long_uuid_identifier_${i}_abcdef123456`] = 'f_work';
  }
  const bigState = normalizeStoredState(
    {
      lang: 'es',
      folders: [{ id: 'f_work', name: 'Trabajo', color: '#4285f4', keywords: ['code'] }],
      assignments,
      protectedIds: { conv_prot_1: true }
    },
    'es'
  );

  saveFolderData(bigState);
  assert.equal(chromeMock.runtime.lastError, null, 'no debe exceder QUOTA_BYTES_PER_ITEM (8192 bytes)');
  assert.equal(chromeMock.__mock.getWriteCount(), 1, 'realizó 1 escritura en sync');

  const storedInLocal = JSON.parse(dom.window.localStorage.getItem('gcm_folders_data_v2'));
  assert.equal(Object.keys(storedInLocal.assignments).length, 400, 'localStorage conserva las 400 asignaciones');

  // S-02: si solo cambia view/pos o se llama a saveView(), no debe escribir en chrome.storage.sync
  state.folderState = bigState;
  state.activeFolderFilter = 'f_work';
  state.sortMode = 'AZ';
  saveView();
  assert.equal(chromeMock.__mock.getWriteCount(), 1, 'saveView() es localOnly y no escribe en chrome.storage.sync');

  bigState.pos = { left: 40, bottom: 80 };
  saveFolderData(bigState);
  assert.equal(chromeMock.__mock.getWriteCount(), 1, 'cambiar pos/view con igual payload de sync no dispara sync.set');
});

test('S-03 / S-04: initCloudSync fusiona datos locales y de la nube sin perder asignaciones locales e ignora el eco propio en onChanged', () => {
  const chromeMock = createChromeMock({
    initialSync: {
      gcm_folders_data_v2: {
        lang: 'es',
        folders: [{ id: 'f_cloud', name: 'Cloud Folder', color: '#34a853', keywords: [] }],
        prompts: [{ id: 'p_cloud', title: 'Cloud Prompt', content: 'Cloud' }],
        assignments: { chat_cloud: 'f_cloud' },
        protectedIds: { chat_cloud: true }
      }
    }
  });
  globalThis.chrome = chromeMock;

  let currentState = normalizeStoredState(
    {
      lang: 'es',
      folders: [{ id: 'f_local', name: 'Local Folder', color: '#4285f4', keywords: [] }],
      prompts: [{ id: 'p_local', title: 'Local Prompt', content: 'Local' }],
      assignments: { chat_local: 'f_local' },
      protectedIds: { chat_local: true },
      view: { filter: 'f_local', sort: 'AZ', toolbarCollapsed: true, toolbarVertical: false }
    },
    'es'
  );

  let appliedCount = 0;
  initCloudSync(
    () => currentState,
    (incoming) => {
      appliedCount++;
      currentState = incoming;
    }
  );

  assert.equal(appliedCount, 1, 'aplicó fusión inicial al arrancar');
  assert.equal(currentState.assignments.chat_local, 'f_local', 'conserva asignación local');
  assert.equal(currentState.assignments.chat_cloud, 'f_cloud', 'incorpora asignación de la nube');
  assert.equal(currentState.protectedIds.chat_local, true);
  assert.equal(currentState.protectedIds.chat_cloud, true);
  assert.equal(currentState.folders.some((f) => f.id === 'f_local'), true);
  assert.equal(currentState.folders.some((f) => f.id === 'f_cloud'), true);
  assert.equal(currentState.view.filter, 'f_local', 'preserva la vista local');

  // S-04: cuando la propia pestaña guarda un cambio (ej. quitar chat de carpeta), el onChanged resultante no debe disparar applyIncoming
  delete currentState.assignments.chat_local;
  saveFolderData(currentState);
  assert.equal(appliedCount, 1, 'el eco propio de saveFolderData en onChanged fue ignorado');
});

test('L-12: parseConvId genera IDs distintos para dos atributos jslog de Gemini con prefijo Wiz común', () => {
  const prefix = '186014;track:generic_click,impression;VeTreeMetadata:W1sigemini_conversation_item_long_shared_prefix_';
  const el1 = dom.window.document.createElement('div');
  el1.setAttribute('jslog', `${prefix}aaaaa11111_end`);
  const el2 = dom.window.document.createElement('div');
  el2.setAttribute('jslog', `${prefix}bbbbb22222_end`);

  const id1 = parseConvId(el1);
  const id2 = parseConvId(el2);
  assert.ok(id1 && id2);
  assert.notEqual(id1, id2, 'dos jslog con los primeros 60+ caracteres idénticos no deben colisionar');

  const elWithCId = dom.window.document.createElement('div');
  elWithCId.setAttribute('jslog', '186014;c_89abcdef01234567;track:click');
  assert.equal(parseConvId(elWithCId), 'c_89abcdef01234567');
});

test('L-01: resolveChatGptIdByTitle no borra una conversación normal corta ("fix") al resolver una tarea con prefijo similar', async () => {
  globalThis.fetch = async (url) => {
    if (url === '/backend-api/wham/tasks' || url === '/backend-api/tasks') {
      return { ok: true, status: 200, json: async () => ({ items: [] }) };
    }
    if (url.startsWith('/backend-api/conversations')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          items: [{ id: 'conv_short_fix_123', title: 'fix' }]
        })
      };
    }
    return { ok: false, status: 404 };
  };

  const row = dom.window.document.createElement('div');
  row.innerHTML = '<span dir="auto">Fix authentication bug in production login</span>';

  const match = await resolveChatGptIdByTitle(row, 'task_cloud_fix_auth', 'tok_test');
  assert.equal(match, null, 'no debe hacer match parcial contra la conversación corta "fix"');
});

test('V-01: detectHostTheme y syncHostTheme detectan tema claro/oscuro y actualizan data-gcm-theme', () => {
  dom.window.document.documentElement.className = 'light';
  assert.equal(detectHostTheme(), 'light');
  assert.equal(syncHostTheme(), 'light');
  assert.equal(dom.window.document.documentElement.getAttribute('data-gcm-theme'), 'light');

  dom.window.document.documentElement.className = '';
  dom.window.document.documentElement.setAttribute('data-theme', 'dark');
  assert.equal(detectHostTheme(), 'dark');
  assert.equal(syncHostTheme(), 'dark');
  assert.equal(dom.window.document.documentElement.getAttribute('data-gcm-theme'), 'dark');
  dom.window.document.documentElement.removeAttribute('data-theme');
});

test('detectPlatform reconoce Gemini', () => {
  assert.equal(detectPlatform(), 'gemini');
});

test('detectPlatform reconoce todas las plataformas soportadas y fallback', () => {
  const cases = [
    ['https://gemini.google.com/app', 'gemini'],
    ['https://chatgpt.com/c/123', 'chatgpt'],
    ['https://chat.openai.com/', 'chatgpt'],
    ['https://claude.ai/chats', 'claude'],
    ['https://chat.deepseek.com/', 'deepseek'],
    ['https://opencode.ai/', 'opencode'],
    ['https://example.com/', null]
  ];
  for (const [url, expected] of cases) {
    dom.reconfigure({ url });
    assert.equal(detectPlatform(), expected, `URL ${url}`);
  }
  dom.reconfigure({ url: 'https://gemini.google.com/app/test' });
});

test('normalizeStoredState maneja null y conserva prompts y chats protegidos válidos', () => {
  const empty = normalizeStoredState(null, 'en');
  assert.equal(empty.lang, 'en');
  assert.deepEqual(empty.assignments, {});

  const valid = normalizeStoredState({
    lang: 'es',
    assignments: { chat1: 'f1', __proto__: 'f2' },
    prompts: [{ id: 'p1', title: 'Test', content: 'Hola' }]
  }, 'en');
  assert.equal(valid.lang, 'es');
  assert.deepEqual(valid.assignments, { chat1: 'f1' });
  assert.equal(valid.prompts.length, 1);
  assert.equal(valid.prompts[0].title, 'Test');
});

test('extractPromptVariables extrae variables {{var}} únicas en orden y substitutePromptVariables las reemplaza', () => {
  assert.deepEqual(extractPromptVariables('Sin variables aquí'), []);
  assert.deepEqual(extractPromptVariables(null), []);

  const template = 'Actúa como {{ rol }} y explica {{tema}} en {{ idioma }} para {{rol}} ({{tema}}).';
  assert.deepEqual(extractPromptVariables(template), ['rol', 'tema', 'idioma']);

  const filled = substitutePromptVariables(template, {
    rol: 'Arquitecto',
    tema: 'CQRS',
    idioma: 'español'
  });
  assert.equal(filled, 'Actúa como Arquitecto y explica CQRS en español para Arquitecto (CQRS).');

  // Conserva marcadores sin valor en el mapa y respeta cadenas vacías explícitas
  assert.equal(
    substitutePromptVariables('Hola {{nombre}}, {{extra}}', { nombre: '', extra: undefined }),
    'Hola , undefined'
  );
  assert.equal(substitutePromptVariables('Hola {{nombre}} {{otro}}', { nombre: 'Ana' }), 'Hola Ana {{otro}}');
});

test('normalizeThemePreset y applyThemePreset validan los 5 presets y aplican data-gcm-style', () => {
  assert.deepEqual(THEME_PRESETS, ['adaptive', 'neo-brutal', 'terminal', 'minimal-flat', 'neon-synth']);

  for (const preset of THEME_PRESETS) {
    assert.equal(normalizeThemePreset(`  ${preset.toUpperCase()}  `), preset);
  }
  assert.equal(normalizeThemePreset('invalid-preset'), 'adaptive');
  assert.equal(normalizeThemePreset(null), 'adaptive');
  assert.equal(normalizeThemePreset(42), 'adaptive');

  dom.window.localStorage.removeItem(THEME_STORAGE_KEY);
  dom.window.document.documentElement.removeAttribute('data-gcm-style');

  const appliedNoPersist = applyThemePreset('terminal', { persist: false });
  assert.equal(appliedNoPersist, 'terminal');
  assert.equal(dom.window.document.documentElement.getAttribute('data-gcm-style'), 'terminal');
  assert.equal(dom.window.localStorage.getItem(THEME_STORAGE_KEY), null);

  const applied = applyThemePreset('neo-brutal');
  assert.equal(applied, 'neo-brutal');
  assert.equal(dom.window.document.documentElement.getAttribute('data-gcm-style'), 'neo-brutal');
  assert.equal(dom.window.localStorage.getItem(THEME_STORAGE_KEY), 'neo-brutal');

  dom.window.document.documentElement.removeAttribute('data-gcm-style');
  syncHostTheme();
  assert.equal(dom.window.document.documentElement.getAttribute('data-gcm-style'), 'neo-brutal');
});

test('SHARED_CONFIG_KEY (gcm_shared_config_v1) sincroniza carpetas/prompts/tema sin sobrescribir assignments/protectedIds ni exceder 8 KB', () => {
  assert.equal(SHARED_CONFIG_KEY, 'gcm_shared_config_v1');

  const chromeMock = createChromeMock({
    quotaBytesPerItem: 8192,
    initialSync: {
      [SHARED_CONFIG_KEY]: {
        folders: [{ id: 'f_shared', name: 'Compartida', color: '#34a853', keywords: ['sync'] }],
        prompts: [{ id: 'p_shared', title: 'Prompt compartido', content: 'Hola {{nombre}}' }],
        lang: 'en',
        themePreset: 'neon-synth',
        updatedAt: 1700000000000
      }
    }
  });
  globalThis.chrome = chromeMock;

  let currentState = normalizeStoredState(
    {
      lang: 'es',
      folders: [{ id: 'f_local', name: 'Local', color: '#4285f4', keywords: [] }],
      prompts: [{ id: 'p_local', title: 'Local', content: 'Local' }],
      assignments: { chat_platform_1: 'f_local' },
      protectedIds: { chat_platform_2: true }
    },
    'es'
  );

  initCloudSync(
    () => currentState,
    (incoming) => {
      currentState = incoming;
    }
  );

  assert.equal(currentState.lang, 'en');
  assert.equal(dom.window.document.documentElement.getAttribute('data-gcm-style'), 'neon-synth');
  assert.equal(currentState.folders.some((f) => f.id === 'f_shared'), true);
  assert.equal(currentState.folders.some((f) => f.id === 'f_local'), true);
  assert.equal(currentState.prompts.some((p) => p.id === 'p_shared'), true);
  assert.deepEqual(currentState.assignments, { chat_platform_1: 'f_local' });
  assert.deepEqual(currentState.protectedIds, { chat_platform_2: true });

  saveFolderData(currentState);
  assert.equal(chromeMock.runtime.lastError, null);
});

test('encodeSyncCode y decodeSyncCode hacen roundtrip foldy1: y rechazan códigos inválidos', async () => {
  const input = {
    folders: [{ id: 'f1', name: 'Trabajo', color: '#4285f4', keywords: ['API', ' bug '] }],
    prompts: [{ id: 'p1', title: 'Review', content: 'Revisa {{archivo}}' }],
    lang: 'es',
    themePreset: 'terminal',
    updatedAt: 1700000000123
  };

  const code = await encodeSyncCode(input);
  assert.equal(code.startsWith('foldy1:'), true);

  const decoded = await decodeSyncCode(code);
  assert.equal(decoded.lang, 'es');
  assert.equal(decoded.themePreset, 'terminal');
  assert.equal(decoded.updatedAt, 1700000000123);
  assert.deepEqual(decoded.folders, [{ id: 'f1', name: 'Trabajo', color: '#4285f4', keywords: ['api', 'bug'] }]);
  assert.deepEqual(decoded.prompts, [{ id: 'p1', title: 'Review', content: 'Revisa {{archivo}}' }]);

  await assert.rejects(() => decodeSyncCode(null));
  await assert.rejects(() => decodeSyncCode('invalid-prefix:abc'));
  await assert.rejects(() => decodeSyncCode('foldy1:!!!not-base64url!!!'));
  await assert.rejects(() => decodeSyncCode('foldy1:' + Buffer.from('{"lang":"es"}').toString('base64url')));
});

test('syncWithGist crea gist privado, hace pull/push según updatedAt y maneja errores de token/HTTP', async () => {
  assert.equal(GIST_FILENAME, 'foldy-sync.json');
  assert.equal(GIST_STORAGE_KEY, 'gcm_gist_config');

  // 1. Error si falta el token
  await assert.rejects(() => syncWithGist({ token: '   ', localConfig: {} }), /GitHub token is required/);

  // 2. Error HTTP (401)
  await assert.rejects(
    () =>
      syncWithGist({
        token: 'ghp_bad',
        gistId: 'gist_1',
        localConfig: {},
        fetchFn: async () => ({
          ok: false,
          status: 401,
          json: async () => ({ message: 'Bad credentials' })
        })
      }),
    /GitHub Gist API error 401: Bad credentials/
  );

  // 3. Crea gist privado cuando no hay gistId ni existe foldy-sync.json
  const callsCreate = [];
  const localCfg = { folders: [{ id: 'f1', name: 'Work' }], prompts: [], lang: 'es', updatedAt: 200 };
  const createdRes = await syncWithGist({
    token: 'ghp_ok',
    localConfig: localCfg,
    fetchFn: async (url, init) => {
      callsCreate.push({ url, method: init.method, body: init.body });
      if (init.method === 'GET' && url.includes('/gists?per_page=30')) {
        return { ok: true, status: 200, json: async () => [{ id: 'other', files: { 'notes.txt': {} } }] };
      }
      if (init.method === 'POST' && url.endsWith('/gists')) {
        return { ok: true, status: 201, json: async () => ({ id: 'gist_new_123' }) };
      }
      throw new Error(`Unexpected call: ${init.method} ${url}`);
    }
  });
  assert.equal(createdRes.action, 'created');
  assert.equal(createdRes.gistId, 'gist_new_123');
  const postBody = JSON.parse(callsCreate[1].body);
  assert.equal(postBody.public, false);
  assert.ok(postBody.files[GIST_FILENAME].content.includes('"Work"'));

  // 4. Pull cuando remote.updatedAt > local.updatedAt
  const remoteCfg = { folders: [{ id: 'f_remote', name: 'Remote' }], prompts: [], lang: 'en', updatedAt: 500 };
  const pullRes = await syncWithGist({
    token: 'ghp_ok',
    gistId: 'gist_abc',
    localConfig: { ...localCfg, updatedAt: 200 },
    fetchFn: async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        id: 'gist_abc',
        files: { [GIST_FILENAME]: { content: JSON.stringify(remoteCfg) } }
      })
    })
  });
  assert.equal(pullRes.action, 'pulled');
  assert.equal(pullRes.gistId, 'gist_abc');
  assert.deepEqual(pullRes.config, remoteCfg);

  // 5. Push (PATCH) cuando local.updatedAt >= remote.updatedAt
  const callsPush = [];
  const pushRes = await syncWithGist({
    token: 'ghp_ok',
    gistId: 'gist_abc',
    localConfig: { ...localCfg, updatedAt: 500 },
    fetchFn: async (url, init) => {
      callsPush.push({ url, method: init.method });
      if (init.method === 'GET') {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            id: 'gist_abc',
            files: { [GIST_FILENAME]: { content: JSON.stringify({ ...remoteCfg, updatedAt: 500 }) } }
          })
        };
      }
      return { ok: true, status: 200, json: async () => ({ id: 'gist_abc' }) };
    }
  });
  assert.equal(pushRes.action, 'pushed');
  assert.equal(callsPush.some((c) => c.method === 'PATCH'), true);
});
