/* eslint max-len: 0 */
import { describe, test, expect } from "@jest/globals";
import fs from "fs";
import path from "path";

import { importFromJsonLd } from "../client/dataset/import-dataset.js";
import {
  exportDatasetForNationalDataCatalog,
  exportDatasetForLocalDataCatalog,
  exportDatasetForPost,
} from "../client/dataset/edit/dataset-export.js";

describe("dataset", () => {

  test("od-dyn nkod", () => {
    const input = loadJson("./data/od-dyn/2024-nkod.jsonld");
    const expected = loadJson("./data/od-dyn/2026-nkod.jsonld");
    return importFromJsonLd(input, "cs").then(/** @param {any} data */ data => {
      const actual = exportDatasetForNationalDataCatalog(
        data.dataset, data.distributions);
      expect(actual).toEqual(expected);
    });
  });

  /**
   * @param {string} file Path relative to this directory.
   */
  function loadJson(file) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, file), "utf-8"));
  }

  test("od-hvd nkod", () => {
    const input = loadJson("./data/od-hvd/2024-nkod.jsonld");
    const expected = loadJson("./data/od-hvd/2026-nkod.jsonld");
    return importFromJsonLd(input, "cs").then(/** @param {any} data */ data => {
      const actual = exportDatasetForNationalDataCatalog(
        data.dataset, data.distributions);
      expect(actual).toEqual(expected);
    });
  });

  test("od-hvd-dyn-vr nkod", () => {
    const input = loadJson("./data/od-hvd-dyn-vr/2024-nkod.jsonld");
    const expected = loadJson("./data/od-hvd-dyn-vr/2026-nkod.jsonld");
    return importFromJsonLd(input, "cs").then(/** @param {any} data */ data => {
      const actual = exportDatasetForNationalDataCatalog(
        data.dataset, data.distributions);
      expect(actual).toEqual(expected);
    });
  });

  test("od-min lkod", () => {
    const input = loadJson("./data/od-min/2024-lkod.jsonld");
    const expected = loadJson("./data/od-min/2026-lkod.jsonld");
    return importFromJsonLd(input, "cs").then(/** @param {any} data */ data => {
      const actual = exportDatasetForLocalDataCatalog(
        data.dataset, data.distributions, {
        lkodIri: "https://od.min.lkod.cz",
        publisher: "https://poskytovatel.cz",
      });
      expect(actual).toEqual(expected);
    });
  });

  test("od-min post", () => {
    const input = loadJson("./data/od-min/2026-lkod.jsonld");
    const expected = loadJson("./data/od-min/2026-post.jsonld");
    return importFromJsonLd(input, "cs").then(/** @param {any} data */ data => {
      const actual = exportDatasetForPost(
        data.dataset, data.distributions);
      expect(actual).toEqual(expected);
    });
  });

  test("od-min nkod", () => {
    const input = loadJson("./data/od-min/2024-nkod.jsonld");
    const expected = loadJson("./data/od-min/2026-nkod.jsonld");
    return importFromJsonLd(input, "cs").then(/** @param {any} data */ data => {
      const actual = exportDatasetForNationalDataCatalog(
        data.dataset, data.distributions);
      expect(actual).toEqual(expected);
    });
  });

  test("od-vr nkod", () => {
    const input = loadJson("./data/od-vr/2024-nkod.jsonld");
    const expected = loadJson("./data/od-vr/2026-nkod.jsonld");
    return importFromJsonLd(input, "cs").then(/** @param {any} data */ data => {
      const actual = exportDatasetForNationalDataCatalog(
        data.dataset, data.distributions);
      expect(actual).toEqual(expected);
    });
  });

});
