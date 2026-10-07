import {
  EXPORT_NKOD, EXPORT_EDIT, EXPORT_LKOD,
  createDataset,
  MODE_OPEN_DATA,
  MODE_NON_PUBLIC,
  MODE_HVD,
} from "../dataset-model";
import {
  importDatasetFromUrl,
  importDatasetFromUrlWithDereference,
  importFromJsonLd,
} from "../import-dataset";
import {
  exportDatasetForLocalDataCatalog,
  exportDatasetForNationalDataCatalog,
  exportDatasetForPost,
} from "./dataset-export";
import { downloadAsJsonLd } from "../../app-service/download";
import { createDistribution, isDistributionValid } from "../distribution-model";
import { provided, url } from "../../app-service/validators";
import { postForm } from "../../app-service/http";
import { fetchCodelistLabels } from "../codelist";

export function onRouteChange(component, location) {

  // Enable navigation back to the mode selection screen.
  const mode = parseUrlMode(location.query);
  if (component.userSelectedModel && mode === null) {
    component.data.status = "select-mode";
    return;
  }

  // Enable navigation forward from the selection screen.
  if (component.data.status === "select-mode"
    && mode !== component.data.dataset.model) {
    component.data.status = "ready";
    return;
  }

  // If there is no step use step one.
  if (location.query.krok === undefined) {
    component.ui.step = 1;
    return;
  }

  // Synchronize step with the one in the URL query.
  const value = parseInt(location.query.krok);
  if (value !== component.ui.step) {
    component.ui.step = value;
  }
}

/**
 * @param {{mode?: string , mód?: string}} query
 * @returns {null | "default" | "non-public" | "hvd"}
 */
function parseUrlMode(query) {
  const value = query["mode"] ?? query["mód"];
  for (const modes of Object.values(MODES)) {
    for (const [mode, modeValue] of Object.entries(modes)) {
      if (value === modeValue) {
        return mode;
      }
    }
  }
  return null;
}

const MODES = {
  "cs": {
    [MODE_OPEN_DATA]: "otevřená-data",
    [MODE_NON_PUBLIC]: "neveřejná-data",
    [MODE_HVD]: "datová-sada-s-vysokou-hodnotou"
  },
  "en": {
    [MODE_OPEN_DATA]: "open-data",
    [MODE_NON_PUBLIC]: "non-public",
    [MODE_HVD]: "high-value-dataset"
  },
};

/**
 * Called on component mount.
 * @param {*} component
 */
export async function onDatasetEditMounted(component) {
  const language = component.$vuetify.lang.current;
  const query = loadQueryArguments(component.$route.query);
  const serverFormData = loadServerData();

  //
  // First step is to try and create a dataset.
  //

  /** @type {any} */
  let next = {};
  try {
    if (serverFormData !== undefined) {
      next = await importFromPostData(
        language, serverFormData);
    } else if (isNotEmpty(query.dataset)) {
      next = await importDatasetByUrl(
        query.dataset, language);
    } else if (isNotEmpty(query.copyFromDataset)) {
      next = await copyDatasetByUrl(
        query.copyFromDataset, language, query.isLocalCatalog);
    } else if (isNotEmpty(query.file)) {
      next = await importFromFile(
        query.file, language, query.isLocalCatalog);
    } else {
      // We have no information about the dataset.
      if (query.mode === null) {
        // We do not know the mode, we need to let user choose.
        component.data.status = "select-mode";
        component.userSelectedModel = true;
        return;
      }
      // Else we can create a dataset.
      next = createEmptyDataset(query.isLocalCatalog, query.mode);
      component.userSelectedModel = false;
    }
  } catch (ex) {
    console.error("Can't create dataset.", ex);
    component.data.status = "error";
    return;
  }

  //
  // Now we have the data we need to continue with the initialization.
  //

  initializeWithData(component, query, next);
}

/**
 * Load input arguments for the dataset edit component.
 *
 * @param {*} query
 */
function loadQueryArguments(query) {
  /** @type {string | undefined} */
  const dataset =
    query["dataset"] ?? query["datová-sada"];
  /** @type {string | undefined} */
  const copyFromDataset =
    query["copy-from-dataset"] ?? query["kopírovat-z-datové-sady"];
  /** @type {string | undefined} */
  const file =
    query["file"] ?? query["soubor"];
  /** @type {string | undefined} */
  const postUrl =
    query.returnUrl ?? window?.serverPostData?.returnUrl;
  /** @type {boolean} */
  const isLocalCatalog =
    query["lkod"] === null;
  /** @type {null | "default" | "non-public" | "hvd"} */
  const mode = parseUrlMode(query);
  //
  return {
    "dataset": dataset,
    "copyFromDataset": copyFromDataset,
    "file": file,
    "postUrl": postUrl,
    "isLocalCatalog": isLocalCatalog,
    "mode": mode,
  };
}

function loadServerData() {
  return window?.serverPostData?.formData;
}

/**
 * @param {string | undefined} value
 */
function isNotEmpty(value) {
  return value !== undefined && value !== null && value.length > 0;
}

