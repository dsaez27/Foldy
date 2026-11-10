import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Canvas dimensions (Standard Microsoft Edge Add-ons Store Promo Banner: 1280 x 800)
W, H = 1280, 800

# Fonts
font_title = ImageFont.truetype('C:\\Windows\\Fonts\\segoeuib.ttf', 44)
font_subtitle = ImageFont.truetype('C:\\Windows\\Fonts\\segoeui.ttf', 20)
font_sec = ImageFont.truetype('C:\\Windows\\Fonts\\segoeuib.ttf', 24)
font_body = ImageFont.truetype('C:\\Windows\\Fonts\\segoeui.ttf', 14)
font_body_b = ImageFont.truetype('C:\\Windows\\Fonts\\segoeuib.ttf', 14)
font_small = ImageFont.truetype('C:\\Windows\\Fonts\\segoeui.ttf', 12)
font_badge = ImageFont.truetype('C:\\Windows\\Fonts\\segoeuib.ttf', 11)

# Create base canvas with premium dark gradient
base = Image.new('RGBA', (W, H), (15, 17, 23, 255))
draw = ImageDraw.Draw(base)

# Gradient background (deep indigo/slate modern look)
for y in range(H):
    r = int(14 + (y / H) * 12)
    g = int(17 + (y / H) * 14)
    b = int(24 + (y / H) * 22)
    draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

# Subtle decorative gradient glow orbs in the background
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
gdraw.ellipse([650, -50, 1350, 650], fill=(66, 133, 244, 45))
gdraw.ellipse([-100, 350, 500, 950], fill=(91, 110, 247, 30))
glow = glow.filter(ImageFilter.GaussianBlur(120))
base = Image.alpha_composite(base, glow)
draw = ImageDraw.Draw(base)

# Load Logo
logo_path = r'C:\Users\Admin Lab\Proyectos\ChatFold\assets\chatfold-icon-transparent-uhd.png'
if os.path.exists(logo_path):
    logo_img = Image.open(logo_path).convert('RGBA')
    logo_img = logo_img.resize((56, 56), Image.Resampling.LANCZOS)
    base.paste(logo_img, (60, 48), logo_img)

# Header Text
draw.text((128, 48), 'Chat', font=font_title, fill=(255, 255, 255, 255))
draw.text((226, 48), 'Fold', font=font_title, fill=(138, 180, 248, 255))
draw.text((60, 116), 'Organiza tus chats de IA en carpetas inteligentes y potencia tu flujo de trabajo', font=font_subtitle, fill=(189, 193, 198, 255))

# Top Right Badges (Supported Platforms)
platforms = [('ChatGPT', '#10a37f'), ('Gemini', '#4285f4'), ('Claude', '#d97757'), ('DeepSeek', '#4d6bfe'), ('OpenCode', '#a142f4')]
bx = 710
by = 56
for name, col in platforms:
    # Pill bg
    pw = len(name) * 8 + 32
    draw.rounded_rectangle([bx, by, bx + pw, by + 30], radius=15, fill=(255, 255, 255, 14), outline=(255, 255, 255, 30))
    # Color dot
    draw.ellipse([bx + 10, by + 10, bx + 20, by + 20], fill=col)
    draw.text((bx + 26, by + 6), name, font=font_small, fill=(235, 237, 240, 255))
    bx += pw + 8

# Store Tag Badge in top-right
draw.rounded_rectangle([1075, 112, 1220, 140], radius=14, fill=(0, 120, 212, 40), outline=(0, 120, 212, 160))
draw.text((1090, 118), 'Microsoft Edge', font=font_badge, fill=(100, 180, 255, 255))

# -------------------------------------------------------------
# Simulated Browser Mockup Window (Showing ChatGPT with ChatFold)
# -------------------------------------------------------------
mx, my, mw, mh = 60, 165, 840, 580

# Window drop shadow
shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
sdraw = ImageDraw.Draw(shadow)
sdraw.rounded_rectangle([mx - 6, my - 6, mx + mw + 6, my + mh + 14], radius=18, fill=(0, 0, 0, 130))
shadow = shadow.filter(ImageFilter.GaussianBlur(16))
base = Image.alpha_composite(base, shadow)
draw = ImageDraw.Draw(base)

