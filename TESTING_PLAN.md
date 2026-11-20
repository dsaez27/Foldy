# 🧪 Detailed Testing Plan / Plan de Testing Detallado — Foldy v3.6.0

> **Bilingual Documentation Policy / Política Bilingüe**: All project documents are provided in **English first**, followed by **Spanish**. / Todos los documentos del proyecto se publican en **inglés primero** y luego en **español**.

<p align="center">
  <a href="#-english-version">🇺🇸 English Version</a> · <a href="#-versión-en-español">🇪🇸 Versión en Español</a>
</p>

---

# 🇺🇸 English Version

| Field | Value |
|---|---|
| Project | **Foldy** |
| Version Under Test | `3.8.0` (`package.json`, `extension/manifest.json`) |
| Product Type | Browser WebExtension (Manifest V3) |
| Automated Test Stack | `node:test` + `jsdom` + `chrome-storage-mock` (50 automated tests: 17 unit + 33 DOM integration + `scripts/validate-extension.mjs`) |
| Target Browsers | **Chrome, Edge, Brave, Firefox, Opera, and Safari** (latest stable versions) |
| Date | 2026-11-20 |
| Status | Executed & Verified (50/50 PASS) |
| Document | `TESTING_PLAN.md` |

## 1. Objective

Define a rigorous, reproducible testing strategy to verify that **Foldy v3.8.0** runs safely, consistently, and without regressions across all **5 supported AI platforms** (Gemini, ChatGPT, Claude, DeepSeek, and OpenCode) and all **6 target browsers** in their latest versions:

- **Chromium Family (Blink + V8):** Google Chrome, Microsoft Edge, Brave, Opera.
- **Gecko Family (SpiderMonkey):** Mozilla Firefox.
- **WebKit Family (JavaScriptCore):** Apple Safari (macOS).

Critical focus areas:
1. **Destructive operations** (DOM bulk deletion and ChatGPT/Codex API deletion) without accidental data loss or deleting the wrong conversation.
2. **Persistence & Cloud Sync** (`localStorage` + `chrome.storage.sync` / `browser.storage.sync`) without corruption, quota overflow (`QUOTA_BYTES_PER_ITEM = 8192` bytes), data loss, or *prototype pollution*.
3. **UI Injection on Third-Party DOMs** resilient to SPA re-renders, list virtualization, Trusted Types / CSP, host theme changes (`light`/`dark`), and selector updates.
4. **Cross-browser MV3 compatibility** across Chromium, Firefox (`browser_specific_settings.gecko.id`), and Safari.

## 2. Scope

### 2.1 In Scope
- **Source Modules (`src/`):** `platform`, `storage`, `state`, `sidebar`, `folders`, `panel`, `toolbar`, `selection`, `dialogs`, `deletion`, `prompts`, `backup`, `markdown-export`, `autoscroll`, `utils`, `i18n`, `icons`, `main`, `content`.
- **Bundle & Extension Assets:** `extension/content.js`, `extension/styles.css`, `extension/popup.html`, `popup.js`, `popup.css`, `extension/manifest.json`, `_locales/es`, `_locales/en`, `icons/*.png`.
- **Supported AI Platforms:**
  - `https://gemini.google.com/*`
  - `https://chatgpt.com/*` and `https://chat.openai.com/*` (including `/c/`, `/codex/tasks/`, and href-less cloud tasks)
  - `https://claude.ai/*`
  - `https://chat.deepseek.com/*`
  - `https://opencode.ai/*`
- **Target Browsers:** Chrome, Edge, Brave, Firefox, Opera, and Safari (latest stable releases).

### 2.2 Out of Scope
- Real third-party AI backends and live user authentication during automated CI runs (tested via contractual API/DOM mocks in automated tests; live authenticated verification is covered in Manual Smoke Testing).
- Store editorial review processes (Chrome Web Store, Edge Add-ons, Firefox AMO, Opera Addons, Apple App Store).

## 3. Browser Matrix & Technical Specifics

