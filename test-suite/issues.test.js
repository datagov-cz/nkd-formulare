/* eslint max-len: 0 */
import { describe, test, expect } from "@jest/globals";

import { importFromJsonLd } from "../client/dataset/import-dataset.js";
import { ESBIRKA } from "../client/app-service/vocabulary.js";

describe("Issue", () => {

  /**
   * https://github.com/datagov-cz/nkd-formulare/issues/238
   * The record contains both obsolete and current legislation,
   * after the migration the legislation must not be in the form twice.
   */
  test("Issue 238: legislation is not duplicated", () => {
    const legislation = [
      ESBIRKA.NORM_2024_01_011_3A_6,
      ESBIRKA.NORM_2025_08_19_1_3A_6,
      ESBIRKA.NORM_2024_01_01_1_5A_1,
      ESBIRKA.NORM_2025_08_19_1_5A_1,
    ];
    const input = {
      "@context": {
        "distribution": {
          "@id": "http://www.w3.org/ns/dcat#distribution",
          "@type": "@id",
        },
        "applicableLegislation": {
          "@id": "http://data.europa.eu/r5r/applicableLegislation",
          "@type": "@id",
        },
      },
      "@graph": [{
        "@id": "https://example.com/dataset",
        "@type": "http://www.w3.org/ns/dcat#Dataset",
        "distribution": "https://example.com/dataset/distribution",
        "applicableLegislation": legislation,
      }, {
        "@id": "https://example.com/dataset/distribution",
        "@type": "http://www.w3.org/ns/dcat#Distribution",
        "applicableLegislation": legislation,
      }],
    };
    const expected = [
      ESBIRKA.NORM_2025_08_19_1_3A_6,
      ESBIRKA.NORM_2025_08_19_1_5A_1,
    ];
    return importFromJsonLd(input, "cs").then(/** @param {any} data */ data => {
      expect(data.dataset.legislation).toEqual(expected);
      expect(data.distributions.length).toBe(1);
      expect(data.distributions[0].legislation).toEqual(expected);
    });
  });

});
