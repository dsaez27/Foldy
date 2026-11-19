import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const extDir = join(root, 'extension');

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const manifestPath = join(extDir, 'manifest.json');
assert.ok(existsSync(manifestPath), 'extension/manifest.json debe existir');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

// 1. Versión y estructura MV3
assert.equal(manifest.manifest_version, 3, 'manifest_version debe ser 3');
assert.equal(manifest.version, pkg.version, `La versión de manifest.json (${manifest.version}) debe coincidir con package.json (${pkg.version})`);
assert.equal(manifest.default_locale, 'es', 'default_locale debe ser "es"');

// 2. Permisos y seguridad (S-07, G-03)
assert.ok(Array.isArray(manifest.permissions), 'permissions debe ser un array');
assert.ok(manifest.permissions.includes('storage'), 'manifest.permissions debe incluir "storage"');
assert.ok(manifest.permissions.includes('activeTab'), 'manifest.permissions debe incluir "activeTab"');
assert.equal(manifest.web_accessible_resources, undefined, 'web_accessible_resources no debe exponerse innecesariamente');

// 3. Compatibilidad Firefox Gecko MV3 (S-09)
const geckoId = manifest.browser_specific_settings?.gecko?.id;
assert.ok(typeof geckoId === 'string' && geckoId.includes('@'), 'browser_specific_settings.gecko.id debe estar definido');
assert.ok(
  typeof manifest.browser_specific_settings?.gecko?.strict_min_version === 'string',
  'browser_specific_settings.gecko.strict_min_version debe estar definido'
);

// 4. Existencia de archivos referenciados en manifest.json
const requiredFiles = new Set([
  manifest.action?.default_popup,
  'popup.js',
  'popup.css',
  ...Object.values(manifest.icons || {}),
  ...Object.values(manifest.action?.default_icon || {}),
  ...(manifest.content_scripts || []).flatMap((cs) => [...(cs.js || []), ...(cs.css || [])])
]);

for (const relPath of requiredFiles) {
  assert.ok(relPath, 'Ruta de archivo válida en manifest.json');
  const fullPath = join(extDir, relPath);
  assert.ok(existsSync(fullPath), `El archivo requerido extension/${relPath} no existe`);
  assert.ok(statSync(fullPath).size > 0, `El archivo extension/${relPath} está vacío`);
}

// 5. Validación de _locales y límites de tiendas (Chrome Web Store / Edge Add-ons / AMO) (S-16)
for (const locale of ['es', 'en']) {
  const msgPath = join(extDir, '_locales', locale, 'messages.json');
  assert.ok(existsSync(msgPath), `Debe existir extension/_locales/${locale}/messages.json`);
  const messages = JSON.parse(readFileSync(msgPath, 'utf8'));

  const extName = messages.extName?.message || '';
  const extDesc = messages.extDesc?.message || '';

  assert.ok(extName.length > 0 && extName.length <= 45, `[${locale}] extName debe tener entre 1 y 45 caracteres (actual: ${extName.length})`);
  assert.ok(extDesc.length > 0 && extDesc.length <= 132, `[${locale}] extDesc debe tener entre 1 y 132 caracteres (actual: ${extDesc.length})`);
}

console.log(`✔ Extensión Foldy v${manifest.version} validada correctamente (${requiredFiles.size} archivos, permisos, Gecko ID y _locales OK).`);