| Browser | Engine | Extension Loading Format | Key APIs & Specifics to Validate |
|---|---|---|---|
| **Google Chrome** (latest) | Blink / V8 | Native MV3 (`--load-extension`) | `chrome.storage.sync`, `activeTab`, Trusted Types on Gemini/ChatGPT, popup messaging. |
| **Microsoft Edge** (latest) | Blink / V8 | Native MV3 (`--load-extension`) | Edge Sidebar / Split Screen compatibility, `chrome.storage.sync`, Acrylic/Glass styles. |
| **Brave** (latest) | Blink / V8 | Native MV3 (`--load-extension`) | Active Brave Shields (tracker/script blocking must not affect `content.js` or `localStorage`). |
| **Opera** (latest) | Blink / V8 | Native MV3 (`--load-extension`) | Opera's native sidebar must not collide with Foldy's floating panel. |
| **Mozilla Firefox** (latest) | Gecko / SpiderMonkey | MV3 WebExtension (`web-ext run`) | Requires `browser_specific_settings.gecko.id` in `manifest.json`; validate `storage.sync` and Gecko CSP. |
| **Apple Safari** (latest, macOS) | WebKit / JSC | Safari Web Extension (`xcrun safari-web-extension-converter`) | Xcode project conversion; validate `browser.storage.sync`, `localStorage` under ITP, pointer drag, and `-webkit-backdrop-filter`. |

## 4. Multi-Level Testing Strategy

| Level | Tooling | What It Validates | Target |
|---|---|---|---|
| **U — Unit** | `node:test` + `chrome-storage-mock` | Pure functions: state normalization, map sanitization, sync quota compaction, merge, platform/theme detection, FNV-1a IDs, safe title matching | 12 automated suites |
| **I — DOM Integration** | `node:test` + `jsdom` | Full `extension/content.js` bundle against DOM fixtures for all 5 AI platforms | 28 automated suites |
| **E — Cross-Browser E2E** | Playwright (Chromium, Firefox, WebKit) + `web-ext` + Safari | Unpacked extension loading, layout, drag & drop, popup, file downloads/uploads, `storage.sync`, CSP | 7 scenarios × 6 browsers |
| **S — Release Smoke** | `npm run check` + `scripts/validate-extension.mjs` | ESLint, 40 automated tests, clean esbuild bundle, `manifest.json` & `_locales` store compliance | Every release |

### 4.1 Verification Commands
```bash
npm ci
npm run lint                       # ESLint across src, tests, scripts, and extension/popup.js
npm test                           # 40 automated tests (12 in units.test.js + 28 in extension.test.js)
npm run build                      # Bundles src/ into extension/content.js with esbuild
node scripts/validate-extension.mjs # Validates manifest.json, permissions, Gecko ID, files, and _locales
npm run check                      # Runs lint + test + build
```

## 5. Detailed Test Cases

### 5.1 Level U — Unit Tests (`tests/units.test.js`)

| ID | Module | Test Case | Expected Result |
|---|---|---|---|
| U-01 | `storage.js` | `normalizeStoredState` with corrupted JSON, `null`, `undefined`, wrong types | Discards invalid data and returns a safe default state. |
| U-02 | `storage.js` | `normalizeStoredState` with a complete valid view | Preserves folders, assignments, locks, and view preferences intact. |
| U-03 | `storage.js` / `backup.js` | `sanitizeMap` & `normalizeStoredState` (S-05) with `__proto__`, `constructor`, `prototype`, and invalid hex colors | Blocks prototype-pollution keys in `assignments` and `protectedIds` and normalizes invalid colors to `#4285f4`. |
| U-04 | `storage.js` / `state.js` | `saveFolderData` under `QUOTA_BYTES_PER_ITEM` (8192 bytes) with 400 assignments and `saveView()` `localOnly` (S-01, S-02) | Never exceeds 8 KB in `chrome.storage.sync`, preserves all 400 assignments in `localStorage`, and `saveView()` performs 0 sync writes. |
| U-05 | `storage.js` | `initCloudSync` with concurrent `localStorage` and `chrome.storage.sync` data + `onChanged` self-echo (S-03, S-04) | Merges folders, prompts, `assignments`, and `protectedIds` without losing local data and ignores self-originated `onChanged` echoes. |
| U-06 | `sidebar.js` | `parseConvId` with two Gemini `jslog` attributes sharing a long Wiz prefix and `c_<hex>` pattern (L-12) | Computes 64-bit FNV-1a hash across the full `jslog` string, producing distinct IDs without collision. |
| U-07 | `deletion.js` | `resolveChatGptIdByTitle` with a short normal conversation (`"fix"`) and a task with a similar prefix (L-01) | Never matches or deletes a short normal conversation by mistake. |
| U-08 | `platform.js` | `detectPlatform`, `detectHostTheme`, and `syncHostTheme` (V-01) | Detects all 5 platforms + `null` fallback and syncs `data-gcm-theme="light|dark"` on `documentElement`. |

