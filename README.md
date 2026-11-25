# Mădălin Nuică | Personal Trainer & IFBB Pro

Site static în limba română, pregătit pentru GitHub Pages. Fișierul `index.html` este în rădăcină. Nu sunt necesare Node.js, instalare de pachete, un build sau un server pentru publicare.

## Publicare pe GitHub Pages

1. Dezarhivează `madalin-nuica-github-pages.zip`.
2. Încarcă în rădăcina repository-ului fișierele `index.html`, `styles.css`, `script.js`, `.nojekyll` și întregul folder `assets`. Nu încărca doar arhiva ZIP.
3. În GitHub deschide **Settings > Pages**.
4. La **Build and deployment**, selectează **Deploy from a branch**.
5. Alege ramura `main` și folderul **/(root)**, apoi **Save**.
6. După finalizarea publicării, adresa apare în pagina Pages a repository-ului.

Toate căile resurselor sunt relative, deci funcționează și la `https://username.github.io/nume-repository/`.

## Ce include

- Design adaptat pentru telefon, tabletă și desktop. În hero, pe telefon, textul este centrat deasupra fotografiei, în zone separate. Pe desktop, fotografia se estompează spre fundal. Ambele butoane au etichete bold. Hero-ul și bannerul încap împreună în primul ecran, inclusiv în orientare orizontală.
- Navigație mobilă cu închidere prin Escape și control al focalizării.
- Carduri fotografice 3D pentru fiecare obiectiv, cu imagini distincte, înclinare la mișcarea cursorului pe desktop și carduri pe lățime completă pe mobil. Fiecare card deschide un popup cu imagine, detalii și buton de contact. Navigarea între carduri funcționează prin tastele săgeată, Home și End; Enter deschide popup-ul, Escape îl închide.
- Transferul obiectivului din popup în secțiunea de contact, cu închiderea automată a popup-ului.
- Pași de lucru și întrebări expandabile.
- Apel direct la `+40 725 333 024`.
- Formular care pregătește un mesaj WhatsApp. Vizitatorul îl trimite în aplicația sa, fără un backend și fără stocarea datelor pe site. Numărul este cel public de contact; înregistrarea lui în WhatsApp nu a fost confirmată.
- Hartă Google Maps încorporată cu căutare și pin, afișată direct în secțiunea Contact, plus link de deschidere în Google Maps.
- Linkuri directe Facebook, Instagram, TikTok și YouTube, fără redirecționări de căutare Google.
- Iconițe SVG, fără emoji. Fonturi salvate local. Fundal cu puncte gri fixe; o bandă verticală traversează grila de la stânga la dreapta și luminează punctele în alb, fără numerotări decorative ale secțiunilor.
- Banner continuu spre stânga, animații discrete la derulare și respectarea preferinței pentru mișcare redusă.
- Metadate SEO și pictogramă SVG pentru browser.

## Date și surse

Identitatea Mădălin Nuică a fost confirmată de solicitant. Linkul Google Business primit inițial duce la Dr. Hâncu Anca, astfel că nu a fost folosit pentru locația acestui site.

Adresa **Calea Stan Vidrighin 14, Timișoara** și telefonul **0725 333 024** au fost preluate din listarea publică [Nuica Madalin Fitness](https://firmania.ro/timisoara/nuica-madalin-fitness-433658). Verifică datele cu titularul înainte de publicarea finală.

Statutul IFBB Pro și imaginile de competiție sunt documentate în [articolul Impactpress din 1 octombrie 2026](https://www.impactpress.ro/un-jandarm-din-timis-campion-la-competitia-de-culturism-si-fitness-romanian-international-grand-prix/), care reproduce un comunicat al Inspectoratului de Jandarmi Județean Timiș. Fotografiile provin din acel articol. Nu se transferă prin acest proiect drepturile asupra fotografiilor; pentru utilizarea publică, confirmă drepturile sau înlocuiește-le cu fotografii proprii ale titularului.

Fotografia de sală este o imagine de atmosferă [Unsplash](https://unsplash.com/photos/1534438327276-14e5300c3a48), nu o reprezentare a locației reale. Fișierul este `assets/gym.jpg`.

Fonturile Barlow Condensed și Manrope sunt distribuite prin Google Fonts sub SIL Open Font License. Textele licențelor sunt în `assets/licenses/`.

Profilurile sociale folosesc destinațiile furnizate de solicitant:

- Facebook: https://www.facebook.com/madalin.nuica/
- Instagram: https://www.instagram.com/madalin.nuica_ifbbpro/
- TikTok: https://www.tiktok.com/@nuicamadalin_ifbbpro
- YouTube: https://www.youtube.com/channel/UCPaA-ngJX6dDTAv-9YhqGTg/videos

Platformele sociale au limitat verificarea automată a profilurilor. Nu au fost inventate recenzii, rezultate ale clienților, tarife sau intervale disponibile. Secțiunea de obiective descrie direcții de discuție; condițiile colaborării se confirmă direct.

## Editare

- `index.html`: texte, număr de telefon, linkuri și secțiuni.
- `styles.css`: culori, spațiere, dimensiuni și adaptări responsive.
- `script.js`: meniu, obiective, formular WhatsApp, hartă și animații.
- `assets/`: fotografii, fonturi, licențe și favicon.

Numărul de contact trebuie modificat atât în linkurile `tel:` din HTML, cât și în linkul `wa.me` din JavaScript. Locația se modifică în HTML, inclusiv în URL-ul iframe-ului Google Maps.

După stabilirea URL-ului public, poți adăuga un `canonical` și un `og:url` și înlocui `og:image` cu un URL absolut pentru previzualizări sociale mai fiabile.

## Previzualizare locală opțională

Deschide `index.html` direct în browser sau rulează, cu Node.js instalat:

```text
node tools/preview.mjs
```

Apoi accesează `http://127.0.0.1:4173`. Folderul `tools` este doar pentru dezvoltare și nu este necesar pentru publicare.

Imaginile de atmosferă pentru cardurile Definire și Primul pas provin din Unsplash: https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b și https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b. Aceste imagini ilustrează tipuri de antrenament și nu reprezintă clienți sau colaboratori ai lui Mădălin.

La corecția din 25 noiembrie 2026 au fost verificate în browser dimensiunile 320x568, 414x896, 768x1024, 844x390 și 1440x900. Nu s-au constatat depășiri orizontale sau suprapuneri între textul și fotografia din hero. Verificarea folosește redimensionarea browserului, nu un iPhone fizic.
