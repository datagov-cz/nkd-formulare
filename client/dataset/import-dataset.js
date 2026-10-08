import jsonld from "jsonld";
import {
  getId,
  getValue,
  getMultiLangString,
  selectByType,
  selectStrings,
  selectByIri,
  getValues,
  selectAll,
  selectString,
} from "../app-service/jsonld/properties";
import {
  CREATIVE_COMMONS,
  DCATAP,
  DCTERMS,
  FOAF,
  PU,
  VCARD,
  EUROPE,
  VOCABULARY_GOV_CZ,
} from "../app-service/vocabulary";
import {
  createDataset,
  SPATIAL_RUIAN,
  SPATIAL_CONTINENT,
  SPATIAL_COUNTRY,
  SPATIAL_PLACE,
  SPATIAL_URL,
  MODE_OPEN_DATA,
  MODE_HVD,
  MODE_NON_PUBLIC,
  includesHvdLegislation,
  filterHvdLegislation,
  includesNonPublicLegislation,
  filterNonPublicLegislation,
} from "./dataset-model";
import {
  isRuian,
  isContinent,
  isCountry,
  isPlace,
} from "./edit/codelists/server-codelists";
import { getByIri } from "../app-service/jsonld";
import {
  createDistribution,
  DIST_TYPE_SERVICE,
} from "./distribution-model";
import { fetchByGetAsJson } from "../app-service/http";

import { configuration } from "./../client-configuration";

/**
 * Apply dereference template and calls {@link importFromRemote};
 * @param {string} url
 * @param {"cs" | "en"} defaultLanguage
 */
export function importDatasetFromUrlWithDereference(url, defaultLanguage) {
  const template = configuration.dereferenceTemplate;
  if (template !== "") {
    url = template.replace("{}", encodeURIComponent(url));
  }
  const jsonld = fetchByGetAsJson(url, "application/ld+json");
  return importFromRemote(jsonld, defaultLanguage);
}

/**
 * Import dcat-ap:Dataset record from given URL.
 * The response must be a complete with no additional resources required.
 * @param {string} url
 * @param {"cs" | "en"} defaultLanguage
 */
export function importDatasetFromUrl(url, defaultLanguage) {
  const content = fetchByGetAsJson(url, "*");
  return importFromRemote(content, defaultLanguage);
}

/**
 *
 * @param {Promise<{json: object}>} content
 * @param {"cs" | "en"} defaultLanguage
 * @returns
 */
function importFromRemote(content, defaultLanguage) {
  return content.then((response) => {
    return importFromJsonLd(response.json, defaultLanguage);
  });
}

//
// Section : Import Dataset from JSON-LD
//

/**
 * Import dcat-ap:Dataset from given JSON-LD document.
 *
 * If there are empty or none language tags in the document,
 * the given default language is used instead.
 *
 * @param {*} document JSON-LD document.
 * @param {"cs" | "en"} defaultLanguage
 */
export function importFromJsonLd(document, defaultLanguage) {
  return jsonld().flatten(document).then((/** @type {*} */ flatJsonLd) => {
    const entities = selectByType(flatJsonLd, DCATAP.Dataset);
    if (entities.length !== 1) {
      throw new Error(
        "Invalid number of dataset records (" + entities.length + ")");
    }
    const entity = entities[0];
    const dataset = loadDataset(flatJsonLd, entities[0], defaultLanguage);
    return {
      "dataset": dataset,
      "distributions": loadDistributions(
        flatJsonLd, getValues(entity, DCATAP.distribution),
        defaultLanguage),
    };
  });
}

//
// Section : Dataset
//

/**
 * @param {*} flatJsonLd
 * @param {*} entity Dataset JSON-LD entity
 * @param {"cs" | "en"} defaultLanguage
 */