# Browser Window Container
draw.rounded_rectangle([mx, my, mx + mw, my + mh], radius=14, fill=(24, 26, 32, 255), outline=(255, 255, 255, 25))

# Browser Top Title Bar
draw.rounded_rectangle([mx, my, mx + mw, my + 38], radius=14, fill=(18, 20, 26, 255))
draw.rectangle([mx, my + 24, mx + mw, my + 38], fill=(18, 20, 26, 255)) # Square bottom corners of title bar
draw.line([(mx, my + 38), (mx + mw, my + 38)], fill=(255, 255, 255, 18))

# Window Controls (macOS / modern style dots)
draw.ellipse([mx + 14, my + 13, mx + 24, my + 23], fill=(239, 68, 68, 220))
draw.ellipse([mx + 30, my + 13, mx + 40, my + 23], fill=(245, 158, 11, 220))
draw.ellipse([mx + 46, my + 13, mx + 56, my + 23], fill=(16, 185, 129, 220))

# Browser URL Pill
draw.rounded_rectangle([mx + 180, my + 7, mx + 620, my + 31], radius=8, fill=(32, 34, 42, 255), outline=(255, 255, 255, 15))
draw.text((mx + 280, my + 10), '🔒 https://chatgpt.com', font=font_small, fill=(140, 145, 155, 255))

# Sidebar Area (ChatGPT Sidebar on left: 260px width)
sb_w = 260
draw.rectangle([mx, my + 39, mx + sb_w, my + mh], fill=(20, 22, 28, 255))
draw.line([(mx + sb_w, my + 39), (mx + sb_w, my + mh)], fill=(255, 255, 255, 15))

# Sidebar Header: New Chat
draw.rounded_rectangle([mx + 14, my + 52, mx + sb_w - 14, my + 86], radius=8, fill=(255, 255, 255, 10), outline=(255, 255, 255, 16))
draw.text((mx + 28, my + 60), '+  Nuevo chat', font=font_body, fill=(240, 242, 245, 255))

# History Section Label
draw.text((mx + 16, my + 100), 'Historial de chats', font=font_small, fill=(120, 125, 135, 255))

# Chat rows with ChatFold Checkboxes, Badges and Locks
sample_chats = [
    ('Refactorización API Backend', 'Programación', '#4285f4', True, True, True),
    ('Estrategia de Lanzamiento 2026', 'Trabajo', '#34a853', False, True, False),
    ('Resumen Paper Transformers', 'Estudio', '#a142f4', True, False, False),
    ('Ideas para App Móvil UI/UX', 'Ideas', '#fbbc04', False, True, False),
    ('Script Automatización Python', 'Programación', '#4285f4', True, False, True),
    ('Plan de Entrenamiento Gym', 'Personal', '#ea4335', False, False, False),
    ('Cotización Servidores Cloud', 'Trabajo', '#34a853', True, False, False),
]

ry = my + 124
for title, folder_name, color, checked, locked, has_badge in sample_chats:
    # Row background (if selected / checked)
    if checked:
        draw.rounded_rectangle([mx + 8, ry - 3, mx + sb_w - 8, ry + 33], radius=8, fill=(66, 133, 244, 40), outline=(138, 180, 248, 70))
    else:
        draw.rounded_rectangle([mx + 8, ry - 3, mx + sb_w - 8, ry + 33], radius=8, fill=(255, 255, 255, 4))

    # ChatFold Custom Checkbox (18x18, Spring styled)
    cb_x, cb_y = mx + 16, ry + 5
    if checked:
        draw.rounded_rectangle([cb_x, cb_y, cb_x + 18, cb_y + 18], radius=5, fill=(37, 99, 235, 255), outline=(147, 197, 253, 255))
        # White checkmark lines
        draw.line([(cb_x + 4, cb_y + 9), (cb_x + 8, cb_y + 14)], fill=(255, 255, 255, 255), width=2)
        draw.line([(cb_x + 8, cb_y + 14), (cb_x + 14, cb_y + 5)], fill=(255, 255, 255, 255), width=2)
    else:
        draw.rounded_rectangle([cb_x, cb_y, cb_x + 18, cb_y + 18], radius=5, fill=(30, 32, 40, 255), outline=(255, 255, 255, 70))

    # Title
    t_disp = title if len(title) < 20 else title[:18] + '...'
    draw.text((mx + 42, ry + 6), t_disp, font=font_body, fill=(240, 242, 245, 255))

    # Translucent Glass Folder Badge
    if has_badge:
        bw = len(folder_name) * 6 + 18
        bx_badge = mx + sb_w - bw - (28 if locked else 12)
        draw.rounded_rectangle([bx_badge, ry + 5, bx_badge + bw, ry + 21], radius=8, fill=(18, 20, 26, 180), outline=color)
        draw.ellipse([bx_badge + 5, ry + 10, bx_badge + 11, ry + 16], fill=color)
        draw.text((bx_badge + 15, ry + 6), folder_name[:5], font=font_badge, fill=(240, 240, 245, 255))

    # Lock icon if protected
    if locked:
        lx = mx + sb_w - 22
        draw.rounded_rectangle([lx, ry + 6, lx + 14, ry + 20], radius=4, fill=(251, 188, 4, 40), outline=(251, 188, 4, 200))
        draw.text((lx + 3, ry + 6), '🔒', font=ImageFont.truetype('C:\\Windows\\Fonts\\seguiemj.ttf', 9), fill=(255, 255, 255, 255))

    ry += 42

