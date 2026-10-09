<template>
  <v-container
    fluid
    grid-list-lg
    pa-0
  >
    <v-layout row>
      <v-flex>
        <v-alert
          v-if="!areDataValid || !areOptionsValid"
          outlined
          type="error"
        >
          <div v-if="!areDataValid">
            {{ $t("summary_error") }}
          </div>
          <div v-if="!areOptionsValid">
            {{ $t("export_options_error") }}
          </div>
        </v-alert>
        <v-alert
          v-else-if="exportOptions.shouldPost"
          outlined
          type="success"
        >
          {{ $t("summary_post_export") }}
        </v-alert>
        <v-alert
          v-else-if="exportOptions.type === EXPORT_LKOD"
          outlined
          type="success"
        >
          {{ $t("summary_lkod_download") }}
        </v-alert>
        <v-alert
          v-else
          outlined
          type="success"
        >
          {{ $t("summary_nkod_download") }}
          <code>{{ nkodDatabox }}</code>.
          {{ $t("summary_nkod_download_tail") }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <h2 class="display-1">
        {{ dataset.title_cs }}
        {{ dataset.title_en ? "| " + dataset.title_en : "" }}
      </h2>
      <v-spacer />
      <v-btn
        class="hidden-xs-only"
        rounded
        outlined
        :color="downloadColor"
        @click="onSubmit"
      >
        <v-icon left>
          file_download
        </v-icon>
        <span>{{ downloadLabel }}</span>
      </v-btn>
      <v-btn
        v-if="!exportOptions.shouldPost"
        :color="optionsColor"
        icon
        @click="openOptions"
      >
        <v-icon>
          settings
        </v-icon>
      </v-btn>
    </v-layout>
    <p class="subheading multiline">
      {{ dataset.description_cs }}
      <span v-if="dataset.description_en">
        {{ dataset.description_en }}
      </span>
    </p>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        lg6
      >
        <v-list
          two-line
          subheader
        >
          <v-list-item
            v-if="dataset.dataset_themes.length
              || dataset.dataset_custom_themes.length"
          >
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                category
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <span
                  v-for="(theme, index) in dataset.dataset_themes"
                  :key="theme"
                >
                  {{ index > 0 ? ", " : "" }}
                  {{ datasetThemeToLabel(theme, $vuetify.lang.current) }}
                </span>
                <span
                  v-if="dataset.dataset_themes.length
                    && dataset.dataset_custom_themes.length"
                >, </span>
                <span
                  v-for="(theme, index) in dataset.dataset_custom_themes"
                  :key="theme"
                >
                  {{ index > 0 ? ", " : "" }}
                  {{ theme }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("dataset_theme") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="dataset.dataset_themes.length" />
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                snooze
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ frequencyToLabel(
                  dataset.accrual_periodicity, $vuetify.lang.current)
                }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("accrual_periodicity") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item
            v-if="keywords.length"
          >
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                short_text
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <span
                  v-for="(keyword, index) in keywords"
                  :key="keyword + ':' + index"
                >
                  {{ index > 0 ? ", " : "" }}
                  {{ keyword }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("keywords") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="keywords.length" />
          <v-list-item
            v-if="dataset.contact_point_name"
          >
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                person
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ dataset.contact_point_name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("contact_point_name") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="dataset.contact_point_name"
          />
          <v-list-item v-if="dataset.contact_point_email">
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                alternate_email
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ dataset.contact_point_email }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("contact_point_email") }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                ripple
                @click="openUrl('mailto:' + dataset.contact_point_email)"
              >
                <v-icon color="blue">
                  alternate_email
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="dataset.contact_point_email" />
          <v-list-item
            v-if="dataset.documentation"
          >
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                description
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ dataset.documentation }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("documentation") }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                ripple
                @click="openDocumentation"
              >
                <v-icon color="blue">
                  open_in_new
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="dataset.documentation" />
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                place
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <span
                  v-for="(item, index) in dataset.spatial"
                  :key="item.url"
                >
                  {{ index > 0 ? ", " : "" }}
                  <span>
                    {{ spatialToLabel(item) }}
                  </span>
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("dataset_spatial") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item
            v-if="dataset.temporal_start || dataset.temporal_end"
          >
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                calendar_today
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ dataset.temporal_start }}
                <span v-if="dataset.temporal_end">
                  - {{ dataset.temporal_end }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("temporal") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="dataset.temporal_start || dataset.temporal_end"
          />
          <v-list-item
            v-if="dataset.temporal_resolution"
          >
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                calendar_today
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ dataset.temporal_resolution }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("temporal_resolution") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="dataset.temporal_resolution"
          />
          <v-list-item
            v-if="dataset.spatial_resolution_meters"
          >
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                zoom_out_map
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ dataset.spatial_resolution_meters }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("spatial_resolution_meters") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="dataset.spatial_resolution_meters"
          />
          <v-list-item
            v-if="dataset.themes.length"
          >
            <v-list-item-avatar>
              <v-icon class="blue white--text">
                euro_symbol
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <span
                  v-for="(theme, index) in dataset.themes"
                  :key="theme"
                >
                  {{ index > 0 ? "," : "" }}
                  {{ themeToLabel(theme) }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("themes") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="dataset.themes.length" />
        </v-list>
      </v-flex>
      <v-flex
        xs12
        lg6
      >
        <v-layout
          row
          wrap
        >
          <app-distribution-card
            v-for="(item, index) in distributions"
            :key="index"
            :distribution="item"
            :codelist="codelist"
          />
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="my-2" />
    <v-layout row>
      <v-spacer />
      <v-tooltip
        bottom
        :disabled="exportOptions.shouldPost"
      >
        <template #activator="{ on }">
          <v-btn
            rounded
            :color="downloadColor"
            outlined
            v-on="on"
            @click="onSubmit"
          >
            <v-icon left>
              file_download
            </v-icon>
            <span>{{ downloadLabel }}</span>
          </v-btn>
        </template>
        <span v-if="!areDataValid || !areOptionsValid">
          <div v-show="!areDataValid">
            {{ $t("summary_error") }}
          </div>
          <div v-show="!areOptionsValid">
            {{ $t("export_options_error") }}
          </div>
        </span>
        <span v-else-if="exportOptions.type === EXPORT_LKOD">
          {{ $t("summary_lkod_download") }}
        </span>
        <span v-else>{{ $t("summary_nkod_download") }}
          <code>{{ nkodDatabox }}</code>.
        </span>
      </v-tooltip>
      <v-btn
        v-if="!exportOptions.shouldPost"
        :color="optionsColor"
        icon
        @click="openOptions"
      >
        <v-icon>
          settings
        </v-icon>
      </v-btn>
    </v-layout>
    <app-export-type-dialog
      :visible="optionsDialogOpen"
      :export-options="exportOptions"
      @close="closeOptions"
      @save="updateExport"
    />
  </v-container>
</template>

<script>
import {configuration} from "../../client-configuration";
import DistributionCard from "./components/distribution-card";
import ExportTypeDialog from "./components/export-type-dialog";
import {getLabelFromStore} from "./codelists/local-storage";
import {RUIAN, EUROVOC, FREQUENCY, DATASET_THEME} from "./codelists/server-codelists";
import {getSpatialLabel} from "./codelists/spatial";
import {EXPORT_NKOD, EXPORT_EDIT, EXPORT_LKOD} from "../dataset-model";
import {
  submitDatasetEdit,
  downloadDatasetEdit,
} from "./dataset-edit-service";

export default {
  "name": "AppExportSummary",
  "components": {
    "app-distribution-card": DistributionCard,
    "app-export-type-dialog": ExportTypeDialog,
  },
  "props": {
    "dataset": {"type": Object, "required": true},
    "distributions": {"type": Array, "required": true},
    "areDataValid": {"type": Boolean, "required": true},
    "areOptionsValid": {"type": Boolean, "required": true},
    "codelist": {"type": Object, "required": true},
    "exportOptions": {"type": Object, "required": true},
  },
  "data": () => ({
    "EXPORT_LKOD": EXPORT_LKOD,
    "optionsDialogOpen": false,
  }),
  "computed": {
    "nkodDatabox": function () {
      return configuration.databox;
    },
    "keywords": function() {
      return [...this.dataset.keywords_cs, ...this.dataset.keywords_en];
    },
    "downloadColor": function () {
      if (this.areDataValid && this.areOptionsValid) {
        return "success";
      } else {
        return "error";
      }
    },
    "optionsColor" : function () {
      if (this.areOptionsValid) {
        return "";
      } else {
        return "error";
      }
    },
    "downloadLabel": function () {
      return this.$t(exportButtonLabel(
        this.dataset.iri,
        this.exportOptions.type,
        this.exportOptions.shouldPost,
        this.areDataValid && this.areOptionsValid));
    },
  },
  "methods": {
    "ruianLabel": function (iri) {
      return getLabelFromStore(
        this.codelist, RUIAN, iri, this.$vuetify.lang.current);
    },
    "onSubmit": function () {
      if (this.exportOptions.shouldPost) {
        submitDatasetEdit(
          this.dataset, this.distributions, this.exportOptions.postUrl);
      } else {
        downloadDatasetEdit(
          this.dataset, this.distributions, this.exportOptions);
      }
    },
    "openDocumentation": function () {
      openUrl(this.dataset.documentation);
    },
    "openRuian": function () {
      openUrl(this.dataset.ruian);
    },
    "datasetThemeToLabel": function (iri) {
      return getLabelFromStore(
        this.codelist, DATASET_THEME, iri, this.$vuetify.lang.current);
    },
    "frequencyToLabel": function (iri) {
      return getLabelFromStore(
        this.codelist, FREQUENCY, iri, this.$vuetify.lang.current);
    },
    "themeToLabel": function (iri) {
      return getLabelFromStore(
        this.codelist, EUROVOC, iri, this.$vuetify.lang.current);
    },
    "spatialToLabel": function(item) {
      return getSpatialLabel(this.codelist, item, this.$vuetify.lang.current);
    },
    "openUrl": function (url) {
      openUrl(url);
    },
    "openOptions": function() {
      this.optionsDialogOpen = true;
    },
    "updateExport": function (event) {
      this.$emit("update-export", event);
      this.optionsDialogOpen = false;
    },
    "closeOptions": function() {
      this.optionsDialogOpen = false;
    },
  },
};

function openUrl(uri) {
  window.open(uri);
}

function exportButtonLabel(iri, exportType, postData, isDataValid) {
  if (postData) {
    if (isDataValid) {
      return "button_export_dataset_post";
    } else {
      return "button_export_dataset_post_invalid";
    }
  }
  if (!isDataValid) {
    return "download_invalid";
  }
  switch (exportType) {
  default:
  case EXPORT_NKOD:
    return "download_new_nkod";
  case EXPORT_EDIT:
    if (!iri || iri.startsWith("https://data.gov.cz")) {
      return  "download_edit_nkod";
    } else {
      return "download_edit_lkod";
    }
  case EXPORT_LKOD:
    return "download_new_lkod";
  }
}

</script>

<style scoped>
  .multiline {
    white-space: pre-line;
  }
</style>
