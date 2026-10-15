import { expect, describe, test } from '@jest/globals';
/* eslint max-len: 0 */

import { EXPORT_NKOD, EXPORT_EDIT, EXPORT_LKOD } from "../dataset-model";
import {
  onRouteChange, getDatasetEditDownloadFileName,
} from "./dataset-edit-service";

test("Export NKOD file name.", () => {
  const dataset = {};
  const actual = getDatasetEditDownloadFileName(dataset, EXPORT_NKOD);
  expect(actual).toEqual("nkod-registrace.jsonld.txt");
});

test("Export edit NKOD file name.", () => {
  const dataset = {
    "iri": "https://data.gov.cz/dataset",
  };
  const actual = getDatasetEditDownloadFileName(dataset, EXPORT_EDIT);
  expect(actual).toEqual("nkod-registrace.jsonld.txt");
});

test("Export edit LKOD file name.", () => {
  const dataset = {
    "iri": "",
    "title_cs": "Můj dataset",
  };
  const actual = getDatasetEditDownloadFileName(dataset, EXPORT_LKOD);
  expect(actual).toEqual("Můj dataset.jsonld");
});

describe("Dataset edit navigation.", () => {

  /**
   * User opened the form, selected a mode and then navigated back.
   */
  test("Navigation back to mode selection.", () => {
    // This is state after used selected an open data.
    const component = {
      "data": {
        "status": "ready",
        "dataset": { "mode": "default" },
      },
      "ui": { "userSelectedMode": true },
    };
    const location = {
      "query": {
        // The navigation back removes the mode from the query.
        // "mode": "otevřená-data",
        "returnUrl": "return",
      },
    };
    onRouteChange(component, location);
    // We should be back on select mode page.
    expect(component.data.status).toBe("select-mode");
  });

  test("Navigation from mode selection to selected", () => {
    // This is state after used selected an open data.
    const component = {
      "data": {
        "status": "select-mode",
        "dataset": { "mode": "default" },
      },
      "ui": { "userSelectedMode": false },
    };
    const location = {
      "query": {
        // Navigating forward added back the mode.
        "mode": "otevřená-data",
        "returnUrl": "return",
      },
    };
    onRouteChange(component, location);
    // We should be back on select mode page.
    expect(component.data.status).toBe("ready");
  });

  // What is not supported is a return operation after file upload.
  // We have the component.ui.fileSelectedMode set on file upload
  // but there is no URL change in reaction to file upload.
  // A solution would be to update the URL and then we can make the back work
  // properly.

});
