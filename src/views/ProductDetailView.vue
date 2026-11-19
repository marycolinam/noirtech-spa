<template>
  <section class="detail-view">
    <div class="detail-header">
      <router-link to="/" class="back-link">← Volver al catálogo</router-link>
    </div>

    <template v-if="product">
      <div class="detail-card">
        <div class="detail-gallery">
          <div class="detail-image-wrapper">
            <img
              :src="imageSrc"
              :alt="product.title"
              class="detail-image"
              @error="handleImageError"
            />
          </div>

          <div v-if="gallery.length > 1" class="detail-thumbs">
            <button
              v-for="(image, index) in gallery"
              :key="image"
              type="button"
              class="detail-thumb"
              :class="{ 'detail-thumb--active': index === activeImage }"
              :aria-label="`Ver imagen ${index + 1}`"
              @click="selectImage(index)"
            >
              <img :src="image" :alt="`${product.title} imagen ${index + 1}`" />
            </button>
          </div>
        </div>

        <div class="detail-content">
          <p class="detail-category">
            {{ categoryLabel }}
            <span v-if="product.brand"> · {{ product.brand }}</span>
          </p>

          <h1 class="detail-title">{{ product.title }}</h1>

          <div v-if="product.rating" class="detail-rating">
            <RatingStars :rating="product.rating" />
            <span class="detail-reviews-count">
              ({{ reviews.length }} reseña(s))
            </span>
          </div>

          <PriceTag :product="product" large />

          <p class="detail-stock" :class="stockClass">{{ stockLabel }}</p>

          <p class="detail-description">
            {{ product.description || "Sin descripción disponible." }}
          </p>

          <div v-if="!isOutOfStock" class="detail-purchase">
            <QuantitySelector v-model="quantity" :max="maxQuantity" />

            <button
              type="button"
              class="add-to-cart-button add-to-cart-button--large"
              :disabled="maxQuantity === 0"
              @click="addToCart"
            >
              Agregar al carrito
            </button>
          </div>

          <p v-if="inCart > 0" class="detail-in-cart">
            Ya tienes {{ inCart }} en tu
            <router-link to="/carrito">carrito</router-link>.
          </p>

          <button
            class="detail-favorite-button"
            :class="{ 'detail-favorite-button--active': isFavorite }"
            type="button"
            :aria-pressed="isFavorite"
            @click="toggleFavorite"
          >
            {{
              isFavorite ? "★ Guardado en favoritos" : "☆ Guardar en favoritos"
            }}
          </button>

          <ul class="detail-info">
            <li v-if="product.shippingInformation">
              <strong>Envío:</strong> {{ product.shippingInformation }}
            </li>
            <li v-if="product.warrantyInformation">
              <strong>Garantía:</strong> {{ product.warrantyInformation }}
            </li>
            <li v-if="product.returnPolicy">
              <strong>Devoluciones:</strong> {{ product.returnPolicy }}
            </li>
            <li v-if="product.sku"><strong>SKU:</strong> {{ product.sku }}</li>
          </ul>
        </div>
      </div>

      <section v-if="reviews.length" class="detail-section">
        <h2 class="detail-section__title">Reseñas</h2>
        <ul class="reviews-list">
          <li
            v-for="(review, index) in reviews"
            :key="`${review.reviewerName}-${index}`"
            class="review"
          >
            <div class="review__header">
              <strong>{{ review.reviewerName }}</strong>
              <RatingStars :rating="review.rating" :show-value="false" />
            </div>
            <p class="review__comment">{{ review.comment }}</p>
            <p class="review__date">{{ formatDate(review.date) }}</p>
          </li>
        </ul>
      </section>

      <section v-if="relatedProducts.length" class="detail-section">
        <h2 class="detail-section__title">También te puede interesar</h2>
        <div class="products-grid products-grid--compact">
          <ProductCard
            v-for="related in relatedProducts"
            :key="related.id"
            :product="related"
          />
        </div>
      </section>
    </template>

    <div v-else-if="loading" class="feedback-state">
      <p>Cargando producto...</p>
    </div>

    <div v-else class="feedback-state">
      <p>No se encontró el producto solicitado.</p>
    </div>
  </section>
