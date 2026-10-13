/**
 * This file must not export any other function then the main entry point.
 * The idea is to make it standalone.
 */
import {
  PU,
  CREATIVE_COMMONS,
  ESBIRKA,
} from "../../../app-service/vocabulary";
import { DIST_TYPE_FILE, DIST_TYPE_SERVICE } from "../../distribution-model";
import { asLanguageMap, isEmpty, isNotEmpty, asUniqAndSorted } from "./utilities";

/**
 * Prefixes defined in the JSON-LD context.
 * The JSON schema requires the values to be exported using the prefixes.
 */
const PREFIX = {
  "ovm": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/orgán-veřejné-moci/",
  "isvs": "https://rpp-opendata.egon.gov.cz/odrpp/zdroj/isvs/",
  "témata": "http://publications.europa.eu/resource/authority/data-theme/",
  "frekvence": "http://publications.europa.eu/resource/authority/frequency/",
  "formáty": "http://publications.europa.eu/resource/authority/file-type/",
  "euroVoc": "http://eurovoc.europa.eu/",
  "mediaTypes": "http://www.iana.org/assignments/media-types/",
  "typy-obsahu":
    "https://data.dia.gov.cz/zdroj/číselníky/typy-obsahu-údajů/položky/",
  "způsoby-získání":
    "https://data.dia.gov.cz/zdroj/číselníky/způsoby-získání-údajů/položky/",
  "způsoby-sdílení":
    "https://data.dia.gov.cz/zdroj/číselníky/způsoby-sdílení-údajů/položky/",
};

/**
 * Export non-public dataset, i.e. dataset with data interfaces.
 *
 * @param {import("../../dataset-model").Dataset} dataset
 * @param {import("../../distribution-model").Distribution[]} distributions
 * @param {(distribution: import("../../distribution-model").Distribution, index: number) => ?string | undefined} distributionIri
 * @param {(service: *, distribution: string) => string | undefined} serviceIri
 */
export function exportDatasetToNonPublicJsonLd(
  dataset, distributions, distributionIri, serviceIri) {

  /** @type * */
  const result = {
    "@context": "https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní/2026-09-23/datová-sada/kontext.jsonld",
    "iri": dataset.iri,
    "typ": ["Datová sada", "Datová sada SSP"],
    "název": asLanguageMap(dataset.title_cs, dataset.title_en),
    "popis": asLanguageMap(dataset.description_cs, dataset.description_en),
    ...exportTemporal(dataset),
    ...exportKeywords(dataset),
  };

  if (isNotEmpty(dataset.accrual_periodicity)) {
    result["periodicita_aktualizace"] =
      asPrefixed("frekvence", dataset.accrual_periodicity);
  }

  if (isNotEmpty(dataset.documentation)) {
    result["dokumentace"] = dataset.documentation;
  }

  if (dataset.dataset_themes.length > 0) {
    result["téma"] = dataset.dataset_themes
      .map(iri => asPrefixed("témata", iri));
  }

  // When any distribution shares data, the additional legislation
  // must be set for the dataset as well.
  const sharesData = distributions.some(isSharingData);
  result["právní_předpis"] = asUniqAndSorted([
    ...selectLegislation(sharesData),
    ...dataset.legislation,
  ]);

  if (isNotEmpty(dataset.isvs)) {
    result["je_zahrnuta_v_isvs"] = asPrefixed("isvs", dataset.isvs);
  }

  if (dataset.related_terms.length > 0) {
    result["týká_se_pojmu"] = dataset.related_terms;
  }

  if (dataset.themes.length > 0 || dataset.dataset_custom_themes.length > 0) {
    result["koncept_euroVoc"] = [
      ...dataset.themes,
      ...dataset.dataset_custom_themes,
    ].map(iri => asPrefixed("euroVoc", iri));
  }

  if (dataset.ofn.length > 0) {
    result["specifikace"] = dataset.ofn;
  }

  const contactPoint = exportContactPoint(dataset);
  if (contactPoint !== null) {
    result["kontaktní_bod"] = contactPoint;
  }

  if (isNotEmpty(dataset.publisher)) {
    result["poskytovatel"] = asPrefixed("ovm", dataset.publisher);
  }

  if (isNotEmpty(dataset.landing_page)) {
    result["vstupní_stránka"] = dataset.landing_page;
  }

  if (distributions.length > 0) {
    result["distribuce"] = distributions.map(
      (distribution, index) => exportDistribution(
        distribution, index, distributionIri, serviceIri));
  }

  return result;
}

