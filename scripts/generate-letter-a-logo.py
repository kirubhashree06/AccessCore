import os
from PIL import Image, ImageDraw

def create_a_image(size):
    # Use 4x supersampling for ultra-crisp antialiasing
    super_size = size * 4
    scale = super_size / 2048.0

    img = Image.new("RGBA", (super_size, super_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Outer A polygon points
    outer_pts = [
        (920 * scale, 256 * scale),
        (1128 * scale, 256 * scale),
        (1768 * scale, 1792 * scale),
        (1456 * scale, 1792 * scale),
        (1264 * scale, 1320 * scale),
        (784 * scale, 1320 * scale),
        (592 * scale, 1792 * scale),
        (280 * scale, 1792 * scale),
    ]

    # Solid Royal Purple: #7C3AED -> RGB (124, 58, 237)
    royal_purple = (124, 58, 237, 255)
    draw.polygon(outer_pts, fill=royal_purple)

    # 2. Inner triangular cutout (transparent counter)
    inner_pts = [
        (1024 * scale, 660 * scale),
        (1208 * scale, 1100 * scale),
        (840 * scale, 1100 * scale),
    ]
    draw.polygon(inner_pts, fill=(0, 0, 0, 0))

    # Downsample with high-quality Lanczos filter
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

def main():
    os.makedirs("public", exist_ok=True)

    # 1. Generate 512x512 logo PNG for public/accesscore-logo.png
    logo_512 = create_a_image(512)
    logo_512.save("public/accesscore-logo.png", "PNG")
    print("Generated public/accesscore-logo.png (512x512, transparent, solid #7C3AED)")

    # 2. Generate 64x64 favicon PNG for public/favicon.png
    fav_64 = create_a_image(64)
    fav_64.save("public/favicon.png", "PNG")
    print("Generated public/favicon.png (64x64, transparent, solid #7C3AED)")

    # 3. Generate clean vector SVG for public/favicon.svg
    # Scaled to 512x512 (divide 2048 coords by 4)
    # 920/4=230, 256/4=64, 1128/4=282, 1768/4=442, 1792/4=448, 1456/4=364, 1264/4=316, 1320/4=330, 784/4=196, 592/4=148, 280/4=70
    # Inner: 1024/4=256, 660/4=165, 1208/4=302, 1100/4=275, 840/4=210
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- ACCESSCORE Official Solid Royal Purple A Logo -->
  <path fill="#7C3AED" fill-rule="evenodd" d="M 230 64 L 282 64 L 442 448 L 364 448 L 316 330 L 196 330 L 148 448 L 70 448 Z M 256 165 L 302 275 L 210 275 Z" />
</svg>
"""
    with open("public/favicon.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Generated public/favicon.svg (clean vector, solid #7C3AED)")

    # 4. Update helper html files
    render_fav = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <svg viewBox="0 0 512 512" width="56" height="56">
    <path fill="#7C3AED" fill-rule="evenodd" d="M 230 64 L 282 64 L 442 448 L 364 448 L 316 330 L 196 330 L 148 448 L 70 448 Z M 256 165 L 302 275 L 210 275 Z" />
  </svg>
</body>
</html>
"""
    with open("public/render-favicon.html", "w", encoding="utf-8") as f:
        f.write(render_fav)

if __name__ == "__main__":
    main()
