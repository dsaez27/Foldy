# 📦 Foldy Changelog / Historial de Versiones

---

## [v3.8.0] - 2026-11-20

### 🇺🇸 English
- **5-Preset Visual Theme Engine**: Added 5 distinct visual styles (`Adaptive`, `Neo-Brutal`, `Terminal`, `Minimal Flat`, `Neon Synth`) selectable live from the popup (`data-gcm-style`) across light and dark host themes.
- **Unified Cross-Platform Sync (`gcm_shared_config_v1`)**: Folders, auto-rules, Prompt Vault, language, and visual theme now sync automatically across Gemini, ChatGPT, Claude, DeepSeek, and OpenCode tabs (and across PCs via `chrome.storage.sync`), keeping per-platform chat assignments isolated.
- **Cross-Browser Sync Code (`foldy1:`)**: Copy & Apply Sync Code in the popup using native `CompressionStream('gzip')` + Base64url to transfer your setup between Chrome, Edge, and Brave in seconds without external servers.
- **Private GitHub Gist Sync**: Optional automatic sync via private GitHub Gist (`foldy-sync.json`) in the popup, keeping the personal token strictly in `chrome.storage.local` and merging by `updatedAt`.

### 🇪🇸 Español
- **Motor de 5 Estilos Visuales**: 5 temas distintos (`Adaptive`, `Neo-Brutal`, `Terminal`, `Minimal Flat`, `Neon Synth`) seleccionables en vivo desde el popup (`data-gcm-style`) en modo claro y oscuro.
- **Sincronización Unificada Multi-Plataforma (`gcm_shared_config_v1`)**: Carpetas, auto-reglas, Bóveda de Prompts, idioma y tema visual ahora se sincronizan automáticamente entre Gemini, ChatGPT, Claude, DeepSeek y OpenCode (y entre PCs vía `chrome.storage.sync`), manteniendo aisladas las asignaciones por plataforma.
- **Sync Code entre Navegadores (`foldy1:`)**: Botones Copiar y Aplicar Sync Code en el popup usando `CompressionStream('gzip')` nativo + Base64url para llevar tu configuración entre Chrome, Edge y Brave sin servidores externos.
- **Sync Automático con GitHub Gist Privado**: Sincronización opcional en el popup contra un Gist privado (`foldy-sync.json`), guardando el token solo en `chrome.storage.local` y resolviendo cambios por `updatedAt`.

---

## [v3.7.0] - 2026-11-20

### 🇺🇸 English
- **Native Drag & Drop + 5s Undo (`D-07`)**: Drag chat rows directly onto folder pills (or Unassigned) with dropzone highlight and a 5-second Undo toast (`.gcm-toast-undo`) with animated countdown bar to revert assignments.
- **Instant Global Search**: Real-time `#gcm-search-input` filtering without debounce (`Escape` to clear) combined with active folder and lock filters.
- **Dynamic Prompt Variables (`{{var}}`)**: Automatically detects `{{variable}}` placeholders in Prompt Vault (`matchAll` + `Set`) and opens a quick-fill modal before inserting into the chat.
- **Modern Lightweight CSS**: Native CSS nesting, `color-mix()`, `@starting-style`, `:has()`, `cubic-bezier` micro-interactions, and `prefers-reduced-motion` support with zero external dependencies.

### 🇪🇸 Español
- **Drag & Drop Nativo + Deshacer en 5s (`D-07`)**: Arrastra conversaciones directamente sobre las píldoras de carpetas (o Sin asignar) con resaltado de zona de caída y toast **Deshacer** de 5 segundos con barra de progreso animada.
- **Búsqueda Global Instantánea**: Filtrado en tiempo real con `#gcm-search-input` sin retardo (`Escape` para limpiar), combinado con filtros de carpeta y candado.
- **Variables Dinámicas en Prompts (`{{var}}`)**: Detecta automáticamente placeholders `{{variable}}` en la Bóveda de Prompts (`matchAll` + `Set`) y abre un modal rápido para rellenar valores antes de insertar.
- **CSS Moderno y Liviano**: Nesting CSS nativo, `color-mix()`, `@starting-style`, `:has()`, micro-interacciones `cubic-bezier` y soporte `prefers-reduced-motion` sin dependencias externas.

---

## [v3.6.0] - 2026-11-20

### 🇺🇸 English
- **Per-Platform Adaptive Identity (`D-01`)**: Stamped `data-gcm-platform` (`gemini`, `chatgpt`, `claude`, `deepseek`, `opencode`) to dynamically adapt accent RGB tokens, border radii, surface warmth, native font stacks, and the Foldy SVG logo gradient.
- **Compact Sidebar Rows & Contextual Action Dock (`D-02`, `D-03`)**: Reclaimed horizontal title space with a `3px` colored folder accent bar, expandable micro-dot badge, progressive hover/selection checkboxes (`data-gcm-selection-mode`), and a contextual Selection Action Dock with `#gcm-selection-pill`, vertical dividers, and `<kbd>` hints (`M`, `L`, `⌫`).
- **Quick Folder Editing & Illustrated Empty State (`D-04`)**: Added auto-rule sparkle indicator, in-pill edit pencil (`openCreateFolderModal` edit mode preserving assignments), `tabular-nums` counters, and `#gcm-empty-state` SVG card with 1-click reset.
- **Command-Palette Prompt Vault & Popup Quota Meter (`D-05`, `D-06`)**: Upgraded the Prompt Vault with instant search, collapsible create/edit drawer, category tags, monospace preview, and copy/edit/insert actions; added a real-time `chrome.storage.sync` quota meter (`KB / 8.0 KB`) and platform proportion bars in the popup.