# Main Chat Content Area
cx = mx + sb_w + 30
draw.text((cx, my + 60), 'ChatGPT 4o', font=font_sec, fill=(255, 255, 255, 255))

# Simulated message bubbles
# User query
draw.rounded_rectangle([cx, my + 106, mx + mw - 40, my + 146], radius=10, fill=(35, 38, 46, 255))
draw.text((cx + 16, my + 118), '¿Cómo estructurar mi proyecto con carpetas y Clean Architecture?', font=font_body, fill=(230, 235, 242, 255))

# Assistant response bubble
draw.rounded_rectangle([cx, my + 160, mx + mw - 40, my + 260], radius=10, fill=(28, 30, 38, 255), outline=(255, 255, 255, 12))
draw.text((cx + 16, my + 175), 'Para una arquitectura limpia escalable en tu proyecto, divide en 3 capas:', font=font_body, fill=(210, 215, 225, 255))
draw.text((cx + 16, my + 200), '1. Dominio: Entidades de negocio independientes.', font=font_body, fill=(180, 185, 195, 255))
draw.text((cx + 16, my + 222), '2. Casos de Uso: Lógica de aplicación pura.', font=font_body, fill=(180, 185, 195, 255))

# -------------------------------------------------------------
# Injected ChatFold Top Floating Toolbar (Acrylic Glass)
# -------------------------------------------------------------
tx = cx + 80
ty = my + 54
tw = 410
th = 38
# Shadow
tshadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
tsdraw = ImageDraw.Draw(tshadow)
tsdraw.rounded_rectangle([tx - 4, ty - 4, tx + tw + 4, ty + th + 6], radius=22, fill=(0, 0, 0, 150))
tshadow = tshadow.filter(ImageFilter.GaussianBlur(8))
base = Image.alpha_composite(base, tshadow)
draw = ImageDraw.Draw(base)

# Toolbar Body
draw.rounded_rectangle([tx, ty, tx + tw, ty + th], radius=19, fill=(28, 32, 42, 230), outline=(255, 255, 255, 50))

# Toolbar controls
# Collapse handle
draw.ellipse([tx + 8, ty + 8, tx + 30, ty + 30], fill=(255, 255, 255, 14))
draw.text((tx + 14, ty + 9), '›', font=font_body_b, fill=(255, 255, 255, 255))

# Select All
draw.rounded_rectangle([tx + 38, ty + 9, tx + 56, ty + 27], radius=5, fill=(37, 99, 235, 255), outline=(147, 197, 253, 255))
draw.line([(tx + 42, ty + 18), (tx + 46, ty + 23)], fill=(255, 255, 255, 255), width=2)
draw.line([(tx + 46, ty + 23), (tx + 52, ty + 14)], fill=(255, 255, 255, 255), width=2)
draw.text((tx + 62, ty + 10), 'Todo', font=font_body_b, fill=(240, 245, 255, 255))

# Folder Button (with count)
draw.rounded_rectangle([tx + 115, ty + 5, tx + 208, ty + 33], radius=14, fill=(138, 180, 248, 55), outline=(168, 199, 250, 120))
draw.text((tx + 125, ty + 9), '📁 Carpeta (4)', font=font_body_b, fill=(210, 230, 255, 255))