### 5.2 Level I — DOM Integration Tests (`tests/extension.test.js`)

| ID | Platform / Area | Scenario | Expected Result |
|---|---|---|---|
| I-01..05 | Gemini, ChatGPT, Claude, DeepSeek, OpenCode | Initial injection (`init` + `refreshUI`) | Injects Foldy panel, top toolbar, SVG icons, and checkboxes without duplicating nodes. |
| I-06..10 | All 5 platforms | Keyword auto-classification + folder filtering | Displays only conversations belonging to the selected folder and updates counters. |
| I-11..15 | All 5 platforms | Collapsible toolbar + Horizontal/Vertical orientation toggle + persistence | Persists layout state in `localStorage` and restores it across reloads. |
| I-16 | Lock Protection | Protect selected conversations with lock badge | Adds `.gcm-lock-icon` and skips locked chats during bulk deletion. |
| I-17 | Quick Prompts Vault | Open modal, insert prompt into `<textarea>` and `.ProseMirror[contenteditable="true"]`, close with `Escape` (S-11, S-12) | Inserts `<p>` paragraphs in rich editors, dispatches `InputEvent`, and closes modals on `Escape` cleaning listeners. |
| I-18 | Selection & Filters | `Shift + Click` range selection and `toggleSelectAll(false)` while a folder filter is active (L-09, L-10) | Selects visible range on `Shift + Click` and clears the entire `selectedMap` (including hidden rows) when unchecking Select All. |
| I-19 | Cloud Sync / Echo | Manually remove an auto-classified chat from its folder (S-04) | The `chrome.storage.onChanged` self-echo does not reset `autoClassifiedVisited` or re-classify the chat. |
| I-20 | Backup & Markdown | Direct `IMPORT_BACKUP` message with `rawJson` and `exportSelectedConversationsToMarkdown` (S-06, S-15) | Restores folders/assignments/locks from JSON and exports selected index + active chat messages to `.md`. |
| I-21 | Host-Aware Theme | Load extension on a host page with light theme (`body.light`) (V-01) | Automatically sets `data-gcm-theme="light"` on `document.documentElement`. |
| I-22 | Keyboard Shortcuts | `Alt+Shift+F` (`KeyF`) | Toggles the floating panel between minimized and expanded states. |
| I-23 | Resilience | Corrupted JSON stored in `localStorage` | Recovers gracefully with default state without throwing exceptions. |
| I-24 | ChatGPT API Delete | Delete remote Codex tasks (`/codex/tasks/task_...`) | Calls `DELETE /backend-api/wham/tasks/{id}` and removes the row from the DOM. |
| I-25 | ChatGPT API Fallback | `DELETE` returns HTTP `403` | Falls back to `POST /backend-api/wham/tasks/{id}/archive` and removes the row. |
| I-26 | ChatGPT Cloud Tasks | Cloud task rows with trailing SVG icon and no `href` | Resolves real task ID by title and deletes safely via API. |
| I-27 | Background Autoscroll | Check `#gcm-select-all` on a lazy-loaded history list | Automatically loads older history in the background and checks newly added rows. |

