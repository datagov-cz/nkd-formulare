<template>
  <v-dialog
    :value="visible"
    width="500"
    @input="onInput"
  >
    <v-card>
      <v-toolbar
        dark
        color="error"
      >
        <v-toolbar-title>
          {{ $t('import_dialog_failed_title') }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          @click="close"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="pt-6">
        {{ $t('cant_import_dataset') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="close"
        >
          {{ $t('import_dialog_failed_close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  "name": "UploadFailedDialog",
  "props": {
    "visible": { "type": Boolean, "required": true },
  },
  "methods": {
    "close": function () {
      this.$emit("close");
    },
    /**
     * Called when the dialog is closed from outside, e.g. by the escape key.
     * @param {boolean} value
     */
    "onInput": function (value) {
      if (!value) {
        this.close();
      }
    },
  },
};
</script>
