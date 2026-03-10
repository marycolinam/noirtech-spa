<template>
  <v-card class="product-card" elevation="0">
    <div class="product-image-wrapper">
      <img
        :src="imageSrc"
        :alt="product.title"
        class="product-image-native"
        @error="handleImageError"
      />

      <button
        class="favorite-button"
        :class="{ 'favorite-button--active': isFavorite }"
        type="button"
        @click="toggleFavorite"
      >
        {{ isFavorite ? "★ Guardado" : "☆ Guardar" }}
      </button>
    </div>

    <v-card-text class="product-card__content">
      <p class="product-category">
        {{ product.category?.name || product.category || "Sin categoría" }}
      </p>

      <h3 class="product-title">{{ product.title }}</h3>

      <p class="product-description">
        {{ shortDescription }}
      </p>

      <p class="product-price">${{ product.price }}</p>

      <router-link :to="`/producto/${product.id}`" class="product-link">
        Ver detalle
      </router-link>
    </v-card-text>
  </v-card>
</template>

<script>
const FALLBACK_IMAGE = "https://placehold.co/600x400/png?text=NoirTech";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageErrored: false,
    };
  },
  computed: {
    imageSrc() {
      if (this.imageErrored) {
        return FALLBACK_IMAGE;
      }

      return (
        this.product?.images?.[0] ||
        this.product?.category?.image ||
        this.product?.image ||
        FALLBACK_IMAGE
      );
    },

    shortDescription() {
      if (!this.product.description) {
        return "Sin descripción disponible.";
      }

      return this.product.description.length > 90
        ? `${this.product.description.slice(0, 90)}...`
        : this.product.description;
    },

    isFavorite() {
      return this.$store.getters["favorites/isFavorite"](this.product.id);
    },
  },
  methods: {
    handleImageError(event) {
      if (event.target.src !== FALLBACK_IMAGE) {
        this.imageErrored = true;
      }
    },

    toggleFavorite() {
      this.$store.dispatch("favorites/toggleFavorite", this.product.id);
    },
  },
};
</script>
