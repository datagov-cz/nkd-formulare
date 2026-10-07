<template>
  <v-container
    fluid
    grid-list-lg
    pa-0
  >
    <h2 class="headline">
      {{ $t('headline_distribution_license') }}
      <a
        href="https://data.gov.cz/otevřená-data/pro-poskytovatele/stanovení-podmínek-užití/"
        target="_blank"
        class="info_link"
      >
        <v-icon
          color="blue"
          size="1.5rem"
          class="info_icon"
        >
          help_outline
        </v-icon>
      </a>
    </h2>
    <!-- Terms of use -->
    <div>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md4
        >
          <v-select
            v-model="distribution.license_author_type"
            :items="AUTHOR_LICENSE_TYPES"
            :label="$t('license_author_type')"
            :item-text="$vuetify.lang.current"
            item-value="value"
            append-outer-icon="help_outline"
            prepend-icon="filter_1"
            required
            @click:append-outer="$h('license_author_type')"
          />
        </v-flex>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            id="distribution_license_author_name"
            v-model="distribution.license_author_name"
            :disabled="!isCcByAuthor"
            :required="isCcByAuthor"
            :label="$t('license_author_name')"
            :hint="$t('hint_license_author_name')"
            :error-messages="err_license_author_name"
            append-outer-icon="help_outline"
            prepend-icon="people"
            clearable
            @click:append-outer="$h('license_author_name')"
          />
        </v-flex>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            id="distribution_license_author_custom"
            v-model="distribution.license_author_custom"
            :disabled="!isCustomAuthor"
            :required="isCustomAuthor"
            :label="$t('license_author_custom')"
            :hint="$t('hint_license_author_custom')"
            :error-messages="err_license_author_custom"
            append-outer-icon="help_outline"
            prepend-icon="link"
            type="url"
            clearable
            @click:append-outer="$h('license_author_custom')"
          />
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md4
        >
          <v-select
            v-model="distribution.license_db_type"
            :items="DATABASE_AUTHOR_LICENSE_TYPES"
            :label="$t('license_db_type')"
            :item-text="$vuetify.lang.current"
            item-value="value"
            append-outer-icon="help_outline"
            prepend-icon="filter_2"
            required
            @click:append-outer="$h('license_db_type')"
          />
        </v-flex>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            id="distribution_license_db_name"
            v-model="distribution.license_db_name"
            :disabled="!isCcByDb"
            :required="isCcByDb"
            :label="$t('license_db_name')"
            :hint="$t('hint_license_db_name')"
            :error-messages="err_license_db_name"
            append-outer-icon="help_outline"
            prepend-icon="people"
            clearable
            @click:append-outer="$h('license_db_name')"
          />
        </v-flex>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            id="distribution_license_db_custom"
            v-model="distribution.license_db_custom"
            :disabled="!isCustomDb"
            :required="isCustomDb"
            :label="$t('license_db_custom')"
            :hint="$t('hint_license_db_custom')"
            :error-messages="err_license_db_custom"
            append-outer-icon="help_outline"
            prepend-icon="link"
            type="url"
            clearable
            @click:append-outer="$h('license_db_custom')"
          />
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md4
        >
          <v-select
            v-model="distribution.license_specialdb_type"
            :items="DATABASE_SPECIAL_LICENSE_TYPES"
            :label="$t('license_specialdb_type')"
            :item-text="$vuetify.lang.current"
            item-value="value"
            append-outer-icon="help_outline"
            prepend-icon="filter_3"
            required
            @click:append-outer="$h('license_specialdb_type')"
          />
        </v-flex>
        <v-flex
          xs12
          md4
        />
        <v-flex
          xs12
          md4
        >
          <v-text-field
            id="distribution_license_specialdb_custom"
            v-model="distribution.license_specialdb_custom"
            :disabled="!isCustomSpecialDb"
            :required="isCustomSpecialDb"
            :label="$t('license_specialdb_custom')"
            :hint="$t('hint_license_specialdb_custom')"
            :error-messages="err_license_specialdb_custom"
            append-outer-icon="help_outline"
            prepend-icon="link"
            type="url"
            clearable
            @click:append-outer="$h('license_specialdb_custom')"
          />
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md4
        >
          <v-select
            v-model="distribution.license_personal_type"
            :items="PERSONAL_DATA_TYPES"
            :label="$t('license_personal_type')"
            :item-text="$vuetify.lang.current"
            :error-messages="err_personal"
            item-value="value"
            append-outer-icon="help_outline"
            prepend-icon="filter_4"
            required
            @click:append-outer="$h('license_personal_type')"
          />
        </v-flex>
      </v-layout>
    </div>
    <v-divider />
    <!-- Type -->
    <h2 class="headline mt-2">
      {{ $t('headline_access') }}
    </h2>
    <!-- Legislation -->
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-select
          v-model="distribution.type"
          :items="DISTRIBUTION_TYPES"
          item-value="value"
          :item-text="$vuetify.lang.current"
          prepend-icon="sync_alt"
          append-outer-icon="help_outline"
          :hint="$t('hint_file_or_service')"
          :label="$t('distribution_type')"
          @click:append-outer="$h('file_or_service')"
        />
      </v-flex>
      <v-flex
        v-if="!isNonPublic"
        xs12
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            md6
          >
            <v-autocomplete
              id="distribution_legislation"
              v-model="distribution.legislation"
              :items="LEGISLATION_TYPES"
              :label="$t('distribution_legislation') + $t('optional')"
              :item-text="$vuetify.lang.current"
              prepend-icon="gavel"
              item-value="value"
              append-outer-icon="help_outline"
              chips
              multiple
              @click:append-outer="$h('distribution_legislation')"
            />
          </v-flex>
          <v-spacer />
          <v-flex
            v-if="isDatasetHvd"
            xs12
            md6
          >
            <v-input
              prepend-icon="gavel"
              append-icon="help_outline"
              :error-messages="err_is_hvd"
              @click:append="$h('distribution_hvd')"
            >
              <v-checkbox
                v-model="distribution.is_hvd"
                :label="$t('distribution_hvd')"
              />
            </v-input>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- File distribution -->
    <div v-if="isFileDistribution">
      <v-text-field
        id="distribution_url"
        v-model="distribution.url"
        :label="$t('distribution_url')"
        :hint="$t('hint_distribution_url')"
        :error-messages="err_url"
        prepend-icon="cloud_download"
        append-outer-icon="help_outline"
        required
        type="url"
        clearable
        @click:append-outer="$h('distribution_url')"
        @blur="distribution.url = trimEnd(distribution.url)"
      />
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md6
        >
          <app-solr-autocomplete-lazy
            id="distribution_format"
            v-model="distribution.format"
            :label="$t('distribution_format')"
            :no-data-prompt="$t('format_autocomplete_no_data')"
            :error-messages="err_format"
            prepend-icon="description"
            :code-list="FILE_TYPE"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <app-solr-autocomplete-lazy
            id="distribution_media_type"
            v-model="distribution.media_type"
            :label="$t('distribution_media_type')"
            :no-data-prompt="$t('media_type_autocomplete_no_data')"
            :error-messages="err_media_type"
            prepend-icon="description"
            :code-list="MEDIA_TYPES"
          />
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md6
        >
          <app-solr-autocomplete-lazy
            id="distribution_compress_format"
            v-model="distribution.compress_format"
            :label="$t('distribution_compress_format') + $t('optional')"
            :no-data-prompt="$t('media_type_autocomplete_no_data')"
            prepend-icon="description"
            :code-list="MEDIA_TYPES"
            clearable
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <app-solr-autocomplete-lazy
            id="distribution_package_format"
            v-model="distribution.package_format"
            :label="$t('distribution_package_format') + $t('optional')"
            :no-data-prompt="$t('media_type_autocomplete_no_data')"
            prepend-icon="description"
            :code-list="MEDIA_TYPES"
            clearable
          />
        </v-flex>
      </v-layout>
      <v-text-field
        id="distribution_schema"
        v-model="distribution.schema"
        :label="$t('distribution_schema_link') + $t('optional')"
        :hint="$t('hint_distribution_schema')"
        :error-messages="err_schema"
        prepend-icon="link"
        append-outer-icon="help_outline"
        type="url"
        clearable
        @click:append-outer="$h('distribution_schema_link')"
        @blur="distribution.schema = trimEnd(distribution.schema)"
      />
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md6
        >
          <v-text-field
            id="distribution_title_cs"
            v-model="distribution.title_cs"
            :hint="$t('hint_distribution_title')"
            :label="$t('distribution_title_cs') + $t('optional')"
            prepend-icon="label"
            append-outer-icon="help_outline"
            clearable
            @click:append-outer="$h('distribution_title')"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-text-field
            id="distribution_title_en"
            v-model="distribution.title_en"
            :hint="$t('hint_distribution_title')"
            :label="$t('distribution_title_en') + $t('optional')"
            prepend-icon="label"
            append-outer-icon="help_outline"
            clearable
            @click:append-outer="$h('distribution_title')"
          />
        </v-flex>
      </v-layout>
    </div>
    <!-- Data service -->
    <div v-else>
      <v-text-field
        id="endpoint_url"
        v-model="distribution.service_endpoint_url"
        :label="$t('service_endpoint_url')"
        :hint="$t('hint_endpoint_url')"
        :error-messages="err_endpoint"
        prepend-icon="cloud_download"
        append-outer-icon="help_outline"
        required
        type="url"
        clearable
        @click:append-outer="$h('endpoint_url')"
        @blur="distribution.service_endpoint_url = trimEnd(distribution.service_endpoint_url)"
      />
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md6
        >
          <v-text-field
            id="endpoint_description"
            v-model="distribution.service_description"
            :label="$t('service_endpoint_description')"
            :hint="$t('hint_endpoint_description')"
            :error-messages="err_description"
            prepend-icon="link"
            append-outer-icon="help_outline"
            required
            type="url"
            clearable
            @click:append-outer="$h('endpoint_description')"
            @blur="distribution.service_description = trimEnd(distribution.service_description)"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-text-field
            id="service_conforms_to"
            v-model="distribution.service_conforms_to"
            :label="$t('service_conforms_to') + $t('optional')"
            :hint="$t('hint_service_conforms_to')"
            :error-messages="err_conforms_to"
            prepend-icon="link"
            append-outer-icon="help_outline"
            type="url"
            clearable
            @click:append-outer="$h('service_conforms_to')"
            @blur="distribution.service_conforms_to = trimEnd(distribution.service_conforms_to)"
          />
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md6
        >
          <v-text-field
            id="distribution_title_cs"
            v-model="distribution.title_cs"
            :hint="$t('hint_distribution_title')"
            :label="$t('distribution_title_cs')"
            :error-messages="err_title_cs"
            prepend-icon="label"
            append-outer-icon="help_outline"
            clearable
            required
            @click:append-outer="$h('distribution_title')"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-text-field
            id="distribution_title_en"
            v-model="distribution.title_en"
            :hint="$t('hint_distribution_title')"
            :label="$t('distribution_title_en') + $t('optional')"
            prepend-icon="label"
            append-outer-icon="help_outline"
            clearable
            @click:append-outer="$h('distribution_title')"
          />
        </v-flex>
      </v-layout>
    </div>
    <!-- High Value Dataset with Data Service -->
    <div v-if="!isFileDistribution && isDatasetHvd">
      <!-- Contact point -->
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md6
        >
          <v-text-field
            id="contact_point_name"
            v-model="distribution.contact_point_name"
            :label="$t('contact_point_name') + $t('optional')"
            :hint="$t('hint_contact_point_name')"
            prepend-icon="person"
            append-outer-icon="help_outline"
            clearable
            @click:append-outer="$h('contact_point_name')"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-text-field
            id="contact_point_email"
            v-model="distribution.contact_point_email"
            :label="contactPointEmailLabel"
            :hint="$t('hint_contact_point_email')"
            :error-messages="err_contact_point_email"
            prepend-icon="alternate_email"
            append-outer-icon="help_outline"
            type="email"
            clearable
            @click:append-outer="$h('contact_point_email')"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-text-field
            id="contact_point_url"
            v-model="distribution.contact_point_url"
            :label="contactPointUrlLabel"
            :hint="$t('hint_contact_point_url')"
            :error-messages="err_contact_point_url"
            prepend-icon="link"
            append-outer-icon="help_outline"
            type="email"
            clearable
            @click:append-outer="$h('contact_point_url')"
          />
        </v-flex>
      </v-layout>
      <v-text-field
        id="documentation"
        v-model="distribution.documentation"
        :label="documentationLabel"
        :hint="$t('hint_distribution_documentation')"
        :error-messages="err_documentation"
        prepend-icon="link"
        append-outer-icon="help_outline"
        type="url"
        clearable
        @click:append-outer="$h('distribution_documentation')"
      />
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md4
        >
          <v-checkbox
            v-model="distribution.service_title_copy"
            :label="$t('copy_service_title')"
          />
        </v-flex>
        <v-flex
          v-if="!distribution.service_title_copy"
          xs12
          md4
        >
          <v-text-field
            id="service_title_cs"
            v-model="distribution.service_title_cs"
            :hint="$t('hint_service_title')"
            :label="$t('service_title_cs')"
            :error-messages="err_service_title_cs"
            prepend-icon="label"
            append-outer-icon="help_outline"
            clearable
            required
            @click:append-outer="$h('service_title')"
          />
        </v-flex>
        <v-flex
          v-if="!distribution.service_title_copy"
          xs12
          md4
        >
          <v-text-field
            id="service_title_en"
            v-model="distribution.service_title_en"
            :hint="$t('hint_service_title')"
            :label="$t('service_title_en') + $t('optional')"
            prepend-icon="label"
            append-outer-icon="help_outline"
            clearable
            @click:append-outer="$h('service_title')"
          />
        </v-flex>
      </v-layout>
    </div>
    <!-- Non public mode -->
    <v-layout
      v-if="isNonPublic"
      row
      wrap
    >
      <v-flex
        xs12
        md4
      >
        <v-select
          id="typy_obsahu"
          v-model="distribution.typy_obsahu"
          :items="TYPY_OBSAHU"
          :label="$t('typy_obsahu')"
          :item-text="$vuetify.lang.current"
          item-value="value"
          prepend-icon="category"
          append-outer-icon="help_outline"
          chips
          multiple
          @click:append-outer="$h('typy_obsahu')"
        />
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <v-select
          id="zpusob_sdileni"
          v-model="distribution.zpusob_sdileni"
          :items="ZPUSOBY_SDILENI"
          :label="$t('zpusob_sdileni')"
          :item-text="$vuetify.lang.current"
          item-value="value"
          prepend-icon="share"
          append-outer-icon="help_outline"
          chips
          @click:append-outer="$h('zpusob_sdileni')"
        />
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <v-select
          id="zpusoby_ziskani"
          v-model="distribution.zpusoby_ziskani"
          :items="ZPUSOBY_ZISKANI"
          :label="$t('zpusoby_ziskani')"
          :item-text="$vuetify.lang.current"
          item-value="value"
          prepend-icon="input"
          append-outer-icon="help_outline"
          chips
          multiple
          @click:append-outer="$h('zpusoby_ziskani')"
        />
      </v-flex>
    </v-layout>
    <div v-if="isNonPublic">
      <v-divider />
      <h2 class="headline mt-2">
        {{ $t('headline_zprostredkovava_sdileni') }}
      </h2>
      <v-layout
        v-for="(item, index) in distribution.zprostredkovava_sdileni"
        :key="index"
        row
        wrap
        align-center
      >
        <v-flex
          xs11
          md3
          row
          align-center
          class="flex-nowrap"
        >
          <div class="mx-3">
            <v-btn
              icon
              @click="removeZprostredkovavaSdileni(index)"
            >
              <v-icon color="error">
                delete
              </v-icon>
            </v-btn>
          </div>
          <v-select
            v-model="item.typ_obsahu"
            :items="TYPY_OBSAHU"
            :label="$t('typ_obsahu')"
            :item-text="$vuetify.lang.current"
            item-value="value"
            prepend-icon="category"
            append-outer-icon="help_outline"
            @click:append-outer="$h('typ_obsahu')"
          />
        </v-flex>
        <v-flex
          xs12
          md3
        >
          <v-select
            v-model="item.zpusob_sdileni"
            :items="ZPUSOBY_SDILENI"
            :label="$t('zpusob_sdileni')"
            :item-text="$vuetify.lang.current"
            item-value="value"
            prepend-icon="share"
            append-outer-icon="help_outline"
            @click:append-outer="$h('zpusob_sdileni')"
          />
        </v-flex>
        <v-flex
          xs12
          md2
        >
          <v-select
            v-model="item.zpusob_ziskani"
            :items="ZPUSOBY_ZISKANI"
            :label="$t('zpusob_ziskani')"
            :item-text="$vuetify.lang.current"
            item-value="value"
            prepend-icon="input"
            append-outer-icon="help_outline"
            @click:append-outer="$h('zpusob_ziskani')"
          />
        </v-flex>
        <v-flex
          xs12
          md4
        >
          <app-solr-autocomplete-lazy
            id="related_term"
            v-model="item.related_term"
            :label="$t('related_term')"
            :no-data-prompt="$t('related_term_autocomplete_no_data')"
            prepend-icon="link"
            append-outer-icon="help_outline"
            :code-list="RELATED_TERMS"
            :multiple="false"
            @click:append-outer="$h('related_term')"
          />
        </v-flex>
      </v-layout>
      <v-alert
        v-if="err_zprostredkovava_sdileni.length > 0"
        dense
        type="error"
        outlined
      >
        {{ err_zprostredkovava_sdileni[0] }}
      </v-alert>
      <v-btn
        text
        @click="addZprostredkovavaSdileni"
      >
        <v-icon>add</v-icon>
        {{ $t('add_zprostredkovava_sdileni') }}
      </v-btn>
    </div>
    <!-- -->
    <div v-if="canBeDeleted">
      <v-btn
        text
        @click="onDelete"
      >
        <v-icon color="error">
          delete
        </v-icon>
        {{ $t('delete_distribution') }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import SolrAutocompleteLazy from "./components/solr-autocomplete-lazy";
import {
  createDistributionValidators,
  createZprostredkovavaSdileni,
  DIST_TYPE_FILE,
  DIST_TYPE_SERVICE,
} from "../distribution-model";
import {
  authorLicenseTypes,
  dbAuthorLicenseTypes,
  dbSpecialLicenseTypes,
  personalDataTypes,
} from "./codelists/license";
import {
  FILE_TYPE, MEDIA_TYPES, RELATED_TERMS,
} from "./codelists/server-codelists";
import {
  legislationCodelist,
} from "./codelists/legislation";
import {
  typyObsahuUdaju,
  zpusobySdileniUdaju,
  zpusobyZiskaniUdaju,
} from "./codelists/non-public";
import {
  MODE_HVD, MODE_NON_PUBLIC,
} from "../dataset-model";
import {provided, trimEnd} from "../../app-service/validators";

export default {
  "name": "AppDistributionRecordEdit",
  "components": {
    "app-solr-autocomplete-lazy": SolrAutocompleteLazy,
  },
  "props": {
    /** Current distribution to edit. */
    "distribution": {"type": Object, "required": true},
    /** List of all distributions for validation. */
    "distributions": {"type": Array, "required": true},
    /** Dataset mode as it has impact on distribution edit options. */
    "mode": {"type": String, "required": true},
  },
  "data": () => ({
    // Section with codelist.
    "AUTHOR_LICENSE_TYPES": authorLicenseTypes,
    "DATABASE_AUTHOR_LICENSE_TYPES": dbAuthorLicenseTypes,
    "DATABASE_SPECIAL_LICENSE_TYPES": dbSpecialLicenseTypes,
    "PERSONAL_DATA_TYPES": personalDataTypes,
    "DISTRIBUTION_TYPES": [{
      "value": DIST_TYPE_FILE,
      "cs": "Soubor ke stažení",
      "en": "Downloadable file",
    },{
      "value": DIST_TYPE_SERVICE,
      "cs": "Datová služba",
      "en":"Data Service",
    }],
    "FILE_TYPE": FILE_TYPE,
    "MEDIA_TYPES": MEDIA_TYPES,
    "RELATED_TERMS": RELATED_TERMS,
    "TYPY_OBSAHU": typyObsahuUdaju,
    "ZPUSOBY_SDILENI": zpusobySdileniUdaju,
    "ZPUSOBY_ZISKANI": zpusobyZiskaniUdaju,
    "LEGISLATION_TYPES": legislationCodelist,
  }),
  "computed": {
    ...createDistributionValidators(),
    "canBeDeleted": function() {
      return this.distributions.length > 1;
    },
    "isDatasetHvd": function() {
      return this.mode === MODE_HVD;
    },
    "isCcByAuthor": function () {
      return this.distribution.license_author_type === "CC BY";
    },
    "isCustomAuthor": function () {
      return this.distribution.license_author_type === "CUSTOM";
    },
    "isCcByDb": function () {
      return this.distribution.license_db_type === "CC BY";
    },
    "isCustomDb": function () {
      return this.distribution.license_db_type === "CUSTOM";
    },
    "isCustomSpecialDb": function () {
      return this.distribution.license_specialdb_type === "CUSTOM";
    },
    "isFileDistribution": function() {
      return this.distribution.type === DIST_TYPE_FILE;
    },
    "isNonPublic": function () {
      return this.mode === MODE_NON_PUBLIC;
    },
    "contactPointEmailLabel": function() {
      if (!this.distribution.is_hvd ||
      provided(this.distribution.contact_point_url)) {
        return this.$t('contact_point_email') + this.$t('optional');
      } else {
        return this.$t('contact_point_email');
      }
    },
    "contactPointUrlLabel": function() {
      if (!this.distribution.is_hvd ||
      provided(this.distribution.contact_point_email)) {
        return this.$t('contact_point_url') + this.$t('optional');
      } else {
        return this.$t('contact_point_url');
      }
    },
    "documentationLabel": function() {
      if (!this.distribution.is_hvd) {
        return this.$t('distribution_documentation') + this.$t('optional');
      } else {
        return this.$t('distribution_documentation');
      }
    }
  },
  "methods": {
    "trimEnd": trimEnd,
    "onDelete": function () {
      this.$emit("delete");
    },
    "addZprostredkovavaSdileni": function () {
      this.distribution.zprostredkovava_sdileni.push(
        createZprostredkovavaSdileni());
    },
    /** @param {number} index */
    "removeZprostredkovavaSdileni": function (index) {
      this.distribution.zprostredkovava_sdileni.splice(index, 1);
    },
  },
};
</script>

<style scoped>
    .info_link {
        text-decoration-line: None;
    }
    .info_icon {
        vertical-align: text-top;
    }
</style>
