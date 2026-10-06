/* eslint max-len: 0 */

import { importFromJsonLd } from "../import-dataset";
import {
  exportDatasetForNationalDataCatalog,
  exportDatasetForLocalDataCatalog,
  exportDatasetForPost,
} from "./dataset-export";

const OPENDATA = "http://data.europa.eu/eli/dir/2019/1024/oj";

const HVD = "http://data.europa.eu/eli/reg_impl/2023/138/oj";

const DYNAMIC = "https://www.e-sbirka.cz/eli/cz/sb/1999/106/2024-01-01/dokument/norma/cast_1/par_3a/odst_6";

// HVD, DYNAMIC
const BYLANY = {
  "@graph": [
    {
      "@id": "https://data.gov.cz/zdroj/katalog/NKOD",
      "http://www.w3.org/ns/dcat#record": { "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/záznam" },
      "http://www.w3.org/ns/dcat#dataset": { "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670" },
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2",
      "@type": "http://www.w3.org/ns/dcat#Distribution",
      "https://data.gov.cz/slovník/nkod/mediaType": "application/pdf",
      "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/typ\u00DAložiště": { "@id": "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/Web" },
      "https://data.gov.cz/slovník/podmínky-užití/specifikace": { "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2/podmínky-užití" },
      "http://www.w3.org/ns/dcat#downloadURL": { "@id": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20M\u0160%20III%20etapa.pdf" },
      "http://www.w3.org/ns/dcat#accessURL": { "@id": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20M\u0160%20III%20etapa.pdf" },
      "http://data.europa.eu/r5r/applicableLegislation": { "@id": HVD },
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/kontaktní-bod",
      "@type": ["http://www.w3.org/2006/vcard/ns#Kind",
        "http://www.w3.org/2006/vcard/ns#Individual"],
      "http://www.w3.org/2006/vcard/ns#fn": "Jan Málek,starosta",
      "http://www.w3.org/2006/vcard/ns#hasEmail": "ou.bylany@worldonline.cz",
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/záznam",
      "@type": "http://www.w3.org/ns/dcat#CatalogRecord",
      "http://purl.org/dc/terms/modified": {
        "@value": "2017-08-22T00:00:00",
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      },
      "http://purl.org/dc/terms/language": { "@id": "http://publications.europa.eu/resource/authority/language/CES" },
      "http://purl.org/dc/terms/conformsTo": { "@id": "https://joinup.ec.europa.eu/release/dcat-ap/12" },
      "http://purl.org/dc/terms/issued": {
        "@value": "2017-08-22T00:00:00",
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      },
      "http://xmlns.com/foaf/0.1/primaryTopic": { "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670" },
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/časové-pokrytí",
      "@type": "http://purl.org/dc/terms/PeriodOfTime",
      "http://www.w3.org/ns/dcat#endDate": {
        "@value": "2017-08-31",
        "@type": "http://www.w3.org/2001/XMLSchema#date",
      },
      "http://www.w3.org/ns/dcat#startDate": {
        "@value": "2017-06-01",
        "@type": "http://www.w3.org/2001/XMLSchema#date",
      },
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2/podmínky-užití",
      "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
      "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": { "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/" },
      "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": { "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/" },
      "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": { "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/" },
      "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": { "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/" },
    },
    {
      "@id": "https://data.gov.cz/zdroj/ovm/00269905",
      "@type": "http://xmlns.com/foaf/0.1/Agent",
      "http://xmlns.com/foaf/0.1/name": "Obec Bylany",
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670",
      "@type": ["http://www.w3.org/ns/dcat#Dataset",
        "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"],
      "http://purl.org/dc/terms/modified": {
        "@value": "2017-08-22T00:00:00",
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      },
      "http://purl.org/dc/terms/title": "Obec Bylany",
      "http://purl.org/dc/terms/description": "Oprava kuchyně v M\u0160-III.etapa",
      "http://purl.org/dc/terms/identifier": ["https://data.gov.cz/zdroj/datové-sady/qmsa4he/243671670",
        "243671670"],
      "http://purl.org/dc/terms/publisher": { "@id": "https://data.gov.cz/zdroj/ovm/00269905" },
      "http://purl.org/dc/terms/spatial": { "@id": "https://linked.cuzk.cz/resource/ruian/stat/1" },
      "http://purl.org/dc/terms/issued": {
        "@value": "2017-08-22T00:00:00",
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      },
      "http://www.w3.org/ns/dcat#contactPoint": { "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/kontaktní-bod" },
      "http://www.w3.org/ns/dcat#distribution": { "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2" },
      "http://purl.org/dc/terms/accrualPeriodicity": { "@id": "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT" },
      "http://purl.org/dc/terms/temporal": { "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/časové-pokrytí" },
      "http://www.w3.org/ns/dcat#keyword": "obec Bylany",
      "http://data.europa.eu/r5r/applicableLegislation": [{
        "@id": HVD,
      }, {
        "@id": DYNAMIC,
      }],
      "http://data.europa.eu/r5r/hvdCategory": { "@id": "http://data.europa.eu/bna/c_b151a0ba" },
    },
  ],
};

const BYLANY_EXPECTED_NKOD = {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-hvd/2026-09-23/datová-sada/kontext.jsonld",
  "iri": "_:ds",
  "typ": "Datová sada",
  "název": { "cs": "Obec Bylany" },
  "popis": { "cs": "Oprava kuchyně v MŠ-III.etapa" },
  "prvek_rúian": ["https://linked.cuzk.cz/resource/ruian/stat/1"],
  "časové_pokrytí": {
    "typ": "Časový interval",
    "začátek": "2017-06-01",
    "konec": "2017-08-31",
  },
  "klíčové_slovo": { "cs": ["obec Bylany"] },
  "periodicita_aktualizace": "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT",
  "kontaktní_bod": {
    "typ": "Organizace",
    "jméno": { "cs": "Jan Málek,starosta" },
    "e-mail": "mailto:ou.bylany@worldonline.cz",
  },
  "právní_předpis": [OPENDATA, HVD, DYNAMIC],
  "kategorie_hvd": ["http://data.europa.eu/bna/c_b151a0ba"],
  "distribuce": [{
    "typ": "Distribuce",
    "soubor_ke_stažení": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20MŠ%20III%20etapa.pdf",
    "přístupové_url": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20MŠ%20III%20etapa.pdf",
    "podmínky_užití": {
      "typ": "Specifikace podmínek užití",
      "autorské_dílo": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
      "databáze_jako_autorské_dílo": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "databáze_chráněná_zvláštními_právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "osobní_údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    },
    "právní_předpis": [OPENDATA, HVD],
  }],
};

test("Bylany from json-ld and back for NKOD.", () => {
  return importFromJsonLd(BYLANY, "cs").then(data => {
    const actual = exportDatasetForNationalDataCatalog(
      data.dataset, data.distributions);
    expect(actual).toEqual(BYLANY_EXPECTED_NKOD);
  });
});

const BYLANY_EXPECTED_LKOD = {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-hvd/2026-09-23/datová-sada/kontext.jsonld",
  "iri": "https://data.gov.cz/datové-sady",
  "typ": "Datová sada",
  "název": { "cs": "Obec Bylany" },
  "popis": { "cs": "Oprava kuchyně v MŠ-III.etapa" },
  "prvek_rúian": ["https://linked.cuzk.cz/resource/ruian/stat/1"],
  "právní_předpis": [OPENDATA, HVD, DYNAMIC],
  "poskytovatel": "https://data.gov.cz/zdroj/ovm",
  "časové_pokrytí": {
    "typ": "Časový interval",
    "začátek": "2017-06-01",
    "konec": "2017-08-31",
  },
  "klíčové_slovo": {
    "cs": ["obec Bylany"],
  },
  "periodicita_aktualizace": "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT",
  "kontaktní_bod": {
    "typ": "Organizace",
    "jméno": { "cs": "Jan Málek,starosta" },
    "e-mail": "mailto:ou.bylany@worldonline.cz",
  },
  "kategorie_hvd": ["http://data.europa.eu/bna/c_b151a0ba"],
  "distribuce": [{
    "iri": "https://data.gov.cz/datové-sady/distribuce/0",
    "typ": "Distribuce",
    "soubor_ke_stažení": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20MŠ%20III%20etapa.pdf",
    "přístupové_url": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20MŠ%20III%20etapa.pdf",
    "podmínky_užití": {
      "typ": "Specifikace podmínek užití",
      "autorské_dílo": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
      "databáze_jako_autorské_dílo": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "databáze_chráněná_zvláštními_právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "osobní_údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    },
    "právní_předpis": [OPENDATA, HVD],
  }],
};

test("Bylany from json-ld and back for LKOD.", () => {
  return importFromJsonLd(BYLANY, "cs").then(data => {
    const actual = exportDatasetForLocalDataCatalog(
      data.dataset, data.distributions, {
        "lkodIri": "https://data.gov.cz/datové-sady",
        "publisher": "https://data.gov.cz/zdroj/ovm",
      });
    expect(actual).toEqual(BYLANY_EXPECTED_LKOD);
  });
});

const BYLANY_EXPECTED_POST = {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-hvd/2026-09-23/datová-sada/kontext.jsonld",
  "iri": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670",
  "typ": "Datová sada",
  "název": { "cs": "Obec Bylany" },
  "popis": { "cs": "Oprava kuchyně v MŠ-III.etapa" },
  "prvek_rúian": ["https://linked.cuzk.cz/resource/ruian/stat/1"],
  "poskytovatel": "https://data.gov.cz/zdroj/ovm/00269905",
  "časové_pokrytí": {
    "typ": "Časový interval",
    "začátek": "2017-06-01",
    "konec": "2017-08-31",
  },
  "klíčové_slovo": {
    "cs": ["obec Bylany"],
  },
  "periodicita_aktualizace": "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT",
  "kontaktní_bod": {
    "typ": "Organizace",
    "jméno": { "cs": "Jan Málek,starosta" },
    "e-mail": "mailto:ou.bylany@worldonline.cz",
  },
  "právní_předpis": [OPENDATA, HVD, DYNAMIC],
  "kategorie_hvd": ["http://data.europa.eu/bna/c_b151a0ba"],
  "distribuce": [{
    "iri": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2",
    "typ": "Distribuce",
    "soubor_ke_stažení": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20MŠ%20III%20etapa.pdf",
    "přístupové_url": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20MŠ%20III%20etapa.pdf",
    "podmínky_užití": {
      "typ": "Specifikace podmínek užití",
      "autorské_dílo": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
      "databáze_jako_autorské_dílo": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "databáze_chráněná_zvláštními_právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "osobní_údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    },
    "právní_předpis": [OPENDATA, HVD],
  }],
};

test("Bylany from json-ld and back for POST.", () => {
  return importFromJsonLd(BYLANY, "cs").then(data => {
    const actual = exportDatasetForPost(data.dataset, data.distributions);
    expect(actual).toEqual(BYLANY_EXPECTED_POST);
  });
});

// OPENDATA
const ISS94 = {
  "@id": "_:ds",
  "@type": [
    "http://www.w3.org/ns/dcat#Dataset",
    "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář",
  ],
  "http://purl.org/dc/terms/title": [
    {
      "@language": "cs",
      "@value": "aaabbb",
    },
  ],
  "http://purl.org/dc/terms/description": [
    {
      "@language": "cs",
      "@value": "bbb",
    },
  ],
  "http://www.w3.org/ns/dcat#keyword": [
    [
      {
        "@language": "cs",
        "@value": "cccs",
      },
      {
        "@language": "en",
        "@value": "en",
      },
    ],
  ],
  "http://www.w3.org/ns/dcat#distribution": [
    {
      "@type": "http://www.w3.org/ns/dcat#Distribution",
      "http://purl.org/dc/terms/title": [
        {
          "@language": "cs",
          "@value": "Moje webservica",
        },
        {
          "@language": "en",
          "@value": "my webservice",
        },
      ],
      "http://www.w3.org/ns/dcat#accessURL": {
        "@id": "https://url.cz",
      },
      "http://www.w3.org/ns/dcat#accessService": {
        "@type": "http://www.w3.org/ns/dcat#DataService",
        "http://www.w3.org/ns/dcat#endpointURL": {
          "@id": "https://url.cz",
        },
        "http://www.w3.org/ns/dcat#endpointDescription": {
          "@id": "https://popis.url",
        },
        "http://purl.org/dc/terms/title": [
          {
            "@language": "cs",
            "@value": "Moje webservica",
          },
          {
            "@language": "en",
            "@value": "my webservice",
          },
        ],
        "http://www.w3.org/ns/dcat#servesDataset": {
          "@id": "_:ds",
        },
        "http://purl.org/dc/terms/conformsTo": {
          "@id": "https://ofn.gov.cz/kontakty/2020-07-01/",
        },
      },
      "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
        "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
        "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
          "@id": "https://creativecommons.org/licenses/by/4.0/",
        },
        "https://data.gov.cz/slovník/podmínky-užití/autor": {
          "@language": "cs",
          "@value": "Zelenka",
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
          "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
        },
        "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
        },
      },
    },
  ],
  "http://purl.org/dc/terms/accrualPeriodicity": {
    "@id": "http://publications.europa.eu/resource/authority/frequency/MONTHLY",
  },
  "http://purl.org/dc/terms/spatial": [
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1",
    },
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1",
    },
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1",
    },
  ],
  "http://www.w3.org/ns/dcat#theme": [
    {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/ENER",
    },
  ],
  "http://purl.org/dc/terms/conformsTo": [],
  "http://www.w3.org/ns/dcat#contactPoint": {
    "@id": "_:kontaktní-bod",
    "@type": ["http://www.w3.org/2006/vcard/ns#Kind",
      "http://www.w3.org/2006/vcard/ns#Individual"],
    "http://www.w3.org/2006/vcard/ns#fn": "Pavel",
    "http://www.w3.org/2006/vcard/ns#hasEmail": "mailto:pavel@email.cz",
  },
  "http://purl.org/dc/terms/publisher": [{ "@id": "https://data.gov.cz/zdroj/ovm/66003008" }],
};

