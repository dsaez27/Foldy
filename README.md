<p align="center">
  <img src="assets/foldy-full.svg" alt="Foldy" width="380" />
</p>

<h1 align="center">Foldy v3.6.0 — Universal Smart Folders & Chat Manager for Gemini, ChatGPT, Claude, DeepSeek & OpenCode</h1>

<p align="center">
  <a href="#-english">🇺🇸 English</a> · <a href="#-español">🇪🇸 Español</a> · <a href="CHANGELOG.md">📦 Changelog</a> · <a href="TESTING_PLAN.md">🧪 Testing Plan</a>
</p>

---

## 🇺🇸 English

**Foldy** is a universal WebExtension (Manifest V3) for **Chrome, Edge, Brave, Opera, Firefox, and Safari** that upgrades your workflow across **Google Gemini**, **OpenAI ChatGPT**, **Anthropic Claude**, **DeepSeek**, and **OpenCode**. It adds smart folders with keyword auto-classification, automatic cloud synchronization (`chrome.storage.sync`), a 1-click Quick Prompt Vault, a control popup with platform statistics, keyboard shortcuts, a collapsible floating toolbar, instant search, chat lock protection, range multi-selection (`Shift + Click`), safe bulk deletion, Markdown export, and JSON backup/restore.

### ✨ Highlights in v3.6.0

- 🎨 **Per-Platform Adaptive Identity (`D-01`)**: Automatically adapts accent colors, radii, surface warmth, font stacks, and the Foldy SVG logo gradient to **Gemini**, **ChatGPT**, **Claude**, **DeepSeek**, and **OpenCode**.
- 🧩 **Clean Sidebar Rows & Contextual Action Dock (`D-02`, `D-03`)**: Reclaims title space with a `3px` folder accent bar, expandable micro-dot pill, progressive hover/selection checkboxes, and an elastic floating action dock with `<kbd>` shortcut hints.
- 📁 **Quick Folder Editing & SVG Empty State (`D-04`)**: Edit folder names, colors, and auto-rules in-place without losing chat assignments, plus an illustrated empty state when filters return zero matches.
- ⚡ **Command-Palette Prompt Vault & Sync Quota Meter (`D-05`, `D-06`)**: Instant search, category tags, monospace preview, and copy/edit/insert actions in the Prompt Vault, plus a real-time `chrome.storage.sync` quota meter (`KB / 8.0 KB`) in the popup.

- 🌐 **Universal Multi-AI Support**: Works seamlessly on **Gemini**, **ChatGPT** (including `/codex/tasks/` & cloud tasks), **Claude**, **DeepSeek**, and **OpenCode**.
- ☁️ **Hardened Cloud Sync (`chrome.storage.sync`)**: Real-time additive merge between local and cloud storage, self-echo suppression on `storage.onChanged`, and automatic payload compaction below Chrome's 8 KB `QUOTA_BYTES_PER_ITEM` limit.
- 🎨 **Host-Aware Dark & Light Theme + WCAG AA Accessibility**: Automatically detects and syncs with the active AI platform's theme (`data-gcm-theme="light|dark"`), with high-contrast tokens (`>= 4.5:1`), `:focus-visible` rings, keyboard-accessible pills/locks/swatches, and `Escape` modal dismissal.
- ⚡ **Quick Prompts Vault (`src/prompts.js`)**: Reusable prompt library with 1-click rich paragraph `<p>` injection into **ProseMirror** (ChatGPT/Claude), **Quill/RichTextarea** (Gemini), and standard textareas.
- 🔒 **Lock Protection & Safe Bulk Deletion (`src/deletion.js`)**: Protect important conversations with a lock badge (`🔒`), select ranges with `Shift + Click`, auto-load history in the background, and safely bulk-delete unlocked chats via DOM or authenticated API.
- 🎛️ **Extension Popup & Shortcuts (`extension/popup.html`)**: Live platform counters, instant English/Spanish switcher, direct JSON backup/import, and keyboard shortcuts (`Alt+Shift+F` to toggle panel, `Alt+Shift+S` to focus search).

### 🗂️ Project Structure

