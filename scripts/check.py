"""Validate portable static assets and fragment links without external packages."""
from html.parser import HTMLParser
from pathlib import Path
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.references = []
        self.fragments = []
        self.controls = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('src', 'href'):
            value = attrs.get(key, '')
            if value.startswith('#') and len(value) > 1:
                self.fragments.append(value[1:])
            elif value and not value.startswith('#'):
                self.references.append(value)
        for key in ('aria-controls', 'aria-labelledby', 'aria-describedby'):
            self.controls.extend(attrs.get(key, '').split())

page = Page()
page.feed((ROOT / 'index.html').read_text())
assert len(page.ids) == len(set(page.ids)), 'Duplicate HTML IDs'
for fragment in page.fragments + page.controls:
    assert fragment in page.ids, f'Missing anchor or ARIA target: {fragment}'
for asset in page.references:
    assert '://' not in asset, f'Unexpected external resource: {asset}'
    assert (ROOT / asset).is_file(), f'Missing asset: {asset}'
css = (ROOT / 'css/styles.css').read_text()
for asset in re.findall(r'url\([\'"]?([^\)\'\"]+)', css):
    assert (ROOT / 'css' / asset).is_file(), f'Missing CSS asset: {asset}'
for path in (ROOT / 'assets').glob('*.svg'):
    ET.parse(path)
assert (ROOT / 'assets/hero.webp').read_bytes()[:4] == b'RIFF'
print('PASS: unique IDs, anchors, ARIA references, local resources, SVG XML, WebP asset.')
