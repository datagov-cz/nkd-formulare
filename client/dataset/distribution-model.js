import {
  apply,
  provided,
  url,
  applyArray,
  shouldValidate,
  email,
} from "../app-service/validators";
import { MODE_HVD } from "./dataset-model";

//
// Section : Type definitions.
//

/**
 * @typedef {object} Distribution
 * @property {"file" | "service"} type
 * Legislation:
 * @property {"MULTI" | "CC BY" | "CUSTOM" | "NO"} license_author_type
 * @property {string} license_author_name
 * @property {string} license_author_custom
 * @property {"CC BY" | "NO" | "CUSTOM"} license_db_type
 * @property {string} license_db_name
 * @property {string} license_db_custom
 * @property {"CC0" | "NO" | "CUSTOM"} license_specialdb_type
 * @property {string} license_specialdb_custom
 * @property {"YES" | "NO"} license_personal_type
 * Distribution:
 * @property {string} iri
 * @property {string} url dcat:downloadURL
 * @property {string} format
 * @property {string} media_type
 * @property {string} schema
 * @property {string} title_cs
 * @property {string} title_en
 * @property {string} package_format
 * @property {string} compress_format
 * @property {string[]} legislation
 * Non-public
 * @property {string[]} typy_obsahu
 * @property {string | null} zpusob_sdileni
 * @property {string[]} zpusoby_ziskani
 * @property {ZprostredkovavaSdileni[]} zprostredkovava_sdileni
 * Service
 * @property {string} service_iri
 * @property {string} service_endpoint_url
 * @property {string} service_description
 * @property {string} service_conforms_to
 * High Value Dataset
 * @property {boolean} is_hvd
 * @property {string} contact_point_name
 * @property {string} contact_point_email
 * @property {string} contact_point_url
 * @property {string} documentation
 * @property {boolean} service_title_copy
 * @property {string} service_title_cs
 * @property {string} service_title_en
 * @property {{force: boolean} | {}} $validators
 */

/**
 * @typedef {object} ZprostredkovavaSdileni
 * @property {string | null} typ_obsahu Value from a codelist.
 * @property {string | null} zpusob_sdileni Value from a codelist.
 * @property {string | null} zpusob_ziskani Value from a codelist.
 * @property {string | null} related_term
 */

//
//
//

export const DIST_TYPE_FILE = "file";

export const DIST_TYPE_SERVICE = "service";

/**
 * Distribution can be default one or HVD one.
 * The detection is done based on the legislation.
 * @returns {Distribution}
 */
export function createDistribution() {
  return {
    "type": DIST_TYPE_FILE,
    //
    // Terms of use
    //
    "license_author_type": "NO",
    "license_author_name": "",
    "license_author_custom": "",
    "license_db_type": "NO",
    "license_db_name": "",
    "license_db_custom": "",
    "license_specialdb_type": "NO",
    "license_specialdb_custom": "",
    "license_personal_type": "NO",
    //
    // Distribution
    //
    "iri": "",
    /** @lc-property dcat:downloadURL */
    "url": "",
    "format": "",
    "media_type": "",
    "schema": "",
    "title_cs": "",
    "title_en": "",
    "package_format": "",
    "compress_format": "",
    "legislation": [],
    //
    // mode === "hvd"
    //
    "is_hvd": false,
    //
    // mode === "non-public"
    //
    /** @lc-property https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní#Distribuce.máTypObsahuSdílenéhoRozhraním */
    "typy_obsahu": [],
    /** @lc-property https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní#Distribuce.máZpůsobSdíleníRozhraním */
    "zpusob_sdileni": null,
    /** @lc-property https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní#Distribuce.máZpůsobZískáníDatSdílenýchRozhraním */
    "zpusoby_ziskani": [],
    "zprostredkovava_sdileni": [],
    //
    // type === "service"
    //
    "service_iri": "",
    /** @lc-property dcat:endpointURL */
    "service_endpoint_url": "",
    /** @lc-property dcat:endpointDescription */
    "service_description": "",
    /** @lc-property dct:conformsTo */
    "service_conforms_to": "",
    //
    // type === "service" && is_hvd
    //
    "contact_point_name": "",
    "contact_point_email": "",
    "contact_point_url": "",
    /** @lc-property foaf:page */
    "documentation": "",
    /** When true title_cs, and title_en should be used. */
    "service_title_copy": true,
    "service_title_cs": "",
    "service_title_en": "",
    ///
    // By default do not force validation on new item.
    //
    "$validators": {
      "force": false,
    },
  };
}

