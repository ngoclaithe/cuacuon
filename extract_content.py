import re
import os
import json
import urllib.request
import ssl

with open('scraped_data/home.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract phone numbers
phones = list(set(re.findall(r'(?:0|\+84)[0-9]{8,10}', html)))

# Extract text blocks
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

# Get header/nav
nav_items = [a.get_text(strip=True) for a in soup.find_all('a') if a.get_text(strip=True)]
# Get h1, h2, h3
headings = [{'tag': h.name, 'text': h.get_text(strip=True)} for h in soup.find_all(['h1', 'h2', 'h3'])]

# Get products
products = []
for p in soup.select('.product, .post, .item, .col'):
    title_el = p.find(['h2', 'h3', 'h4', 'a'])
    img_el = p.find('img')
    price_el = p.find(class_=re.compile(r'price|gia', re.I))
    if title_el and title_el.get_text(strip=True):
        products.append({
            'title': title_el.get_text(strip=True),
            'img': img_el.get('src') if img_el else None,
            'price': price_el.get_text(strip=True) if price_el else None
        })

print("Found phones:", phones)
print("Found headings count:", len(headings))
for h in headings[:15]:
    print(f"[{h['tag']}] {h['text']}")

# Also let's find contact info, address, footer text
footer = soup.find('footer')
footer_text = footer.get_text(separator='\n', strip=True) if footer else 'No footer'
print("\n--- Footer snippet ---")
print(footer_text[:500])

with open('scraped_data/details.json', 'w', encoding='utf-8') as f:
    json.dump({
        'phones': phones,
        'headings': headings,
        'footer': footer_text
    }, f, ensure_ascii=False, indent=2)