</template>

<script>
import PriceTag from "@/components/shop/PriceTag.vue";
import RatingStars from "@/components/shop/RatingStars.vue";
import QuantitySelector from "@/components/shop/QuantitySelector.vue";
import ProductCard from "@/components/products/ProductCard.vue";
import { formatCategory } from "@/utils/format";

const FALLBACK_IMAGE = "https://placehold.co/800x600/png?text=NoirTech";

export default {
  name: "ProductDetailView",

  components: {
    PriceTag,
    RatingStars,
    QuantitySelector,
    ProductCard,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      imageErrored: false,
      activeImage: 0,
      quantity: 1,
    };
  },

  created() {
    // Si se entra directo a la URL del detalle, el catálogo aún no está cargado
    this.$store.dispatch("products/fetchProducts");
  },

  computed: {
    loading() {
      return this.$store.getters["products/loading"];
    },

    product() {
      return this.$store.getters["products/productById"](this.id);
    },

    categoryLabel() {
      const category = this.product?.category?.name || this.product?.category;
      return category ? formatCategory(category) : "Sin categoría";
    },

    gallery() {
      if (!this.product) return [];
      if (this.product.images?.length) return this.product.images;
      return [this.product.thumbnail || this.product.image].filter(Boolean);
    },

    imageSrc() {
      if (!this.product || this.imageErrored) return FALLBACK_IMAGE;

      return this.gallery[this.activeImage] || FALLBACK_IMAGE;
    },

    reviews() {
      return this.product?.reviews || [];
    },

    isOutOfStock() {
      return this.product?.stock === 0;
    },

    inCart() {
      if (!this.product) return 0;
      return this.$store.getters["cart/quantityInCart"](this.product.id);
    },

    maxQuantity() {
      const stock = Number(this.product?.stock) || 1;
      return Math.max(0, stock - this.inCart);
    },

    stockLabel() {
      const stock = this.product?.stock;
      if (stock === 0) return "Sin stock";
      if (stock <= 5) return `¡Últimas ${stock} unidades!`;
      return `En stock (${stock} disponibles)`;
    },

    stockClass() {
      const stock = this.product?.stock;
      if (stock === 0) return "detail-stock--out";
      if (stock <= 5) return "detail-stock--low";
      return "detail-stock--ok";
    },

    relatedProducts() {
      if (!this.product) return [];

      return this.$store.getters["products/products"]
        .filter(
          (item) =>
            item.category === this.product.category &&
            item.id !== this.product.id
        )
        .slice(0, 3);
    },

    isFavorite() {
      if (!this.product) return false;

      return this.$store.getters["favorites/isFavorite"](this.product.id);
    },
  },

  watch: {
    id() {
      // Al navegar entre productos relacionados se reinicia la vista
      this.activeImage = 0;
      this.quantity = 1;
      this.imageErrored = false;
    },
    maxQuantity(value) {
      if (this.quantity > value && value > 0) {
        this.quantity = value;
      }
    },
  },

  methods: {
    selectImage(index) {
      this.activeImage = index;
      this.imageErrored = false;
    },

    handleImageError(event) {
      if (event.target.src !== FALLBACK_IMAGE) {
        this.imageErrored = true;
      }
    },

    toggleFavorite() {
      if (!this.product) return;

      this.$store.dispatch("favorites/toggleFavorite", this.product.id);
    },

    addToCart() {
      if (!this.product || this.maxQuantity === 0) return;

      this.$store.dispatch("cart/addToCart", {
        product: this.product,
        quantity: this.quantity,
      });
      this.quantity = 1;
    },

    formatDate(value) {
      if (!value) return "";
      return new Date(value).toLocaleDateString("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>
