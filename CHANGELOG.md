# 📦 Foldy Changelog / Historial de Versiones

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
