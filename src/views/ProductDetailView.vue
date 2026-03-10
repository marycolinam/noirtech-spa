<template>
  <section class="detail-view">
    <div class="detail-header">
      <router-link to="/" class="back-link">← Volver al catálogo</router-link>
    </div>

    <div v-if="product" class="detail-card">
      <div class="detail-image-wrapper">
        <img
          :src="imageSrc"
          :alt="product.title"
          class="detail-image"
          @error="handleImageError"
        />
      </div>

      <div class="detail-content">
        <p class="detail-category">
          {{ product.category?.name || product.category || "Sin categoría" }}
        </p>

        <h1 class="detail-title">{{ product.title }}</h1>

        <p class="detail-price">${{ product.price }}</p>

        <p class="detail-description">
          {{ product.description || "Sin descripción disponible." }}
        </p>

        <button
          class="detail-favorite-button"
          :class="{ 'detail-favorite-button--active': isFavorite }"
          type="button"
          @click="toggleFavorite"
        >
          {{
            isFavorite ? "★ Guardado en favoritos" : "☆ Guardar en favoritos"
          }}
        </button>
      </div>
    </div>

    <div v-else class="feedback-state">
      <p>No se encontró el producto solicitado.</p>
    </div>
  </section>
</template>

<script>
const FALLBACK_IMAGE = "https://placehold.co/800x600/png?text=NoirTech";

export default {
  name: "ProductDetailView",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      imageErrored: false,
    };
  },

  computed: {
    product() {
      return this.$store.getters["products/products"].find(
        (item) => String(item.id) === String(this.id)
      );
    },

    imageSrc() {
      if (!this.product) return FALLBACK_IMAGE;

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

    isFavorite() {
      if (!this.product) return false;

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
      if (!this.product) return;

      this.$store.dispatch("favorites/toggleFavorite", this.product.id);
    },
  },
};
</script>