### 🇪🇸 Español
- **Identidad Adaptativa por Plataforma (`D-01`)**: Estampado de `data-gcm-platform` (`gemini`, `chatgpt`, `claude`, `deepseek`, `opencode`) para adaptar dinámicamente tokens de acento, radios, superficies, tipografías nativas y el degradado del logo Foldy.
- **Filas Compactas y Dock Contextual de Selección (`D-02`, `D-03`)**: Recuperación de ancho para títulos con barra lateral de `3px`, micro-punto expansible, checkboxes progresivos (`data-gcm-selection-mode`) y barra contextual con contador `#gcm-selection-pill`, separadores e insignias `<kbd>` (`M`, `L`, `⌫`).
- **Edición Rápida de Carpetas y Estado Vacío Ilustrado (`D-04`)**: Indicador de auto-reglas, botón lápiz para editar sin perder asignaciones, contadores `tabular-nums` y tarjeta SVG `#gcm-empty-state` con reinicio en 1 clic.
- **Bóveda Command Palette y Medidor de Cuota en Popup (`D-05`, `D-06`)**: Búsqueda instantánea, drawer colapsable de creación/edición, etiquetas de categoría, vista previa monoespacio y acciones copiar/editar/insertar en Prompts; medidor en vivo de `chrome.storage.sync` (`KB / 8.0 KB`) y barras de proporción por plataforma en el popup.

---

## [v3.5.7] - 2026-11-19

### 🇺🇸 English
- **Cloud Sync Quota & Merge Protection**: Added additive local/cloud merge in `initCloudSync`, self-echo suppression on `storage.onChanged`, `QUOTA_BYTES_PER_ITEM` (8 KB) payload compaction, and `localOnly` view persistence to prevent quota exhaustion.
- **Hardened Deletion & ID Resolution**: Strict exact/truncated-task matching in `resolveChatGptIdByTitle`, FNV-1a 64-bit hashing for Gemini `jslog` IDs, accurate active-chat redirect tracking, and full selection cleanup on `toggleSelectAll(false)` across filtered views.
- **Host-Aware Theme, WCAG AA Contrast & Accessibility**: Automatic `data-gcm-theme="light|dark"` synchronization with the host AI platform DOM, high-contrast light mode tokens (`#174ea6`), keyboard-accessible pills/locks/swatches, `:focus-visible` rings, modal `Escape` handling, and rich paragraph `<p>` insertion for ProseMirror/Quill editors.
- **Popup & Firefox MV3 Support**: Added `activeTab` permission, direct file-chooser import from popup with user activation, `browser_specific_settings.gecko.id`, and expanded the automated test suite to 40 tests.

### 🇪🇸 Español
- **Protección de Cuota y Fusión en Cloud Sync**: Fusión aditiva entre datos locales y de la nube en `initCloudSync`, supresión de eco propio en `storage.onChanged`, compactación bajo el límite `QUOTA_BYTES_PER_ITEM` (8 KB) y guardado `localOnly` de la vista.
- **Seguridad en Borrado e Identificadores**: Coincidencia estricta por título en `resolveChatGptIdByTitle`, hash FNV-1a de 64 bits para IDs `jslog` en Gemini, seguimiento exacto de chats borrados para redirección y limpieza total de `selectedMap` al desmarcar "Todo" con filtros activos.
- **Tema Adaptativo al Host, Contraste WCAG AA y Accesibilidad**: Sincronización automática `data-gcm-theme="light|dark"` con el DOM de la plataforma de IA, tokens de alto contraste en modo claro (`#174ea6`), navegación por teclado, anillos `:focus-visible`, cierre con `Escape` en modales e inserción de párrafos `<p>` en editores ProseMirror/Quill.
- **Popup y Soporte Firefox MV3**: Permiso `activeTab`, importación JSON directa desde el popup con activación de usuario, `browser_specific_settings.gecko.id` y ampliación de la suite a 40 pruebas automatizadas.

---

## [v3.5.6] - 2026-11-05

### 🇺🇸 English
- **Store Compliance**: Shortened localized name and description to strictly meet Microsoft Edge Add-ons and Chrome Web Store validation limits (name under 75 characters).
- **Metadata Polish**: Updated manifest and localized dictionaries for seamless edge store approval.

### 🇪🇸 Español
- **Cumplimiento de Tiendas**: Ajuste de nombres y descripciones localizadas para cumplir estrictamente con los límites de Microsoft Edge Add-ons y Chrome Web Store (nombre menor a 75 caracteres).
- **Pulido de Metadatos**: Actualización del manifiesto y diccionarios de idiomas para aprobación sin observaciones.

