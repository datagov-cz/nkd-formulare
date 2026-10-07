import { importCatalogFromJsonLd } from "../import-catalog";
import { createCatalog } from "../catalog-model";
import { downloadAsJsonLd } from "../../app-service/download";
import { exportCatalogToJsonLd } from "./catalog-export-edit";
import { postForm } from "../../app-service/http";

export async function onCatalogEditMounted(component) {
  document.title = component.$t("catalog_edit_page_title");
  await loadCatalog(component);
}

async function loadCatalog(component) {
  // We first try to load from a POST data.
  const serverFormData = getFormData();
  if (serverFormData !== undefined) {
    try {
      await loadCatalogFromServerData(component, serverFormData);
      component.data.status = "ready";
    } catch (error) {
      console.error("Can't import catalog.", error);
      component.data.status = "error";
    }
    return;
  }
  // There are no data.
  component.data.status = "ready";
  component.data.catalog = createCatalog();
}

function getFormData() {
  return window?.serverPostData?.formData;
}

export function postOnSubmit($route) {
  const url = getReturnUrl($route);
  return url !== undefined && url !== null && url.length > 0;
}

function getReturnUrl($route) {
  return $route.query.returnUrl ?? window?.serverPostData?.returnUrl;
}

async function loadCatalogFromServerData(component, serverFormData) {
  const language = component.$vuetify.lang.current;
  const data = await importCatalogFromJsonLd(serverFormData, language);
  component.data.catalog = data;
}

export function onRouteChange(component, location) {
  if (location.query.krok === undefined) {
    component.step = 1;
    return;
  }
  const value = parseInt(location.query.krok);
  if (value !== component.step) {
    component.step = value;
  }
}

export function onStepperInput(component, value) {
  component.step = value;
  if (!component.validation.catalog && value > 1) {
    component.validation.catalog = true;
    component.data.catalog.$validators.force = true;
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

export async function submitCatalogEdit(catalog, $route) {
  const postUrl = getReturnUrl($route);
  const formData = exportCatalogToJsonLd(catalog);
  const userData = getUserData();

  postForm(postUrl, {
    "formData": JSON.stringify(formData),
    "userData": userData === undefined ? undefined : JSON.stringify(userData),
  });
}

function getUserData() {
  return window?.serverPostData?.userData;
}

export function downloadCatalogEdit(catalog) {
  const jsonld = exportCatalogToJsonLd(catalog);
  downloadAsJsonLd("nkod-registrace-katalogu.jsonld.txt", jsonld);
}
