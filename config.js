// ===== TU UREJAŠ SEZNAME (navaden urejevalnik besedila je dovolj) =====
// Vsak vnos je v narekovajih in se konča z vejico. Vse spodaj so samo vzorci.
const CONFIG = {
  naziv: "Predaja vozila",
  SHEET_URL: "",            // URL iz Apps Scripta (glej Code.gs)
  KLJUC: "spremeni-me",     // enak kot v Code.gs
  FOTO_OBVEZNA: false,      // true = pri Manjka/Pokvarjeno je fotografija obvezna
  // QR koda vozila = https://TVOJ-LINK/?v=ŽETON  (žeton naj bo naključen, nekaj znakov)
  vozila: [
    { oznaka: "NRV KK EL 207", zeton: "k7x2m9qa" },
    { oznaka: "RV-02", zeton: "p3d8w5ze" },
    { oznaka: "RV-03", zeton: "t6n4c1yb" }
  ],
  zaposleni: [              // PIN je le identifikacija, ni prava varnost
    { ime: "ADIS SARAMATI", pin: "7008" },
    { ime: "Ime P. 2", pin: "2222" },
    { ime: "Ime P. 3", pin: "3333" }
  ],
  izmene: ["Dnevna", "Nočna"],
  zdravila: [{ ime: "Adrenalin 1 mg", kol: 10 }, { ime: "Amiodaron 150 mg", kol: 4 }, { ime: "Atropin 0,5 mg", kol: 5 }],
  opioidi: [{ ime: "Morfin 10 mg", kol: 5 }, { ime: "Fentanil 0,1 mg", kol: 5 }],
  oprema: {
    "Kabina": ["Radio", "Telefon", "Tablica", "Dokumenti vozila"],
    "Nosila in transport": ["Zajemalna nosila", "Kardiostol", "Vakuumska blazina", "Pasovi"],
    "Dihala": ["Aspirator", "Weinmann Standard", "AMBU maska", "Maske", "Pripomočki za dihalno pot"],
    "Lifepak 15": ["Elektrode", "EKG kabli"],
    "Infuzije": ["Raztopine", "Kanile", "Sistemi"],
    "Imobilizacija": ["Opornice", "Ovratnice"],
    "Oskrba ran": ["Povoji", "Obliži", "Hemostatiki"],
    "Zaščita": ["Rokavice", "Maske", "Razkužilo", "Vreče za odpadke"]
  },
  defibrilator: "LIFEPAK 15"
};