const ISS94_EXPECTED_LKOD = {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-otevřená-data/2026-09-23/datová-sada/kontext.jsonld",
  "iri": "https://local-publisher",
  "typ": "Datová sada",
  "název": { "cs": "aaabbb" },
  "popis": { "cs": "bbb" },
  "klíčové_slovo": { "cs": ["cccs"], "en": ["en"] },
  "periodicita_aktualizace": "http://publications.europa.eu/resource/authority/frequency/MONTHLY",
  "prvek_rúian": ["https://linked.cuzk.cz/resource/ruian/stat/1"],
  "právní_předpis": [OPENDATA],
  "téma": ["http://publications.europa.eu/resource/authority/data-theme/ENER"],
  "poskytovatel": "https://data.gov.cz/zdroj/ovm/66003008",
  "kontaktní_bod": {
    "typ": "Organizace",
    "jméno": { "cs": "Pavel" },
    "e-mail": "mailto:pavel@email.cz",
  },
  "distribuce": [{
    "iri": "https://local-publisher/distribuce/0",
    "typ": "Distribuce",
    "název": {
      "cs": "Moje webservica",
      "en": "my webservice",
    },
    "přístupové_url": "https://url.cz",
    "právní_předpis": [OPENDATA],
    "přístupová_služba": {
      "iri": "https://local-publisher/distribuce/0/přístupová-služba",
      "typ": "Datová služba",
      "přístupový_bod": "https://url.cz",
      "popis_přístupového_bodu": "https://popis.url",
      "právní_předpis": [OPENDATA],
      "název": {
        "cs": "Moje webservica",
        "en": "my webservice",
      },
      "specifikace": ["https://ofn.gov.cz/kontakty/2020-07-01/"],
    },
    "podmínky_užití": {
      "typ": "Specifikace podmínek užití",
      "autorské_dílo": "https://creativecommons.org/licenses/by/4.0/",
      "autor": {
        "cs": "Zelenka",
      },
      "databáze_jako_autorské_dílo": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "databáze_chráněná_zvláštními_právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "osobní_údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    },
  }],
};