# Protect Button
draw.rounded_rectangle([tx + 216, ty + 5, tx + 284, ty + 33], radius=14, fill=(255, 255, 255, 16), outline=(255, 255, 255, 40))
draw.text((tx + 224, ty + 9), '🔒 Proteger', font=font_small, fill=(235, 240, 245, 255))

# Delete Button
draw.rounded_rectangle([tx + 292, ty + 5, tx + 398, ty + 33], radius=14, fill=(234, 67, 53, 220), outline=(255, 138, 128, 160))
draw.text((tx + 302, ty + 9), '🗑️ Eliminar (4)', font=font_body_b, fill=(255, 255, 255, 255))

# -------------------------------------------------------------
# Injected ChatFold Bottom Folders Panel (Acrylic Glass)
# -------------------------------------------------------------
px = mx + 12
py = my + mh - 240
pw = 236
ph = 226

# Panel Shadow
pshadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
psdraw = ImageDraw.Draw(pshadow)
psdraw.rounded_rectangle([px - 5, py - 5, px + pw + 5, py + ph + 8], radius=20, fill=(0, 0, 0, 160))
pshadow = pshadow.filter(ImageFilter.GaussianBlur(10))
base = Image.alpha_composite(base, pshadow)
draw = ImageDraw.Draw(base)

# Panel Body
draw.rounded_rectangle([px, py, px + pw, py + ph], radius=18, fill=(24, 27, 36, 240), outline=(255, 255, 255, 45))

# Header of Panel
draw.text((px + 14, py + 12), 'Foldy', font=font_body_b, fill=(255, 255, 255, 255))
# + Carpeta button
draw.rounded_rectangle([px + 130, py + 10, px + 195, py + 30], radius=10, fill=(138, 180, 248, 50), outline=(138, 180, 248, 100))
draw.text((px + 138, py + 12), '+ Carpeta', font=font_badge, fill=(210, 230, 255, 255))
# Minimize button
draw.text((px + 208, py + 10), '—', font=font_body_b, fill=(180, 185, 195, 255))

# Search Input
draw.rounded_rectangle([px + 12, py + 38, px + pw - 12, py + 66], radius=10, fill=(15, 17, 23, 200), outline=(255, 255, 255, 30))
draw.text((px + 22, py + 44), '🔍 Buscar chats...', font=font_small, fill=(130, 135, 145, 255))

# Folder Pills
pills = [
    ('Todas', '42', '#ffffff', True),
    ('Programación', '14', '#4285f4', False),
    ('Trabajo', '11', '#34a853', False),
    ('Estudio', '8', '#a142f4', False),
    ('Ideas', '6', '#fbbc04', False),
    ('Protegidos', '3', '#fbbc04', False),
]

p_x = px + 12
p_y = py + 76
for p_name, p_cnt, p_col, is_act in pills:
    pill_w = len(p_name) * 6 + 42
    if p_x + pill_w > px + pw - 12:
        p_x = px + 12
        p_y += 28

    if is_act:
        draw.rounded_rectangle([p_x, p_y, p_x + pill_w, p_y + 22], radius=11, fill=(66, 133, 244, 80), outline=(168, 199, 250, 180))
        draw.text((p_x + 8, p_y + 4), p_name, font=font_badge, fill=(255, 255, 255, 255))
        draw.rounded_rectangle([p_x + pill_w - 20, p_y + 3, p_x + pill_w - 4, p_y + 19], radius=8, fill=(0, 0, 0, 100))
        draw.text((p_x + pill_w - 17, p_y + 4), p_cnt, font=font_badge, fill=(255, 255, 255, 255))
    else:
        draw.rounded_rectangle([p_x, p_y, p_x + pill_w, p_y + 22], radius=11, fill=(255, 255, 255, 12), outline=(255, 255, 255, 25))
        draw.ellipse([p_x + 7, p_y + 8, p_x + 13, p_y + 14], fill=p_col)
        draw.text((p_x + 18, p_y + 4), p_name, font=font_badge, fill=(210, 215, 225, 255))
        draw.rounded_rectangle([p_x + pill_w - 20, p_y + 3, p_x + pill_w - 4, p_y + 19], radius=8, fill=(0, 0, 0, 70))
        draw.text((p_x + pill_w - 17, p_y + 4), p_cnt, font=font_badge, fill=(160, 165, 175, 255))

    p_x += pill_w + 5

