# Plan de Testing Detallado — Foldy v3.5.6

| Campo | Valor |
|---|---|
| Proyecto | **Foldy** |
| Versión bajo prueba | `3.5.6` (`package.json`, `extension/manifest.json`) |
| Tipo de producto | Extensión de navegador WebExtension (Manifest V3) |
| Stack de pruebas actual | `node:test` + `jsdom` + `chrome-storage-mock` (40 pruebas automatizadas: 12 unitarias + 28 de integración DOM + `scripts/validate-extension.mjs`) |
| Navegadores objetivo | **Chrome, Edge, Brave, Firefox, Opera y Safari** (últimas versiones estables) |
| Fecha | 2026-11-19 |
| Estado | Ejecutado y verificado (40/40 PASS) |
| Documento | `TESTING_PLAN.md` |

---

## 1. Objetivo

Definir una estrategia minuciosa y reproducible para verificar que **Foldy v3.5.6** funciona de forma segura, consistente y sin regresiones en las **5 plataformas de IA soportadas** (Gemini, ChatGPT, Claude, DeepSeek y OpenCode) y en los **6 navegadores objetivo** en sus últimas versiones:

- **Familia Chromium (Blink + V8):** Google Chrome, Microsoft Edge, Brave, Opera.
- **Familia Gecko (SpiderMonkey):** Mozilla Firefox.
- **Familia WebKit (JavaScriptCore):** Apple Safari (macOS).

Énfasis crítico en:
1. **Operaciones destructivas** (borrado masivo DOM y borrado vía API de ChatGPT/Codex) sin pérdida accidental ni borrado del chat equivocado.
2. **Persistencia y sincronización** (`localStorage` + `chrome.storage.sync` / `browser.storage.sync`) sin corrupción, pérdida de datos ni *prototype pollution*.
3. **Inyección de UI sobre DOM de terceros** resistente a re-renderizados, virtualización, Trusted Types / CSP y cambios de selectores.
4. **Compatibilidad cross-browser MV3** entre Chromium, Firefox y Safari.

---

## 2. Alcance

### 2.1 Dentro del alcance
- **Módulos `src/`:** `platform`, `storage`, `state`, `sidebar`, `folders`, `panel`, `toolbar`, `selection`, `dialogs`, `deletion`, `prompts`, `backup`, `markdown-export`, `autoscroll`, `utils`, `i18n`, `icons`, `content`.
- **Bundle y recursos:** `extension/content.js`, `extension/styles.css`, `extension/popup.html`, `popup.js`, `popup.css`, `extension/manifest.json`, `_locales/es`, `_locales/en`, `icons/*.png`.
- **Plataformas:**
  - `https://gemini.google.com/*`
  - `https://chatgpt.com/*` y `https://chat.openai.com/*` (incluyendo `/c/`, `/codex/tasks/` y tareas en la nube sin `href`)
  - `https://claude.ai/*`
  - `https://chat.deepseek.com/*`
  - `https://opencode.ai/*`
- **Navegadores:** Chrome, Edge, Brave, Firefox, Opera y Safari (últimas versiones estables).

### 2.2 Fuera del alcance
- Backends reales y autenticación de terceros (se prueban mediante mocks contractuales en tests automatizados; la verificación contra sesiones reales se cubre en el Smoke Manual).
- Proceso editorial de aprobación de tiendas (Chrome Web Store, Edge Add-ons, Firefox AMO, Opera Addons, App Store).

---

## 3. Matriz de Navegadores y Particularidades Técnicas

| Navegador | Motor | Formato / Carga de Extensión | APIs y Particularidades a Validar |
|---|---|---|---|
| **Google Chrome** (última) | Blink / V8 | MV3 nativa (`--load-extension`) | `chrome.storage.sync`, Trusted Types en Gemini/ChatGPT, Service Worker/popup. |
| **Microsoft Edge** (última) | Blink / V8 | MV3 nativa (`--load-extension`) | Compatibilidad con Edge Sidebar/Split Screen, `chrome.storage.sync`, estilos Acrylic/Glass. |
| **Brave** (última) | Blink / V8 | MV3 nativa (`--load-extension`) | Shields activos (bloqueo de trackers/scripts no debe afectar `content.js` ni `localStorage`). |
| **Opera** (última) | Blink / V8 | MV3 nativa (`--load-extension`) | Barra lateral propia de Opera no debe colisionar con el panel flotante de Foldy. |
| **Mozilla Firefox** (última) | Gecko / SpiderMonkey | MV3 WebExtension (`web-ext run`) | Requiere `browser_specific_settings.gecko.id` en `manifest.json` para carga persistente/firma; validar alias `chrome.*` vs `browser.*`, `storage.sync` y CSP de Gecko. |
| **Apple Safari** (última, macOS) | WebKit / JSC | Safari Web Extension (`xcrun safari-web-extension-converter`) | Conversión a proyecto Xcode; validar `browser.storage.sync`, `web_accessible_resources`, `localStorage` bajo ITP, eventos `pointer`/`drag` y `backdrop-filter` (`-webkit-backdrop-filter`). |

---

## 4. Estrategia por Niveles