/**
 * Replace the IRI prefix with the prefix name from the JSON-LD context.
 * A value which does not start with the prefix is returned without a change.
 *
 * @param {keyof typeof PREFIX} prefix
 * @param {string} iri
 * @returns {string}
 */
function asPrefixed(prefix, iri) {
  const prefixIri = PREFIX[prefix];
  if (iri.startsWith(prefixIri)) {
    return prefix + ":" + iri.substring(prefixIri.length);
  }
  return iri;
}

/**
 * @param {import("../../distribution-model").Distribution} distribution
 * @returns {boolean} True when there is any information about data sharing.
 */
function isSharingData(distribution) {
  return distribution.zpusoby_ziskani.length > 0
    || isNotEmpty(distribution.zpusob_sdileni)
    || distribution.typy_obsahu.length > 0
    || distribution.zprostredkovava_sdileni.length > 0;
}

/**
 * @param {boolean} sharesData
 * @returns {string[]}
 */
function selectLegislation(sharesData) {
  if (sharesData) {
    return [
      ESBIRKA.SB_2026_60_2026_05_27,
      ESBIRKA.SB_2000_365_2026_01_01,
      ESBIRKA.SB_2023_360_2024_07_01,
    ];
  } else {
    return [
      ESBIRKA.SB_2026_60_2026_05_27,
    ];
  }
}

/**
 * @param {{keywords_cs: string[], keywords_en: string[]}} value
 * @returns
 */
function exportKeywords(value) {
  /** @type {{cs?: string[], en?: string[]}} */
  const result = {};
  if (value.keywords_cs.length > 0) {
    result["cs"] = value.keywords_cs;
  }
  if (value.keywords_en.length > 0) {
    result["en"] = value.keywords_en;
  }
  if (result["cs"] === undefined && result["en"] === undefined) {
    return {};
  }
  return {
    "klíčové_slovo": result,
  };
}

/**
 * @param {{temporal_start: string, temporal_end: string}} value
 * @returns
 */
function exportTemporal(value) {
  if (isEmpty(value.temporal_start) && isEmpty(value.temporal_end)) {
    return {};
  }
  /** @type * */
  const result = {
    "typ": "Časový interval",
  };
  if (isNotEmpty(value.temporal_start)) {
    result["začátek"] = value.temporal_start;
  }
  if (isNotEmpty(value.temporal_end)) {
    result["konec"] = value.temporal_end;
  }
  return {
    "časové_pokrytí": result,
  };
}

/**
 * @param {{
 * contact_point_name: string,
 * contact_point_email: string,
 * }} value
 * @returns
 */
function exportContactPoint(value) {
  if (isEmpty(value.contact_point_name)
    && isEmpty(value.contact_point_email)) {
    return null;
  }
  /** @type * */
  const output = {
    "typ": "Organizace",
  };
  if (isNotEmpty(value.contact_point_name)) {
    output["jméno"] = asLanguageMap(value.contact_point_name);
  }
  if (isNotEmpty(value.contact_point_email)) {
    output["e-mail"] = "mailto:" + value.contact_point_email;
  }
  return output;
}

//
// Section : Distribution
//

/**
 * @param {import("../../distribution-model").Distribution} distribution
 * @param {number} distributionIndex Index of the distribution.
 * @param {(distribution: *, index: number) => ?string | undefined} distributionIri
 * @param {(service: *, distribution: string) => string | undefined} serviceIri
 * @returns
 */
