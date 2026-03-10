import { createStore } from "vuex";
import products from "./modules/products";
import filters from "./modules/filters";
import favorites from "./modules/favorites";

const normalizeCategory = (category) => {
  if (!category) return "";

  return String(category).trim().toLowerCase();
};

export default createStore({
  modules: {
    products,
    filters,
    favorites,
  },

  getters: {
    availableCategories(state) {
      const rawCategories = state.products.items
        .map((product) => product.category?.name || product.category)
        .filter(Boolean);

      const uniqueNormalized = [
        ...new Set(rawCategories.map(normalizeCategory)),
      ];

      return uniqueNormalized.sort((a, b) => a.localeCompare(b));
    },

    filteredProducts(state) {
      const selectedCategory = normalizeCategory(state.filters.category);

      if (selectedCategory === "all" || !selectedCategory) {
        return state.products.items;
      }

      return state.products.items.filter((product) => {
        const categoryName = normalizeCategory(
          product.category?.name || product.category
        );

        return categoryName === selectedCategory;
      });
    },
  },
});