function loadDataset(flatJsonLd, entity, defaultLanguage) {
  // Public Administration System (ISVS) exists as a separate entity,
  // we find it using a predicate and just use the first one.
  const isvs = selectAll(flatJsonLd)
    .filter(entity => getValue(entity, VOCABULARY_GOV_CZ.zahrnuje))
    .map(entity => getId(entity))[0];

  // We can use legislation to determine dataset type.
  // But in exchange we may need to filter some values out.
  let legislation = getValues(entity, EUROPE.applicableLegislation);

  /**
   * @type {typeof MODE_OPEN_DATA | typeof MODE_HVD | typeof MODE_NON_PUBLIC}
   */
  let mode = MODE_OPEN_DATA;
  if (includesHvdLegislation(legislation)) {
    mode = MODE_HVD;
    legislation = filterHvdLegislation(legislation);
  }
  if (includesNonPublicLegislation(legislation)) {
    mode = MODE_NON_PUBLIC;
    legislation = filterNonPublicLegislation(legislation);
  }

  const title = loadLanguageString(
    getMultiLangString(entity, DCTERMS.title), defaultLanguage);

  const description = loadLanguageString(
    getMultiLangString(entity, DCTERMS.description),
    defaultLanguage);

  const contactPoint = loadContactPoint(flatJsonLd, entity);

  const dataset = {
    ...createDataset(mode),
    "title_cs": title.cs,
    "title_en": title.en,
    "description_cs": description.cs,
    "description_en": description.en,
    "iri": getId(entity),
    "publisher": getValue(entity, DCTERMS.publisher),
    //
    "accrual_periodicity": getValue(
      entity, DCTERMS.accrualPeriodicity) ?? "",
    "temporal_resolution": getValue(
      entity, DCATAP.temporalResolution) ?? "",
    // https://github.com/linkedpipes/dcat-ap-forms/issues/195
    // We just change the value to the string.
    "spatial_resolution_meters": (getValue(
      entity, DCATAP.spatialResolutionInMeters) ?? "") + "",
    "documentation": getValue(entity, FOAF.page) ?? "",
    "spatial": loadSpatial(entity),
    "ofn": getValues(entity, DCTERMS.conformsTo) || [],
    "legislation": legislation,
    "hvd_categories": getValues(entity, EUROPE.hvdCategory),
    "landing_page": getValue(entity, DCATAP.landingPage) ?? "",
    "isvs": isvs ?? "",
    "related_terms": getValues(
      entity, VOCABULARY_GOV_CZ["tyka-se-pojmu"]),
    "contact_point_name": contactPoint.name,
    "contact_point_email": contactPoint.email,
    //
    ...loadTemporal(flatJsonLd, entity),
    ...loadThemes(entity),
    ...loadKeywords(entity, defaultLanguage),
  };

  return dataset;
}

/**
 * @param {*} value Language string
 * @param {"cs" | "en"} defaultLanguage
 * @returns {{cs:string, en: string}}
 */
function loadLanguageString(value, defaultLanguage) {
  const cs = selectString(value, "cs");
  const en = selectString(value, "en");
  const blank = selectString(value, "");
  if (defaultLanguage === "cs") {
    return {
      "cs": cs ?? blank ?? "",
      "en": en ?? "",
    };
  } else {
    return {
      "cs": cs ?? "",
      "en": en ?? blank ?? "",
    };
  }
}

/**
 * @param {*} entity Dataset JSON-LD entity with dct:spatial.
 * @returns {{url: string, type?: string}[]}
 */
function loadSpatial(entity) {
  const iris = Array.from(new Set(getValues(entity, DCTERMS.spatial)));
  const result = [];
  for (let iri of iris) {
    const spatial = {
      "url": iri,
      /** @type string | undefined */
      "type": undefined,
    };
    if (isRuian(iri)) {
      spatial["type"] = SPATIAL_RUIAN;
    } else if (isContinent(iri)) {
      spatial["type"] = SPATIAL_CONTINENT;
    } else if (isCountry(iri)) {
      spatial["type"] = SPATIAL_COUNTRY;
    } else if (isPlace(iri)) {
      spatial["type"] = SPATIAL_PLACE;
    } else {
      spatial["type"] = SPATIAL_URL;
    }
    result.push(spatial);
  }
  return result;
}

