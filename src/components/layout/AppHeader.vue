<template>
  <v-app-bar flat class="app-header">
    <div class="header-inner">
      <router-link to="/" class="brand-link"> NOIRTECH </router-link>

      <nav class="nav-links" aria-label="Navegación principal">
        <router-link to="/" class="nav-link">Catálogo</router-link>

        <router-link to="/favoritos" class="nav-link">
          Favoritos <span class="nav-badge">{{ favoritesCount }}</span>
        </router-link>

        <router-link to="/carrito" class="nav-link nav-link--cart">
          Carrito <span class="nav-badge">{{ cartCount }}</span>
        </router-link>

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
    cartCount() {
      return this.$store.getters["cart/itemsCount"];
    },
  },
};
</script>