async function importDatasetByUrl(url, language) {
  const data = await importDatasetFromUrlWithDereference(url, language);
  return {
    "exportOptions": {
      "allowEdit": true,
      "type": EXPORT_EDIT,
    },
    "dataset": data.dataset,
    "distributions": data.distributions,
  };
}

async function copyDatasetByUrl(url, language, lkod) {
  const data = await importDatasetFromUrlWithDereference(url, language);
  return {
    "exportOptions": {
      "allowEdit": true,
      "type": lkod ? EXPORT_LKOD : EXPORT_NKOD,
    },
    "dataset": data.dataset,
    "distributions": data.distributions,
  };
}

async function importFromFile(url, language, lkod) {
  const data = await importDatasetFromUrl(url, language);
  // As we create new item we can get rid of the dataset IRI.
  data.dataset.iri = "";
  return {
    "exportOptions": {
      "type": lkod ? EXPORT_LKOD : EXPORT_NKOD,
      "allowEdit": false,
    },
    "dataset": data.dataset,
    "distributions": data.distributions,
  };
}

async function importFromPostData(language, serverFormData) {
  const data = await importFromJsonLd(serverFormData, language);
  return {
    "exportOptions": {
      "type": EXPORT_LKOD,
      "allowEdit": false,
    },
    "dataset": data.dataset,
    "distributions": data.distributions,
  };
}

/**
 * @param {boolean} isLocalCatalog
 * @param {"default" | "non-public" | "hvd"} mode
 * @returns
 */
function createEmptyDataset(isLocalCatalog, mode) {
  return {
    "exportOptions": {
      "type": isLocalCatalog ? EXPORT_LKOD : EXPORT_NKOD,
      "allowEdit": false,
    },
    "dataset": createDataset(mode),
    "distributions": [],
  };
}

function initializeWithData(component, query, next) {

  component.exportOptions = {
    ...component.exportOptions,
    ...next.exportOptions,
    "shouldPost": isNotEmpty(query.postUrl),
    "postUrl": query.postUrl,
  };

  setDataToComponent(component, next.dataset, next.distributions);

  // Update page title.
  document.title = component.$t(getPageTitle(
    component.data.dataset, component.exportOptions.type));

  initializeStepper(component);
}

function setDataToComponent(component, dataset, distributions) {
  component.data.dataset = dataset;
  component.data.distributions = distributions;
  component.ui.distribution = 0;
  // We need at least one distribution.
  if (component.data.distributions.length === 0) {
    const distribution = createDistribution();
    // If there is only one distribution we made it HVD by default.
    distribution.is_hvd = dataset.mode === MODE_HVD;
    component.data.distributions.push(distribution);
  }
  component.exportOptions.publisher = component.data.dataset.publisher;
  component.exportOptions.lkodIri = component.data.dataset.iri;
  fetchCodelistLabels(dataset, distributions, component.$vuetify.lang.current);
  // And we are ready to edit.
  component.data.status = "ready";
}

function getPageTitle(dataset, exportType) {
  const iri = dataset.iri;
  switch (exportType) {
    case EXPORT_NKOD:
      return "edit_page_title_new";
    case EXPORT_EDIT:
      if (!iri || iri.startsWith("https://data.gov.cz")) {
        return "edit_page_title_nkod";
      } else {
        return "edit_page_title_lkod";
      }
    case EXPORT_LKOD:
      return "edit_page_title_new_lkod";
  }
}

function initializeStepper(component) {
  if (component.$route.query.krok) {
    const step = parseInt(component.$route.query.krok, 10);
    component.ui.step = step;
    onStepperInput(component, step);
  }
}

/**
 * @param {*} component
 * @param {"default" | "non-public" | "hvd"} mode
 */
export function onSelectMode(component, mode) {
  // We need to repeat some of the work in onDatasetEditMounted function.
  const query = loadQueryArguments(component.$route.query);

  // Update URL query part to reflect user selection
  // and also support back / forward navigation.
  if (component.$vuetify.lang.current === "cs") {
    component.$router.push({
      "query": {
        ...component.$route.query,
        "mód": MODES.cs[mode],
      },
    });
  } else {
    component.$router.push({
      "query": {
        ...component.$route.query,
        "mode": MODES.en[mode],
      },
    });
  }

  if (component.data.dataset.mode === mode) {
    // We keep data if the old mode is same as the new mode.
    // So when user selected, navigated bach and now selected the same
    // option we keep the data as they are.
    component.data.status = "ready";
  } else {
    // Prepare and initialize with new data.
    const next = createEmptyDataset(query.isLocalCatalog, mode);
    initializeWithData(component, query, next);
  }
}