test("ISS94 from json-ld and back for LKOD.", () => {
  return importFromJsonLd(ISS94, "cs").then(data => {
    const actual = exportDatasetForLocalDataCatalog(
      data.dataset, data.distributions, {
        "lkodIri": "https://local-publisher",
      });
    expect(actual).toEqual(ISS94_EXPECTED_LKOD);
  });
});

// OPENDATA
const ISS95 = {
  "@type": [
    "http://www.w3.org/ns/dcat#Dataset",
    "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář",
  ],
  "http://purl.org/dc/terms/title": {
    "@language": "cs",
    "@value": "Aktuality",
  },
  "http://purl.org/dc/terms/description": {
    "@language": "cs",
    "@value": "V této sekci jsou definovány jednotlivé třídy a jejich vlastnosti potřebné pro popis aktualit. Pro každou vlastnost je uveden její identifikátor, který je pro její reprezentaci použit ve všech datových formátech, její název, datový typ, popis a příklad.",
  },
  "http://www.w3.org/ns/dcat#keyword": [
    {
      "@language": "cs",
      "@value": "Aktuality",
    },
    {
      "@language": "cs",
      "@value": "Novinky",
    },
    {
      "@language": "cs",
      "@value": "Informace",
    },
  ],
  "http://www.w3.org/ns/dcat#distribution": [
    {
      "@type": [
        "http://www.w3.org/ns/dcat#Distribution",
      ],
      "http://www.w3.org/ns/dcat#downloadURL": {
        "@id": "http://nesmysl.cz",
      },
      "http://www.w3.org/ns/dcat#mediaType": {
        "@id": "http://www.iana.org/assignments/media-types/application/json",
      },
      "http://purl.org/dc/terms/format": {
        "@id": "http://publications.europa.eu/resource/authority/file-type/JSON",
      },
      "http://www.w3.org/ns/dcat#packageFormat": {
        "@id": "http://www.iana.org/assignments/media-types/application/json-lines",
      },
      "http://www.w3.org/ns/dcat#compressFormat": {
        "@id": "http://www.iana.org/assignments/media-types/application/json",
      },
      "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
        "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
        "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
          "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
        },
        "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
        },
      },
    },
  ],
  "http://purl.org/dc/terms/accrualPeriodicity": {
    "@id": "http://publications.europa.eu/resource/authority/frequency/MONTHLY",
  },
  "http://purl.org/dc/terms/spatial": {
    "@id": "https://linked.cuzk.cz/resource/ruian/stat/1",
  },
  "http://www.w3.org/ns/dcat#theme": [
    {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/SOCI",
    },
  ],
};

