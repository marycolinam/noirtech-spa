<template>
  <v-app :theme="theme">
    <AppHeader :theme="theme" @toggle-theme="toggleTheme" />

    <v-main class="main-shell">
      <router-view />
    </v-main>

    <AppFooter />

    <transition name="toast">
      <div v-if="toast.visible" class="app-toast" role="status">
        <span>{{ toast.message }}</span>
        <router-link to="/carrito" class="toast-link" @click="hideToast">
          Ver carrito
        </router-link>
      </div>
    </transition>
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
  computed: {
    toast() {
      return this.$store.getters["ui/toast"];
    },
  },
  watch: {
    // Cada aviso nuevo se oculta solo después de unos segundos
    "toast.message"() {
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(this.hideToast, 2500);
    },
    "toast.visible"(visible) {
      if (visible) {
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(this.hideToast, 2500);
      }
    },
  },
  created() {
    // El catálogo se carga una sola vez para toda la app
    this.$store.dispatch("products/fetchProducts");
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      document.body.classList.toggle("theme-dark", this.theme === "dark");
    },
    hideToast() {
      this.$store.commit("ui/HIDE_TOAST");
    },
  },
};
</script>
