/* eslint max-len: 0 */
import {test} from "@jest/globals";

import { importFromJsonLd } from "../client/dataset/import-dataset.js";
import {
  exportDatasetForNationalDataCatalog,
  exportDatasetForLocalDataCatalog,
  exportDatasetForPost,
} from "../client/dataset/edit/dataset-export.js";

/** Hight Value Dataset, Dynamic Data */
import D_20261008_BYLANY from "./data/20261008-bylany.js";
import D_20261008_BYLANY_NKOD from "./data/20261008-bylany.nkod.js";
import D_20261008_BYLANY_LKOD from "./data/20261008-bylany.lkod.js";
import D_20261008_BYLANY_POST from "./data/20261008-bylany.post.js";

/** OpenData, Data Service */
import D_20261008_ISS94 from "./data/20261008-iss94.js";
import D_20261008_ISS94_LKOD from "./data/20261008-iss94.lkod.js";

/** OpenData */
import D_20261008_ISS95 from "./data/20261008-iss95.js";
import D_20261008_ISS95_NKOD from "./data/20261008-iss95.nkod.js";

/** OpenData */
import D_20261008_ISS97A from "./data/20261008-iss97a.js";
import D_20261008_ISS97A_NKOD from "./data/20261008-iss97a.post.js";

/** OpenData, Hight Value Dataset */
import D_20261008_HVD from "./data/20261008-hvd.js";
import D_20261008_HVD_NKOD from "./data/20261008-hvd.post.js";

/**
 * Modified example from:
 *   https://ofn.gov.cz/dcat-ap-cz-datová-rozhraní/draft/cs/
 * Modifications:
 * - Shorthand URL expanded to work as input / output.
 * - Removed en label for contact point, we do not support it.
 */
import DATA_20261008_DATA_INTERFACE from "./data/20261008-data-interface.js";

test("20261008 Bylany to NKD.", () => {
  return importFromJsonLd(D_20261008_BYLANY, "cs").then(data => {
    const actual = exportDatasetForNationalDataCatalog(
      data.dataset, data.distributions);
    expect(actual).toEqual(D_20261008_BYLANY_NKOD);
  });
});

test("20261008 Bylany to LKOD", () => {
  return importFromJsonLd(D_20261008_BYLANY, "cs").then(data => {
    const actual = exportDatasetForLocalDataCatalog(
      data.dataset, data.distributions, {
      "lkodIri": "https://data.gov.cz/datové-sady",
      "publisher": "https://data.gov.cz/zdroj/ovm",
    });
    expect(actual).toEqual(D_20261008_BYLANY_LKOD);
  });
});

test("20261008 Bylany to POST.", () => {
  return importFromJsonLd(D_20261008_BYLANY, "cs").then(data => {
    const actual = exportDatasetForPost(data.dataset, data.distributions);
    expect(actual).toEqual(D_20261008_BYLANY_POST);
  });
});

test("20261008 ISS94 to LKOD.", () => {
  return importFromJsonLd(D_20261008_ISS94, "cs").then(data => {
    const actual = exportDatasetForLocalDataCatalog(
      data.dataset, data.distributions, {
      "lkodIri": "https://local-publisher",
    });
    console.log(JSON.stringify(actual, null, 2));
    expect(actual).toEqual(D_20261008_ISS94_LKOD);
  });
});

test("20261008 ISS95 to NKD.", () => {
  return importFromJsonLd(D_20261008_ISS95, "cs").then(data => {
    const actual = exportDatasetForNationalDataCatalog(
      data.dataset, data.distributions);
    expect(actual).toEqual(D_20261008_ISS95_NKOD);
  });
});

test("20261008 ISS97a to POST.", () => {
  return importFromJsonLd(D_20261008_ISS97A, "cs").then(data => {
    const actual = exportDatasetForPost(data.dataset, data.distributions);
    expect(actual).toEqual(D_20261008_ISS97A_NKOD);
  });
});

test("20261008 HVD_20240619 to POST.", () => {
  return importFromJsonLd(D_20261008_HVD, "cs").then(data => {
    const actual = exportDatasetForPost(data.dataset, data.distributions);
    expect(actual).toEqual(D_20261008_HVD_NKOD);
  });
});

test("20260630 DATOVE_ROZHRANI to POST roundtrip.", () => {
  return importFromJsonLd(DATA_20261008_DATA_INTERFACE, "cs").then(data => {
    // We use POST as it preserves the record as is.
    const actual = exportDatasetForPost(data.dataset, data.distributions);
    expect(actual).toEqual(DATA_20261008_DATA_INTERFACE);
  });
});