const ISS95_EXPECTED_NKOD = {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-otevřená-data/2026-09-23/datová-sada/kontext.jsonld",
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
  "právní_předpis": [OPENDATA],
  "téma": [
    "http://publications.europa.eu/resource/authority/data-theme/SOCI",
  ],
  "distribuce": [{
    "typ": "Distribuce",
    "soubor_ke_stažení": "http://nesmysl.cz",
    "přístupové_url": "http://nesmysl.cz",
    "právní_předpis": [OPENDATA],
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
};

test("ISS95 from json-ld and back for NKOD.", () => {
  return importFromJsonLd(ISS95, "cs").then(data => {
    const actual = exportDatasetForNationalDataCatalog(
      data.dataset, data.distributions);
    expect(actual).toEqual(ISS95_EXPECTED_NKOD);
  });
});

// OPENDATA
const ISS97a = {
  "@id": "https://data.gov.cz/zdroj/datové-sady/MDopravy/154129471",
  "@type": ["https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář", "http://www.w3.org/ns/dcat#Dataset"],
  "http://purl.org/dc/terms/modified": [{
    "@value": "2017-01-24T00:00:00",
    "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
  }],
  "http://purl.org/dc/terms/title": [{
    "@value": "Faktury CENDIS 2016",
    "@language": "cs",
  }],
  "http://purl.org/dc/terms/description": [{
    "@value": "Uhrazené faktury CENDIS (resort dopravy) v roce 2016",
    "@language": "cs",
  }],
  "http://purl.org/dc/terms/identifier": [{
    "@value": "https://data.gov.cz/zdroj/datové-sady/n75aau3/154129471",
    "@type": "http://www.w3.org/2001/XMLSchema#anyURI",
  }, "154129471"],
  "http://purl.org/dc/terms/publisher": [{ "@id": "https://data.gov.cz/zdroj/ovm/66003008" }],
  "http://purl.org/dc/terms/issued": [{
    "@value": "2017-01-24T00:00:00",
    "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
  }],
  "http://www.w3.org/ns/dcat#theme": [
    {
      "@id": "http://eurovoc.europa.eu/2175",
    }, {
      "@id": "http://eurovoc.europa.eu/4304",
    },
  ],
  "http://purl.org/dc/terms/spatial": [{ "@id": "https://linked.cuzk.cz/resource/ruian/stat/1" }],
  "http://purl.org/dc/terms/accrualPeriodicity": [{ "@id": "http://publications.europa.eu/resource/authority/frequency/MONTHLY" }],
  "http://www.w3.org/ns/dcat#distribution": [{ "@id": "https://data.gov.cz/zdroj/datové-sady/MDopravy/154129471/distribuce/6d24ab88c1e4a0432a2a6e1cd383c0c7" }],
  "http://www.w3.org/ns/dcat#keyword": "faktura",
};

const ISS97a_EXPECTED_POST = {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-otevřená-data/2026-09-23/datová-sada/kontext.jsonld",
  "iri": "https://data.gov.cz/zdroj/datové-sady/MDopravy/154129471",
  "typ": "Datová sada",
  "název": { "cs": "Faktury CENDIS 2016" },
  "popis": { "cs": "Uhrazené faktury CENDIS (resort dopravy) v roce 2016" },
  "klíčové_slovo": { "cs": ["faktura"] },
  "periodicita_aktualizace": "http://publications.europa.eu/resource/authority/frequency/MONTHLY",
  "prvek_rúian": ["https://linked.cuzk.cz/resource/ruian/stat/1"],
  "právní_předpis": [OPENDATA],
  "poskytovatel": "https://data.gov.cz/zdroj/ovm/66003008",
  "koncept_euroVoc": [
    "http://eurovoc.europa.eu/2175", "http://eurovoc.europa.eu/4304",
  ],
};

test("ISS97a from json-ld and back for POST.", () => {
  return importFromJsonLd(ISS97a, "cs").then(data => {
    const actual = exportDatasetForPost(data.dataset, data.distributions);
    expect(actual).toEqual(ISS97a_EXPECTED_POST);
  });
});

// OPENDATA, HVD
const HVD_20240619 = {
  "@context": {
    "packageFormat": {
      "@id": "http://www.w3.org/ns/dcat#packageFormat",
      "@type": "@id",
    },
    "accessService": {
      "@id": "http://www.w3.org/ns/dcat#accessService",
      "@type": "@id",
    },
    "endpointURL": {
      "@id": "http://www.w3.org/ns/dcat#endpointURL",
      "@type": "@id",
    },
    "notaton": {
      "@id": "http://www.w3.org/2004/02/skos/core#notaton",
      "@type": "http://www.w3.org/2001/XMLSchema#anyURI",
    },
    "keyword": {
      "@id": "http://www.w3.org/ns/dcat#keyword",
    },
    "autor-databáze": {
      "@id": "https://data.gov.cz/slovník/podmínky-užití/autor-databáze",
    },
    "conformsTo": {
      "@id": "http://purl.org/dc/terms/conformsTo",
      "@type": "@id",
    },
    "endpointDescription": {
      "@id": "http://www.w3.org/ns/dcat#endpointDescription",
      "@type": "@id",
    },
    "page": {
      "@id": "http://xmlns.com/foaf/0.1/page",
      "@type": "@id",
    },
    "databáze-jako-autorské-dílo": {
      "@id": "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo",
      "@type": "@id",
    },
    "applicableLegislation": {
      "@id": "http://data.europa.eu/r5r/applicableLegislation",
      "@type": "@id",
    },
    "servesDataset": {
      "@id": "http://www.w3.org/ns/dcat#servesDataset",
      "@type": "@id",
    },
    "hvdCategory": {
      "@id": "http://data.europa.eu/r5r/hvdCategory",
      "@type": "@id",
    },
    "theme": {
      "@id": "http://www.w3.org/ns/dcat#theme",
      "@type": "@id",
    },
    "language": {
      "@id": "http://purl.org/dc/terms/language",
      "@type": "@id",
    },
    "record": {
      "@id": "http://www.w3.org/ns/dcat#record",
      "@type": "@id",
    },
    "downloadURL": {
      "@id": "http://www.w3.org/ns/dcat#downloadURL",
      "@type": "@id",
    },
    "source": {
      "@id": "http://purl.org/dc/terms/source",
      "@type": "@id",
    },
    "primaryTopic": {
      "@id": "http://xmlns.com/foaf/0.1/primaryTopic",
      "@type": "@id",
    },
    "distribution": {
      "@id": "http://www.w3.org/ns/dcat#distribution",
      "@type": "@id",
    },
    "accessURL": {
      "@id": "http://www.w3.org/ns/dcat#accessURL",
      "@type": "@id",
    },
    "spatial": {
      "@id": "http://purl.org/dc/terms/spatial",
      "@type": "@id",
    },
    "inScheme": {
      "@id": "http://www.w3.org/2004/02/skos/core#inScheme",
      "@type": "@id",
    },
    "dataset": {
      "@id": "http://www.w3.org/ns/dcat#dataset",
      "@type": "@id",
    },
    "autorské-dílo": {
      "@id": "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo",
      "@type": "@id",
    },
    "identifier@anyURI": {
      "@id": "http://purl.org/dc/terms/identifier",
      "@type": "http://www.w3.org/2001/XMLSchema#anyURI",
    },
    "description": {
      "@id": "http://purl.org/dc/terms/description",
    },
    "databáze-chráněná-zvláštními-právy": {
      "@id": "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy",
      "@type": "@id",
    },
    "fn": {
      "@id": "http://www.w3.org/2006/vcard/ns#fn",
    },
    "format": {
      "@id": "http://purl.org/dc/terms/format",
      "@type": "@id",
    },
    "creator": {
      "@id": "http://purl.org/dc/terms/creator",
      "@type": "@id",
    },
    "spatialResolutionInMeters": {
      "@id": "http://www.w3.org/ns/dcat#spatialResolutionInMeters",
    },
    "publisher": {
      "@id": "http://purl.org/dc/terms/publisher",
      "@type": "@id",
    },
    "accrualPeriodicity": {
      "@id": "http://purl.org/dc/terms/accrualPeriodicity",
      "@type": "@id",
    },
    "specifikace": {
      "@id": "https://data.gov.cz/slovník/podmínky-užití/specifikace",
      "@type": "@id",
    },
    "accessRights": {
      "@id": "http://purl.org/dc/terms/accessRights",
      "@type": "@id",
    },
    "compressFormat": {
      "@id": "http://www.w3.org/ns/dcat#compressFormat",
      "@type": "@id",
    },
    "notation": {
      "@id": "http://www.w3.org/2004/02/skos/core#notation",
      "@type": "http://www.w3.org/2001/XMLSchema#anyURI",
    },
    "contactPoint": {
      "@id": "http://www.w3.org/ns/dcat#contactPoint",
      "@type": "@id",
    },
    "name": {
      "@id": "http://xmlns.com/foaf/0.1/name",
    },
    "autor": {
      "@id": "https://data.gov.cz/slovník/podmínky-užití/autor",
    },
    "temporalResolution": {
      "@id": "http://www.w3.org/ns/dcat#temporalResolution",
      "@type": "http://www.w3.org/2001/XMLSchema#duration",
    },
    "mediaType": {
      "@id": "http://www.w3.org/ns/dcat#mediaType",
      "@type": "@id",
    },
    "title": {
      "@id": "http://purl.org/dc/terms/title",
    },
    "osobní-údaje": {
      "@id": "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje",
      "@type": "@id",
    },
    "identifier": {
      "@id": "http://www.w3.org/ns/adms#identifier",
      "@type": "@id",
    },
    "license": {
      "@id": "http://purl.org/dc/terms/license",
      "@type": "@id",
    },
    "hasEmail": {
      "@id": "http://www.w3.org/2006/vcard/ns#hasEmail",
      "@type": "@id",
    },
    "closeMatch": {
      "@id": "http://www.w3.org/2004/02/skos/core#closeMatch",
      "@type": "@id",
    },
  },
  "@graph": [
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/d667317f36e6a27375cd266dae603b3a",
      "@type": "http://www.w3.org/ns/dcat#Distribution",
      "title": [
        {
          "@value": "JSON distribuce v ZIP soubrou",
          "@language": "cs",
        },
        {
          "@value": "JSON distribution in ZIP file",
          "@language": "en",
        },
      ],
      "conformsTo": "https://portal.cisjr.cz/schemata/json-schema.json",
      "format": "http://publications.europa.eu/resource/authority/file-type/ZIP",
      "license": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/d667317f36e6a27375cd266dae603b3a/podmínky-užití",
      "specifikace": ["https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/d667317f36e6a27375cd266dae603b3a/podmínky-užití"],
      "accessURL": "https://portal.cisjr.cz/pub/draha/mestske/JDF.zip",
      "compressFormat": "http://www.iana.org/assignments/media-types/application/zip",
      "downloadURL": "https://portal.cisjr.cz/pub/draha/mestske/JDF.zip",
      "mediaType": "http://www.iana.org/assignments/media-types/application/json",
      "packageFormat": "http://www.iana.org/assignments/media-types/application/zip",
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/d667317f36e6a27375cd266dae603b3a/podmínky-užití",
      "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
      "autor": {
        "@value": "Ministerstvo dopravy, Odbor veřejné dopravy",
        "@language": "cs",
      },
      "autor-databáze": {
        "@value": "Ministerstvo dopravy, Odbor veřejné dopravy",
        "@language": "cs",
      },
      "autorské-dílo": "https://creativecommons.org/licenses/by/4.0/",
      "databáze-chráněná-zvláštními-právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "databáze-jako-autorské-dílo": "https://creativecommons.org/licenses/by/4.0/",
      "osobní-údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
      "closeMatch": "http://publications.europa.eu/resource/authority/licence/CC_BY_4_0",
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a",
      "@type": "http://www.w3.org/ns/dcat#Distribution",
      "title": [
        {
          "@value": "SPARQL endpoint pro jízdní řády",
          "@language": "cs",
        },
        {
          "@value": "SPARQL endpoint for timetables",
          "@language": "en",
        },
      ],
      "license": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/podmínky-užití",
      "specifikace": ["https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/podmínky-užití"],
      "accessService": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02",
      "accessURL": "https://portal.cisjr.cz/sparql",
      "applicableLegislation": HVD,
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02",
      "@type": "http://www.w3.org/ns/dcat#DataService",
      "title": [
        {
          "@value": "SPARQL endpoint pro jízdní řády",
          "@language": "cs",
        },
        {
          "@value": "SPARQL endpoint for timetables",
          "@language": "en",
        },
      ],
      "conformsTo": "https://www.w3.org/TR/sparql11-protocol/",
      "page": "https://www.data.cz/služba/dokumentace",
      "contactPoint": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02/kontaktní-bod",
      "endpointDescription": "https://portal.cisjr.cz/sparql",
      "endpointURL": "https://portal.cisjr.cz/sparql",
      "servesDataset": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a",
      "applicableLegislation": HVD,
      "hvdCategory": "http://data.europa.eu/bna/c_164e0bf5",
      "identifier": [
        "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02/identifikátorLKOD",
        "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02/identifikátorNKOD",
      ],
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/podmínky-užití",
      "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
      "autorské-dílo": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
      "databáze-chráněná-zvláštními-právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "databáze-jako-autorské-dílo": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "osobní-údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
      "closeMatch": "http://publications.europa.eu/resource/authority/licence/CC0",
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/kontaktní-bod",
      "@type": "http://www.w3.org/2006/vcard/ns#Organization",
      "fn": [
        {
          "@value": "Ministry of Transport",
          "@language": "en",
        },
        {
          "@value": "Ministerstvo dopravy, Odbor veřejné dopravy",
          "@language": "cs",
        },
      ],
      "hasEmail": "mailto:sekretariat.190@mdcr.cz",
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/záznam",
      "@type": "http://www.w3.org/ns/dcat#CatalogRecord",
      "source": "https://raw.githubusercontent.com/jakubklimek/lkod-test/main/datové-sady/hvd1.jsonld",
      "conformsTo": "https://semiceu.github.io/DCAT-AP/releases/3.0.0",
      "language": [
        "http://publications.europa.eu/resource/authority/language/CES",
        "http://publications.europa.eu/resource/authority/language/ENG",
      ],
      "primaryTopic": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a",
    }, {
      "@id": "https://data.gov.cz/zdroj/lokální-katalogy/17651921/HVD",
      "dataset": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a",
    }, {
      "@id": "http://eurovoc.europa.eu/4512",
      "inScheme": "http://eurovoc.europa.eu/",
    }, {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/TRAN",
      "inScheme": "http://publications.europa.eu/resource/authority/data-theme",
    }, {
      "@id": "https://data.gov.cz/zdroj/katalog/NKOD",
      "dataset": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a",
      "record": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/záznam",
    }, {
      "@id": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/orgán-veřejné-moci/17651921",
      "@type": "http://xmlns.com/foaf/0.1/Agent",
      "name": [
        {
          "@value": "Digitální a informační agentura",
          "@language": "cs",
        },
        {
          "@value": "Digital and Information agency",
          "@language": "en",
        },
      ],
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02/kontaktní-bod",
      "@type": "http://www.w3.org/2006/vcard/ns#Organization",
      "fn": [
        {
          "@value": "Ministry of Transport",
          "@language": "en",
        },
        {
          "@value": "Ministerstvo dopravy, Odbor veřejné dopravy",
          "@language": "cs",
        },
      ],
      "hasEmail": "mailto:sekretariat.190@mdcr.cz",
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02/identifikátorLKOD",
      "notation": {
        "@value": "https://raw.githubusercontent.com/jakubklimek/lkod-test/main/datové-sady/hvd1.jsonld/služba/sparql",
        "@type": "http://www.w3.org/2001/XMLSchema#anyURI",
      },
      "creator": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/orgán-veřejné-moci/17651921",
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02/identifikátorNKOD",
      "notation": {
        "@value": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a/datová-služba/1b38e421cf02da7a739a9227ebe71d02",
        "@type": "http://www.w3.org/2001/XMLSchema#anyURI",
      },
      "creator": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/orgán-veřejné-moci/17651921",
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/identifikátorLKOD",
      "@type": "http://www.w3.org/ns/adms#Identifier",
      "creator": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/orgán-veřejné-moci/17651921",
      "notaton": {
        "@value": "https://raw.githubusercontent.com/jakubklimek/lkod-test/main/datové-sady/hvd1.jsonld",
        "@type": "http://www.w3.org/2001/XMLSchema#anyURI",
      },
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/identifikátorNKOD",
      "@type": "http://www.w3.org/ns/adms#Identifier",
      "creator": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/orgán-veřejné-moci/17651921",
      "notaton": {
        "@value": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a",
        "@type": "http://www.w3.org/2001/XMLSchema#anyURI",
      },
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a",
      "@type": [
        "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/DokumentyDCAT",
        "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/LKOD",
        "http://www.w3.org/ns/dcat#Dataset",
      ],
      "title": [
        {
          "@value": "HVD1",
          "@language": "cs",
        },
        {
          "@value": "HVD1",
          "@language": "en",
        },
      ],
      "accrualPeriodicity": "http://publications.europa.eu/resource/authority/frequency/WEEKLY_3",
      "conformsTo": "https://ofn.gov.cz/jízdní-řády/2020-05-01/",
      "description": [
        {
          "@value": "Obsahem datové sady jsou schválené a aktuálně platné jízdní řády veřejné linkové dopravy postoupené do Celostátního informačního systému o jízdních řádech ve strojově zpracovatelném formátu.",
          "@language": "cs",
        },
        {
          "@value": "This dataset contains approved timetables and timetables in effect for public transport entered into the state-wide timetable information system.",
          "@language": "en",
        },
      ],
      "identifier@anyURI": {
        "@value": "https://raw.githubusercontent.com/jakubklimek/lkod-test/main/datové-sady/hvd1.jsonld",
        "@type": "http://www.w3.org/2001/XMLSchema#anyURI",
      },
      "publisher": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/orgán-veřejné-moci/17651921",
      "spatial": [
        "http://publications.europa.eu/resource/authority/continent/EUROPE",
        "https://linked.cuzk.cz/resource/ruian/stat/1",
      ],
      "page": "https://www.mdcr.cz/Dokumenty/Verejna-doprava/Jizdni-rady,-kalendare-pro-jizdni-rady,-metodi-(1)/Jizdni-rady-verejne-dopravy",
      "contactPoint": "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/kontaktní-bod",
      "distribution": [
        "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/d667317f36e6a27375cd266dae603b3a",
        "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/distribuce/da88d49ec1fa1e354fc9619604cd756a",
      ],
      "keyword": [
        {
          "@value": "public transport",
          "@language": "en",
        },
        {
          "@value": "hvd",
          "@language": "en",
        },
        {
          "@value": "hvd",
          "@language": "cs",
        },
        {
          "@value": "jízdní řády",
          "@language": "cs",
        },
        {
          "@value": "bus",
          "@language": "en",
        },
        {
          "@value": "veřejná linková doprava",
          "@language": "cs",
        },
        {
          "@value": "timetable",
          "@language": "en",
        },
        {
          "@value": "autobus",
          "@language": "cs",
        },
      ],
      "spatialResolutionInMeters": 12,
      "temporalResolution": {
        "@value": "86400",
        "@type": "http://www.w3.org/2001/XMLSchema#duration",
      },
      "theme": [
        "http://eurovoc.europa.eu/4512",
        "http://publications.europa.eu/resource/authority/data-theme/TRAN",
      ],
      "applicableLegislation": [
        HVD,
        OPENDATA,
      ],
      "accessRights": "http://publications.europa.eu/resource/authority/access-right/PUBLIC",
      "hvdCategory": [
        "http://data.europa.eu/bna/c_164e0bf5",
        "http://data.europa.eu/bna/c_1e787364",
      ],
      "identifier": [
        "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/identifikátorLKOD",
        "https://data.gov.cz/zdroj/datové-sady/17651921/e9a7f9d0e1f3bbc6957233048ab1bd7a/identifikátorNKOD",
      ],
    },
  ],
};

const HVD_20240619_EXPECTED_POST = {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-hvd/2026-09-23/datová-sada/kontext.jsonld",
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
  "právní_předpis": [OPENDATA, HVD],
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
    "právní_předpis": [OPENDATA],
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
    "právní_předpis": [OPENDATA, HVD],
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
      "právní_předpis": [OPENDATA, HVD],
      "dokumentace": "https://www.data.cz/služba/dokumentace",
      "kategorie_hvd": ["http://data.europa.eu/bna/c_164e0bf5", "http://data.europa.eu/bna/c_1e787364"],
      "kontaktní_bod": {
        "e-mail": "mailto:sekretariat.190@mdcr.cz",
        "jméno": { "cs": "Ministerstvo dopravy, Odbor veřejné dopravy" },
        "typ": "Organizace",
      },
    },
  }],
};

