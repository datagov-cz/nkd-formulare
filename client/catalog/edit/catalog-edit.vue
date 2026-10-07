<template>
  <v-main v-if="data.status === 'ready'">
    <v-container
      fluid
      grid-list-lg
      pa-0
    >
      <v-stepper
        :value="step"
        @change="onStepperInput"
      >
        <v-stepper-header>
          <v-stepper-step
            :complete="step > 1"
            :rules="[isCatalogValid]"
            :step="1"
            editable
          >
            {{ $t("step_catalog") }}
          </v-stepper-step>
          <v-divider />
          <v-stepper-step
            :step="2"
            editable
          >
            {{ $t("step_summary") }}
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content :step="1">
            <app-catalog :catalog="data.catalog" />
          </v-stepper-content>
          <v-stepper-content :step="2">
            <app-export
              :catalog="data.catalog"
              :is-valid="isCatalogValid()"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <div class="hidden-md-and-up">
        <app-step-navigation-mobile
          :value="step"
          @input="onStepperInput"
        />
      </div>
      <div class="hidden-sm-and-down">
        <app-step-navigation-desktop
          :value="step"
          @input="onStepperInput"
        />
      </div>
    </v-container>
  </v-main>
  <v-main v-else-if="data.status === 'error'">
    <app-import-failed :message="$t('cant_import_catalog')" />
  </v-main>
  <v-main v-else>
    <!-- No loading indicator. -->
  </v-main>
</template>

<script>
import CatalogEdit from "./catalog-edit-record";
import ExportSummary from "./catalog-export-summary";
import StepperNavigationMobile from "./components/step-navigation-mobile";
import StepperNavigationDesktop from "./components/step-navigation-desktop";
import ImportFailed from "../../app-service/import-failed";
import {isCatalogValid} from "../catalog-model";
import {
  onRouteChange,
  onCatalogEditMounted,
  onStepperInput,
} from "./catalog-edit-service";

export default {
  "name": "AppCatalogEdit",
  "components": {
    "app-step-navigation-mobile": StepperNavigationMobile,
    "app-step-navigation-desktop": StepperNavigationDesktop,
    "app-catalog" : CatalogEdit,
    "app-export": ExportSummary,
    "app-import-failed": ImportFailed,
  },
  "data": () => ({
    "data": {
      "status": "loading",
      "catalog": undefined,
      "error": undefined,
    },
    "step": 1,
    // True if the given entity should be validated. Used to skip validation
    // at the start.
    "validation": {
      "catalog": false,
    },
  }),
  "watch": {
    "$route" : function(location) {
      onRouteChange(this, location);
    },
  },
  "mounted": async function() {
    await onCatalogEditMounted(this);
  },
  "methods": {
    "isCatalogValid": function () {
      return !this.validation.catalog || isCatalogValid(this.data.catalog);
    },
    "onStepperInput": function (value) {
      onStepperInput(this, value);
    },
  },
};
</script>