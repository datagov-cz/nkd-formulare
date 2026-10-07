import {importFromJsonLd} from "../import-dataset";
import {importDatasetFromUrlWithDereference} from "../import-dataset";
import {exportDatasetToJsonLdForDelete} from "./export-dataset-delete";
import {downloadAsJsonLd} from "../../app-service/download";
import {postForm} from "../../app-service/http";

export async function onDatasetDeleteMounted(component) {
  document.title = component.$t("delete_page_title");
  await loadDataset(component);
}

async function loadDataset(component) {
  // We first try to load from a POST data.
  const serverFormData = getFormData();
  if (serverFormData !== undefined) {
    try {
      await loadDatasetFromServerData(component, serverFormData);
      component.status = "ready";
    } catch (ex) {
      console.error("Can't import dataset.", ex);
      component.status = "error";
    }
    return;
  }
  // Next we try to load from a URL query.
  const datasetUrl = component.$route.query.dataset;
  if (datasetUrl === undefined) {
    console.error("Missing dataset URL.");
    component.status = "error";
    return;
  }
  try {
    const data = await importDatasetFromUrlWithDereference(
      component.$route.query.dataset,
      component.$vuetify.lang.current);
    component.dataset = data.dataset;
    component.status = "ready";
  } catch(ex) {
    console.error("Can't import dataset from URL.", ex);
    component.status = "error";
  }
}

function getFormData() {
  return window?.serverPostData?.formData;
}

async function loadDatasetFromServerData(component, serverFormData) {
  const language = component.$vuetify.lang.current;
  const data = await importFromJsonLd(serverFormData, language);
  component.dataset = data.dataset;
}

export function postOnSubmit($route) {
  const url = getReturnUrl($route);
  return url !== undefined && url !== null && url.length > 0;
}

function getReturnUrl($route) {
  return $route.query.returnUrl ?? window?.serverPostData?.returnUrl;
}

export async function submitDatasetDelete(dataset, $route) {
  const postUrl = getReturnUrl($route);
  const formData = exportDatasetToJsonLdForDelete(dataset);
  const userData = getUserData();

  postForm(postUrl, {
    "formData": JSON.stringify(formData),
    "userData": userData === undefined ? undefined : JSON.stringify(userData),
  });
}

function getUserData() {
  return window?.serverPostData?.userData;
}

export function downloadDatasetDelete(dataset) {
  const jsonld = exportDatasetToJsonLdForDelete(dataset);
  downloadAsJsonLd("nkod-odstranění-datové-sady.jsonld.txt", jsonld);
}
