import urllib.request
import ssl
import re
import json
import os
from urllib.parse import urljoin

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = 'https://cuacuonthudo.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8', errors='ignore')

os.makedirs('scraped_data', exist_ok=True)
with open('scraped_data/home.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Extract images
img_matches = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
images = set()
for img in img_matches:
    if not img.startswith('data:'):
        images.add(urljoin(url, img))

# Extract links
link_matches = re.findall(r'<a[^>]+href=["\']([^"\']+)["\']', html)
links = set()
for l in link_matches:
    if l.startswith('http') or l.startswith('/'):
        links.add(urljoin(url, l))

# Extract title & meta
title = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
title_text = title.group(1).strip() if title else ''

meta_desc = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
desc_text = meta_desc.group(1) if meta_desc else ''

result = {
    'title': title_text,
    'description': desc_text,
    'images_count': len(images),
    'images': list(images)[:40],
    'links_count': len(links),
    'sample_links': [l for l in list(links) if 'cuacuonthudo.com' in l][:30]
}

with open('scraped_data/summary.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("Scrape complete. Saved summary.json")

