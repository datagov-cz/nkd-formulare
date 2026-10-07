<template>
  <v-main v-if="data.status === 'initial'">
    <!-- There is nothing by default here. -->
  </v-main>
  <v-main v-else-if="data.status === 'select-mode'">
    <app-dataset-landing
      @select-mode="selectMode"
      @load-from-file="loadFromFile"
      @load-from-url="loadFromUrl"
    />
    <app-upload-failed-dialog
      :visible="ui.uploadFailedVisible"
      @close="uploadFailedClose"
    />
  </v-main>
  <v-main v-else-if="data.status === 'loading'">
    <!-- We do not use loading indicator as of now. -->
  </v-main>
  <v-main v-else-if="data.status === 'ready'">
    <!-- The main section here we need to deal with a stepper. -->
    <v-stepper
      :value="ui.step"
      @change="onStepperInput"
    >
      <v-stepper-header>
        <v-stepper-step
          :complete="ui.step > 1"
          :rules="[isDatasetValid]"
          :step="1"
          editable
        >
          {{ $t("step_dataset") }}
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          :complete="ui.step > 2"
          :rules="[areDistributionsValid]"
          :step="2"
          editable
        >
          {{ $t("step_distribution") }}
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          :step="3"
          editable
        >
          {{ $t("step_download") }}
        </v-stepper-step>
      </v-stepper-header>
      <v-alert
        dense
        outlined
        color="info"
        class="mx-6 mt-2 mb-0"
      >
        <v-icon
          size="24"
          color="primary"
          class="mb-2"
        >
          {{ mode_icon }}
        </v-icon>
        {{ $t(mode_message) }}
      </v-alert>
      <v-stepper-items>
        <v-stepper-content :step="1">
          <app-dataset
            ref="datasetComponent"
            :dataset="data.dataset"
            :codelist="data.codelist"
            :distributions="data.distributions"
          />
        </v-stepper-content>
        <v-stepper-content :step="2">
          <app-distribution-selector
            v-model="ui.distribution"
            :distributions="data.distributions"
            :mode="data.dataset.mode"
            @add="addDistribution"
          />
          <app-distribution
            ref="distributionComponent"
            :distribution="data.distributions[ui.distribution]"
            :distributions="data.distributions"
            :mode="data.dataset.mode"
            @delete="deleteDistribution"
          />
        </v-stepper-content>
        <v-stepper-content :step="3">
          <app-export-summary
            :dataset="data.dataset"
            :are-data-valid="isDatasetValid() && areDistributionsValid()"
            :are-options-valid="areOptionsValid()"
            :distributions="data.distributions"
            :codelist="data.codelist"
            :export-options="exportOptions"
            @update-export="updateExport"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <div class="hidden-md-and-up">
      <app-step-navigation-mobile
        :value="ui.step"
        @input="onStepperInput"
      />
    </div>
    <div class="hidden-sm-and-down">
      <app-step-navigation-desktop
        :value="ui.step"
        @input="onStepperInput"
      />
    </div>
  </v-main>
  <v-main v-else-if="data.status === 'error'">
    <app-import-failed :message="$t('cant_import_dataset')" />
  </v-main>
</template>

<script>
import DatasetEdit from "./dataset-record-edit";
import DistributionEdit from "./distribution-record-edit";
import DistributionSelector from "./components/distribution-selector";
import StepperNavigationMobile from "./components/step-navigation-mobile";
import StepperNavigationDesktop from "./components/step-navigation-desktop";
import ExportSummary from "./dataset-export-summary";
import UploadFailedDialog from "./components/upload-failed-dialog";
import ImportFailed from "../../app-service/import-failed";
import DatasetLanding from "./dataset-landing-view.vue";
import {
  EXPORT_NKOD,
  isDatasetValid,
  MODE_HVD,
  MODE_NON_PUBLIC,
} from "../dataset-model";
import * as service from "./dataset-edit-service";
import {getStore} from "./codelists/local-storage";
import {areExportOptionsValid} from "./dataset-edit-service";

export default {
  "name": "AppDatasetEdit",
  "components": {
    "app-dataset": DatasetEdit,
    "app-distribution": DistributionEdit,
    "app-distribution-selector": DistributionSelector,
    "app-step-navigation-mobile": StepperNavigationMobile,
    "app-step-navigation-desktop": StepperNavigationDesktop,
    "app-export-summary": ExportSummary,
    "app-upload-failed-dialog": UploadFailedDialog,
    "app-import-failed": ImportFailed,
    "app-dataset-landing": DatasetLanding,
  },
  "data": () => ({
    "data": {
      "codelist": getStore(),
      /** @type {"initial" | "select-mode" | "loading" | "ready" | "error"} */
      "status": "initial",
      /** Initial value is temporary and to be replaced during loading. */
      "dataset": { "mode": null },
      "distributions": [],
      "error": undefined,
    },
    "exportOptions": {
      "type": EXPORT_NKOD,
      /** If true allows EXPORT_EDIT option in export dialog. */
      "allowEdit": false,
      /** Dataset IRI set by the export dialog for EXPORT_LKOD. */
      "lkodIri": "",
      /** Publisher set in the export dialog. */
      "publisher": "",
      /** True if we post on submit action and disable export dialog. */
      "postData": false,
      /** If postData is true, then this specify the URL to post data to. */
      "postUrl": undefined,
    },
    "ui": {
      "step": 1,
      /** Index of selected distribution. */
      "distribution": 0,
      /** True to show upload failed dialog. */
      "uploadFailedVisible": false,
      /** True when mode was selected by the user. */
      "userSelectedModel": false,
    },
    "validation": {
      /**
       * If true then show dataset validation, else dataset validation
       * errors are ignored.
       */
      "dataset": false,
      /**
       * If true then show distributions validation, else distributions
       * validation errors are ignored.
       */
      "distributions": false,
    },
  }),
  "computed": {
    "mode_icon": function() {
      switch (this.data.dataset.mode) {
      case MODE_HVD:
        return "workspace_premium";
      case MODE_NON_PUBLIC:
        return "lock";
      default:
        return "public";
      }
    },
    "mode_message": function () {
      switch (this.data.dataset.mode) {
      case MODE_HVD:
        return "mode_notice_hvd";
      case MODE_NON_PUBLIC:
        return "mode_notice_non_public";
      default:
        return "mode_notice_default";
      }
    },
  },
  "watch": {
    "$route": function (location) {
      service.onRouteChange(this, location);
    },
  },
  "mounted": async function () {
    await service.onDatasetEditMounted(this);
  },
  "methods": {
    /** @param {"hvd" | "default" | "non-public"} mode */
    "selectMode": function(mode) {
      service.onSelectMode(this, mode);
    },
    "addDistribution": function () {
      service.onAddDistribution(this);
    },
    "deleteDistribution": function () {
      service.onDeleteDistribution(this);
    },
    "onStepperInput": function (value) {
      service.onStepperInput(this, value);
    },
    "loadFromFile": async function (file) {
      await service.onLoadFromFile(this, file);
    },
    "loadFromUrl": async function(url) {
      await service.onLoadFromUrl(this, url);
    },
    "updateExport": function (event) {
      service.onUpdateExport(this, event);
    },
    "uploadFailedClose": function() {
      this.ui.uploadFailedVisible = false;
    },
    //
    "areOptionsValid": function () {
      return areExportOptionsValid(this.exportOptions);
    },
    "isDatasetValid": function () {
      return !this.validation.dataset ||
        isDatasetValid(this.data.dataset, this.data.distributions);
    },
    "areDistributionsValid": function () {
      return service.areDistributionsValid(this);
    },
  },
};

</script>
