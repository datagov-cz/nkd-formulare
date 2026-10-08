export default {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-hvd/draft/datová-sada/kontext.jsonld",
  "iri": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a",
  "typ": "Datová sada",
  "název": { "cs": "HVD1", "en": "HVD1" },
  "popis": {
    "cs": "Obsahem datové sady jsou schválené a aktuálně platné jízdní řády veřejné linkové dopravy postoupené do Celostátního informačního systému o jízdních řádech ve strojově zpracovatelném formátu.",
    "en": "This dataset contains approved timetables and timetables in effect for public transport entered into the state-wide timetable information system.",
  },
  "prvek_rúian": ["https://linked.cuzk.cz/resource/ruian/stat/1"],
  "geografické_území": [
    "http://publications.europa.eu/resource/authority/continent/EUROPE",
  ],
  "klíčové_slovo": {
    "cs": ["hvd", "jízdní řády", "veřejná linková doprava", "autobus"],
    "en": ["public transport", "hvd", "bus", "timetable"],
  },
  "periodicita_aktualizace": "http://publications.europa.eu/resource/authority/frequency/WEEKLY_3",
  "dokumentace": "https://www.mdcr.cz/Dokumenty/Verejna-doprava/Jizdni-rady,-kalendare-pro-jizdni-rady,-metodi-(1)/Jizdni-rady-verejne-dopravy",
  "téma": [
    "http://publications.europa.eu/resource/authority/data-theme/TRAN",
  ],
  "právní_předpis": [
    "http://data.europa.eu/eli/dir/2019/1024/oj",
    "http://data.europa.eu/eli/reg_impl/2023/138/oj",
  ],
  "kategorie_hvd": [
    "http://data.europa.eu/bna/c_164e0bf5",
    "http://data.europa.eu/bna/c_1e787364",
  ],
  "koncept_euroVoc": [
    "http://eurovoc.europa.eu/4512",
  ],
  "specifikace": ["https://ofn.gov.cz/jízdní-řády/2020-05-01/"],
  "časové_rozlišení": "86400",
  "prostorové_rozlišení_v_metrech": "12",
  "kontaktní_bod": {
    "typ": "Organizace",
    "jméno": { "cs": "Ministerstvo dopravy, Odbor veřejné dopravy" },
    "e-mail": "mailto:sekretariat.190@mdcr.cz",
  },
  "poskytovatel": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/orgán-veřejné-moci/17651921",
  "distribuce": [{
    "typ": "Distribuce",
    "iri": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/d667317f36e6a27375cd266dae603b3a",
    "název": {
      "cs": "JSON distribuce v ZIP soubrou",
      "en": "JSON distribution in ZIP file",
    },
    "podmínky_užití": {
      "typ": "Specifikace podmínek užití",
      "autorské_dílo": "https://creativecommons.org/licenses/by/4.0/",
      "autor": { "cs": "Ministerstvo dopravy, Odbor veřejné dopravy" },
      "databáze_jako_autorské_dílo": "https://creativecommons.org/licenses/by/4.0/",
      "autor_databáze": {
        "cs": "Ministerstvo dopravy, Odbor veřejné dopravy",
      },
      "databáze_chráněná_zvláštními_právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "osobní_údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    },
    "soubor_ke_stažení": "https://portal.cisjr.cz/pub/draha/mestske/JDF.zip",
    "právní_předpis": ["http://data.europa.eu/eli/dir/2019/1024/oj"],
    "přístupové_url": "https://portal.cisjr.cz/pub/draha/mestske/JDF.zip",
    "typ_média": "http://www.iana.org/assignments/media-types/application/json",
    "formát": "http://publications.europa.eu/resource/authority/file-type/ZIP",
    "schéma": "https://portal.cisjr.cz/schemata/json-schema.json",
    "typ_média_balíčku": "http://www.iana.org/assignments/media-types/application/zip",
    "typ_média_komprese": "http://www.iana.org/assignments/media-types/application/zip",
  }, {
    "typ": "Distribuce",
    "iri": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a",
    "název": {
      "cs": "SPARQL endpoint pro jízdní řády",
      "en": "SPARQL endpoint for timetables",
    },
    "podmínky_užití": {
      "typ": "Specifikace podmínek užití",
      "autorské_dílo": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
      "databáze_jako_autorské_dílo": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "databáze_chráněná_zvláštními_právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "osobní_údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    },
    "právní_předpis": [
      "http://data.europa.eu/eli/dir/2019/1024/oj",
      "http://data.europa.eu/eli/reg_impl/2023/138/oj"
    ],
    "přístupové_url": "https://portal.cisjr.cz/sparql",
    "přístupová_služba": {
      "typ": "Datová služba",
      "přístupový_bod": "https://portal.cisjr.cz/sparql",
      "popis_přístupového_bodu": "https://portal.cisjr.cz/sparql",
      "iri": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02",
      "název": {
        "cs": "SPARQL endpoint pro jízdní řády",
        "en": "SPARQL endpoint for timetables",
      },
      "specifikace": ["https://www.w3.org/TR/sparql11-protocol/"],
      "právní_předpis": [
        "http://data.europa.eu/eli/dir/2019/1024/oj",
        "http://data.europa.eu/eli/reg_impl/2023/138/oj"
      ],
      "dokumentace": "https://www.data.cz/služba/dokumentace",
      "kategorie_hvd": ["http://data.europa.eu/bna/c_164e0bf5", "http://data.europa.eu/bna/c_1e787364"],
      "kontaktní_bod": {
        "e-mail": "mailto:sekretariat.190@mdcr.cz",
        "jméno": { "cs": "Ministerstvo dopravy, Odbor veřejné dopravy" },
        "typ": "Organizace",
      },
    },
  }],
}