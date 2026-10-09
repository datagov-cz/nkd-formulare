import {
  apply,
  applyEach,
  decimal,
  email,
  provided,
  temporal,
  url,
} from "../app-service/validators";
import { ESBIRKA, EUROPE } from "../app-service/vocabulary";

//
// Section : Type definitions.
//

/**
 * @typedef {object} Dataset
 * @property {"default" | "hvd" | "non-public"} mode Determined dataset type.
 * @property {string | undefined} iri
 * @property {string} title_cs
 * @property {string} title_en
 * @property {string} description_cs
 * @property {string} description_en
 * @property {string} accrual_periodicity
 * @property {{url: string, type: string}[]} spatial
 * @property {string} temporal_start
 * @property {string} temporal_end
 * @property {string} temporal_resolution
 * @property {string} spatial_resolution_meters
 * @property {string} documentation
 * @property {string[]} dataset_themes
 * @property {string[]} legislation
 * @property {string[]} dataset_custom_themes
 * @property {string[]} themes
 * @property {string[]} ofn
 * @property {string} contact_point_name
 * @property {string} contact_point_email
 * @property {string[]} keywords_cs
 * @property {string[]} keywords_en
 * @property {string} url_to_load_from
 * @property {string} ruian
 * @property {string} ruian_type
 * @property {string | undefined} publisher
 * @property {string} landing_page
 * @property {string[]} hvd_categories
 * @property {string} isvs
 * @property {string[]} related_terms
 * @property {{force: boolean} | {}} $validators
 */


/**
 * Performs migration of the legislation and removes all legislation fields
 * that are added by the forms. This method should be called when importing
 * legislation.
 *
 * @param {string[]} legislation
 */
export function loadImplicitLegislation(legislation) {
  const migration = {
    [ESBIRKA.NORM_2024_01_01_1_5A_1] : ESBIRKA.NORM_2025_08_19_1_5A_1,
    [ESBIRKA.NORM_2024_01_011_3A_6] : ESBIRKA.NORM_2025_08_19_1_3A_6,
  };
  const migrated = legislation.map(iri => migration[iri] ?? iri);

  /** @type string[] Legislation to remove on import. */
  const blackList = [
    // HVD
    ESBIRKA.SB_1999_106_2025_08_19,
    ESBIRKA.NORM_1_5B,
    EUROPE.REG_2023_138_oj,
    // NON-PUBLIC
    ESBIRKA.SB_2026_60_2026_05_27,
    ESBIRKA.SB_2000_365_2026_01_01,
    ESBIRKA.SB_2023_360_2024_07_01,
    // OPEN-DATA
    ESBIRKA.SB_1999_106_2025_08_19,
  ];
  return migrated.filter(iri => !blackList.includes(iri));
}

/**
 * @param {string[]} legislation
 * @returns {boolean}
 */
export function includesHvdLegislation(legislation) {
  // We require only EUROPE.hvd for backwards compatibility.
  return legislation.includes(EUROPE.REG_2023_138_oj);
}

/**
 * @param {string[]} legislation
 * @returns {boolean}
 */
export function includesNonPublicLegislation(legislation) {
  return legislation.includes(ESBIRKA.SB_2026_60_2026_05_27);
}

//
//
//

export const SPATIAL_RUIAN = "RUIAN";

export const SPATIAL_CONTINENT = "CONTINENT";

export const SPATIAL_COUNTRY = "COUNTRY";

export const SPATIAL_PLACE = "PLACE";

export const SPATIAL_URL = "URL";

/**
 * New dataset entry for NKOD, no URL is provided.
 */
export const EXPORT_NKOD = "nkod";

/**
 * Edit of existing dataset.
 */
export const EXPORT_EDIT = "edit";

/**
 * New dataset for LKOD with custom URL not provided
 * in the URL.
 */
export const EXPORT_LKOD = "lkod";

const MONTHLY_ACCRUAL_PERIODICITY =
  "http://publications.europa.eu/resource/authority/frequency/MONTHLY";

export const MODE_OPEN_DATA = "default";

export const MODE_HVD = "hvd";

export const MODE_NON_PUBLIC = "non-public";

/**
 * @param {"default" | "hvd" | "non-public"} mode
 * @returns {Dataset}
 */
