import {
  PU,
  CREATIVE_COMMONS,
  EUROPE,
  ESBIRKA,
} from "../../app-service/vocabulary";
import { DIST_TYPE_FILE, DIST_TYPE_SERVICE } from "../distribution-model";
import {
  MODE_HVD,
  MODE_NON_PUBLIC,
  MODE_OPEN_DATA,
  SPATIAL_CONTINENT,
  SPATIAL_COUNTRY,
  SPATIAL_PLACE,
  SPATIAL_RUIAN,
  SPATIAL_URL,
} from "../dataset-model";
import { zpusobySdileniUdaju } from "./codelists/non-public";

/**
 * Export a dataset so it can be send to the National Data Catalog.
 * All IRIs as set to be blank nodes.
 * Information about the publisher is removed.
 *
 * @param {import("../dataset-model").Dataset} dataset
 * @param {import("../distribution-model").Distribution[]} distributions
 */
export function exportDatasetForNationalDataCatalog(dataset, distributions) {
  // Create a copy so we do not modify the inputs.
  dataset = { ...dataset };
  // There is no IRI and no publisher.
  dataset.iri = "_:ds";
  dataset.publisher = undefined;

  // Generate new IRIs.

  const selectDistributionIri = () => undefined;

  const selectServiceIri = () => undefined;

  return exportDatasetToJsonLd(
    dataset, distributions, selectDistributionIri, selectServiceIri);
}

/**
 * Export a dataset so it can be used in a Local Data Catalog.
 * Use IRIs from export options or try to preserve IRIs from the dataset.
 *
 * @param {import("../dataset-model").Dataset} dataset
 * @param {import("../distribution-model").Distribution[]} distributions
 * @param {{lkodIri?: string, publisher?: string}} options
 */
export function exportDatasetForLocalDataCatalog(
  dataset, distributions, options) {
  // Create a copy so we do not modify the inputs.
  dataset = { ...dataset };
  // Apply export options.
  if (isNotEmpty(options.lkodIri)) {
    dataset.iri = options.lkodIri;
  }
  if (isNotEmpty(options.publisher)) {
    dataset.publisher = options.publisher;
  }

  // Generate new IRIs.

  /**
   * @param {*} _
   * @param {number} index
   * @returns
   */
  const selectDistributionIri = (_, index) =>
    dataset.iri + "/distribuce/" + index;

  /**
   * @param {*} _
   * @param {string} distributionIri
   * @returns
   */
  const selectServiceIri = (_, distributionIri) =>
    distributionIri + "/přístupová-služba";

  return exportDatasetToJsonLd(
    dataset, distributions, selectDistributionIri, selectServiceIri);
}

/**
 * Export data for POST, in this case we want to preserve IRIs where possible.
 * Without a change this should produce the same output as was input for import.
 * @param {import("../dataset-model").Dataset} dataset
 * @param {import("../distribution-model").Distribution[]} distributions
 */
export function exportDatasetForPost(dataset, distributions) {
  // Create a copy so we do not modify the inputs.
  dataset = { ...dataset };

  // Use existing or nothing (blank nodes).

  const selectDistributionIri =
    (/** @type {{ iri: string; }} */distribution) =>
      distribution.iri ?? undefined;

  const selectServiceIri =
    (/** @type {{ service_iri: string; }} */ distribution) =>
      distribution.service_iri ?? undefined;

  return exportDatasetToJsonLd(
    dataset, distributions, selectDistributionIri, selectServiceIri);
}

/**
 * @param {import("../dataset-model").Dataset} dataset
 * @param {import("../distribution-model").Distribution[]} distributions
 * @param {(distribution: import("../distribution-model").Distribution, index: number) => ?string | undefined} distributionIri
 * @param {(service: *, distribution: string) => string | undefined} serviceIri
 */
function exportDatasetToJsonLd(
  dataset, distributions, distributionIri, serviceIri) {

  /** @type * */
  const result = {
    "@context": selectJsonLdContext(dataset),
    "iri": dataset.iri,
    "typ": selectJsonLdDatasetType(dataset),
    "název": asLanguageMap(dataset.title_cs, dataset.title_en),
    "popis": asLanguageMap(dataset.description_cs, dataset.description_en),
    ...exportSpatial(dataset),
    ...exportTemporal(dataset),
  };

  if (dataset.keywords_cs.length > 0 && dataset.keywords_en.length > 0) {
    result["klíčové_slovo"] = {
      "cs": dataset.keywords_cs,
      "en": dataset.keywords_en,
    };
  } else if (dataset.keywords_cs.length > 0) {
    result["klíčové_slovo"] = {
      "cs": dataset.keywords_cs,
    };
  } else if (dataset.keywords_en.length > 0) {
    result["klíčové_slovo"] = {
      "en": dataset.keywords_en,
    };
  }

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

  if (isNotEmpty(dataset.isvs)) {
    result["je_zahrnuta_v_isvs"] = dataset.isvs;
  }

  if (dataset.related_terms.length > 0) {
    result["týká_se_pojmu"] = dataset.related_terms;
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
    case MODE_NON_PUBLIC:
      return "https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní/2026-09-23/datová-sada/kontext.jsonld";
    case MODE_OPEN_DATA:
    default:
      return "https://ofn.gov.cz/dcat-ap-cz-otevřená-data/2026-09-23/datová-sada/kontext.jsonld";
  }
}