### 5.3 Level E — Cross-Browser E2E Matrix

| ID | E2E Scenario | Cross-Browser Validation |
|---|---|---|
| E-01 | Zero-error extension boot | `console.error` and `pageerror` at zero; `manifest.json` accepted without blocking warnings. |
| E-02 | Control Popup (`popup.html`) | Opens from toolbar with `activeTab`, detects active AI platform, switches language (`EN`/`ES`), and syncs live. |
| E-03 | Floating Panel & Drag & Drop | Smooth pointer dragging and viewport clamping without colliding with native Edge/Opera sidebars. |
| E-04 | `storage.sync` + `localStorage` Persistence | Create folder, reload page, restart browser: state preserved (including under Brave Shields and Safari ITP). |
| E-05 | Trusted Types & Strict CSP | Programmatic SVG icon and DOM creation on Gemini/ChatGPT/Claude with zero `securitypolicyviolation` events. |
| E-06 | JSON Backup Import/Export & Markdown Download | File chooser opens with user activation from popup; `.json` and `.md` downloads contain valid UTF-8 content. |
| E-07 | Host-Aware Light/Dark Theme & Contrast | Verify WCAG AA contrast (`>= 4.5:1`) when toggling the AI platform's internal Light/Dark theme independent of OS theme. |

## 6. Release Acceptance Criteria

A **Foldy** release is **APPROVED** only if:
1. `npm run check` (`lint` + `test` + `build`) and `node scripts/validate-extension.mjs` exit with code `0` and **40/40 passing tests**.
2. Zero residual legacy brand references remain in user-facing UI or logs.
3. Scenarios **E-01 through E-07** pass on the latest stable versions of **Chrome, Edge, Brave, Firefox, Opera, and Safari**.
4. Destructive deletion tests pass 100% without ever deleting locked conversations or matching unrelated short conversation titles.

---

# 🇪🇸 Versión en Español

| Campo | Valor |
|---|---|
| Proyecto | **Foldy** |
| Versión bajo prueba | `3.8.0` (`package.json`, `extension/manifest.json`) |
| Tipo de producto | Extensión de navegador WebExtension (Manifest V3) |
| Stack de pruebas actual | `node:test` + `jsdom` + `chrome-storage-mock` (50 pruebas automatizadas: 17 unitarias + 33 de integración DOM + `scripts/validate-extension.mjs`) |
| Navegadores objetivo | **Chrome, Edge, Brave, Firefox, Opera y Safari** (últimas versiones estables) |
| Fecha | 2026-11-20 |
| Estado | Ejecutado y verificado (50/50 PASS) |
| Documento | `TESTING_PLAN.md` |

## 1. Objetivo

Definir una estrategia minuciosa y reproducible para verificar que **Foldy v3.8.0** funciona de forma segura, consistente y sin regresiones en las **5 plataformas de IA soportadas** (Gemini, ChatGPT, Claude, DeepSeek y OpenCode) y en los **6 navegadores objetivo** en sus últimas versiones:

- **Familia Chromium (Blink + V8):** Google Chrome, Microsoft Edge, Brave, Opera.
- **Familia Gecko (SpiderMonkey):** Mozilla Firefox.
- **Familia WebKit (JavaScriptCore):** Apple Safari (macOS).

Énfasis crítico en:
1. **Operaciones destructivas** (borrado masivo DOM y borrado vía API de ChatGPT/Codex) sin pérdida accidental ni borrado del chat equivocado.
2. **Persistencia y sincronización** (`localStorage` + `chrome.storage.sync` / `browser.storage.sync`) sin corrupción, desbordamiento de cuota (`QUOTA_BYTES_PER_ITEM = 8192` bytes), pérdida de datos ni *prototype pollution*.
3. **Inyección de UI sobre DOM de terceros** resistente a re-renderizados, virtualización, Trusted Types / CSP, cambios de tema del host (`light`/`dark`) y cambios de selectores.
4. **Compatibilidad cross-browser MV3** entre Chromium, Firefox (`browser_specific_settings.gecko.id`) y Safari.

