import os
import json
import urllib.request
import ssl
from urllib.parse import urlparse

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('scraped_data/summary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

images = data.get('images', [])

out_dir = os.path.join('scraped_data', 'assets')
os.makedirs(out_dir, exist_ok=True)

downloaded = []
for idx, img_url in enumerate(images):
    try:
        parsed = urlparse(img_url)
        filename = os.path.basename(parsed.path)
        if not filename or '.' not in filename:
            filename = f"asset_{idx}.jpg"
        save_path = os.path.join(out_dir, filename)
        
        req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            content = resp.read()
            if len(content) > 1000: # Only save non-empty
                with open(save_path, 'wb') as f:
                    f.write(content)
                downloaded.append({
                    'original': img_url,
                    'filename': filename,
                    'size': len(content)
                })
                print(f"Downloaded: {filename} ({len(content)} bytes)")
    except Exception as e:
        print(f"Failed {img_url}: {e}")

with open('scraped_data/downloaded.json', 'w', encoding='utf-8') as f:
    json.dump(downloaded, f, indent=2)

print(f"\nTotal downloaded: {len(downloaded)} assets.")

