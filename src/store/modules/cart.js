import { loadFromStorage } from "@/utils/storage";
import { getFinalPrice, getProductImage } from "@/utils/format";

export const CART_KEY = "noirtech_cart";
export const FREE_SHIPPING_FROM = 500;
export const SHIPPING_COST = 15;

const clampQuantity = (quantity, stock) => {
  const max = stock > 0 ? stock : 1;
  return Math.min(Math.max(1, quantity), max);
};

export default {
  namespaced: true,

  state: () => ({
    // Cada ítem guarda una copia de los datos necesarios del producto
    items: loadFromStorage(CART_KEY, []),
  }),

  mutations: {
    ADD_ITEM(state, { product, quantity }) {
      const existing = state.items.find((item) => item.id === product.id);
      const stock = Number(product.stock) || 1;

      if (existing) {
        existing.quantity = clampQuantity(existing.quantity + quantity, stock);
        return;
      }

      state.items.push({
        id: product.id,
        title: product.title,
        brand: product.brand || "",
        image: getProductImage(product, ""),
        price: getFinalPrice(product),
        stock,
        quantity: clampQuantity(quantity, stock),
      });
    },

    UPDATE_QUANTITY(state, { id, quantity }) {
      const item = state.items.find((cartItem) => cartItem.id === id);
      if (item) {
        item.quantity = clampQuantity(quantity, item.stock);
      }
    },

    REMOVE_ITEM(state, id) {
      state.items = state.items.filter((item) => item.id !== id);
    },

    CLEAR_CART(state) {
      state.items = [];
    },
  },

  actions: {
    addToCart({ commit }, { product, quantity = 1 }) {
      commit("ADD_ITEM", { product, quantity });
      commit("ui/SHOW_TOAST", `${product.title} se agregó al carrito`, {
        root: true,
      });
    },
    updateQuantity({ commit }, payload) {
      commit("UPDATE_QUANTITY", payload);
    },
    removeFromCart({ commit }, id) {
      commit("REMOVE_ITEM", id);
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
  },

  getters: {
    items(state) {
      return state.items;
    },

    itemsCount(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },

    subtotal(state) {
      const total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return Math.round(total * 100) / 100;
    },

    shipping(state, getters) {
      if (!state.items.length) return 0;
      return getters.subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
    },

    total(state, getters) {
      return Math.round((getters.subtotal + getters.shipping) * 100) / 100;
    },

    quantityInCart: (state) => (id) =>
      state.items.find((item) => item.id === id)?.quantity || 0,
  },
};