function exportDistribution(
  distribution, distributionIndex, distributionIri, serviceIri) {

  /** @type * */
  const result = {
    "typ": ["Distribuce", "Datové rozhraní"],
    "právní_předpis": asUniqAndSorted([
      ...selectLegislation(isSharingData(distribution)),
      ...distribution.legislation,
    ]),
    "podmínky_užití": exportTermsOfUse(distribution),
  };

  const iri = distributionIri(distribution, distributionIndex);
  if (isNotEmpty(iri)) {
    result["iri"] = iri;
  }

  const title = asLanguageMap(distribution.title_cs, distribution.title_en);
  if (title["cs"] || title["en"]) {
    result["název"] = title;
  }

  // Data sharing.

  if (distribution.typy_obsahu.length > 0) {
    result["typ_obsahu_sdílených_údajů"] = distribution.typy_obsahu
      .map(item => asPrefixed("typy-obsahu", item));
  }

  if (isNotEmpty(distribution.zpusob_sdileni)) {
    result["způsob_sdílení_údajů"] =
      asPrefixed("způsoby-sdílení", distribution.zpusob_sdileni);
  }

  if (distribution.zpusoby_ziskani.length > 0) {
    result["způsob_získání_sdílených_údajů"] = distribution.zpusoby_ziskani
      .map(item => asPrefixed("způsoby-získání", item));
  }

  if (distribution.zprostredkovava_sdileni.length > 0) {
    result["sdílí_údaj"] =
      distribution.zprostredkovava_sdileni.map(exportSharedData);
  }

  // File or data service.

  if (distribution.type === DIST_TYPE_FILE) {
    addFileDistribution(distribution, result);
  } else if (distribution.type === DIST_TYPE_SERVICE) {
    addDataService(distribution, serviceIri, result);
  } else {
    console.error("Distribution must be either FILE or SERVICE.", distribution);
  }

  return result;
}

/**
 * @param {import("../../distribution-model").Distribution} distribution
 * @returns
 */
function exportTermsOfUse(distribution) {
  /** @type * */
  const result = {
    "typ": "Specifikace podmínek užití",
  };
  switch (distribution.license_author_type) {
    case undefined:
      // For download of partial data.
      break;
    case "MULTI":
      result["autorské_dílo"] = PU.obsahujeViceAutorskychDel;
      break;
    case "CC BY":
      result["autorské_dílo"] = CREATIVE_COMMONS.BY_40;
      result["autor"] = asLanguageMap(distribution.license_author_name);
      break;
    case "NO":
      result["autorské_dílo"] = PU.neobsahujeAutorskaDila;
      break;
    case "CUSTOM":
      result["autorské_dílo"] = distribution.license_author_custom;
      break;
    default:
      console.error("Unexpected license_author_type value:",
        distribution.license_author_type);
      break;
  }

  switch (distribution.license_db_type) {
    case undefined:
      // For download of partial data.
      break;
    case "CC BY":
      result["databáze_jako_autorské_dílo"] = CREATIVE_COMMONS.BY_40;
      result["autor_databáze"] = asLanguageMap(distribution.license_db_name);
      break;
    case "NO":
      result["databáze_jako_autorské_dílo"] =
        PU.neniAutorskopravneChranenouDatabazi;
      break;
    case "CUSTOM":
      result["databáze_jako_autorské_dílo"] =
        distribution.license_db_custom;
      break;
    default:
      console.error("Unexpected license_db_type value:",
        distribution.license_db_type);
      break;
  }

  switch (distribution.license_specialdb_type) {
    case undefined:
      // For download of partial data.
      break;
    case "CC0":
      result["databáze_chráněná_zvláštními_právy"] =
        CREATIVE_COMMONS.PUBLIC_ZERO_10;
      break;
    case "NO":
      result["databáze_chráněná_zvláštními_právy"] =
        PU.neniChranenazvlastnimPravemPorizovateleDatabaze;
      break;
    case "CUSTOM":
      result["databáze_chráněná_zvláštními_právy"] =
        distribution.license_specialdb_custom;
      break;
    default:
      console.error("Unexpected license_specialdb_type value:",
        distribution.license_specialdb_type);
      break;
  }

  switch (distribution.license_personal_type) {
    case undefined:
      // For download of partial data.
      break;
    case "YES":
      result["osobní_údaje"] = PU.obsahujeOsobniUdaje;
      break;
    case "NO":
      result["osobní_údaje"] = PU.neobsahujeOsobniUdaje;
      break;
    default:
      console.error("Unexpected license_personal_type value:",
        distribution.license_personal_type);
      break;
  }

  return result;
}