/**
 * @param {{mode: "default" | "hvd" | "non-public"}} dataset
 * @returns {string | string[]}
 */
function selectJsonLdDatasetType(dataset) {
  switch (dataset.mode) {
    case MODE_NON_PUBLIC:
      return ["Datová sada", "Datová sada SSP"];
    default:
      return "Datová sada";
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
    case MODE_NON_PUBLIC:
      return [
        ESBIRKA.SB_2026_60_2026_05_27
      ];
    case MODE_OPEN_DATA:
    default:
      return [
        ESBIRKA.SB_1999_106_2025_08_19,
      ];
  }
}

/**
 * Remove duplicities and sort.
 * @param {string[]} legislation
 * @returns {string[]}
 */
function asUniqAndSorted(legislation) {
  return [...new Set(legislation)].sort();
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
 * @param {import("../dataset-model").Dataset} dataset
 * @param {import("../distribution-model").Distribution} distribution
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
    "právní_předpis":
      asUniqAndSorted([
        ...distribution.legislation,
        ...selectDistributionLegislation(dataset, distribution)
      ]),
  };

  // First we deal with the non-public mode as it adds some properties.

  if (dataset.mode === MODE_NON_PUBLIC) {
    result["typ"] = ["Distribuce", "Datové rozhraní"];
    //
    if (distribution.typy_obsahu.length > 0) {
      result["typ_obsahu_sdílených_údajů"] = distribution.typy_obsahu;
    }
    if (isNotEmpty(distribution.zpusob_sdileni)) {
      result["způsob_sdílení_údajů"] = distribution.zpusob_sdileni;
    }
    if (distribution.zpusoby_ziskani.length > 0) {
      result["způsob_získání_sdílených_údajů"] = distribution.zpusoby_ziskani;
    }
    if (distribution.zprostredkovava_sdileni.length > 0) {
      result["sdílí_údaj"] =
        distribution.zprostredkovava_sdileni.map(item => ({
          "typ": "Sdílení údaje",
          "typ_obsahu_sdílených_údajů": item.typ_obsahu,
          "způsob_sdílení_údajů": item.zpusob_sdileni,
          "způsob_získání_sdílených_údajů": item.zpusob_ziskani,
          "odpovídající_pojem": item.related_term,
        }));
    }
  } else {
    result["typ"] = "Distribuce";
  }

  // Next is the rest of the distribution entity.

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
 * @param {import("../distribution-model").Distribution} distribution
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
    case MODE_NON_PUBLIC:
      if (distribution.zpusoby_ziskani.length === 0 &&
        isEmpty(distribution.zpusob_sdileni) &&
        distribution.typy_obsahu.length === 0 &&
        distribution.zprostredkovava_sdileni.length === 0) {
        return [
          ESBIRKA.SB_2026_60_2026_05_27,
        ];
      } else {
        return [
          ESBIRKA.SB_2026_60_2026_05_27,
          ESBIRKA.SB_2000_365_2026_01_01,
          ESBIRKA.SB_2023_360_2024_07_01,
        ]
      }
    case MODE_OPEN_DATA:
    default:
      return [
        ESBIRKA.SB_1999_106_2025_08_19,
      ];
  }
}

/**
 * @param {import("../distribution-model").Distribution} distribution
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
 * @param {import("../distribution-model").Distribution} distribution
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
 * @param {import("../distribution-model").Distribution} distribution
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

//
// Section utilities
//

/**
 * @param {string} value_cs
 * @param {string | undefined} value_en
 * @returns {{cs?: string, en?: string}}
 */
function asLanguageMap(value_cs, value_en = undefined) {
  const result = {};
  if (isNotEmpty(value_cs)) {
    result["cs"] = value_cs;
  }
  if (isNotEmpty(value_en)) {
    result["en"] = value_en;
  }
  return result;
}

/**
 * @param {undefined | null | string} value
 * @returns {boolean}
 */
function isNotEmpty(value) {
  return !isEmpty(value);
}

/**
 * @param {undefined | null | string} value
 * @returns {boolean}
 */
function isEmpty(value) {
  return value === undefined || value === null || value === "";
}