| Nivel | Herramienta | Qué valida | Objetivo |
|---|---|---|---|
| **U — Unitario** | `node:test` | Funciones puras: normalización, sanitización, detección de plataforma, IDs, Markdown, i18n | 40+ casos |
| **I — Integración DOM** | `node:test` + `jsdom` | Bundle `extension/content.js` contra fixtures de las 5 plataformas | 35+ casos |
| **E — E2E Cross-Browser** | Playwright (Chrome, Edge, Brave, Opera, Firefox, WebKit) + `web-ext` + Xcode/Safari | Carga real de la extensión, layout, drag, popup, descargas, `storage.sync`, CSP | 12 escenarios × 6 navegadores |
| **S — Smoke de Release** | `npm run check` + script de paridad | Lint, tests, build limpio, validación de `manifest.json` y `_locales` | Cada release |
| **M — Manual Exploratoria** | Checklist por navegador | Plataformas reales autenticadas, temas claro/oscuro, zoom, accesibilidad | 1 pasada por release |

### 4.1 Comandos base actuales
```bash
npm ci
npm run lint                       # ESLint sobre src, tests, scripts y extension/popup.js
npm test                           # 40 pruebas automatizadas (12 en units.test.js + 28 en extension.test.js)
npm run build                      # Regenera extension/content.js con esbuild
node scripts/validate-extension.mjs # Valida manifest.json, permisos, Gecko ID, archivos y _locales
npm run check                      # lint + test + build
```

---

## 5. Casos de Prueba Detallados

### 5.1 Nivel U — Pruebas Unitarias (`tests/units.test.js`)

| ID | Módulo | Caso de prueba | Resultado esperado |
|---|---|---|---|
| U-01 | `storage.js` | `normalizeStoredState` con JSON corrupto, `null`, `undefined`, tipos erróneos | Descarta datos inválidos y devuelve estado por defecto seguro. |
| U-02 | `storage.js` | `normalizeStoredState` con vista válida completa | Conserva carpetas, asignaciones, candados y preferencias intactas. |
| U-03 | `storage.js` / `backup.js` | `sanitizeMap` y `normalizeStoredState` (S-05) con `__proto__`, `constructor`, `prototype` y colores hex inválidos | Bloquea claves peligrosas en `assignments` y `protectedIds` y normaliza colores a `#4285f4`. |
| U-04 | `storage.js` / `state.js` | `saveFolderData` bajo `QUOTA_BYTES_PER_ITEM` (8192 bytes) con 400 asignaciones y `saveView()` localOnly (S-01, S-02) | Nunca excede los 8 KB en `chrome.storage.sync`, conserva las 400 asignaciones en `localStorage` y `saveView()` no escribe en `sync`. |
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

### 5.3 Nivel E — E2E Cross-Browser (Últimas Versiones)

Ejecutar los siguientes escenarios en **Chrome, Edge, Brave, Opera, Firefox y Safari**:

| ID | Escenario E2E | Validación específica cross-browser |
|---|---|---|
| E-01 | Carga de extensión sin errores | `console.error` y `pageerror` en cero; `manifest.json` aceptado sin warnings bloqueantes. |
| E-02 | Popup de control (`popup.html`) | Abre correctamente desde la barra del navegador, cambia idioma (`es`/`en`) y sincroniza con pestaña activa. |
| E-03 | Panel flotante y Drag & Drop | Arrastrar panel y barra; verificar que no se sale del viewport y respeta `z-index` en Edge/Opera (con sidebars propios). |
| E-04 | Persistencia `storage.sync` + `localStorage` | Crear carpeta, recargar página, cerrar y reabrir navegador: estado intacto (especial atención a Brave Shields y Safari ITP). |
| E-05 | Trusted Types & CSP | Inyección de iconos SVG y estilos en Gemini/ChatGPT sin violaciones CSP en Chrome, Firefox y Safari. |
| E-06 | Descarga de respaldo JSON y Markdown | El archivo se descarga con nombre y contenido UTF-8 válidos en los 6 navegadores. |
| E-07 | Estilos Glass / Backdrop Filter | Verificar `backdrop-filter` / `-webkit-backdrop-filter` legible en temas claro y oscuro (especialmente Safari y Firefox). |

#### Guía de ejecución por navegador

1. **Chrome, Edge, Brave y Opera (Playwright Chromium):**
   - Usar `chromium.launchPersistentContext(userDataDir, { headless: false, args: ['--disable-extensions-except=extension', '--load-extension=extension'], executablePath })` apuntando al binario instalado de cada navegador (última versión estable).
2. **Firefox (última versión):**
   - Verificar/añadir `browser_specific_settings.gecko` en `manifest.json` para pruebas en Firefox.
   - Ejecutar con `npx web-ext run --source-dir=extension --firefox=firefox` (o Playwright Firefox con perfil de extensión).
3. **Safari (última versión en macOS):**
   - Convertir la extensión: `xcrun safari-web-extension-converter extension/ --project-location ./safari-build --app-name Foldy --no-open`.
   - Compilar en Xcode, habilitar *Allow Unsigned Extensions* en Safari > Desarrollar, y ejecutar la suite E2E/Manual sobre WebKit.

---

## 6. Criterios de Aceptación para Release

Un release de **Foldy** se considera **APROBADO** únicamente si:
1. `npm run check` (`lint` + `test` + `build`) termina con código `0` y **0 pruebas fallidas o saltadas**.
2. No quedan referencias residuales de marcas anteriores en UI o logs visibles.
3. Los escenarios **E-01 a E-07** pasan en las últimas versiones de **Chrome, Edge, Brave, Firefox, Opera y Safari**.
4. Las pruebas destructivas (I-16, I-20, I-21, I-22) pasan al 100% sin borrar elementos protegidos con candado.