## 2. Alcance

### 2.1 Dentro del alcance
- **Módulos `src/`:** `platform`, `storage`, `state`, `sidebar`, `folders`, `panel`, `toolbar`, `selection`, `dialogs`, `deletion`, `prompts`, `backup`, `markdown-export`, `autoscroll`, `utils`, `i18n`, `icons`, `main`, `content`.
- **Bundle y recursos:** `extension/content.js`, `extension/styles.css`, `extension/popup.html`, `popup.js`, `popup.css`, `extension/manifest.json`, `_locales/es`, `_locales/en`, `icons/*.png`.
- **Plataformas:**
  - `https://gemini.google.com/*`
  - `https://chatgpt.com/*` y `https://chat.openai.com/*` (incluyendo `/c/`, `/codex/tasks/` y tareas en la nube sin `href`)
  - `https://claude.ai/*`
  - `https://chat.deepseek.com/*`
  - `https://opencode.ai/*`
- **Navegadores:** Chrome, Edge, Brave, Firefox, Opera y Safari (últimas versiones estables).

### 2.2 Fuera del alcance
- Backends reales y autenticación de terceros durante la ejecución automatizada en CI (se prueban mediante mocks contractuales en tests automatizados; la verificación contra sesiones reales se cubre en el Smoke Manual).
- Proceso editorial de aprobación de tiendas (Chrome Web Store, Edge Add-ons, Firefox AMO, Opera Addons, App Store).

## 3. Matriz de Navegadores y Particularidades Técnicas

| Navegador | Motor | Formato / Carga de Extensión | APIs y Particularidades a Validar |
|---|---|---|---|
| **Google Chrome** (última) | Blink / V8 | MV3 nativa (`--load-extension`) | `chrome.storage.sync`, `activeTab`, Trusted Types en Gemini/ChatGPT, mensajería del popup. |
| **Microsoft Edge** (última) | Blink / V8 | MV3 nativa (`--load-extension`) | Compatibilidad con Edge Sidebar/Split Screen, `chrome.storage.sync`, estilos Acrylic/Glass. |
| **Brave** (última) | Blink / V8 | MV3 nativa (`--load-extension`) | Shields activos (bloqueo de trackers/scripts no debe afectar `content.js` ni `localStorage`). |
| **Opera** (última) | Blink / V8 | MV3 nativa (`--load-extension`) | Barra lateral propia de Opera no debe colisionar con el panel flotante de Foldy. |
| **Mozilla Firefox** (última) | Gecko / SpiderMonkey | MV3 WebExtension (`web-ext run`) | Requiere `browser_specific_settings.gecko.id` en `manifest.json`; validar `storage.sync` y CSP de Gecko. |
| **Apple Safari** (última, macOS) | WebKit / JSC | Safari Web Extension (`xcrun safari-web-extension-converter`) | Conversión a proyecto Xcode; validar `browser.storage.sync`, `localStorage` bajo ITP, eventos `pointer`/`drag` y `-webkit-backdrop-filter`. |

## 4. Estrategia por Niveles

| Nivel | Herramienta | Qué valida | Objetivo |
|---|---|---|---|
| **U — Unitario** | `node:test` + `chrome-storage-mock` | Funciones puras: normalización, sanitización, compactación de cuota sync, merge, detección de plataforma/tema, IDs FNV-1a, coincidencia segura por título | 12 suites automatizadas |
| **I — Integración DOM** | `node:test` + `jsdom` | Bundle `extension/content.js` contra fixtures de las 5 plataformas | 28 suites automatizadas |
| **E — E2E Cross-Browser** | Playwright (Chromium, Firefox, WebKit) + `web-ext` + Safari | Carga real de la extensión, layout, drag, popup, descargas/subidas, `storage.sync`, CSP | 7 escenarios × 6 navegadores |
| **S — Smoke de Release** | `npm run check` + `scripts/validate-extension.mjs` | Lint, 40 tests, build limpio, validación de `manifest.json` y `_locales` | Cada release |

