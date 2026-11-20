#!/usr/bin/env python3
"""
Generate a branded social card (OG image) for a Stodd Group article.

Usage:
    python3 _automation/generate-hero.py \
        --title "First-Time Buyer's Guide to Closing Costs in Utah" \
        --slug "first-time-buyer-closing-costs-utah" \
        --tag first-time-buyers

Output: writes <slug>/hero.webp (1200x630, ~50KB).

Used exclusively as the og:image / twitter:image for social shares — the
article page itself does NOT render this image on-page. Stronger
editorial look; readers go straight from title to body. The hero shows
the article title inside the image so shared cards make sense on their
own.
"""

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
except ImportError:
    sys.exit("Pillow required: pip install Pillow")

# Tag color palette. Each tag maps to (top_color, bottom_color) hex for the gradient.
# Anchored to Stodd Group brand: dark green #395659, warm orange #E8A87C,
# and forest green #458366 for additional variation.
TAG_PALETTE = {
    "buying":            ("#99bfbf", "#395659"),
    "first-time-buyers": ("#E8A87C", "#D4896A"),
    "selling":           ("#458366", "#2E5440"),
    "investing":         ("#5A8085", "#2B4044"),
    "house-hacking":     ("#D4896A", "#8A4A2E"),
    "financing":         ("#5A7A8A", "#2D3F4A"),
    "neighborhoods":     ("#bad9d9", "#458366"),
    "relocation":        ("#D4896A", "#8A5035"),
    "market-updates":    ("#4A5F6B", "#1F2E35"),
    "home-prep":         ("#99bfbf", "#3a6d55"),
}

# Fallback for unknown tags: Stodd Group brand teal.
DEFAULT_PALETTE = ("#99bfbf", "#395659")

WIDTH = 1200
HEIGHT = 630
MARGIN = 80

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"

# Brand text shown top-left on every hero.
BRAND_TEXT = "STODD GROUP"


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def build_gradient(top_hex, bottom_hex):
    top = hex_to_rgb(top_hex)
    bottom = hex_to_rgb(bottom_hex)
    img = Image.new("RGB", (WIDTH, HEIGHT), top)
    draw = ImageDraw.Draw(img)
    for y in range(HEIGHT):
        t = y / HEIGHT
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))
    return img


def draw_mountain_silhouette(img, bottom_color_hex):
    """Thin Wasatch Range silhouette along the bottom — darker shade for depth."""
    base = hex_to_rgb(bottom_color_hex)
    shade = tuple(max(0, int(c * 0.5)) for c in base)

    baseline = HEIGHT
    peaks = [
        (0, baseline),
        (0, baseline - 40),
        (120, baseline - 110),
        (200, baseline - 60),
        (320, baseline - 140),
        (430, baseline - 90),
        (540, baseline - 170),
        (660, baseline - 100),
        (760, baseline - 155),
        (880, baseline - 80),
        (980, baseline - 135),
        (1080, baseline - 70),
        (1200, baseline - 110),
        (WIDTH, baseline),
    ]
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.polygon(peaks, fill=(*shade, 180))
    img.paste(overlay, (0, 0), overlay)


def fit_title(draw, title, max_width, max_lines=3, start_size=76, min_size=44):
    """Return (font, lines) that fit title within max_width and max_lines."""
    for size in range(start_size, min_size - 1, -4):
        font = ImageFont.truetype(FONT_BOLD, size)
        words = title.split()
        lines = []
        current = ""
        for word in words:
            trial = (current + " " + word).strip()
            w = draw.textlength(trial, font=font)
            if w <= max_width:
                current = trial
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
        if len(lines) <= max_lines:
            return font, lines
    font = ImageFont.truetype(FONT_BOLD, min_size)
    return font, lines[:max_lines]


def draw_text_with_shadow(draw, pos, text, font, fill=(255, 255, 255), shadow=(0, 0, 0, 100)):
    x, y = pos
    draw.text((x + 2, y + 3), text, font=font, fill=shadow)
    draw.text((x, y), text, font=font, fill=fill)


def draw_tag_pill(draw, tag, img_size):
    """Small tag pill bottom-right."""
    font = ImageFont.truetype(FONT_BOLD, 20)
    label = tag.upper().replace("-", " ")
    text_w = draw.textlength(label, font=font)
    padding_x = 20
    pill_w = text_w + padding_x * 2
    pill_h = 40
    x1 = WIDTH - MARGIN - pill_w
    y1 = HEIGHT - MARGIN - pill_h
    x2 = x1 + pill_w
    y2 = y1 + pill_h
    draw.rounded_rectangle([x1, y1, x2, y2], radius=20, fill=(255, 255, 255, 230))
    text_y = y1 + (pill_h - 20) // 2 - 4
    draw.text((x1 + padding_x, text_y), label, font=font, fill=(40, 40, 40))


def build_hero(title, tag):
    top_hex, bottom_hex = TAG_PALETTE.get(tag, DEFAULT_PALETTE)
    img = build_gradient(top_hex, bottom_hex)
    draw_mountain_silhouette(img, bottom_hex)

    img = img.convert("RGBA")
    draw = ImageDraw.Draw(img)

    # Brand line at the top
    brand_font = ImageFont.truetype(FONT_BOLD, 22)
    draw.text((MARGIN, MARGIN - 20), BRAND_TEXT, font=brand_font, fill=(255, 255, 255, 220))

    # Divider line under brand
    divider_y = MARGIN + 20
    draw.line([(MARGIN, divider_y), (MARGIN + 80, divider_y)],
              fill=(255, 255, 255, 180), width=3)

    # Title — up to 3 lines, auto-sized
    max_title_width = WIDTH - MARGIN * 2
    title_font, title_lines = fit_title(draw, title, max_title_width)
    line_height = title_font.size + 12

    title_block_h = line_height * len(title_lines)
    title_start_y = (HEIGHT - title_block_h) // 2 - 20

    for i, line in enumerate(title_lines):
        y = title_start_y + i * line_height
        draw_text_with_shadow(draw, (MARGIN, y), line, title_font)

    # Tag pill bottom-right
    draw_tag_pill(draw, tag, (WIDTH, HEIGHT))

    return img.convert("RGB")


def main():
    parser = argparse.ArgumentParser(description="Generate Stodd Group article hero image")
    parser.add_argument("--title", required=True, help="Article title")
    parser.add_argument("--slug", required=True, help="Article slug (directory name)")
    parser.add_argument("--tag", required=True, help="Primary tag for color palette")
    parser.add_argument("--out", help="Output path (default: <slug>/hero.webp)")
    parser.add_argument("--repo-root", default=".", help="Repo root (default: cwd)")
    args = parser.parse_args()

    img = build_hero(args.title, args.tag)

    out = args.out
    if not out:
        out_dir = Path(args.repo_root) / args.slug
        out_dir.mkdir(parents=True, exist_ok=True)
        out = str(out_dir / "hero.webp")

    img.save(out, "WEBP", quality=85, method=6)
    print(f"Hero image written: {out}")


if __name__ == "__main__":
    main()
