import { createStore } from "vuex";
import products from "./modules/products";
import filters from "./modules/filters";
import favorites, { FAVORITES_KEY } from "./modules/favorites";
import cart, { CART_KEY } from "./modules/cart";
import orders, { LAST_ORDER_KEY } from "./modules/orders";
import ui from "./modules/ui";
import { saveToStorage } from "@/utils/storage";
import { getFinalPrice } from "@/utils/format";

const normalizeText = (value) => {
  if (!value) return "";

  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
};

const getCategoryName = (product) => product.category?.name || product.category;

const sorters = {
  "price-asc": (a, b) => getFinalPrice(a) - getFinalPrice(b),
  "price-desc": (a, b) => getFinalPrice(b) - getFinalPrice(a),
  rating: (a, b) => (b.rating || 0) - (a.rating || 0),
  name: (a, b) => a.title.localeCompare(b.title),
};

// Guarda en localStorage el carrito, los favoritos y el último pedido
const persistencePlugin = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith("cart/")) {
      saveToStorage(CART_KEY, state.cart.items);
    }
    if (mutation.type.startsWith("favorites/")) {
      saveToStorage(FAVORITES_KEY, state.favorites.items);
    }
    if (mutation.type.startsWith("orders/")) {
      saveToStorage(LAST_ORDER_KEY, state.orders.lastOrder);
    }
  });
};

export default createStore({
  modules: {
    products,
    filters,
    favorites,
    cart,
    orders,
    ui,
  },

  plugins: [persistencePlugin],

  getters: {
    availableCategories(state) {
      const rawCategories = state.products.items
        .map(getCategoryName)
        .filter(Boolean);

      const uniqueNormalized = [...new Set(rawCategories.map(normalizeText))];

      return uniqueNormalized.sort((a, b) => a.localeCompare(b));
    },

    filteredProducts(state) {
      const selectedCategory = normalizeText(state.filters.category);
      const search = normalizeText(state.filters.search);

      let result = state.products.items;

      if (selectedCategory && selectedCategory !== "all") {
        result = result.filter(
          (product) =>
            normalizeText(getCategoryName(product)) === selectedCategory
        );
      }

      if (search) {
        result = result.filter((product) =>
          normalizeText(
            `${product.title} ${product.brand || ""} ${getCategoryName(
              product
            )}`
          ).includes(search)
        );
      }

      const sorter = sorters[state.filters.sort];

      return sorter ? [...result].sort(sorter) : result;
    },

    favoriteProducts(state) {
      return state.products.items.filter((product) =>
        state.favorites.items.includes(product.id)
      );
    },
  },
});
