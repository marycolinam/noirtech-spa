<template>
  <section class="page-view">
    <div class="section-heading">
      <p class="eyebrow">Guardados</p>
      <h1 class="page-title">Favoritos</h1>
    </div>

    <div v-if="loading" class="feedback-state">
      <p>Cargando productos...</p>
    </div>

    <div v-else-if="products.length === 0" class="feedback-state empty-state">
      <p>Todavía no tienes productos favoritos.</p>
      <router-link to="/" class="primary-button">Explorar catálogo</router-link>
    </div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script>
import ProductCard from "@/components/products/ProductCard.vue";

export default {
  name: "FavoritesView",
  components: {
    ProductCard,
  },
  computed: {
    loading() {
      return this.$store.getters["products/loading"];
    },
    products() {
      return this.$store.getters.favoriteProducts;
    },
  },
};
</script>
