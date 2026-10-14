import {createCatalog} from "../catalog-model";
import {importCatalogFromJsonLd} from "../import-catalog";
import {exportCatalogToJsonLd} from "./catalog-export-edit";

test("Import catalog from JSON-LD object with cs default.", () => {
  const input = {
    "@id": "urn:Catalog",
    "@type": ["http://www.w3.org/ns/dcat#Catalog", "urn:type"],
    "http://purl.org/dc/terms/title": [{
      "@language": "cs",
      "@value": "Title",
    },
    "Empty language",
    ],
    "http://www.w3.org/ns/dcat#endpointURL": "urn:endpoint",
  };
  const expected = {
    ...createCatalog(),
    "iri": "urn:Catalog",
    "title_cs": "Title",
    "title_en": "",
    "endpoint": "urn:endpoint",
    "type": "urn:type",
  };
  return importCatalogFromJsonLd(input, "cs").then(actual => {
    expect(actual).toEqual(expected);
  });
});

test("Import catalog from @graph JSON-LD object with en default", () => {
  const input = {
    "@graph": [{
      "@graph": {
        "@id": "urn:Catalog",
        "@type": ["http://www.w3.org/ns/dcat#Catalog", "urn:type"],
        "http://purl.org/dc/terms/title": [{
          "@language": "cs",
          "@value": "Title",
        },
        "Empty language",
        ],
        "http://www.w3.org/ns/dcat#endpointURL": "urn:endpoint",
      },
      "@id": "@graph",
    }],
  };
  const expected = {
    ...createCatalog(),
    "iri": "urn:Catalog",
    "title_cs": "Title",
    "title_en": "Empty language",
    "endpoint": "urn:endpoint",
    "type": "urn:type",
  };
  return importCatalogFromJsonLd(input, "en").then(actual => {
    expect(actual).toEqual(expected);
  });
});

const T000 = {
  "@id": "urn:Catalog",
  "@type": [
    "http://www.w3.org/ns/dcat#Catalog",
    "https://data.gov.cz/slovník/nkod/DcatApLkod",
  ],
  "http://purl.org/dc/terms/title": [
    {
      "@language": "cs",
      "@value": "Title",
    },
    "Empty language",
  ],
  "http://xmlns.com/foaf/0.1/homepage": "urn:home-page",
  "http://www.w3.org/ns/dcat#endpointURL": "urn:endpoint",
  "http://www.w3.org/ns/dcat#contactPoint": {
    "@id": "_:kontaktní-bod",
    "@type": ["http://www.w3.org/2006/vcard/ns#Kind",
      "http://www.w3.org/2006/vcard/ns#Individual"],
    "http://www.w3.org/2006/vcard/ns#fn": "Pavel",
    "http://www.w3.org/2006/vcard/ns#hasEmail": "mailto:pavel@email.cz",
  },
};

const T000_EXPECTED = {
  "@context": "https://ofn.gov.cz/dcat-ap-cz-rozhraní-katalogů-dat/2026-09-23/katalog/kontext.jsonld",
  "@type": [
    "Katalog",
    "https://data.gov.cz/slovník/nkod/DcatApLkod",
  ],
  "přístupový_bod": "urn:endpoint",
  "název": {
    "cs": "Title",
  },
  "kontaktní_bod": {
    "typ": "Organizace",
    "jméno": {
      "cs": "Pavel",
    },
    "e-mail": "mailto:pavel@email.cz",
  },
  "domovská_stránka": "urn:home-page",
};

test("T000 from json-ld and back.", () => {
  return importCatalogFromJsonLd(T000, "cs").then(catalog => {
    const actual = exportCatalogToJsonLd(catalog);
    expect(actual).toEqual(T000_EXPECTED);
  });
});
