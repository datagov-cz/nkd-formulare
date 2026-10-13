/**
 * This file must not export any other function then the main entry point.
 * The idea is to make it standalone.
 */
import {
  PU,
  CREATIVE_COMMONS,
  EUROPE,
  ESBIRKA,
} from "../../../app-service/vocabulary";
import { DIST_TYPE_FILE, DIST_TYPE_SERVICE } from "../../distribution-model";
import {
  MODE_HVD,
  MODE_OPEN_DATA,
  SPATIAL_CONTINENT,
  SPATIAL_COUNTRY,
  SPATIAL_PLACE,
  SPATIAL_RUIAN,
  SPATIAL_URL,
} from "../../dataset-model";
import { asLanguageMap, isEmpty, isNotEmpty, asUniqAndSorted } from "./utilities";

/**
 * Export open data and high value datasets.
 *
 * @param {import("../../dataset-model").Dataset} dataset
 * @param {import("../../distribution-model").Distribution[]} distributions
 * @param {(distribution: import("../../distribution-model").Distribution, index: number) => ?string | undefined} distributionIri
 * @param {(service: *, distribution: string) => string | undefined} serviceIri
 */
export function exportDatasetToJsonLd(
  dataset, distributions, distributionIri, serviceIri) {

  /** @type * */
  const result = {
    "@context": selectJsonLdContext(dataset),
    "iri": dataset.iri,
    "typ": "Datová sada",
    "název": asLanguageMap(dataset.title_cs, dataset.title_en),
    "popis": asLanguageMap(dataset.description_cs, dataset.description_en),
    ...exportSpatial(dataset),
    ...exportTemporal(dataset),
    ...exportKeywords(dataset),
  };

  if (isNotEmpty(dataset.accrual_periodicity)) {
    result["periodicita_aktualizace"] = dataset.accrual_periodicity;
  }

  if (isNotEmpty(dataset.documentation)) {
    result["dokumentace"] = dataset.documentation;
  }

  if (dataset.dataset_themes.length > 0) {
    result["téma"] = dataset.dataset_themes;
  }

  const legislation = selectDatasetLegislation(dataset);
  if (dataset.legislation.length > 0 || legislation.length > 0) {
    result["právní_předpis"] =
      asUniqAndSorted([...legislation, ...dataset.legislation]);
  }

  if (dataset.hvd_categories.length > 0) {
    result["kategorie_hvd"] = dataset.hvd_categories;
  }

  if (dataset.themes.length > 0 || dataset.dataset_custom_themes.length > 0) {
    result["koncept_euroVoc"] = [
      ...dataset.themes,
      ...dataset.dataset_custom_themes,
    ];
  }

  if (dataset.ofn.length > 0) {
    result["specifikace"] = dataset.ofn;
  }

  if (isNotEmpty(dataset.temporal_resolution)) {
    result["časové_rozlišení"] = dataset.temporal_resolution;
  }

  if (isNotEmpty(dataset.spatial_resolution_meters)) {
    result["prostorové_rozlišení_v_metrech"] =
      dataset.spatial_resolution_meters;
  }

  const contactPoint = exportContactPoint(dataset);
  if (contactPoint !== null) {
    result["kontaktní_bod"] = contactPoint;
  }

  if (isNotEmpty(dataset.publisher)) {
    result["poskytovatel"] = dataset.publisher;
  }

  if (isNotEmpty(dataset.landing_page)) {
    result["vstupní_stránka"] = dataset.landing_page;
  }

  if (distributions.length > 0) {
    result["distribuce"] = distributions.map(
      (distribution, index) => exportDistribution(
        dataset, distribution, index,
        distributionIri, serviceIri));
  }

  return result;
}

/**
 * @param {{mode: "default" | "hvd" | "non-public"}} dataset
 * @returns {string}
 */
function selectJsonLdContext(dataset) {
  switch (dataset.mode) {
    case MODE_HVD:
      return "https://ofn.gov.cz/dcat-ap-cz-hvd/2026-09-23/datová-sada/kontext.jsonld";
    case MODE_OPEN_DATA:
    default:
      return "https://ofn.gov.cz/dcat-ap-cz-otevřená-data/2026-09-23/datová-sada/kontext.jsonld";
  }
}

/**
 * @param {{mode: "default" | "hvd" | "non-public"}} dataset
 * @returns {string[]}
 */
function selectDatasetLegislation(dataset) {
  switch (dataset.mode) {
    case MODE_HVD:
      return [
        ESBIRKA.SB_1999_106_2025_08_19,
        ESBIRKA.NORM_1_5B,
        EUROPE.REG_2023_138_oj,
      ];
    case MODE_OPEN_DATA:
    default:
      return [
        ESBIRKA.SB_1999_106_2025_08_19,
      ];
  }
}

/**
 * @param {{spatial: {url: string, type: string}[]}} value
 * @returns
 */
