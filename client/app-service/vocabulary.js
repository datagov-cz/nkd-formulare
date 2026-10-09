export const SKOS = {
  "inScheme": "http://www.w3.org/2004/02/skos/core#inScheme",
};

export const DCTERMS = {
  "title": "http://purl.org/dc/terms/title",
  "temporal": "http://purl.org/dc/terms/temporal",
  "description": "http://purl.org/dc/terms/description",
  "accrualPeriodicity": "http://purl.org/dc/terms/accrualPeriodicity",
  "spatial": "http://purl.org/dc/terms/spatial",
  "format": "http://purl.org/dc/terms/format",
  "conformsTo": "http://purl.org/dc/terms/conformsTo",
  "PeriodOfTime": "http://purl.org/dc/terms/PeriodOfTime",
  "publisher": "http://purl.org/dc/terms/publisher",
};

export const DCATAP = {
  "Dataset": "http://www.w3.org/ns/dcat#Dataset",
  "Catalog": "http://www.w3.org/ns/dcat#Catalog",
  "contactPoint": "http://www.w3.org/ns/dcat#contactPoint",
  "distribution": "http://www.w3.org/ns/dcat#distribution",
  "theme": "http://www.w3.org/ns/dcat#theme",
  "keyword": "http://www.w3.org/ns/dcat#keyword",
  "downloadURL": "http://www.w3.org/ns/dcat#downloadURL",
  "mediaType": "http://www.w3.org/ns/dcat#mediaType",
  "Distribution": "http://www.w3.org/ns/dcat#Distribution",
  "endpointURL": "http://www.w3.org/ns/dcat#endpointURL",
  "DataService": "http://www.w3.org/ns/dcat#DataService",
  "endpointDescription": "http://www.w3.org/ns/dcat#endpointDescription",
  "servesDataset": "http://www.w3.org/ns/dcat#servesDataset",
  "accessURL": "http://www.w3.org/ns/dcat#accessURL",
  "accessService": "http://www.w3.org/ns/dcat#accessService",
  "packageFormat": "http://www.w3.org/ns/dcat#packageFormat",
  "compressFormat": "http://www.w3.org/ns/dcat#compressFormat",
  "startDate": "http://www.w3.org/ns/dcat#startDate",
  "endDate": "http://www.w3.org/ns/dcat#endDate",
  "temporalResolution": "http://www.w3.org/ns/dcat#temporalResolution",
  "spatialResolutionInMeters":
    "http://www.w3.org/ns/dcat#spatialResolutionInMeters",
  "landingPage": "http://www.w3.org/ns/dcat#landingPage",
};

export const EUROPE = {
  "applicableLegislation": "http://data.europa.eu/r5r/applicableLegislation",
  "hvdCategory": "http://data.europa.eu/r5r/hvdCategory",
  /** High value dataset legislation. */
  "REG_2023_138_oj": "http://data.europa.eu/eli/reg_impl/2023/138/oj",
};

export const FOAF = {
  "page": "http://xmlns.com/foaf/0.1/page",
  "homepage": "http://xmlns.com/foaf/0.1/homepage",
};

export const VCARD = {
  "url": "http://www.w3.org/2006/vcard/ns#hasURL",
  "fn": "http://www.w3.org/2006/vcard/ns#fn",
  "hasEmail": "http://www.w3.org/2006/vcard/ns#hasEmail",
  "Organization": "http://www.w3.org/2006/vcard/ns#Organization",
};

const PU_PREFIX = "https://data.gov.cz/podmínky-užití/";
const PU_VOCAB_PREFIX = "https://data.gov.cz/slovník/podmínky-užití/";
export const PU = {
  "specifikace": PU_VOCAB_PREFIX + "specifikace",
  "autorskeDilo": PU_VOCAB_PREFIX + "autorské-dílo",
  "databazeJakoAutorskeDilo": PU_VOCAB_PREFIX + "databáze-jako-autorské-dílo",
  "databazeChranenaZvlastnimiPravy":
    PU_VOCAB_PREFIX + "databáze-chráněná-zvláštními-právy",
  "autor": PU_VOCAB_PREFIX + "autor",
  "autorDatabaze": PU_VOCAB_PREFIX + "autor-databáze",
  "osobniUdaje": PU_VOCAB_PREFIX + "osobní-údaje",
  "Specifikace": PU_VOCAB_PREFIX + "Specifikace",
  "obsahujeViceAutorskychDel": PU_PREFIX + "obsahuje-více-autorských-děl/",
  "neobsahujeAutorskaDila": PU_PREFIX + "neobsahuje-autorská-díla/",
  "neniAutorskopravneChranenouDatabazi":
    PU_PREFIX + "není-autorskoprávně-chráněnou-databází/",
  "neniChranenazvlastnimPravemPorizovateleDatabaze":
    PU_PREFIX + "není-chráněna-zvláštním-právem-pořizovatele-databáze/",
  "obsahujeOsobniUdaje": PU_PREFIX + "obsahuje-osobní-údaje/",
  "neobsahujeOsobniUdaje": PU_PREFIX + "neobsahuje-osobní-údaje/",
};