/**
 * @param {*} flatJsonLd
 * @param {*} entity Dataset JSON-LD entity with dct:temporal.
 * @returns
 */
function loadTemporal(flatJsonLd, entity) {
  const temporalIri = getValue(entity, DCTERMS.temporal);
  if (temporalIri === null || temporalIri === undefined) {
    return {};
  }
  const entities = selectByIri(flatJsonLd, temporalIri);
  if (entities.length < 1) {
    console.log("No temporal object for:", temporalIri);
    return {};
  }
  const temporal = entities[0];
  return {
    "temporal_start": getValue(temporal, DCATAP.startDate) ?? "",
    "temporal_end": getValue(temporal, DCATAP.endDate) ?? "",
  };
}

/**
 * @param {*} flatJsonLd
 * @param {*} entity Dataset JSON-LD entity with dcat:contactPoint.
 * @returns
 */
function loadContactPoint(flatJsonLd, entity) {
  const iri = getValue(entity, DCATAP.contactPoint);
  if (iri === undefined) {
    return {
      "name": "",
      "email": "",
      "url": "",
    };
  }
  const contact = getByIri(flatJsonLd, iri);
  if (contact === undefined) {
    return {
      "name": "",
      "email": "",
      "url": "",
    };
  }
  // For contact point name we support only Czech
  const name = loadLanguageString(getMultiLangString(contact, VCARD.fn), "cs");
  // E-mail
  let email = getValue(contact, VCARD.hasEmail) ?? "";
  if (email.toLowerCase().startsWith("mailto:")) {
    email = email.substr("mailto:".length);
  }
  //
  return {
    "name": name.cs ?? "",
    "email": email,
    "url": getValue(contact, VCARD.url) ?? "",
  };
}

/**
 * @param {*} entity JSON-LD entity with dcat:theme.
 * @returns
 */
function loadThemes(entity) {

  /**
   * @param {string} theme
   * @returns {boolean}
   */
  const isDatasetTheme = (theme) => {
    const prefix = "http://publications.europa.eu/resource/authority/data-theme/";
    return theme.startsWith(prefix);
  };

  /**
   * @param {string} theme
   * @returns {boolean}
   */
  const isEurovocTheme = (theme) => {
    const prefix = "http://eurovoc.europa.eu/";
    return theme.startsWith(prefix);
  };

  const themes = [];
  const datasetThemes = [];
  const customThemes = [];
  for (let theme of getValues(entity, DCATAP.theme)) {
    if (isDatasetTheme(theme)) {
      datasetThemes.push(theme);
    } else if (isEurovocTheme(theme)) {
      themes.push(theme);
    } else {
      customThemes.push(theme);
    }
  }
  return {
    "themes": themes,
    "dataset_themes": datasetThemes,
    "dataset_custom_themes": customThemes,
  };
}

/**
 * @param {*} datasetEntity
 * @param {"cs" | "en"} defaultLanguage
 * @returns
 */
function loadKeywords(datasetEntity, defaultLanguage) {
  const values = getMultiLangString(datasetEntity, DCATAP.keyword);
  const cs = selectStrings(values, "cs");
  const en = selectStrings(values, "en");
  if (defaultLanguage === "cs") {
    cs.push(...selectStrings(values, ""));
  } else if (defaultLanguage === "en") {
    en.push(...selectStrings(values, ""));
  }
  return {
    "keywords_cs": cs,
    "keywords_en": en,
  };
}

//
// Section : Distributions
//

/**
 * @param {*} flatJsonLd
 * @param {string[]} iris IRIs of distributions.
 * @param {"cs" | "en"} defaultLanguage
 * @returns
 */
function loadDistributions(flatJsonLd, iris, defaultLanguage) {
  return iris.map(iri => getByIri(flatJsonLd, iri))
    .filter(entity => entity !== undefined)
    .map(entity => loadDistribution(
      flatJsonLd, entity, defaultLanguage));
}