# Footer Buttons (Cargar todo / Prompts)
draw.line([(px + 10, py + ph - 42), (px + pw - 10, py + ph - 42)], fill=(255, 255, 255, 16))
draw.rounded_rectangle([px + 12, py + ph - 34, px + 110, py + ph - 8], radius=8, fill=(255, 255, 255, 14), outline=(255, 255, 255, 25))
draw.text((px + 22, py + ph - 28), '⬇ Cargar todo', font=font_small, fill=(220, 225, 235, 255))

draw.rounded_rectangle([px + 122, py + ph - 34, px + pw - 12, py + ph - 8], radius=8, fill=(138, 180, 248, 50), outline=(138, 180, 248, 100))
draw.text((px + 140, py + ph - 28), '⚡ Prompts', font=font_body_b, fill=(210, 230, 255, 255))

# -------------------------------------------------------------
# Right Side Promo Cards / Feature Callouts
# -------------------------------------------------------------
rx = 930
cards = [
    ('📁 Carpetas Inteligentes', 'Organiza y auto-clasifica tus conversaciones con reglas por palabras clave y colores vivos.', '#4285f4'),
    ('⚡ Bóveda de Prompts', 'Guarda e inserta tus prompts frecuentes en 1 clic directamente en el cuadro de texto.', '#34a853'),
    ('🔒 Bloqueo de Chats', 'Protege tus chats esenciales con candado para evitar eliminaciones accidentales.', '#fbbc04'),
    ('🗑️ Borrado Masivo Seguro', 'Elimina en lote con carga invisible en segundo plano, sin saltos en tu pantalla.', '#ea4335'),
    ('☁️ Cloud Sync Automático', 'Sincronización en la nube automática entre todos tus navegadores y dispositivos.', '#a142f4'),
]

cy = 165
for c_title, c_desc, c_col in cards:
    # Feature card
    draw.rounded_rectangle([rx, cy, rx + 290, cy + 96], radius=14, fill=(24, 27, 36, 210), outline=(255, 255, 255, 28))
    # Left accent indicator
    draw.rounded_rectangle([rx + 4, cy + 12, rx + 8, cy + 84], radius=2, fill=c_col)
    # Title
    draw.text((rx + 18, cy + 12), c_title, font=font_body_b, fill=(255, 255, 255, 255))
    # Description (wrapped)
    words = c_desc.split(' ')
    line1 = ' '.join(words[:5])
    line2 = ' '.join(words[5:11])
    line3 = ' '.join(words[11:])
    draw.text((rx + 18, cy + 36), line1, font=font_small, fill=(180, 185, 195, 255))
    draw.text((rx + 18, cy + 54), line2, font=font_small, fill=(180, 185, 195, 255))
    if line3:
        draw.text((rx + 18, cy + 72), line3, font=font_small, fill=(180, 185, 195, 255))
    cy += 114

# Bottom Edge Banner Footer
draw.text((rx + 22, 742), 'Disponible en Microsoft Edge Add-ons & Chrome Web Store', font=font_badge, fill=(138, 180, 248, 200))

# Save output
out_dir = r'C:\Users\Admin Lab\Proyectos\ChatFold\assets'
out_desktop = r'C:\Users\Admin Lab\Desktop'
file_name = 'chatfold-edge-store-promo-1280x800.png'
file_name_foldy = 'foldy-edge-store-promo-1280x800.png'

path1 = os.path.join(out_dir, file_name)
path1_f = os.path.join(out_dir, file_name_foldy)
path2 = os.path.join(out_desktop, file_name)
path2_f = os.path.join(out_desktop, file_name_foldy)

base.convert('RGB').save(path1, 'PNG', quality=95)
base.convert('RGB').save(path1_f, 'PNG', quality=95)
if os.path.exists(out_desktop):
    base.convert('RGB').save(path2, 'PNG', quality=95)
    base.convert('RGB').save(path2_f, 'PNG', quality=95)

print(f'Successfully generated promo screenshot at:\n- {path1}\n- {path1_f}')
