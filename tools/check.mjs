import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
for (const match of html.matchAll(/(?:src|href)="([^"\s]+)"/g)) {
  const value = match[1];
  if (value.startsWith('#')) assert(ids.includes(value.slice(1)), `Missing anchor ${value}`);
  if (value.startsWith('./')) assert(fs.existsSync(value), `Missing file ${value}`);
}
for (const match of fs.readFileSync('assets/fonts.css','utf8').matchAll(/url\(([^)]+)\)/g)) {
  assert(fs.existsSync(path.join('assets', match[1])), `Missing font ${match[1]}`);
}
assert.equal((html.match(/<h1\b/g)||[]).length, 1, 'One primary heading');
assert(!/[\u2013\u2014]/u.test(html + css + js), 'Long dash found');
assert(!/\p{Extended_Pictographic}/u.test(html + css + js), 'Emoji found');
assert(html.includes('tel:+40725333024'), 'Phone link missing');
assert(js.includes('wa.me/40725333024'), 'WhatsApp number mismatch');
assert(html.includes('./assets/fonts.css'), 'Local font stylesheet missing');
assert(css.includes('[hidden]{display:none!important}'), 'Explicit hidden state missing');
console.log('PASS: local assets, anchors, unique IDs, fonts, contact links, hidden state, no emoji, no long dash.');
