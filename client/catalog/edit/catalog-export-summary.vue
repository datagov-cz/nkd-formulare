<template>
  <v-container
    fluid
    grid-list-lg
    pa-2
  >
    <v-layout row>
      <v-flex v-if="!isValid">
        <v-alert
          :value="!isValid"
          outlined
          type="error"
        >
          {{ $t('catalog_summary_error') }}
        </v-alert>
      </v-flex>
      <v-flex v-if="isValid && commitByDownload">
        <v-alert
          :value="isValid"
          outlined
          type="success"
        >
          {{ $t('catalog_summary_download') }}
          <code>{{ nkodDatabox }}</code>.
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout
      row
      style="align-items: end"
    >
      <v-flex
        grow
        style="min-width: 0"
      >
        <h2
          class="display-1"
          style="overflow-wrap: anywhere; word-break: break-word"
        >
          {{ catalog.title_cs }}
          {{ catalog.title_en ? "| " + catalog.title_en : "" }}
        </h2>
      </v-flex>
      <v-btn
        :disabled="!isValid"
        color="success"
        class="mb-2 mx-2 wrapping-btn"
        style="flex: none"
        rounded
        outlined
        @click="onDownload"
      >
        <v-icon left>
          file_download
        </v-icon>
        <span>{{ submitButtonTitle }}</span>
      </v-btn>
    </v-layout>
    <v-list two-line>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon class="blue white--text">
            person
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ catalog.contact_point_name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('catalog_contact_point_name') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-avatar>
          <v-icon class="blue white--text">
            alternate_email
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ catalog.contact_point_email }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('catalog_contact_point_email') }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            ripple
            @click="sendEmail"
          >
            <v-icon color="blue">
              alternate_email
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-avatar>
          <v-icon class="blue white--text">
            category
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ typeToLabel(catalog.type, $vuetify.lang.current) }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('catalog_type') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-avatar>
          <v-icon class="blue white--text">
            link
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ catalog.endpoint }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('catalog_url') }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            ripple
            @click="openCatalog"
          >
            <v-icon color="blue">
              open_in_new
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider v-if="catalog.homepage" />
      <v-list-item
        v-if="catalog.homepage"
      >
        <v-list-item-avatar>
          <v-icon class="blue white--text">
            home
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ catalog.homepage }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('catalog_homepage') }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            ripple
            @click="openHomepage"
          >
            <v-icon color="blue">
              open_in_new
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider class="my-2" />
  </v-container>
</template>

<script>
import {configuration} from "../../client-configuration";
import {getCatalogTypeLabel} from "./codelists/catalog-type";
import {
  postOnSubmit,
  downloadCatalogEdit,
  submitCatalogEdit,
} from "./catalog-edit-service";

export default {
  "name": "AppCatalogExportSummary",
  "props": {
    "catalog": {"type": Object, "required": true},
    "isValid": {"type": Boolean, "required": true},
  },
  "computed": {
    "nkodDatabox": function () {
      return configuration.databox;
    },
    "commitByDownload": function () {
      return !postOnSubmit(this.$route);
    },
    "submitButtonTitle": function () {
      if (this.commitByDownload) {
        return this.$t("button_summary_edit_download");
      } else {
        return this.$t("button_summary_edit_post");
      }
    },
  },
  "methods": {
    "onDownload": function () {
      if (this.commitByDownload) {
        downloadCatalogEdit(this.catalog);
      } else {
        submitCatalogEdit(this.catalog, this.$route);
      }
    },
    "openCatalog": function () {
      window.open(this.catalog.iri);
    },
    "openHomepage": function () {
      window.open(this.catalog.homepage);
    },
    "sendEmail": function () {
      window.open("mailto:" + this.catalog.contact_point_email);
    },
    "typeToLabel": getCatalogTypeLabel,
  },
};
</script>

<style scoped>
  /* Let long labels wrap and grow the button instead of being clipped. */
  .wrapping-btn.v-btn {
    height: auto !important;
    min-height: 36px;
  }

  .wrapping-btn.v-btn >>> .v-btn__content {
    white-space: normal;
    padding: 6px 0;
    text-align: left;
  }
</style>