export function createDataset(mode) {
  return {
    "mode": mode,
    //
    "iri": undefined,
    "title_cs": "",
    "title_en": "",
    "description_cs": "",
    "description_en": "",
    "accrual_periodicity": MONTHLY_ACCRUAL_PERIODICITY,
    "spatial": [],
    "temporal_start": "",
    "temporal_end": "",
    "temporal_resolution": "",
    "spatial_resolution_meters": "",
    "documentation": "",
    "dataset_themes": [],
    "legislation": [],
    "dataset_custom_themes": [],
    "themes": [],
    "ofn": [],
    "contact_point_name": "",
    "contact_point_email": "",
    "keywords_cs": [],
    "keywords_en": [],
    "url_to_load_from": "",
    "ruian": "",
    "ruian_type": "",
    "publisher": undefined,
    "landing_page": "",
    // mode === "hvd"
    "hvd_categories": [],
    // mode === "non-public"
    "isvs": "",
    "related_terms": [],
    // By default do not force validation on new item.
    "$validators": {
      "force": false,
    },
  };
}

/**
 * Create validators for all dataset fields.
 */
export function createDatasetValidators() {
  return {
    "err_title_cs": apply(
      (t) => t.dataset, "title_cs",
      provided,
      "dataset_title_invalid"),
    "err_description_cs": apply(
      (t) => t.dataset, "description_cs",
      provided,
      "dataset_description_invalid"),
    "err_dataset_spatial": apply(
      (t) => t.dataset, "spatial",
      provided,
      "dataset_spatial_invalid",
      // Do not validate for non-public data.
      (t) => t.dataset.mode === MODE_NON_PUBLIC),
    "err_keywords_cs": apply(
      (t) => t.dataset, "keywords_cs",
      provided,
      "keywords_error"),
    "err_contact_point_email": apply(
      (t) => t.dataset, "contact_point_email",
      email,
      "contact_point_email_invalid"),
    "err_documentation": apply(
      (t) => t.dataset, "documentation",
      url,
      "documentation_invalid"),
    "err_dataset_theme": apply(
      (t) => t.dataset, "dataset_themes",
      provided,
      "dataset_theme_invalid"),
    "err_dataset_theme_custom": applyEach(
      (t) => t.dataset, "dataset_custom_themes",
      url, "dataset_theme_invalid_url",
      // Do not validate for non-public data.
      (t) => t.dataset.mode === MODE_NON_PUBLIC),
    "err_dataset_ofn": applyEach(
      (t) => t.dataset, "ofn",
      url,
      "dataset_ofn_invalid_url"
    ),
    "err_temporal_resolution": apply(
      (t) => t.dataset, "temporal_resolution",
      temporal,
      "temporal_invalid",
      // Do not validate for non-public data.
      (t) => t.dataset.mode === MODE_NON_PUBLIC),
    "err_spatial_resolution": apply(
      (t) => t.dataset, "spatial_resolution_meters",
      decimal,
      "spatial_invalid",
      // Do not validate for non-public data.
      (t) => t.dataset.mode === MODE_NON_PUBLIC),
    "err_url_load": apply(
      (t) => t.dataset, "url_to_load_from",
      url, "load_invalid_url"
    ),
    "err_hvd_categories": function () {
      if (shouldSkipDatasetValidation(this.dataset)) {
        return [];
      }
      if (this.dataset.mode !== MODE_HVD) {
        return [];
      }
      if (this.dataset.hvd_categories.length === 0) {
        return [this.$t("missing_hvd_categories")];
      }
      return [];
    },
    "err_isvs": function () {
      if (shouldSkipDatasetValidation(this.dataset)) {
        return [];
      }
      if (this.dataset.mode !== MODE_NON_PUBLIC) {
        return [];
      }
      if (!this.dataset.isvs) {
        return [this.$t("missing_isvs")];
      }
      return [];
    },
    "err_related_terms": function () {
      if (shouldSkipDatasetValidation(this.dataset)) {
        return [];
      }
      if (this.dataset.mode !== MODE_NON_PUBLIC) {
        return [];
      }
      if (this.dataset.related_terms.length === 0) {
        return [this.$t("missing_related_terms")];
      }
      return [];
    },
    "err_landing_page": apply(
      (t) => t.dataset, "landing_page",
      url,
      "landing_page_invalid"),
  };
}

/**
 * Return true when validation is forced, this happens when we navigate
 * from dataset to distribution detail. In other words we do not validate
 * until user fills in the form.
 *
 * Similar functionality is implemented by shouldValidate function
 * in validators.js file.
 * @param {{$validators: {force: boolean}}} dataset
 */
function shouldSkipDatasetValidation(dataset) {
  return !dataset.$validators.force;
}

const validators = createDatasetValidators();

/**
 * @param {*[]} dataset
 * @param {*[]} distributions
 * @returns
 */
export function isDatasetValid(dataset, distributions) {
  // We mock the UI entity, to provide all functions the validators need.
  const wrapped = {
    "dataset": dataset,
    "distributions": distributions,
    /**
     * @param {string} message
     */
    "$t": (message) => message,
  };
  for (let validator of Object.values(validators)) {
    const errorMessages = validator.call(wrapped);
    if (errorMessages.length > 0) {
      return false;
    }
  }
  return true;
}
