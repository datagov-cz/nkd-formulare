const CONTEXT =
  "https://ofn.gov.cz/dcat-ap-cz-rozhraní-katalogů-dat/"
  + "2026-09-23/katalog/kontext.jsonld";

export function exportCatalogToJsonLd(catalog) {
  const output = {
    "@context": CONTEXT,
    "@type": ["Katalog", catalog.type],
    "přístupový_bod": catalog.endpoint,
    "název": asLangMap(catalog.title_cs, catalog.title_en),
    ...exportContactPoint(catalog),
  };
  if (isNotEmpty(catalog.homepage)) {
    output["domovská_stránka"] = catalog.homepage;
  }
  return output;
}

function asLangMap(value_cs, value_en) {
  const result = {};
  if (isNotEmpty(value_cs)) {
    result["cs"] = value_cs;
  }
  if (isNotEmpty(value_en)) {
    result["en"] = value_en;
  }
  return result;
}

function isNotEmpty(value) {
  return !isEmpty(value);
}

function isEmpty(value) {
  return value === undefined || value === null || value === "";
}

function exportContactPoint(catalog) {
  if (isEmpty(catalog.contact_point_name) &&
    isEmpty(catalog.contact_point_email)) {
    return {};
  }
  const result = {
    "typ": "Organizace",
  };
  if (isNotEmpty(catalog.contact_point_name)) {
    result["jméno"] = asLangMap(catalog.contact_point_name);
  }
  if (isNotEmpty(catalog.contact_point_email)) {
    result["e-mail"] = "mailto:" + catalog.contact_point_email;
  }
  return {
    "kontaktní_bod": result,
  };
}