function exportSpatial(value) {
  /** @type string[] */
  const ruian = [];
  /** @type string[] */
  const geo_area = [];
  /** @type string[] */
  const custom = [];

  value.spatial.map((spatial) => {
    const url = spatial.url;
    switch (spatial.type) {
      case SPATIAL_RUIAN:
        ruian.push(url);
        break;
      case SPATIAL_CONTINENT:
      case SPATIAL_COUNTRY:
      case SPATIAL_PLACE:
        geo_area.push(url);
        break;
      case SPATIAL_URL:
        custom.push(url);
        break;
      default:
        console.warn("Unknown spatial type for", spatial);
        custom.push(url);
        break;
    }
  });
  const result = {};
  if (ruian.length > 0) {
    result["prvek_rúian"] = ruian;
  }
  if (geo_area.length > 0) {
    result["geografické_území"] = geo_area;
  }
  if (custom.length > 0) {
    result["prostorové_pokrytí"] = custom;
  }
  return result;
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
 * Used by dataset, where url is not present, and distribution.
 *
 * @param {{
 * contact_point_name: string,
 * contact_point_email: string,
 * contact_point_url?: string,
 * }} value
 * @returns
 */
function exportContactPoint(value) {
  if (isEmpty(value.contact_point_name)
    && isEmpty(value.contact_point_email)
    && isEmpty(value.contact_point_url)) {
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
  if (isNotEmpty(value.contact_point_url)) {
    output["kontaktní_stránka"] = value.contact_point_url;
  }
  return output;
}

//
// Section : Distribution
//

/**
 * @param {import("../../dataset-model").Dataset} dataset
 * @param {import("../../distribution-model").Distribution} distribution
 * @param {number} distributionIndex Index of the distribution.
 * @param {(distribution: *, index: number) => ?string | undefined} distributionIri
 * @param {(service: *, distribution: string) => string | undefined} serviceIri
 * @returns
 */
function exportDistribution(
  dataset, distribution, distributionIndex,
  distributionIri, serviceIri) {

  /** @type * */
  const result = {
    "typ": "Distribuce",
    "právní_předpis":
      asUniqAndSorted([
        ...distribution.legislation,
        ...selectDistributionLegislation(dataset, distribution)
      ]),
  };

  const iri = distributionIri(distribution, distributionIndex);
  if (isNotEmpty(iri)) {
    result["iri"] = iri;
  }

  let title = asLanguageMap(distribution.title_cs, distribution.title_en);
  if (title["cs"] || title["en"]) {
    result["název"] = title;
  }

  result["podmínky_užití"] = exportTermsOfUse(distribution);

  // Remove empty array, we need to do it here
  // as data service may copy this field.
  if (result["právní_předpis"].length === 0) {
    delete result["právní_předpis"];
  }

  if (distribution.type === DIST_TYPE_FILE) {
    addFileDistribution(distribution, result);
  } else if (distribution.type === DIST_TYPE_SERVICE) {
    addDataService(dataset, distribution, serviceIri, result);
  } else {
    console.error("Distribution must be either FILE or SERVICE.", distribution);
  }

  return result;
}

/**
 * @param {{mode: "default" | "hvd" | "non-public"}} dataset
 * @param {import("../../distribution-model").Distribution} distribution
 * @returns {string[]}
 */
function selectDistributionLegislation(dataset, distribution) {
  switch (dataset.mode) {
    case MODE_HVD:
      if (distribution.is_hvd) {
        return [
          ESBIRKA.SB_1999_106_2025_08_19,
          ESBIRKA.NORM_1_5B,
          EUROPE.REG_2023_138_oj,
        ];
      } else {
        return [
          ESBIRKA.SB_1999_106_2025_08_19,
        ];
      }
    case MODE_OPEN_DATA:
    default:
      return [
        ESBIRKA.SB_1999_106_2025_08_19,
      ];
  }
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
 * @param {import("../../distribution-model").Distribution} distribution
 * @param {*} parent Output argument.
 */
function addFileDistribution(distribution, parent) {

  parent["soubor_ke_stažení"] = distribution.url;

  parent["přístupové_url"] = distribution.url;

  if (isNotEmpty(distribution.media_type)) {
    parent["typ_média"] = distribution.media_type;
  }

  if (isNotEmpty(distribution.format)) {
    parent["formát"] = distribution.format;
  }

  if (isNotEmpty(distribution.schema)) {
    parent["schéma"] = distribution.schema;
  }

  if (isNotEmpty(distribution.package_format)) {
    parent["typ_média_balíčku"] = distribution.package_format;
  }

  if (isNotEmpty(distribution.compress_format)) {
    parent["typ_média_komprese"] = distribution.compress_format;
  }

}

/**
 * @param {{hvd_categories: string[]}} dataset
 * @param {import("../../distribution-model").Distribution} distribution
 * @param  {(service: *, distribution: string) => string | undefined} serviceIri
 * @param {*} parent Output argument.
 */
function addDataService(
  dataset, distribution, serviceIri, parent
) {

  // We start with preparing the data service object.

  /** @type * */
  const service = {
    "typ": "Datová služba",
    "přístupový_bod": distribution.service_endpoint_url,
    "popis_přístupového_bodu": distribution.service_description,
  };

  const iri = serviceIri(distribution, parent["iri"]);
  if (isNotEmpty(iri)) {
    service["iri"] = iri;
  }

  if (isNotEmpty(distribution.service_conforms_to)) {
    service["specifikace"] = [distribution.service_conforms_to];
  }

  // Some values are a copy from the distribution.

  service["název"] = parent["název"];
  if (parent["právní_předpis"] !== undefined) {
    service["právní_předpis"] = parent["právní_předpis"];
  }

  // We need to store some values to the parent object.

  parent["přístupové_url"] = distribution.service_endpoint_url;
  parent["přístupová_služba"] = service;

  // HVD gets special handling.

  if (distribution.is_hvd) {
    if (distribution.service_title_copy) {
      service["název"] = asLanguageMap(
        distribution.title_cs, distribution.title_en);
    } else {
      service["název"] = asLanguageMap(
        distribution.service_title_cs, distribution.service_title_en);
    }

    // While this is mandatory for HVD we keep it optional for backwards
    // export compatibility.
    const contactPoint = exportContactPoint(distribution);
    if (contactPoint !== null) {
      service["kontaktní_bod"] = contactPoint;
    }

    if (isNotEmpty(distribution.documentation)) {
      service["dokumentace"] = distribution.documentation;
    }

    // Categories are a copy from the dataset.
    if (dataset.hvd_categories.length > 0) {
      service["kategorie_hvd"] = dataset.hvd_categories;
    }
  }

}
