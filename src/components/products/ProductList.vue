<template>
  <section class="product-list-section">
    <div class="section-heading">
      <p class="eyebrow">Selección curada</p>
      <h1 class="section-title">Catálogo de productos</h1>
      <p class="section-subtitle">
        Tecnología con una estética minimalista, moderna y funcional.
      </p>
    </div>

    <div v-if="!loading && !error && products.length" class="catalog-toolbar">
      <div class="catalog-filter">
        <label for="categoryFilter" class="filter-label">
          Filtrar por categoría
        </label>

        <select
          id="categoryFilter"
          :value="selectedCategory"
          class="filter-select"
          @change="handleCategoryChange"
        >
          <option value="all">Todas</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ formatCategory(category) }}
          </option>
        </select>
      </div>

      <p class="results-count">{{ filteredProducts.length }} producto(s)</p>
    </div>

    <div v-if="loading" class="feedback-state">
      <p>Cargando productos...</p>
    </div>

    <div v-else-if="error" class="feedback-state feedback-state--error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="feedback-state">
      <p>No hay productos para la categoría seleccionada.</p>
    </div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductList",

  components: {
    ProductCard,
  },

  computed: {
    products() {
      return this.$store.getters["products/products"];
    },
    loading() {
      return this.$store.getters["products/loading"];
    },
    error() {
      return this.$store.getters["products/error"];
    },
    selectedCategory() {
      return this.$store.getters["filters/selectedCategory"];
    },
    categories() {
      return this.$store.getters.availableCategories;
    },
    filteredProducts() {
      return this.$store.getters.filteredProducts;
    },
  },

  mounted() {
    this.$store.dispatch("filters/resetCategory");
    this.$store.dispatch("products/fetchProducts");
  },

  methods: {
    handleCategoryChange(event) {
      this.$store.dispatch("filters/setCategory", event.target.value);
    },
    formatCategory(category) {
      if (!category) return "";

      return category
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
  },
};
</script>
