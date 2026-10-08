export default {
  "@graph": [
    {
      "@id": "https://data.gov.cz/zdroj/katalog/NKOD",
      "http://www.w3.org/ns/dcat#record": {
        "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/záznam"
      },
      "http://www.w3.org/ns/dcat#dataset": {
        "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670"
      }
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2",
      "@type": "http://www.w3.org/ns/dcat#Distribution",
      "https://data.gov.cz/slovník/nkod/mediaType": "application/pdf",
      "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/typ\u00DAložiště": {
        "@id": "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/Web"
      },
      "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
        "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2/podmínky-užití"
      },
      "http://www.w3.org/ns/dcat#downloadURL": {
        "@id": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20M\u0160%20III%20etapa.pdf"
      },
      "http://www.w3.org/ns/dcat#accessURL": {
        "@id": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20M\u0160%20III%20etapa.pdf"
      },
      "http://data.europa.eu/r5r/applicableLegislation": {
        "@id": "http://data.europa.eu/eli/reg_impl/2023/138/oj"
      }
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/kontaktní-bod",
      "@type": [
        "http://www.w3.org/2006/vcard/ns#Kind",
        "http://www.w3.org/2006/vcard/ns#Individual"
      ],
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
      "http://purl.org/dc/terms/language": {
        "@id": "http://publications.europa.eu/resource/authority/language/CES"
      },
      "http://purl.org/dc/terms/conformsTo": {
        "@id": "https://joinup.ec.europa.eu/release/dcat-ap/12"
      },
      "http://purl.org/dc/terms/issued": {
        "@value": "2017-08-22T00:00:00",
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      },
      "http://xmlns.com/foaf/0.1/primaryTopic": {
        "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670"
      }
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
      }
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2/podmínky-užití",
      "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
      "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
        "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
      },
      "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
        "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
      },
      "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
        "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
      },
      "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
        "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
      },
    },
    {
      "@id": "https://data.gov.cz/zdroj/ovm/00269905",
      "@type": "http://xmlns.com/foaf/0.1/Agent",
      "http://xmlns.com/foaf/0.1/name": "Obec Bylany",
    },
    {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670",
      "@type": [
        "http://www.w3.org/ns/dcat#Dataset",
        "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"
      ],
      "http://purl.org/dc/terms/modified": {
        "@value": "2017-08-22T00:00:00",
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
      },
      "http://purl.org/dc/terms/title": "Obec Bylany",
      "http://purl.org/dc/terms/description": "Oprava kuchyně v M\u0160-III.etapa",
      "http://purl.org/dc/terms/identifier": [
        "https://data.gov.cz/zdroj/datové-sady/qmsa4he/243671670",
        "243671670"
      ],
      "http://purl.org/dc/terms/publisher": {
        "@id": "https://data.gov.cz/zdroj/ovm/00269905"
      },
      "http://purl.org/dc/terms/spatial": {
        "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
      },
      "http://purl.org/dc/terms/issued": {
        "@value": "2017-08-22T00:00:00",
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      },
      "http://www.w3.org/ns/dcat#contactPoint": {
        "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/kontaktní-bod"
      },
      "http://www.w3.org/ns/dcat#distribution": {
        "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2"
      },
      "http://purl.org/dc/terms/accrualPeriodicity": {
        "@id": "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT"
      },
      "http://purl.org/dc/terms/temporal": {
        "@id": "https://data.gov.cz/zdroj/datové-sady/Bylany/243671670/časové-pokrytí"
      },
      "http://www.w3.org/ns/dcat#keyword": "obec Bylany",
      "http://data.europa.eu/r5r/applicableLegislation": [
        {
          "@id": "http://data.europa.eu/eli/reg_impl/2023/138/oj"
        },
        {
          "@id": "https://www.e-sbirka.cz/eli/cz/sb/1999/106/2024-01-01/dokument/norma/cast_1/par_3a/odst_6"
        }
      ],
      "http://data.europa.eu/r5r/hvdCategory": {
        "@id": "http://data.europa.eu/bna/c_b151a0ba"
      }
    }
  ]
}