test("HVD_20240619 from json-ld and back for POST.", () => {
  return importFromJsonLd(HVD_20240619, "cs").then(data => {
    console.log(JSON.stringify(data, null, 2));
    const actual = exportDatasetForPost(data.dataset, data.distributions);
    expect(actual).toEqual(HVD_20240619_EXPECTED_POST);
  });
});

/**
 * Modified example from:
 *   https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní/draft/cs/
 * Modifications:
 * - Shorthand URL expanded to work as input / output.
 * - Removed en label for contact point, we do not support it.
 */
const DATOVE_ROZHRANI = {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní/2026-09-23/datová-sada/kontext.jsonld",
  "iri": "https://data.gov.cz/lkod/mdcr/datové-sady/vld",
  "typ": ["Datová sada", "Datová sada SSP"],
  "název": {
    "cs": "Jízdní řády veřejné linkové dopravy",
    "en": "Public transport timetables",
  },
  "popis": {
    "cs": "Obsahem datové sady jsou schválené a aktuálně platné jízdní řády veřejné linkové dopravy postoupené do Celostátního informačního systému o jízdních řádech ve strojově zpracovatelném formátu.",
    "en": "This dataset contains approved timetables and timetables in effect for public transport entered into the state-wide timetable information system.",
  },
  "poskytovatel": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/orgán-veřejné-moci/66003008",
  "téma": ["http://publications.europa.eu/resource/authority/data-theme/GOVE"],
  "periodicita_aktualizace": "http://publications.europa.eu/resource/authority/frequency/WEEKLY_3",
  "klíčové_slovo": {
    "cs": ["jízdní řády", "veřejná linková doprava", "autobus"],
    "en": ["timetable", "public transport", "bus"],
  },
  "časové_pokrytí": {
    "typ": "Časový interval",
    "začátek": "2009-01-01",
    "konec": "2017-12-31",
  },
  "kontaktní_bod": {
    "typ": "Organizace",
    "jméno": {
      "cs": "Ministerstvo dopravy, Odbor veřejné dopravy",
    },
    "e-mail": "mailto:sekretariat.190@mdcr.cz",
  },
  "dokumentace": "https://www.mdcr.cz/Dokumenty/Verejna-doprava/Jizdni-rady,-kalendare-pro-jizdni-rady,-metodi-(1)/Jizdni-rady-verejne-dopravy",
  "specifikace": ["https://ofn.gov.cz/jízdní-řády/2020-05-01/"],
  "koncept_euroVoc": ["http://eurovoc.europa.eu/4512"],
  "právní_předpis": [
    "https://www.e-sbirka.cz/eli/cz/sb/2000/365/2024-01-20",
    "https://www.e-sbirka.cz/eli/cz/sb/2023/360/2024-07-01",
    "https://www.e-sbirka.cz/eli/cz/sb/2026/60/2026-05-27",
  ],
  "týká_se_pojmu": [
    "https://slovník.gov.cz/legislativní/sbírka/361/2000/pojem/řidič-evidovaný-v-registru-řidičů",
    "https://slovník.gov.cz/legislativní/sbírka/361/2000/pojem/skupina-vozidel",
  ],
  "je_zahrnuta_v_isvs": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/isvs/3",
  "vstupní_stránka": "https://lkod.md.gov.cz/datová-sada/vld",
  "distribuce": [{
    "iri": "https://data.md.gov.cz/isvs/1000/datová-rozhraní/1",
    "typ": ["Distribuce", "Datové rozhraní"],
    "podmínky_užití": {
      "typ": "Specifikace podmínek užití",
      "autorské_dílo": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
      "databáze_chráněná_zvláštními_právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "databáze_jako_autorské_dílo": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "osobní_údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    },
    "přístupové_url": "https://portal.cisjr.cz/pub/draha/mestske/JDF.zip",
    "soubor_ke_stažení": "https://portal.cisjr.cz/pub/draha/mestske/JDF.zip",
    "formát": "http://publications.europa.eu/resource/authority/file-type/ZIP",
    "typ_média": "http://www.iana.org/assignments/media-types/application/json",
    "schéma": "https://portal.cisjr.cz/schemata/json-schema.json",
    "typ_média_komprese": "http://www.iana.org/assignments/media-types/application/zip",
    "typ_média_balíčku": "http://www.iana.org/assignments/media-types/application/zip",
    "název": {
      "en": "JSON file in ZIP file",
      "cs": "JSON soubor v ZIP soubrou",
    },
    "způsob_získání_sdílených_údajů": ["https://data.dia.gov.cz/zdroj/číselníky/způsoby-získání-údajů/položky/vlastní"],
    "způsob_sdílení_údajů": "https://data.dia.gov.cz/zdroj/číselníky/způsoby-sdílení-údajů/položky/poskytované-na-žádost",
    "typ_obsahu_sdílených_údajů": [
      "https://data.dia.gov.cz/zdroj/číselníky/typy-obsahu-údajů/položky/identifikační",
      "https://data.dia.gov.cz/zdroj/číselníky/typy-obsahu-údajů/položky/statistické",
    ],
    "právní_předpis": [
      "https://www.e-sbirka.cz/eli/cz/sb/2000/365/2024-01-20",
      "https://www.e-sbirka.cz/eli/cz/sb/2023/360/2024-07-01",
      "https://www.e-sbirka.cz/eli/cz/sb/2026/60/2026-05-27",
    ],
  }, {
    "iri": "https://data.md.gov.cz/isvs/1000/datová-rozhraní/2",
    "typ": ["Distribuce", "Datové rozhraní"],
    "podmínky_užití": {
      "typ": "Specifikace podmínek užití",
      "autorské_dílo": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
      "databáze_chráněná_zvláštními_právy": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "databáze_jako_autorské_dílo": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "osobní_údaje": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    },
    "přístupové_url": "https://portal.iscrr.cz/sparql",
    "název": { "cs": "Kontext údajů o řidiči poskytovaných přes ISSS" },
    "přístupová_služba": {
      "iri": "https://data.md.gov.cz/isvs/1000/datová-rozhraní/2/služba/1",
      "typ": "Datová služba",
      "název": { "cs": "Kontext údajů o řidiči poskytovaných přes ISSS" },
      "specifikace": ["https://www.w3.org/TR/sparql11-protocol/"],
      "přístupový_bod": "https://portal.iscrr.cz/sparql",
      "popis_přístupového_bodu": "https://portal.iscrr.cz/sparql",
      "právní_předpis": [
        "https://www.e-sbirka.cz/eli/cz/sb/2000/365/2024-01-20",
        "https://www.e-sbirka.cz/eli/cz/sb/2023/360/2024-07-01",
        "https://www.e-sbirka.cz/eli/cz/sb/2026/60/2026-05-27",
      ],
    },
    "způsob_získání_sdílených_údajů": ["https://data.dia.gov.cz/zdroj/číselníky/způsoby-získání-údajů/položky/vlastní"],
    "způsob_sdílení_údajů": "https://data.dia.gov.cz/zdroj/číselníky/způsoby-sdílení-údajů/položky/zpřístupňované-pro-výkon-agendy",
    "typ_obsahu_sdílených_údajů": [
      "https://data.dia.gov.cz/zdroj/číselníky/typy-obsahu-údajů/položky/identifikační",
      "https://data.dia.gov.cz/zdroj/číselníky/typy-obsahu-údajů/položky/evidenční",
    ],
    "právní_předpis": [
      "https://www.e-sbirka.cz/eli/cz/sb/2000/365/2024-01-20",
      "https://www.e-sbirka.cz/eli/cz/sb/2023/360/2024-07-01",
      "https://www.e-sbirka.cz/eli/cz/sb/2026/60/2026-05-27",
    ],
    "sdílí_údaj": [{
      "typ": "Sdílení údaje",
      "odpovídající_pojem": "https://slovník.gov.cz/legislativní/sbírka/361/2000/pojem/skupina-vozidel",
      "způsob_získání_sdílených_údajů": "https://data.dia.gov.cz/zdroj/číselníky/způsoby-získání-údajů/položky/vlastní",
      "způsob_sdílení_údajů": "https://data.dia.gov.cz/zdroj/číselníky/způsoby-sdílení-údajů/položky/zpřístupňované-pro-výkon-agendy",
      "typ_obsahu_sdílených_údajů": "https://data.dia.gov.cz/zdroj/číselníky/typy-obsahu-údajů/položky/evidenční",
    }, {
      "typ": "Sdílení údaje",
      "odpovídající_pojem": "https://slovník.gov.cz/legislativní/sbírka/361/2000/pojem/řidič-evidovaný-v-registru-řidičů",
      "způsob_získání_sdílených_údajů": "https://data.dia.gov.cz/zdroj/číselníky/způsoby-získání-údajů/položky/vlastní",
      "způsob_sdílení_údajů": "https://data.dia.gov.cz/zdroj/číselníky/způsoby-sdílení-údajů/položky/zpřístupňované-pro-výkon-agendy",
      "typ_obsahu_sdílených_údajů": "https://data.dia.gov.cz/zdroj/číselníky/typy-obsahu-údajů/položky/identifikační",
    }],
  }],
};

test("2026-06-30 DATOVE_ROZHRANI from json-ld and back.", () => {
  return importFromJsonLd(DATOVE_ROZHRANI, "cs").then(data => {
    // We use POST as it preserves the record as is.
    const actual = exportDatasetForPost(data.dataset, data.distributions);
    expect(actual).toEqual(DATOVE_ROZHRANI);
  });
});
