
/**
 * @param {string} value_cs
 * @param {string | undefined} value_en
 * @returns {{cs?: string, en?: string}}
 */
export function asLanguageMap(value_cs, value_en = undefined) {
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
 * @returns {value is string}
 */
export function isNotEmpty(value) {
  return !isEmpty(value);
}

/**
 * @param {undefined | null | string} value
 * @returns {value is undefined | null | ""}
 */
export function isEmpty(value) {
  return value === undefined || value === null || value === "";
}

/**
 * Remove duplicities and sort.
 * @param {string[]} legislation
 * @returns {string[]}
 */
export function asUniqAndSorted(legislation) {
  return [...new Set(legislation)].sort();
}