```text
├── src/                           ES Module source code
│   ├── content.js                 Entry point (boots on Gemini/ChatGPT/Claude/DeepSeek/OpenCode)
│   ├── main.js                    refreshUI, init, host theme sync, and DOM MutationObserver
│   ├── platform.js                Platform detection, host theme detector, and universal selectors
│   ├── i18n.js                    Bilingual dictionary (EN/ES) and default folders/prompts
│   ├── storage.js                 Hybrid localStorage + chrome.storage.sync persistence & quota guard
│   ├── state.js                   Shared mutable runtime state
│   ├── prompts.js                 Quick Prompts Vault and ProseMirror/Quill/textarea injection
│   ├── sidebar.js                 Conversation row/ID/title detection (href, UUID, task_, FNV-1a jslog)
│   ├── folders.js                 Keyword auto-classification, badges, filtering, and sorting
│   ├── panel.js                   Draggable floating folders panel, shortcuts, and message listeners
│   ├── toolbar.js                 Draggable collapsible top/vertical action toolbar
│   ├── selection.js               Checkboxes, Shift+Click range selection, folder popover, lock toggle
│   ├── dialogs.js                 Accessible modals (role="dialog", Escape) and progress toast
│   ├── deletion.js                DOM & authenticated ChatGPT/Codex API bulk deletion engine
│   ├── backup.js                  JSON configuration export and sanitized import
│   ├── markdown-export.js         Selected index & active conversation Markdown (.md) exporter
│   ├── autoscroll.js              Silent background history auto-scroller
│   ├── icons.js                   Trusted Types CSP-safe programmatic SVG icon builders
│   └── utils.js                   DOM utilities (Radix/Material realClick, overlay polling)
├── tests/                         40 automated unit & DOM integration tests (node:test + jsdom)
├── scripts/
│   ├── build.mjs                  esbuild bundler
│   ├── validate-extension.mjs     Manifest, permissions, Gecko ID, and _locales validator
│   └── update_github_releases.mjs Bilingual GitHub Releases synchronization script
└── extension/                     ← Unpacked extension ready to load in browsers
    ├── manifest.json
    ├── content.js                 GENERATED from src/ (do not edit manually)
    ├── styles.css
    ├── popup.html / popup.css / popup.js
    └── icons/  _locales/
```

### 🛠️ Development & Verification

```bash
npm install
npm run build                      # Bundles src/ into extension/content.js
npm run watch                      # Rebuilds automatically on file changes
npm run lint                       # ESLint across src, tests, scripts, and extension/popup.js (0 errors)
npm test                           # Runs all 40 unit and DOM integration tests (node:test + jsdom)
node scripts/validate-extension.mjs # Validates manifest.json, permissions, Gecko ID, and _locales
npm run check                      # Runs lint + test + build
```

---

## 🇪🇸 Español

**Foldy** es una extensión universal de navegador (Manifest V3) para **Chrome, Edge, Brave, Opera, Firefox y Safari** que transforma tu experiencia en **Google Gemini**, **OpenAI ChatGPT**, **Anthropic Claude**, **DeepSeek** y **OpenCode**: añade carpetas inteligentes con clasificación automática por palabras clave, sincronización automática en la nube (`chrome.storage.sync`), bóveda de Prompts rápidos en 1 clic, popup de control con estadísticas por plataforma, atajos de teclado, barra de acciones contraíble, búsqueda instantánea, protección de chats con candado, selección múltiple por rango (`Shift + Clic`), borrado masivo seguro, exportación a Markdown y respaldo/importación en JSON.

### ✨ Novedades en v3.6.0

- 🎨 **Identidad Adaptativa por Plataforma (`D-01`)**: Adapta automáticamente acentos, radios, calidez de superficie, tipografía y degradado del logo Foldy a **Gemini**, **ChatGPT**, **Claude**, **DeepSeek** y **OpenCode**.
- 🧩 **Filas Despejadas y Dock Contextual (`D-02`, `D-03`)**: Libera ancho para los títulos con barra lateral de `3px`, micro-punto expansible, checkboxes progresivos y barra contextual con atajos `<kbd>`.
- 📁 **Edición Rápida de Carpetas y Estado Vacío SVG (`D-04`)**: Edita nombre, color y auto-reglas sin perder asignaciones de chats, más tarjeta ilustrada cuando el filtro da 0 resultados.
- ⚡ **Bóveda Command Palette y Medidor de Cuota Sync (`D-05`, `D-06`)**: Buscador instantáneo, etiquetas, vista previa monoespacio y copiar/editar/insertar en Prompts, más medidor en vivo de `chrome.storage.sync` (`KB / 8.0 KB`) en el popup.