### 4.1 Comandos de verificación
```bash
npm ci
npm run lint                       # ESLint sobre src, tests, scripts y extension/popup.js
npm test                           # 40 pruebas automatizadas (12 en units.test.js + 28 en extension.test.js)
npm run build                      # Regenera extension/content.js con esbuild
node scripts/validate-extension.mjs # Valida manifest.json, permisos, Gecko ID, archivos y _locales
npm run check                      # lint + test + build
```

## 5. Casos de Prueba Detallados

### 5.1 Nivel U — Pruebas Unitarias (`tests/units.test.js`)

| ID | Módulo | Caso de prueba | Resultado esperado |
|---|---|---|---|
| U-01 | `storage.js` | `normalizeStoredState` con JSON corrupto, `null`, `undefined`, tipos erróneos | Descarta datos inválidos y devuelve estado por defecto seguro. |
| U-02 | `storage.js` | `normalizeStoredState` con vista válida completa | Conserva carpetas, asignaciones, candados y preferencias intactas. |
| U-03 | `storage.js` / `backup.js` | `sanitizeMap` y `normalizeStoredState` (S-05) con `__proto__`, `constructor`, `prototype` y colores hex inválidos | Bloquea claves peligrosas en `assignments` y `protectedIds` y normaliza colores a `#4285f4`. |
| U-04 | `storage.js` / `state.js` | `saveFolderData` bajo `QUOTA_BYTES_PER_ITEM` (8192 bytes) con 400 asignaciones y `saveView()` `localOnly` (S-01, S-02) | Nunca excede los 8 KB en `chrome.storage.sync`, conserva las 400 asignaciones en `localStorage` y `saveView()` no escribe en `sync`. |
| U-05 | `storage.js` | `initCloudSync` con datos simultáneos en `localStorage` y `chrome.storage.sync` y eco de `onChanged` (S-03, S-04) | Fusiona carpetas, prompts, `assignments` y `protectedIds` sin perder datos locales e ignora el eco propio de `saveFolderData`. |
| U-06 | `sidebar.js` | `parseConvId` con dos atributos `jslog` de Gemini con prefijo Wiz común y patrón `c_<hex>` (L-12) | Calcula hash FNV-1a de 64 bits sobre todo el `jslog` generando IDs distintos sin colisión. |
| U-07 | `deletion.js` | `resolveChatGptIdByTitle` con conversación corta (`"fix"`) y tarea con prefijo similar (L-01) | No empareja ni borra por error una conversación normal corta. |
| U-08 | `platform.js` | `detectPlatform`, `detectHostTheme` y `syncHostTheme` (V-01) | Detecta las 5 plataformas + fallback `null` y sincroniza `data-gcm-theme="light|dark"`. |

### 5.2 Nivel I — Integración DOM (`tests/extension.test.js`)