---

## [v3.5.5] - 2026-11-05

### 🇺🇸 English
- **Invisible Background Loading**: Chat history now loads smoothly in the background when selecting all chats, avoiding abrupt page jumps.
- **Silent Multi-select**: Suppressed repetitive loading toasts for a distraction-free user experience.

### 🇪🇸 Español
- **Carga Invisible en Segundo Plano**: El historial de chats se carga de forma silenciosa en segundo plano al seleccionar todo, evitando saltos bruscos en la pantalla.
- **Selección Múltiple Silenciosa**: Se eliminaron las notificaciones emergentes repetitivas durante la carga para una experiencia limpia.

---

## [v3.5.4] - 2026-11-05

### 🇺🇸 English
- **Streamlined Collapsible Panel**: Removed the language toggle button from the floating collapsible panel to keep the interface minimal.
- **Cleaner Minimized State**: The "+ Add Folder" button is now automatically hidden when the panel is minimized.

### 🇪🇸 Español
- **Panel Contraíble Simplificado**: Se eliminó el botón de idioma del panel flotante para mantener una interfaz minimalista.
- **Modo Minimizado Limpio**: El botón "+ Carpeta" ahora se oculta automáticamente cuando el panel está minimizado.

---

## [v3.5.3] - 2026-11-05

### 🇺🇸 English
- **Popup Language Switcher**: The language toggle (English / Spanish) is now conveniently located in the extension popup menu.
- **Full Popup Localization**: Translated all metrics, labels, shortcuts, and hints in `popup.html`.

### 🇪🇸 Español
- **Selector de Idioma en Popup**: El cambio de idioma (Inglés / Español) ahora se gestiona directamente desde el menú popup de la extensión.
- **Traducción Completa del Popup**: Todas las etiquetas, atajos, métricas y consejos de `popup.html` cuentan con traducción bilingüe completa.

---

## [v3.5.2] - 2026-11-05

### 🇺🇸 English
- **Modern Checkbox Redesign**: Upgraded chat checkboxes with fluid SVG checkmarks, glowing borders, and rounded modern styling.
- **Spring Animations**: Added smooth CSS spring animations to buttons, dropdown menus, and animated row removals during chat deletion.

### 🇪🇸 Español
- **Rediseño Moderno de Checkboxes**: Checkboxes renovados con tilde SVG fluida, bordes iluminados y diseño redondeado moderno.
- **Animaciones Spring**: Incorporación de animaciones suaves con rebote para botones, menús desplegables y desvanecimiento al eliminar chats.

---

## [v3.5.1] - 2026-11-05

### 🇺🇸 English
- **Auto-scroll & Auto-check on Select All**: "Select All" now automatically loads and checks all visible conversation rows.
- **Centralized Backup & Import**: Moved Backup and Restore JSON buttons into the extension popup for easier access.

### 🇪🇸 Español
- **Auto-scroll y Selección Automática**: La opción "Seleccionar Todo" ahora carga y marca automáticamente todas las conversaciones del historial.
- **Respaldo e Importación Centralizada**: Botones de Guardar e Importar JSON reubicados en el menú popup de la extensión.

---

## [v3.5.0] - 2026-11-05

### 🇺🇸 English
- **ChatGPT DOM Stability**: Fixed issue where conversation rows could disappear on initial page load across recent ChatGPT interface updates.
- **Reliable Element Matching**: Hardened sidebar observers to maintain persistent folder injections.

### 🇪🇸 Español
- **Estabilidad en el DOM de ChatGPT**: Corrección de fallo donde los chats podían desaparecer al cargar la página tras actualizaciones de ChatGPT.
- **Detección Confiable de Elementos**: Observadores de barra lateral reforzados para inyección permanente de carpetas.

---

## [v3.4.0] - 2026-11-04

### 🇺🇸 English
- **Universal Multi-AI Support**: Full compatibility with **ChatGPT**, **Google Gemini**, **Anthropic Claude**, **DeepSeek**, and **OpenCode**.
- **Automatic Cloud Sync (`chrome.storage.sync`)**: Real-time synchronization of folders, rules, prompts, and locked chats across all your browsers.
- **Quick Prompts Vault**: Built-in reusable productivity prompt vault with 1-click injection into active AI chat composer.
- **Protection Lock**: Prevent accidental deletion of critical chats with one-tap lock protection.

### 🇪🇸 Español
- **Soporte Universal Multi-IA**: Compatibilidad completa con **ChatGPT**, **Google Gemini**, **Anthropic Claude**, **DeepSeek** y **OpenCode**.
- **Sincronización Automática en la Nube (`chrome.storage.sync`)**: Sincronización en tiempo real de carpetas, reglas, prompts y chats protegidos entre navegadores.
- **Bóveda de Prompts Rápidos**: Biblioteca integrada de prompts de alta productividad con inserción en 1 clic en el editor de chat activo.
- **Candado de Protección**: Bloqueo con un toque para evitar la eliminación accidental de chats importantes.
