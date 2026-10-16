import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import VueRouter from "vue-router";

import {prepareLabels, LabelsPlugin} from "../app-service/labels";
import {HelpPlugin} from "../app-service/help-service";
import {initializeTheme, registerListener} from "../app-service/theme";

// Some updates for dark mode.
import "../dark-mode-fix.css";

// Wrapping buttons that grow instead of clipping long labels.
import "../wrapping-button.css";

// Fonts used by Vuetify instead of CDN.
import "@mdi/font/css/materialdesignicons.css";

export function initializeApplication(application, language, labels) {
  // Vue.config.productionTip = false;
  Vue.use(VueRouter);
  Vue.use(LabelsPlugin);
  Vue.use(HelpPlugin);

  Vue.use(Vuetify);

  const options = {
    "lang": {
      "locales": {[language]: prepareLabels(labels)},
      "current": language,
    },
    "theme": {
      "dark": initializeTheme(),
    },
  };

  const vuetify = new Vuetify(options);

  /* eslint-disable no-new */
  new Vue({
    "vuetify": vuetify,
    "el": "#app",
    "router": new VueRouter({"mode": "history"}),
    "render": (h) => h(application),
  });

  registerListener(vuetify);
}