| ID | Plataforma / Área | Escenario | Resultado esperado |
|---|---|---|---|
| I-01..05 | Gemini, ChatGPT, Claude, DeepSeek, OpenCode | Inyección inicial (`init` + `refreshUI`) | Inyecta panel Foldy, barra superior y checkboxes sin duplicar nodos. |
| I-06..10 | 5 plataformas | Auto-clasificación por palabras clave + filtro por carpeta | Muestra solo los chats de la carpeta seleccionada y actualiza contadores. |
| I-11..15 | 5 plataformas | Barra superior contraíble + cambio Horizontal/Vertical + persistencia | Guarda estado y lo restaura tras recarga simulada. |
| I-16 | Seguridad / Candado | Proteger conversaciones seleccionadas con candado | Marca con candado y bloquea su eliminación en borrado masivo. |
| I-17 | Bóveda de Prompts | Abrir modal e insertar prompt en `<textarea>` y en `.ProseMirror[contenteditable="true"]` + cierre con `Escape` (S-11, S-12) | Inserta párrafos `<p>` en editores ricos, dispara `InputEvent` y cierra modales con `Escape` limpiando listeners. |
| I-18 | Selección y Filtros | Selección por rango `Shift + Clic` y `toggleSelectAll(false)` con filtro activo (L-09, L-10) | Selecciona el rango visible y al desmarcar Todo limpia `selectedMap` completo (incluidos chats ocultos). |
| I-19 | Cloud Sync / Eco | Quitar un chat auto-clasificado de su carpeta (S-04) | El eco de `chrome.storage.onChanged` no limpia `autoClassifiedVisited` ni re-clasifica el chat. |
| I-20 | Backup y Markdown | Importación directa `IMPORT_BACKUP` con `rawJson` y `exportSelectedConversationsToMarkdown` (S-06, S-15) | Restaura carpetas/asignaciones desde JSON y exporta índice + mensajes a Markdown. |
| I-21 | Theming Host-Aware | Carga en host con tema claro (`body.light`) (V-01) | Sincroniza `data-gcm-theme="light"` en `documentElement`. |
| I-22 | Atajos | `Alt+Shift+F` (`KeyF`) | Minimiza y expande el panel Foldy. |
| I-23 | Resiliencia | Datos guardados corruptos en `localStorage` | No lanza excepciones ni rompe la carga de la extensión. |
| I-24 | ChatGPT API | Borrado de tareas remotas (`/codex/tasks/task_...`) | Envía `DELETE` correcto y elimina la fila del DOM. |
| I-25 | ChatGPT API Fallback | `DELETE` devuelve `403` | Ejecuta fallback `POST /archive` y elimina la fila. |
| I-26 | ChatGPT Cloud | Tareas en la nube con ícono SVG sin `href` | Resuelve ID por título y ejecuta borrado seguro. |
| I-27 | Autoscroll | Marcar `#gcm-select-all` con historial largo | Carga historial hacia abajo y marca chats nuevos dinámicamente. |

### 5.3 Nivel E — Matriz E2E Cross-Browser

| ID | Escenario E2E | Validación específica cross-browser |
|---|---|---|
| E-01 | Carga de extensión sin errores | `console.error` y `pageerror` en cero; `manifest.json` aceptado sin warnings bloqueantes. |
| E-02 | Popup de control (`popup.html`) | Abre correctamente con `activeTab`, detecta la plataforma activa, cambia idioma (`es`/`en`) y sincroniza en vivo. |
| E-03 | Panel flotante y Drag & Drop | Arrastrar panel y barra con clamping dentro del viewport sin colisionar con sidebars nativos de Edge/Opera. |
| E-04 | Persistencia `storage.sync` + `localStorage` | Crear carpeta, recargar página, cerrar y reabrir navegador: estado intacto (incluyendo Brave Shields y Safari ITP). |
| E-05 | Trusted Types & CSP | Inyección de iconos SVG y estilos en Gemini/ChatGPT/Claude sin eventos `securitypolicyviolation`. |
| E-06 | Importación/Exportación JSON y Descarga Markdown | El selector de archivos se abre desde el popup con activación de usuario; los archivos `.json` y `.md` contienen UTF-8 válido. |
| E-07 | Tema Claro/Oscuro del Host y Contraste | Verificar contraste WCAG AA (`>= 4.5:1`) al alternar el tema Claro/Oscuro interno de la web independientemente del SO. |

## 6. Criterios de Aceptación para Release

Un release de **Foldy** se considera **APROBADO** únicamente si:
1. `npm run check` (`lint` + `test` + `build`) y `node scripts/validate-extension.mjs` terminan con código `0` y **40/40 pruebas aprobadas**.
2. No quedan referencias residuales de marcas anteriores en UI o logs visibles.
3. Los escenarios **E-01 a E-07** pasan en las últimas versiones de **Chrome, Edge, Brave, Firefox, Opera y Safari**.
4. Las pruebas destructivas pasan al 100% sin borrar elementos protegidos con candado ni emparejar conversaciones cortas por error.
