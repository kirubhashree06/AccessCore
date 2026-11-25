import os
from PIL import Image, ImageDraw, ImageFont

def generate_logo():
    width, height = 520, 110
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Stylized A coordinates scaled to 70x70 bounding box at (20, 18)
    ox, oy = 20, 18
    scale = 74.0 / 46.0

    # Main A path points (polygon approximation of the stylized A ribbon)
    pts_main = [
        (ox + 10.013 * scale, oy + 0.474 * scale),
        (ox + 38.907 * scale, oy + 0.474 * scale),
        (ox + 31.427 * scale, oy + 10.945 * scale),
        (ox + 42.804 * scale, oy + 14.524 * scale),
        (ox + 25.946 * scale, oy + 44.938 * scale),
        (ox + 23.925 * scale, oy + 44.240 * scale),
        (ox + 23.925 * scale, oy + 33.937 * scale),
        (ox + 10.287 * scale, oy + 31.675 * scale),
        (ox + 9.367 * scale,  oy + 29.887 * scale),
        (ox + 16.847 * scale, oy + 19.416 * scale),
        (ox + 1.237 * scale,  oy + 15.838 * scale),
        (ox + 0.317 * scale,  oy + 14.050 * scale),
    ]

    # Draw the bold stylized A symbol in Royal Purple (#7C3AED)
    draw.polygon(pts_main, fill=(124, 58, 237, 255))

    # Top horizontal dynamic facet in Secondary Lavender (#A78BFA)
    pts_facet = [
        (ox + 10.013 * scale, oy + 0.474 * scale),
        (ox + 38.907 * scale, oy + 0.474 * scale),
        (ox + 31.427 * scale, oy + 10.945 * scale),
        (ox + 17.493 * scale, oy + 10.945 * scale),
    ]
    draw.polygon(pts_facet, fill=(167, 139, 250, 200))

    # Inner cutaway
    pts_inner = [
        (ox + 23.925 * scale, oy + 33.937 * scale),
        (ox + 25.725 * scale, oy + 31.657 * scale),
        (ox + 38.025 * scale, oy + 14.457 * scale),
        (ox + 28.225 * scale, oy + 14.457 * scale),
        (ox + 23.925 * scale, oy + 20.457 * scale),
    ]
    draw.polygon(pts_inner, fill=(255, 255, 255, 70))

    # Fonts
    try:
        font_main = ImageFont.truetype("arialbd.ttf", 46)
        font_sub = ImageFont.truetype("arial.ttf", 14)
    except:
        font_main = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Text rendering: ACCESS in deep navy/charcoal (#102A43), CORE in Royal Purple (#7C3AED)
    tx = 120
    ty = 26
    draw.text((tx, ty), "ACCESS", font=font_main, fill=(16, 42, 67, 255))
    
    # Calculate offset for CORE
    bbox_access = draw.textbbox((tx, ty), "ACCESS", font=font_main)
    cx = bbox_access[2] + 4
    draw.text((cx, ty), "CORE", font=font_main, fill=(124, 58, 237, 255))

    # Subtitle: ENTERPRISE WORKFLOW
    sy = ty + 50
    draw.text((tx + 2, sy), "ENTERPRISE WORKFLOW", font=font_sub, fill=(100, 116, 139, 255))

    # Save
    os.makedirs("public", exist_ok=True)
    img.save("public/accesscore-logo.png", "PNG")
    print("public/accesscore-logo.png generated with Royal Purple A:", img.size)

def generate_favicon():
    width, height = 64, 64
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    ox, oy = 6, 6
    scale = 52.0 / 46.0

    pts_main = [
        (ox + 10.013 * scale, oy + 0.474 * scale),
        (ox + 38.907 * scale, oy + 0.474 * scale),
        (ox + 31.427 * scale, oy + 10.945 * scale),
        (ox + 42.804 * scale, oy + 14.524 * scale),
        (ox + 25.946 * scale, oy + 44.938 * scale),
        (ox + 23.925 * scale, oy + 44.240 * scale),
        (ox + 23.925 * scale, oy + 33.937 * scale),
        (ox + 10.287 * scale, oy + 31.675 * scale),
        (ox + 9.367 * scale,  oy + 29.887 * scale),
        (ox + 16.847 * scale, oy + 19.416 * scale),
        (ox + 1.237 * scale,  oy + 15.838 * scale),
        (ox + 0.317 * scale,  oy + 14.050 * scale),
    ]

    draw.polygon(pts_main, fill=(124, 58, 237, 255))

    pts_facet = [
        (ox + 10.013 * scale, oy + 0.474 * scale),
        (ox + 38.907 * scale, oy + 0.474 * scale),
        (ox + 31.427 * scale, oy + 10.945 * scale),
        (ox + 17.493 * scale, oy + 10.945 * scale),
    ]
    draw.polygon(pts_facet, fill=(167, 139, 250, 200))

    img.save("public/favicon.png", "PNG")
    print("public/favicon.png generated with Royal Purple A:", img.size)

if __name__ == "__main__":
    generate_logo()
    generate_favicon()
