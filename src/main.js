import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";

import "./styles/main.scss";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#ffffff",
          surface: "#ffffff",
          primary: "#111111",
          secondary: "#666666",
          accent: "#000000",
          error: "#b00020",
        },
      },
      dark: {
        dark: true,
        colors: {
          background: "#0f0f0f",
          surface: "#171717",
          primary: "#ffffff",
          secondary: "#bdbdbd",
          accent: "#ffffff",
          error: "#ff6b6b",
        },
      },
    },
  },
});

createApp(App).use(store).use(router).use(vuetify).mount("#app");