export const CREATIVE_COMMONS = {
  "BY_40": "https://creativecommons.org/licenses/by/4.0/",
  "PUBLIC_ZERO_10": "https://creativecommons.org/publicdomain/zero/1.0/",
};

export const NKOD = {
  "Formular":
    "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář",
  "lkod": "https://data.gov.cz/slovník/nkod/lkod",
};

export const ADMS = {
  "status": "http://www.w3.org/ns/adms#status",
};

export const STATUS = {
  "Withdrawn": "http://purl.org/adms/status/Withdrawn",
};

const ESBIRKA_PREFIX = "https://www.e-sbirka.cz/eli/cz/sb/";

export const ESBIRKA = {
  /** Open data. */
  "SB_1999_106_2025_08_19": ESBIRKA_PREFIX + "1999/106/2025-08-19",
  /** Dynamic data - obsolete. */
  "NORM_2024_01_011_3A_6": ESBIRKA_PREFIX + "1999/106/2024-01-01/dokument/norma/cast_1/par_3a/odst_6",
  /** Dynamic data. */
  "NORM_2025_08_19_1_3A_6": ESBIRKA_PREFIX + "1999/106/2025-08-19/dokument/norma/cast_1/par_3a/odst_6",
  /** Data from a public registry - obsolete. */
  "NORM_2024_01_01_1_5A_1": ESBIRKA_PREFIX + "1999/106/2024-01-01/dokument/norma/cast_1/par_5a/odst_1",
  /** Data from a public registry. */
  "NORM_2025_08_19_1_5A_1": ESBIRKA_PREFIX + "1999/106/2025-08-19/dokument/norma/cast_1/par_5a/odst_1",
  /** High value dataset - use only for a dataset. */
  "NORM_1_5B": ESBIRKA_PREFIX + "1999/106/2025-08-19/dokument/norma/cast_1/par_5b",
  /** Non-public. */
  "SB_2026_60_2026_05_27": ESBIRKA_PREFIX + "2026/60/2026-05-27",
  /** Non-public - secondary for distribution / data service only. */
  "SB_2000_365_2026_01_01": ESBIRKA_PREFIX + "2000/365/2026-01-01",
  /** Non-public - secondary for distribution / data service only. */
  "SB_2023_360_2024_07_01": ESBIRKA_PREFIX + "2023/360/2024-07-01",

  // https://www.e-sbirka.cz/eli/cz/sb/1999/106/2025-08-19/dokument/norma/cast_1/par_3a/odst_6
};

const VOCABULARY_GOV_CZ_PREFIX = "https://slovník.gov.cz/legislativní/sbírka/";

export const VOCABULARY_GOV_CZ = {
  "tyka-se-pojmu":
    "https://slovník.gov.cz/veřejný-sektor/pojem/týká-se-pojmu",
  "zahrnuje":
    VOCABULARY_GOV_CZ_PREFIX + "365/2000/pojem/zahrnuje",
  "typ-obsahu-sdileneho-rozhranim":
    VOCABULARY_GOV_CZ_PREFIX + "360/2023/pojem/má-typ-obsahu-sdíleného-rozhraním",
  "zpusob-sdileni-rozhranim":
    VOCABULARY_GOV_CZ_PREFIX + "360/2023/pojem/má-způsob-sdílení-rozhraním",
  "zpusob-ziskani-dat-sdilenych-rozhranim":
    VOCABULARY_GOV_CZ_PREFIX + "360/2023/pojem/má-způsob-získání-dat-sdílených-rozhraním",
  "zprostredkovava-sdileni":
    VOCABULARY_GOV_CZ_PREFIX + "360/2023/pojem/zprostředkovává-sdílení",
  "sdilen-jako":
    VOCABULARY_GOV_CZ_PREFIX + "360/2023/pojem/je-sdílen-jako",
  "sdilen-zpusobem":
    VOCABULARY_GOV_CZ_PREFIX + "360/2023/pojem/je-sdílen-způsobem",
  "ziskan-zpusobem":
    VOCABULARY_GOV_CZ_PREFIX + "360/2023/pojem/je-získán-způsobem",
  "odpovidajici-pojem":
    VOCABULARY_GOV_CZ_PREFIX + "360/2023/pojem/odpovídající-pojem",
  "je-sdilen-jako":
    VOCABULARY_GOV_CZ_PREFIX + "360/2023/pojem/je-sdílen-jako",
};
