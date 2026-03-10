<template>
  <v-app :theme="theme">
    <AppHeader :theme="theme" @toggle-theme="toggleTheme" />

    <v-main class="main-shell">
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      theme: "light",
    };
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      document.body.classList.toggle("theme-dark", this.theme === "dark");
    },
  },
};
</script>