export function onStepperInput(component, value) {
  // This reacts on stepper change. We use this to turn on
  // forced validation for input fields.
  component.ui.step = value;
  // Firs is dataset validation, we employ it when user gets to
  // the second tab.
  if (!component.validation.dataset && value > 1) {
    component.validation.dataset = true;
    component.data.dataset.$validators.force = true;
  }
  // Second is distribution tab.
  if (value > 2) {
    if (!component.validation.distributions) {
      component.validation.distributions = true;
    }
    // We need to update distributions validations every time, as
    // user may moved back from the summary view to the distribution view
    // and add new distribution.
    component.data.distributions.forEach((distribution) => {
      distribution.$validators.force = true;
    });
  }
  if (parseInt(component.$route.query.krok) === value) {
    // Prevent navigation to the same location.
    return;
  }
  component.$router.push({
    "query": {
      ...component.$route.query,
      "krok": value,
    },
  });
}

export function areDistributionsValid(component) {
  if (!component.validation.distributions) {
    return true;
  }
  const distributions = component.data.distributions;
  for (let distribution of distributions) {
    if (!distribution.$validators.force) {
      // Newly added distribution.
      // User does not visited last step after adding this one, so we ignore it.
      continue;
    }
    if (!isDistributionValid(
      distributions, distribution, component.data.dataset.mode)) {
      return false;
    }
  }
  return true;
}

export function onAddDistribution(component) {
  component.data.distributions = [
    ...component.data.distributions,
    createDistribution(),
  ];
  component.ui.distribution = component.data.distributions.length - 1;
}

export function onDeleteDistribution(component) {
  const index = component.ui.distribution;
  component.data.distributions = [
    ...component.data.distributions.slice(0, index),
    ...component.data.distributions.slice(index + 1),
  ];
  component.ui.distribution = Math.min(
    component.ui.distribution,
    component.data.distributions.length - 1);
}

export async function onLoadFromFile(component, file) {
  try {
    const content = await loadFile(file);
    const data = await importFromJsonLd(
      content, component.$vuetify.lang.current);
    setDataToComponent(component, data.dataset, data.distributions);
  } catch (error) {
    console.error("Can't import file.", error);
    component.ui.uploadFailedVisible = true;
  }
}

/**
 * @param {File} file
 */
function loadFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = JSON.parse(reader.result);
        resolve(content);
      } catch (ex) {
        reject(ex);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

export async function onLoadFromUrl(component, url) {
  try {
    const data = await importDatasetFromUrl(
      url, component.$vuetify.lang.current);
    setDataToComponent(component, data.dataset, data.distributions);
  } catch (error) {
    console.error("Can't import url.", error);
    component.ui.uploadFailedVisible = true;
  }
}

export function onUpdateExport(component, event) {
  component.exportOptions = {
    ...component.exportOptions,
    ...event,
  };
  document.title = component.$t(getPageTitle(
    component.data.dataset, component.exportOptions.type));
}

export async function submitDatasetEdit(dataset, distributions, postUrl) {
  const formData = exportDatasetForPost(dataset, distributions);
  const userData = getUserData();
  postForm(postUrl, {
    "formData": JSON.stringify(formData),
    "userData": userData === undefined ? undefined : JSON.stringify(userData),
  });
}

function getUserData() {
  return window?.serverPostData?.userData;
}

export function downloadDatasetEdit(dataset, distributions, exportOptions) {
  const fileName = getDatasetEditDownloadFileName(dataset, exportOptions.type);
  let content;
  if (exportOptions.type === EXPORT_NKOD) {
    content = exportDatasetForNationalDataCatalog(dataset, distributions);
  } else {
    content = exportDatasetForLocalDataCatalog(
      dataset, distributions, {
      "lkodIri": exportOptions.lkodIri,
      "publisher": exportOptions.publisher,
    });
  }
  downloadAsJsonLd(fileName, content);
}

export function getDatasetEditDownloadFileName(dataset, exportType) {
  const exportNkod = isExportForNkod(dataset, exportType);
  if (exportNkod) {
    return "nkod-registrace.jsonld.txt";
  } else {
    const title = dataset.title_cs;
    return sanitizeTitleAsFileName(title) + ".jsonld";
  }
}

function sanitizeTitleAsFileName(title) {
  // Based on
  // https://github.com/parshap/node-sanitize-filename/blob/master/index.js
  const replacement = " ";
  let result = title
    .replace(/[/?<>\\:*|"]/g, replacement)
    /* eslint-disable no-control-regex */
    .replace(/[\x00-\x1f\x80-\x9f]/g, replacement)
    .replace(/^\.+$/, replacement)
    .replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i, replacement)
    .replace(/[. ]+$/, replacement);
  if (result.length > 255) {
    result = result.substring(0, 255);
  }
  return result;
}

export function isExportForNkod(dataset, exportType) {
  return exportType === EXPORT_NKOD ||
    (exportType === EXPORT_EDIT &&
      (!dataset.iri || dataset.iri.startsWith("https://data.gov.cz")));
}

export function areExportOptionsValid(exportOptions) {
  if (exportOptions.type !== EXPORT_LKOD) {
    // There is no additional validation.
    return true;
  }
  const iri = exportOptions.lkodIri;
  const publisher = exportOptions.publisher;
  return provided(iri) && url(iri) && provided(publisher) && url(publisher);
}
