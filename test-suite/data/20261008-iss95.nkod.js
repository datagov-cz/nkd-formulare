export default {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-otevřená-data/draft/datová-sada/kontext.jsonld",
  "iri": "_:ds",
  "typ": "Datová sada",
  "název": { "cs": "Aktuality" },
  "popis": {
    "cs": "V této sekci jsou definovány jednotlivé třídy a jejich vlastnosti potřebné pro popis aktualit. Pro každou vlastnost je uveden její identifikátor, který je pro její reprezentaci použit ve všech datových formátech, její název, datový typ, popis a příklad.",
  },
  "klíčové_slovo": {
    "cs": ["Aktuality", "Novinky", "Informace"],
  },
  "periodicita_aktualizace": "http://publications.europa.eu/resource/authority/frequency/MONTHLY",
  "prvek_rúian": ["https://linked.cuzk.cz/resource/ruian/stat/1"],
  "právní_předpis": [
    "http://data.europa.eu/eli/dir/2019/1024/oj"
  ],
  "téma": [
    "http://publications.europa.eu/resource/authority/data-theme/SOCI",
  ],
  "distribuce": [{
    "typ": "Distribuce",
    "soubor_ke_stažení": "http://nesmysl.cz",
    "přístupové_url": "http://nesmysl.cz",
    "právní_předpis": [
      "http://data.europa.eu/eli/dir/2019/1024/oj"
    ],
    "typ_média": "http://www.iana.org/assignments/media-types/application/json",
    "formát": "http://publications.europa.eu/resource/authority/file-type/JSON",
    "typ_média_balíčku": "http://www.iana.org/assignments/media-types/application/json-lines",
    "typ_média_komprese": "http://www.iana.org/assignments/media-types/application/json",
    "podmínky_užití": {
      "typ": "Specifikace podmínek užití",
      "autorské_dílo": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
      "databáze_jako_autorské_dílo": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "databáze_chráněná_zvláštními_právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "osobní_údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    },
  }],
}