/**
 * @param {*} flatJsonLd
 * @param {*} entity Distribution JSON-LD entity.
 * @param {"cs" | "en"} defaultLanguage
 * @returns
 */
function loadDistribution(flatJsonLd, entity, defaultLanguage) {

  // When the data contain empty download url "",
  // it is resolved to "./", so we replace it back.
  let url = getValue(entity, DCATAP.downloadURL) ?? "";
  if (url === "./") {
    url = "";
  }

  // Distribution IRI can be a blank node.
  let iri = getId(entity);
  if (iri?.startsWith("_")) {
    iri = undefined;
  }

  const title = loadLanguageString(
    getMultiLangString(entity, DCTERMS.title), defaultLanguage);

  // Each distribution may, or may not, be HVD based on the legislation.

  let legislation = getValues(entity, EUROPE.applicableLegislation);
  const isHvd = includesHvdLegislation(legislation);
  if (isHvd) {
    legislation = filterHvdLegislation(legislation);
  }

  const distribution = {
    ...createDistribution(),
    ...loadTermsOfUse(flatJsonLd, entity),
    ...loadDataService(flatJsonLd, entity, defaultLanguage),
    "iri": iri,
    "url": url,
    "title_cs": title.cs,
    "title_en": title.en,
    "format": getValue(entity, DCTERMS.format) ?? "",
    "media_type": getValue(entity, DCATAP.mediaType) ?? "",
    "schema": getValue(entity, DCTERMS.conformsTo) ?? "",
    "package_format":
      getValue(entity, DCATAP.packageFormat) ?? "",
    "compress_format":
      getValue(entity, DCATAP.compressFormat) ?? "",
    "legislation": legislation,
    // Non Public data
    "typy_obsahu": getValues(entity,
      VOCABULARY_GOV_CZ["typ-obsahu-sdileneho-rozhranim"]),
    "zpusob_sdileni": getValue(entity,
      VOCABULARY_GOV_CZ["zpusob-sdileni-rozhranim"]) ?? null,
    "zpusoby_ziskani": getValues(entity,
      VOCABULARY_GOV_CZ["zpusob-ziskani-dat-sdilenych-rozhranim"]),
    "zprostredkovava_sdileni":
      loadZprostredkovavaSdileni(flatJsonLd, entity),
    // High value
    "is_hvd": isHvd,
  };

  return distribution;
}

/**
 * @param {*} flatJsonLd
 * @param {*} distributionEntity Distribution JSON-LD entity.
 * @param {"cs" | "en"} defaultLanguage
 * @returns Returned object also contains new type.
 */
function loadDataService(flatJsonLd, distributionEntity, defaultLanguage) {
  const iri = getValue(distributionEntity, DCATAP.accessService);
  if (iri === undefined) {
    return {};
  }
  const entity = getByIri(flatJsonLd, iri);
  if (entity == undefined) {
    return {};
  }

  const contactPoint = loadContactPoint(flatJsonLd, entity);

  const title = loadLanguageString(
    getMultiLangString(entity, DCTERMS.title), defaultLanguage);

  const titleDistribution = loadLanguageString(
    getMultiLangString(entity, DCTERMS.title), defaultLanguage);

  const useDistributionTitle =
    (title.cs === "" && title.en === "") ||
    (title.cs === titleDistribution.cs && title.en == titleDistribution.en);

  return {
    "type": DIST_TYPE_SERVICE,
    "service_iri": iri,
    "service_endpoint_url": getValue(entity, DCATAP.endpointURL) ?? "",
    "service_description": getValue(entity, DCATAP.endpointDescription) ?? "",
    "service_conforms_to": getValue(entity, DCTERMS.conformsTo) ?? "",
    "contact_point_name": contactPoint.name,
    "contact_point_email": contactPoint.email,
    "contact_point_url": contactPoint.url,
    "documentation": getValue(entity, FOAF.page) ?? "",
    "service_title_copy": useDistributionTitle,
    "service_title_cs": title.cs,
    "service_title_en": title.en,
  };
}