- 🌐 **Soporte Universal Multi-IA**: Compatible con **Gemini**, **ChatGPT** (incluyendo `/codex/tasks/` y tareas en la nube), **Claude**, **DeepSeek** y **OpenCode**.
- ☁️ **Cloud Sync Blindado (`chrome.storage.sync`)**: Fusión aditiva en tiempo real entre datos locales y en la nube, supresión de eco propio en `storage.onChanged` y compactación automática bajo el límite de 8 KB (`QUOTA_BYTES_PER_ITEM`) de Chrome.
- 🎨 **Tema Claro/Oscuro Adaptativo al Host y Accesibilidad WCAG AA**: Detecta y sincroniza automáticamente el tema real de la plataforma web (`data-gcm-theme="light|dark"`), con tokens de alto contraste (`>= 4.5:1`), anillos `:focus-visible`, navegación por teclado en píldoras/candados/colores y cierre con `Escape` en todos los modales.
- ⚡ **Bóveda de Prompts Rápidos (`src/prompts.js`)**: Biblioteca reutilizable de prompts con inserción de párrafos `<p>` en 1 clic compatible con **ProseMirror** (ChatGPT/Claude), **Quill/RichTextarea** (Gemini) y `<textarea>`.
- 🔒 **Protección con Candado y Borrado Masivo Seguro (`src/deletion.js`)**: Protege conversaciones críticas con candado (`🔒`), selecciona rangos con `Shift + Clic`, carga el historial en segundo plano y elimina en lote de forma segura vía DOM o API autenticada.
- 🎛️ **Popup de Control y Atajos (`extension/popup.html`)**: Métricas en vivo por plataforma, selector instantáneo Español/Inglés, respaldo e importación JSON directa y atajos de teclado (`Alt+Shift+F` para mostrar/ocultar panel, `Alt+Shift+S` para buscar).

### 🗂️ Estructura del Proyecto

```text
├── src/                           Código fuente (módulos ES)
│   ├── content.js                 Punto de entrada (arranca en Gemini/ChatGPT/Claude/DeepSeek/OpenCode)
│   ├── main.js                    refreshUI, init, sincronización de tema y MutationObserver del DOM
│   ├── platform.js                Detección de plataforma, detector de tema host y selectores universales
│   ├── i18n.js                    Diccionario bilingüe (EN/ES) y plantillas por defecto
│   ├── storage.js                 Persistencia híbrida localStorage + chrome.storage.sync y control de cuota
│   ├── state.js                   Estado compartido en tiempo de ejecución
│   ├── prompts.js                 Bóveda de Prompts rápidos e inyección en ProseMirror/Quill/textarea
│   ├── sidebar.js                 Detección de filas/IDs/títulos (href, UUID, task_, hash FNV-1a jslog)
│   ├── folders.js                 Auto-clasificación por palabras clave, insignias, filtros y orden
│   ├── panel.js                   Panel flotante arrastrable de carpetas, atajos y oyentes de mensajes
│   ├── toolbar.js                 Barra de acciones arrastrable y contraíble (horizontal/vertical)
│   ├── selection.js               Checkboxes, selección por rango Shift+Clic, popover de carpetas y candado
│   ├── dialogs.js                 Modales accesibles (role="dialog", Escape) y avisos toast con progreso
│   ├── deletion.js                Motor de borrado masivo por DOM y API autenticada (ChatGPT/Codex)
│   ├── backup.js                  Exportación e importación JSON sanitizada
│   ├── markdown-export.js         Exportador a Markdown (.md) de índice seleccionado y chat activo
│   ├── autoscroll.js              Carga automática silenciosa del historial en segundo plano
│   ├── icons.js                   Constructores programáticos de iconos SVG (100% compatibles con CSP)
│   └── utils.js                   Utilidades de DOM (realClick para Radix/Material, polling de overlays)
├── tests/                         40 pruebas automatizadas unitarias y de integración (node:test + jsdom)
├── scripts/
│   ├── build.mjs                  Empaquetado con esbuild
│   ├── validate-extension.mjs     Validador de manifest.json, permisos, Gecko ID y _locales
│   └── update_github_releases.mjs Script de sincronización bilingüe de GitHub Releases
└── extension/                     ← Extensión lista para cargar en el navegador
    ├── manifest.json
    ├── content.js                 GENERADO desde src/ (no editar a mano)
    ├── styles.css
    ├── popup.html / popup.css / popup.js
    └── icons/  _locales/
```

### 🛠️ Desarrollo y Verificación

```bash
npm install
npm run build                      # Empaqueta src/ dentro de extension/content.js
npm run watch                      # Recompila automáticamente al guardar cambios
npm run lint                       # ESLint en src, tests, scripts y extension/popup.js (0 errores)
npm test                           # Ejecuta las 40 pruebas unitarias y de integración (node:test + jsdom)
node scripts/validate-extension.mjs # Valida manifest.json, permisos, Gecko ID y _locales
npm run check                      # Ejecuta lint + test + build
```
