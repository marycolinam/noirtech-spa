<template>
  <v-card class="product-card" elevation="0">
    <div class="product-image-wrapper">
      <router-link
        :to="`/producto/${product.id}`"
        class="product-image-link"
        :aria-label="`Ver ${product.title}`"
      >
        <img
          :src="imageSrc"
          :alt="product.title"
          class="product-image-native"
          loading="lazy"
          @error="handleImageError"
        />
      </router-link>

      <span v-if="discount >= 10" class="product-badge">-{{ discount }}%</span>

      <button
        class="favorite-button"
        :class="{ 'favorite-button--active': isFavorite }"
        type="button"
        :aria-pressed="isFavorite"
        @click="toggleFavorite"
      >
        {{ isFavorite ? "★ Guardado" : "☆ Guardar" }}
      </button>
    </div>

    <v-card-text class="product-card__content">
      <p class="product-category">
        {{ categoryLabel }}
        <span v-if="product.brand" class="product-brand">
          · {{ product.brand }}
        </span>
      </p>

      <h3 class="product-title">
        <router-link :to="`/producto/${product.id}`">
          {{ product.title }}
        </router-link>
      </h3>

      <RatingStars v-if="product.rating" :rating="product.rating" />

      <p class="product-description">
        {{ shortDescription }}
      </p>

      <PriceTag :product="product" />

      <p v-if="isLowStock" class="product-stock product-stock--low">
        ¡Últimas {{ product.stock }} unidades!
      </p>

      <div class="product-actions">
        <button
          type="button"
          class="add-to-cart-button"
          :disabled="isOutOfStock"
          @click="addToCart"
        >
          {{ isOutOfStock ? "Sin stock" : "Agregar al carrito" }}
        </button>

        <router-link :to="`/producto/${product.id}`" class="product-link">
          Ver detalle
        </router-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import PriceTag from "@/components/shop/PriceTag.vue";
import RatingStars from "@/components/shop/RatingStars.vue";
import { formatCategory, getProductImage } from "@/utils/format";

const FALLBACK_IMAGE = "https://placehold.co/600x400/png?text=NoirTech";

export default {
  name: "ProductCard",
  components: {
    PriceTag,
    RatingStars,
  },
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

      return getProductImage(this.product, FALLBACK_IMAGE);
    },

    categoryLabel() {
      const category = this.product.category?.name || this.product.category;
      return category ? formatCategory(category) : "Sin categoría";
    },

    discount() {
      return Math.round(Number(this.product.discountPercentage) || 0);
    },

    shortDescription() {
      if (!this.product.description) {
        return "Sin descripción disponible.";
      }

      return this.product.description.length > 90
        ? `${this.product.description.slice(0, 90)}...`
        : this.product.description;
    },

    isOutOfStock() {
      return this.product.stock === 0;
    },

    isLowStock() {
      return this.product.stock > 0 && this.product.stock <= 5;
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

    addToCart() {
      this.$store.dispatch("cart/addToCart", { product: this.product });
    },
  },
};
</script>
