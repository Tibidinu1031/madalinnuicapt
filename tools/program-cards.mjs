import fs from 'node:fs';
let html = fs.readFileSync('index.html', 'utf8');
const cards = [
  {key:'strength',title:'MASĂ & FORȚĂ',image:'gym.jpg',tag:'FORȚĂ / TEHNICĂ',subtitle:'Construiește o bază solidă.'},
  {key:'definition',title:'DEFINIRE & ECHILIBRU',image:'program-definition.jpg',tag:'MIȘCARE / CONSECVENȚĂ',subtitle:'O schimbare pe care o poți susține.'},
  {key:'start',title:'PRIMUL TĂU PAS',image:'program-start.jpg',tag:'ÎNCREDERE / DIRECȚIE',subtitle:'Începe cu bazele. Continuă cu încredere.'}
];
const cardsHtml = cards.map((card,index) => `        <button class="program-tab" id="tab-${card.key}" role="tab" aria-label="${card.title}" aria-selected="${index===0}" aria-controls="panel-${card.key}" ${index?'tabindex="-1" ':''}data-program="${card.key}"><span class="program-card-surface"><img class="program-card-image" src="./assets/${card.image}" alt="" loading="lazy" width="1100" height="733"><span class="program-card-copy"><span class="card-kicker">${card.tag}</span><span class="tab-title">${card.title}</span><span class="card-subtitle">${card.subtitle}</span><span class="card-bottom"><span class="card-hint" aria-hidden="true"></span><svg aria-hidden="true"><use href="#diagonal"/></svg></span></span></span></button>`).join('\n');
html = html.replace(/(<div class="program-tabs reveal"[^>]*>)[\s\S]*?(\n      <\/div>)/, '$1\n'+cardsHtml+'$2');
html = html.replace(/\s*<div class="program-photo">[\s\S]*?<\/div>/, '');
html = html.replace(/(<div class="program-panel"[^>]*>)(<h3>[\s\S]*?<\/p>)(<ul class="check-list">[\s\S]*?<\/a>)<\/div>/g, '$1<div class="program-detail-copy">$2</div><div class="program-detail-actions">$3</div></div>');
const oldHeading = '<h2 id="method-title">MOTIVAȚIA<br>TE PORNEȘTE.<br><span class="muted-heading">METODA<br>TE DUCE MAI DEPARTE.</span></h2><a class="circle-link" href="#contact" aria-label="Discută cu Mădălin"><svg><use href="#diagonal"/></svg></a>';
const newHeading = '<h2 id="method-title">MOTIVAȚIA<br>TE PORNEȘTE.<br><span class="muted-heading">METODA<br><span class="method-final-line">TE DUCE MAI <span class="method-ending">DEPARTE<a class="circle-link" href="#contact" aria-label="Discută cu Mădălin"><svg aria-hidden="true"><use href="#diagonal"/></svg></a></span></span></span></h2>';
if (!html.includes(oldHeading)) throw new Error('Method heading not found');
html = html.replace(oldHeading, newHeading);
fs.writeFileSync('index.html', html);
