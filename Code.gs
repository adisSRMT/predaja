// 1) NOVA Google Preglednica → Razširitve → Apps Script → prilepi to kodo.
// 2) Uvedi → Nova uvedba → Spletna aplikacija → Izvajaj kot: jaz, Dostop: Kdorkoli → dovoli dostope.
// 3) URL prilepi v config.js (SHEET_URL).  Vodja: odpri list "Napake" in v stolpec Stanje zapiši "Zaprta".
const KLJUC = 'spremeni-me';          // enak kot v config.js
const VODJA = 'vodja@example.com';    // sem pride obvestilo ob napakah
const out_ = t => ContentService.createTextOutput(t);
function sh_(n, h) { const s = SpreadsheetApp.getActive(); let t = s.getSheetByName(n); if (!t) { t = s.insertSheet(n); t.appendRow(h); t.setFrozenRows(1); } return t; }
const P_ = () => sh_('Predaje', ['ID','Čas','Vozilo','Oddajnik','Prevzemnik','Izmena','Km','Gorivo','Stanje','Št. napak','Podpis oddajnika','Podpis prevzemnika']);
const I_ = () => sh_('Postavke', ['Predaja','Skupina','Postavka','Stanje','Vrednost','Rok','Komentar','Fotografija']);
const N_ = () => sh_('Napake', ['ID','Čas','Vozilo','Postavka','Opis','Stanje','Zaprl']);
function save_(d, name) {
  const f = DriveApp.getFoldersByName('Predaja-foto'), dir = f.hasNext() ? f.next() : DriveApp.createFolder('Predaja-foto');
  const m = d.match(/^data:(.+?);base64,(.+)$/);
  return dir.createFile(Utilities.newBlob(Utilities.base64Decode(m[2]), m[1], name)).getUrl();
}
function doPost(e) {
  const o = JSON.parse(e.postData.contents);
  if (o.k !== KLJUC) return out_('no');
  const p = P_();
  if (p.createTextFinder(o.id).matchEntireCell(true).findNext()) return out_('dup');
  const bad = o.postavke.filter(x => x.slaba);
  p.appendRow([o.id, o.cas, o.vozilo, o.oddajnik, o.prevzemnik, o.izmena, o.km, o.gorivo, bad.length ? 'Z napakami' : 'V redu', bad.length, save_(o.podpisO, o.id + '-o.png'), save_(o.podpisP, o.id + '-p.png')]);
  const it = I_(), ne = N_();
  o.postavke.forEach((x, i) => {
    it.appendRow([o.id, x.sk, x.ime, x.stanje, x.vrednost || '', x.rok || '', x.komentar || '', x.foto ? save_(x.foto, o.id + '-' + i + '.jpg') : '']);
    if (x.slaba) ne.appendRow([o.id + '-' + i, o.cas, o.vozilo, x.ime, x.komentar || x.stanje, 'Odprta', '']);
  });
  if (bad.length) MailApp.sendEmail(VODJA, 'Predaja ' + o.vozilo + ': ' + bad.length + ' napak', bad.map(x => x.ime + ': ' + x.stanje + (x.komentar ? ' – ' + x.komentar : '')).join('\n'));
  return out_('ok');
}
function doGet(e) {
  let r = {};
  if (e.parameter.k === KLJUC) {
    const v = e.parameter.v, p = P_().getDataRange().getDisplayValues(), n = N_().getDataRange().getDisplayValues();
    for (let i = p.length - 1; i > 0; i--) if (p[i][2] === v) { r = {cas: p[i][1], prevzel: p[i][4], km: p[i][6]}; break; }
    r.napake = n.filter((x, i) => i > 0 && x[2] === v && x[5] === 'Odprta').map(x => ({p: x[3], o: x[4]}));
  }
  return out_(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON);
}