/**
 * @param {{
 * typ_obsahu: string | null,
 * zpusob_sdileni: string | null,
 * zpusob_ziskani: string | null,
 * related_term: string | null,
 * }} item
 * @returns
 */
function exportSharedData(item) {
  return {
    "typ": "Sdílení údaje",
    "typ_obsahu_sdílených_údajů":
      asPrefixedOrEmpty("typy-obsahu", item.typ_obsahu),
    "způsob_sdílení_údajů":
      asPrefixedOrEmpty("způsoby-sdílení", item.zpusob_sdileni),
    "způsob_získání_sdílených_údajů":
      asPrefixedOrEmpty("způsoby-získání", item.zpusob_ziskani),
    "odpovídající_pojem": item.related_term,
  };
}

/**
 * @param {keyof typeof PREFIX} prefix
 * @param {string | null} iri
 * @returns {string | null} Empty value is returned without a change.
 */
function asPrefixedOrEmpty(prefix, iri) {
  if (iri === null || isEmpty(iri)) {
    return iri;
  }
  return asPrefixed(prefix, iri);
}

/**
 * @param {import("../../distribution-model").Distribution} distribution
 * @param {*} parent Output argument.
 */
function addFileDistribution(distribution, parent) {

  parent["soubor_ke_stažení"] = distribution.url;

  parent["přístupové_url"] = distribution.url;

  if (isNotEmpty(distribution.media_type)) {
    parent["typ_média"] = asPrefixed("mediaTypes", distribution.media_type);
  }

  if (isNotEmpty(distribution.format)) {
    parent["formát"] = asPrefixed("formáty", distribution.format);
  }

  if (isNotEmpty(distribution.schema)) {
    parent["schéma"] = distribution.schema;
  }

  if (isNotEmpty(distribution.package_format)) {
    parent["typ_média_balíčku"] =
      asPrefixed("mediaTypes", distribution.package_format);
  }

  if (isNotEmpty(distribution.compress_format)) {
    parent["typ_média_komprese"] =
      asPrefixed("mediaTypes", distribution.compress_format);
  }

}

/**
 * @param {import("../../distribution-model").Distribution} distribution
 * @param  {(service: *, distribution: string) => string | undefined} serviceIri
 * @param {*} parent Output argument.
 */
function addDataService(distribution, serviceIri, parent) {

  /** @type * */
  const service = {
    "typ": "Datová služba",
    "přístupový_bod": distribution.service_endpoint_url,
    "popis_přístupového_bodu": distribution.service_description,
    // Some values are a copy from the distribution.
    "název": parent["název"],
    "právní_předpis": parent["právní_předpis"],
  };

  const iri = serviceIri(distribution, parent["iri"]);
  if (isNotEmpty(iri)) {
    service["iri"] = iri;
  }

  if (isNotEmpty(distribution.service_conforms_to)) {
    service["specifikace"] = [distribution.service_conforms_to];
  }

  // We need to store some values to the parent object.

  parent["přístupové_url"] = distribution.service_endpoint_url;
  parent["přístupová_služba"] = service;

}
