import { MODE_NON_PUBLIC } from "../../dataset-model";
import {
  exportDatasetToJsonLd,
} from "./export-dataset-to-jsonld";
import {
  exportDatasetToNonPublicJsonLd,
} from "./export-dataset-to-nonpublic-jsonld";
import { isNotEmpty } from "./utilities";

/**
 * Export a dataset so it can be send to the National Data Catalog.
 * All IRIs as set to be blank nodes.
 * Information about the publisher is removed.
 *
 * @param {import("../../dataset-model").Dataset} dataset
 * @param {import("../../distribution-model").Distribution[]} distributions
 */
export function exportDatasetForNationalDataCatalog(dataset, distributions) {
  // Create a copy so we do not modify the inputs.
  dataset = { ...dataset };
  // There is no IRI and no publisher.
  dataset.iri = "_:ds";
  dataset.publisher = undefined;

  // Generate new IRIs.

  const selectDistributionIri = () => undefined;

  const selectServiceIri = () => undefined;

  return exportDataset(
    dataset, distributions, selectDistributionIri, selectServiceIri);
}

/**
 * Export a dataset so it can be used in a Local Data Catalog.
 * Use IRIs from export options or try to preserve IRIs from the dataset.
 *
 * @param {import("../../dataset-model").Dataset} dataset
 * @param {import("../../distribution-model").Distribution[]} distributions
 * @param {{lkodIri?: string, publisher?: string}} options
 */
export function exportDatasetForLocalDataCatalog(
  dataset, distributions, options) {
  // Create a copy so we do not modify the inputs.
  dataset = { ...dataset };
  // Apply export options.
  if (isNotEmpty(options.lkodIri)) {
    dataset.iri = options.lkodIri;
  }
  if (isNotEmpty(options.publisher)) {
    dataset.publisher = options.publisher;
  }

  // Generate new IRIs, non-public datasets use different IRIs.

  const isNonPublic = dataset.mode === MODE_NON_PUBLIC;

  /**
   * @param {*} _
   * @param {number} index
   * @returns
   */
  const selectDistributionIri = (_, index) => isNonPublic
    ? dataset.iri + "/datová-rozhraní/" + (index + 1)
    : dataset.iri + "/distribuce/" + index;

  /**
   * @param {*} _
   * @param {string} distributionIri
   * @returns
   */
  const selectServiceIri = (_, distributionIri) => isNonPublic
    ? distributionIri + "/služba/1"
    : distributionIri + "/přístupová-služba";

  return exportDataset(
    dataset, distributions, selectDistributionIri, selectServiceIri);
}

/**
 * Export data for POST, in this case we want to preserve IRIs where possible.
 * Without a change this should produce the same output as was input for import.
 * @param {import("../../dataset-model").Dataset} dataset
 * @param {import("../../distribution-model").Distribution[]} distributions
 */
export function exportDatasetForPost(dataset, distributions) {
  // Create a copy so we do not modify the inputs.
  dataset = { ...dataset };

  // Use existing or nothing (blank nodes).

  const selectDistributionIri =
    (/** @type {{ iri: string; }} */distribution) =>
      distribution.iri ?? undefined;

  const selectServiceIri =
    (/** @type {{ service_iri: string; }} */ distribution) =>
      distribution.service_iri ?? undefined;

  return exportDataset(
    dataset, distributions, selectDistributionIri, selectServiceIri);
}

/**
 * Non-public datasets are exported using a different schema.
 *
 * @param {import("../../dataset-model").Dataset} dataset
 * @param {import("../../distribution-model").Distribution[]} distributions
 * @param {(distribution: *, index: number) => ?string | undefined} distributionIri
 * @param {(service: *, distribution: string) => string | undefined} serviceIri
 */
function exportDataset(dataset, distributions, distributionIri, serviceIri) {
  if (dataset.mode === MODE_NON_PUBLIC) {
    return exportDatasetToNonPublicJsonLd(
      dataset, distributions, distributionIri, serviceIri);
  } else {
    return exportDatasetToJsonLd(
      dataset, distributions, distributionIri, serviceIri);
  }
}
