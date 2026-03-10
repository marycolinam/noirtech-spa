<template>
  <v-app-bar flat class="app-header">
    <div class="header-inner">
      <router-link to="/" class="brand-link"> NOIRTECH </router-link>

      <nav class="nav-links">
        <router-link to="/" class="nav-link">Catálogo</router-link>
        <span class="nav-link">Favoritos: {{ favoritesCount }}</span>

        <button
          class="theme-toggle"
          type="button"
          @click="$emit('toggle-theme')"
        >
          {{ theme === "light" ? "Modo oscuro" : "Modo claro" }}
        </button>
      </nav>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  emits: ["toggle-theme"],
  computed: {
    favoritesCount() {
      return this.$store.getters["favorites/favoritesCount"];
    },
  },
};
</script>
