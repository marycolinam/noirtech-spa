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
      <div class="catalog-filter catalog-filter--search">
        <label for="searchInput" class="filter-label">Buscar</label>
        <input
          id="searchInput"
          type="search"
          class="filter-select filter-input"
          placeholder="Nombre, marca o categoría"
          :value="search"
          @input="handleSearch"
        />
      </div>

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

      <div class="catalog-filter">
        <label for="sortSelect" class="filter-label">Ordenar por</label>
        <select
          id="sortSelect"
          :value="sort"
          class="filter-select"
          @change="handleSortChange"
        >
          <option
            v-for="option in sortOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
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
      <p v-if="search">
        No encontramos productos para "{{ search }}".
        <button type="button" class="inline-button" @click="clearFilters">
          Limpiar filtros
        </button>
      </p>
      <p v-else>No hay productos para la categoría seleccionada.</p>
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
import { SORT_OPTIONS } from "@/store/modules/filters";
import { formatCategory } from "@/utils/format";

export default {
  name: "ProductList",

  components: {
    ProductCard,
  },

  data() {
    return {
      sortOptions: SORT_OPTIONS,
    };
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
    search() {
      return this.$store.getters["filters/search"];
    },
    sort() {
      return this.$store.getters["filters/sort"] || "relevance";
    },
    categories() {
      return this.$store.getters.availableCategories;
    },
    filteredProducts() {
      return this.$store.getters.filteredProducts;
    },
  },

  mounted() {
    this.$store.dispatch("products/fetchProducts");
  },

  methods: {
    handleCategoryChange(event) {
      this.$store.dispatch("filters/setCategory", event.target.value);
    },
    handleSearch(event) {
      this.$store.dispatch("filters/setSearch", event.target.value);
    },
    handleSortChange(event) {
      this.$store.dispatch("filters/setSort", event.target.value);
    },
    clearFilters() {
      this.$store.dispatch("filters/resetFilters");
    },
    formatCategory,
  },
};
</script>