/**
 * @param {*} flatJsonLd
 * @param {*} entity Distribution JSON-LD entity.
 * @returns Empty object when there is no information.
 */
function loadTermsOfUse(flatJsonLd, entity) {

  const iri = getValue(entity, PU.specifikace);
  if (iri === undefined) {
    return {};
  }

  const termsOfUse = getByIri(flatJsonLd, iri);
  if (termsOfUse === undefined) {
    console.log("No terms of use object for:", iri);
    return {};
  }

  const author = getValue(termsOfUse, PU.autorskeDilo);
  const authorName = getValue(termsOfUse, PU.autor);
  const authorType = mapLicenseIriToValue(author);
  const authorCustom = authorType === "CUSTOM" ? author : "";

  const db = getValue(termsOfUse, PU.databazeJakoAutorskeDilo);
  const dbName = getValue(termsOfUse, PU.autorDatabaze);
  const dbType = mapLicenseIriToValue(db);
  const dbCustom = dbType === "CUSTOM" ? db : "";

  const specialDb = getValue(termsOfUse, PU.databazeChranenaZvlastnimiPravy);
  const specialDbType = mapLicenseIriToValue(specialDb);
  const specialDbCustom = specialDbType === "CUSTOM" ? specialDb : "";

  return {
    "license_author_type": authorType,
    "license_author_name": authorName ?? "",
    "license_author_custom": authorCustom,
    "license_db_type": dbType,
    "license_db_name": dbName ?? "",
    "license_db_custom": dbCustom,
    "license_specialdb_type": specialDbType,
    "license_specialdb_custom": specialDbCustom,
    "license_personal_type": parsePersonalData(termsOfUse),
  };
}

/**
 * @param {*} entity Terms of use JSON-LD entity with pu:osobniUdaje.
 */
function parsePersonalData(entity) {
  const iri = getValue(entity, PU.osobniUdaje);
  if (PU.obsahujeOsobniUdaje === iri) {
    return "YES";
  } else if (PU.neobsahujeOsobniUdaje === iri) {
    return "NO";
  } else {
    return "UNKNOWN";
  }
}

/**
 * @param {string | undefined} iri
 * @returns
 */
function mapLicenseIriToValue(iri) {
  if (iri === undefined) {
    return "CUSTOM";
  }
  const mapping = {
    [PU.obsahujeViceAutorskychDel]: "MULTI",
    [CREATIVE_COMMONS.BY_40]: "CC BY",
    [PU.neobsahujeAutorskaDila]: "NO",
    [CREATIVE_COMMONS.PUBLIC_ZERO_10]: "CC0",
    [PU.neniAutorskopravneChranenouDatabazi]: "NO",
    [PU.neniChranenazvlastnimPravemPorizovateleDatabaze]: "NO",
  };
  const value = mapping[iri];
  if (value === undefined) {
    return "CUSTOM";
  } else {
    return value;
  }
}

/**
 * @param {*} flatJsonLd
 * @param {*} entity Distribution JSON-LD entity.
 * @returns
 */
function loadZprostredkovavaSdileni(flatJsonLd, entity) {
  return getValues(entity, VOCABULARY_GOV_CZ["zprostredkovava-sdileni"])
    .map(iri => getByIri(flatJsonLd, iri))
    .filter(entity => entity !== undefined)
    .map(entity => ({
      "typ_obsahu": getValue(entity, VOCABULARY_GOV_CZ["je-sdilen-jako"]) ?? null,
      "zpusob_sdileni": getValue(entity, VOCABULARY_GOV_CZ["sdilen-zpusobem"]) ?? null,
      "zpusob_ziskani": getValue(entity, VOCABULARY_GOV_CZ["ziskan-zpusobem"]) ?? null,
      "related_term": getValue(entity, VOCABULARY_GOV_CZ["odpovidajici-pojem"]) ?? null,
    }));
}