/** @returns {ZprostredkovavaSdileni} */
export function createZprostredkovavaSdileni() {
  return {
    /** @lc-property https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní#SdíleníÚdaje.jeSdílenJako */
    "typ_obsahu": null,
    /** @lc-property https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní#SdíleníÚdaje.jeSdílenZpůsobem */
    "zpusob_sdileni": null,
    /** @lc-property https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní#SdíleníÚdaje.jeZískánZpůsobem */
    "zpusob_ziskani": null,
    /** @lc-property https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní#SdíleníÚdaje.odpovídajícíPojem */
    "related_term": null,
  };
}

/** @param {ZprostredkovavaSdileni} value  */
function validateZprostredkovavaSdileni(value) {
  return value.typ_obsahu !== null
    && value.zpusob_sdileni !== null
    && value.zpusob_ziskani !== null
    && value.related_term !== null;
}

/**
 * Create validators for all distribution fields.
 * This is used by the user interface where additional validators
 * with false positives are not an issue as they are not visible.
 */
export function createDistributionValidators() {
  return {
    ...createCommonDistributionValidators(),
    ...createFileDistributionValidators(),
    ...createServiceDistributionValidators(),
  };
}

function createCommonDistributionValidators() {
  return {
    // Terms of use section.
    "err_license_author_name": validateAuthor(
      "license_author_type", "license_author_name"),
    "err_license_author_custom": validateCustom(
      "license_author_type",
      "license_author_custom",
      "license_author_custom_invalid"
    ),
    "err_license_db_name": validateAuthor(
      "license_db_type", "license_db_name"),
    "err_license_db_custom": validateCustom(
      "license_db_type",
      "license_db_custom",
      "license_db_custom_invalid"
    ),
    "err_license_specialdb_custom": validateCustom(
      "license_specialdb_type",
      "license_specialdb_custom",
      "license_specialdb_custom_invalid"
    ),
    "err_personal": validatePersonal(),
    "err_zprostredkovava_sdileni": function () {
      if (!this.distribution.$validators.force) {
        return [];
      }
      for (const item of this.distribution.zprostredkovava_sdileni) {
        if (!validateZprostredkovavaSdileni(item)) {
          return [this.$t("zprostredkovava_sdileni_incomplete")];
        }
      }
      return [];
    },
    // HVD
    "err_is_hvd": function () {
      // When mode is HVD we require at least one distribution to be HVD.
      // This does not validate a single distribution, instead it validates
      // against all distributions.
      if (this.mode !== MODE_HVD) {
        return [];
      }
      for (const distribution of this.distributions) {
        if (distribution.is_hvd) {
          return [];
        }
      }
      return [this.$t("missing_distribution_with_hvd")];
    },
  };
}

function createFileDistributionValidators() {
  return {
    "err_url": applyArray(
      (t) => t.distribution, "url",
      [
        [provided, "distribution_url_missing"],
        [url, "distribution_url_invalid"],
      ]),
    "err_format": apply(
      (t) => t.distribution, "format",
      provided, "format_missing"),
    "err_media_type": apply(
      (t) => t.distribution, "media_type",
      provided, "media_type_missing"),
    "err_schema": apply(
      (t) => t.distribution, "schema",
      url, "distribution_schema_invalid"),
  };
}

