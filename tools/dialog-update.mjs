import fs from 'node:fs';
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('role="tablist" aria-label="Alege obiectivul de antrenament"', 'role="group" aria-label="Descoperă obiectivele de antrenament"');
html = html.replace(/role="tab"/g, 'type="button" aria-haspopup="dialog"');
html = html.replace(/aria-selected="(?:true|false)" aria-controls="panel-[^"]+"(?: tabindex="-1")?/g, 'aria-expanded="false" aria-controls="program-dialog"');
html = html.replace('<div class="program-content reveal">', '<div class="program-content" hidden aria-hidden="true">');
html = html.replace(/ role="tabpanel" aria-labelledby="tab-[^"]+" tabindex="0"/g, '');
const modal = `
  <dialog class="program-dialog" id="program-dialog" aria-labelledby="program-dialog-title">
    <button class="dialog-close" id="close-program" type="button" aria-label="Închide detaliile"><svg aria-hidden="true"><use href="#close"/></svg></button>
    <div class="program-dialog-layout"><div class="program-dialog-visual"><img id="program-dialog-image" alt="" width="600" height="800"></div><div class="program-dialog-body"><p class="eyebrow">DIRECȚIA TA. URMĂTORUL PAS.</p><h2 id="program-dialog-title"></h2><div id="program-dialog-content"></div></div></div>
  </dialog>
`;
html = html.replace('  <dialog class="privacy-dialog"', modal+'  <dialog class="privacy-dialog"');
html = html.replace('<span>SUNĂ DIRECT<svg><use href="#phone"/></svg></span><strong>0725 333 024</strong>', '<span>SUNĂ DIRECT</span><span class="phone-number-line"><strong>0725 333 024</strong><svg aria-hidden="true"><use href="#phone"/></svg></span>');
fs.writeFileSync('index.html', html);
let js = fs.readFileSync('script.js','utf8');
const start = js.indexOf('const tabs =');
const end = js.indexOf('const cardMotion =',start);
if(start<0||end<0) throw new Error('Card behavior block missing');
const popupBehavior = String.raw`const tabs = [...document.querySelectorAll('.program-tab')];
const programDialog = document.querySelector('#program-dialog');
function openProgram(card) {
  const details = document.getElementById('panel-' + card.dataset.program);
  document.querySelector('#program-dialog-content').replaceChildren(
    details.querySelector('.program-detail-copy').cloneNode(true),
    details.querySelector('.program-detail-actions').cloneNode(true)
  );
  document.querySelector('#program-dialog-title').textContent = card.getAttribute('aria-label');
  document.querySelector('#program-dialog-image').src = card.querySelector('.program-card-image').getAttribute('src');
  card.setAttribute('aria-expanded', 'true');
  document.body.classList.add('program-modal-open');
  programDialog.showModal();
}
document.querySelector('#close-program').addEventListener('click', () => programDialog.close());
programDialog.addEventListener('close', () => {
  document.body.classList.remove('program-modal-open');
  tabs.forEach(card => card.setAttribute('aria-expanded', 'false'));
});
programDialog.addEventListener('click', event => {
  const bounds = programDialog.getBoundingClientRect();
  if (event.target === programDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) programDialog.close();
});
tabs.forEach((tab,index) => {
  tab.addEventListener('click', () => openProgram(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs.at(-1);
    if (next) { event.preventDefault(); next.focus(); next.scrollIntoView({block:'nearest',inline:'center',behavior:'instant'}); }
  });
});
`;
js = js.slice(0,start)+popupBehavior+js.slice(end);
js = js.replace(/document\.querySelectorAll\('\.program-contact'\)\.forEach\(link => \{[\s\S]*?\n\}\);/, `document.addEventListener('click', event => {
  const link = event.target.closest('.program-contact');
  if (!link) return;
  document.querySelector('#goal').value = link.dataset.goal;
  if (programDialog.open) programDialog.close();
});`);
fs.writeFileSync('script.js',js);
let css = fs.readFileSync('styles.css','utf8').replaceAll('[aria-selected=true]', '[aria-expanded=true]');
fs.writeFileSync('styles.css',css);
for (const [name,color] of [['dots-wave','#d7fa52'],['dots-wave-light','#596b30']]) {
  const circles=[];
  for(let row=0;row<10;row++) for(let column=0;column<24;column++) {
    const x=15+column*30;
    const y=14+row*28+Math.sin(x/720*Math.PI*4)*11;
    const crest=(Math.sin(x/720*Math.PI*2-row/10*Math.PI*2)+1)/2;
    circles.push(`<circle cx="${x}" cy="${y.toFixed(2)}" r="${(.85+.45*crest).toFixed(2)}" opacity="${(.11+.29*Math.pow(crest,2)).toFixed(3)}"/>`);
  }
  fs.writeFileSync(`assets/${name}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="280" viewBox="0 0 720 280"><g fill="${color}">${circles.join('')}</g></svg>`);
}
