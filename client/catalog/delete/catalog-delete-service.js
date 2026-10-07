import {importCatalogFromJsonLd, importCatalogFromUrlWithProxy} from "../import-catalog";
import {downloadAsJsonLd} from "../../app-service/download";
import {exportCatalogToJsonLdForDelete} from "./export-catalog-delete";
import {postForm} from "../../app-service/http";

export async function onCatalogDeleteMounted(component) {
  document.title = component.$t("catalog_delete_page_title");
  await loadCatalog(component);
}

async function loadCatalog(component) {
  // We first try to load from a POST data.
  const serverFormData = getFormData();
  if (serverFormData !== undefined) {
    try {
      await loadCatalogFromServerData(component, serverFormData);
      component.status = "ready";
    } catch (error) {
      console.error("Can't import catalog.", error);
      component.status = "error";
    }
    return;
  }
  // Next we try to load from a URL query.
  const url = component.$route.query.catalog;
  if (url === undefined) {
    component.status = "error";
    return;
  }
  try {
    component.catalog = await importCatalogFromUrlWithProxy(url);
    component.status = "ready";
  } catch (error) {
    component.status = "error";
    console.error("Can't import catalog.", error);
  }
}

function getFormData() {
  return window?.serverPostData?.formData;
}

async function loadCatalogFromServerData(component, serverFormData) {
  const language = component.$vuetify.lang.current;
  const data = await importCatalogFromJsonLd(serverFormData, language);
  component.catalog = data;
}

export function postOnSubmit($route) {
  const url = getReturnUrl($route);
  return url !== undefined && url !== null && url.length > 0;
}

function getReturnUrl($route) {
  return $route.query.returnUrl ?? window?.serverPostData?.returnUrl;
}

export async function submitCatalogDelete(catalog, $route) {
  const postUrl = getReturnUrl($route);
  const formData = exportCatalogToJsonLdForDelete(catalog);
  const userData = getUserData();

  postForm(postUrl, {
    "formData": JSON.stringify(formData),
    "userData": userData === undefined ? undefined : JSON.stringify(userData),
  });
}

function getUserData() {
  return window?.serverPostData?.userData;
}

export function downloadCatalogDelete(catalog) {
  const jsonld = exportCatalogToJsonLdForDelete(catalog);
  downloadAsJsonLd("nkod-odstranění-katalogu.jsonld.txt", jsonld);
}