function createServiceDistributionValidators() {
  return {
    "err_description": applyArray(
      (t) => t.distribution, "service_description",
      [
        [provided, "endpoint_description_missing"],
        [url, "endpoint_description_invalid"],
      ]),
    "err_endpoint": applyArray(
      (t) => t.distribution, "service_endpoint_url",
      [
        [provided, "endpoint_url_missing"],
        [url, "endpoint_url_invalid"],
      ]),
    "err_title_cs": apply(
      (t) => t.distribution, "title_cs",
      provided, "title_missing"),
    "err_conforms_to": apply(
      (t) => t.distribution, "service_conforms_to",
      url, "service_conforms_to_invalid"),
    // High value dataset section
    // Either err_contact_point_email OR contact_point_url must be provided.
    "err_contact_point_email": applyArray(
      (t) => t.distribution, "contact_point_email", [
        [provided, "contact_point_email_or_url_missing"],
        [email, "contact_point_email_invalid"],
      ], (t) => t.distribution.is_hvd && (
        provided(t.distribution.contact_point_email)
        || !provided(t.distribution.contact_point_url))),
    "err_contact_point_url": applyArray(
      (t) => t.distribution, "contact_point_url", [
        [provided, "contact_point_url_or_email_missing"],
        [url, "contact_point_url_invalid"],
      ], (t) => t.distribution.is_hvd && (
        provided(t.distribution.contact_point_url)
        || !provided(t.distribution.contact_point_email))),
    "err_documentation": applyArray(
      (t) => t.distribution, "documentation", [
        [provided, "distribution_documentation_missing"],
        [url, "distribution_documentation_invalid"],
      ], (t) => t.distribution.is_hvd || provided(t.distribution.documentation)),
    "err_service_title_cs": applyArray(
      (t) => t.distribution, "service_title_cs",
      [[provided, "service_title_missing"]],
      (t) => t.distribution.is_hvd && !t.distribution.service_title_copy),
  };
}

function validateAuthor(licence_prop, name_prop) {
  return function () {
    const licence = this.distribution[licence_prop];
    const value = this.distribution[name_prop];
    const validators = this.distribution["$validators"];
    if (!shouldValidate(value, validators, name_prop)) {
      return [];
    }
    if (licence !== "CC BY") {
      return [];
    }
    if (provided(value)) {
      return [];
    } else {
      return [this.$t("author_name_missing")];
    }
  };
}

function validateCustom(licence_prop, custom_prop, invalid_prop) {
  return function () {
    const licence = this.distribution[licence_prop];
    const value = this.distribution[custom_prop];
    const validators = this.distribution["$validators"];
    if (!shouldValidate(value, validators, custom_prop)) {
      return [];
    }
    if (licence !== "CUSTOM") {
      return [];
    }
    if (!provided(value)) {
      return [this.$t("custom_license_missing")];
    }
    if (url(value)) {
      return [];
    } else {
      return [this.$t(invalid_prop)];
    }
  };
}

function validatePersonal() {
  return function () {
    const value = this.distribution["license_personal_type"];
    if (value === "UNKNOWN") {
      return [this.$t("personal_invalid")];
    } else {
      return [];
    }
  };
}

const fileValidators = {
  ...createCommonDistributionValidators(),
  ...createFileDistributionValidators(),
};

const serviceValidators = {
  ...createCommonDistributionValidators(),
  ...createServiceDistributionValidators(),
};

/**
 * @param {*[]} distributions Array of all distributions.
 * @param {*} distribution Distribution to validate.
 * @param {"default" | "hvd" | "non-public"} mode Dataset mode.
 * @returns
 */
export function isDistributionValid(distributions, distribution, mode) {
  // We mock the UI entity, to provide all functions the validators need.
  const wrapped = {
    "distribution": distribution,
    // The HVD validation requires access to all distributions.
    "distributions": distributions,
    // Mode
    "mode": mode,
    /**
     * @param {string} message
     */
    "$t": (message) => message,
  };
  // Select validators based on the distribution type and mode.
  let validators;
  if (distribution.type === DIST_TYPE_FILE) {
    validators = fileValidators;
  } else {
    validators = serviceValidators;
  }
  // Run the validators.
  for (let validator of Object.values(validators)) {
    const errorMessages = validator.call(wrapped);
    if (errorMessages.length > 0) {
      return false;
    }
  }
  //
  return true;
}
