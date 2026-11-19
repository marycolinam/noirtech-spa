import { getProducts } from "@/services/productService";

export default {
  namespaced: true,

  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  mutations: {
    SET_PRODUCTS(state, products) {
      state.items = products;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, message) {
      state.error = message;
    },
  },

  actions: {
    async fetchProducts({ state, commit }) {
      // Evita volver a pedir el catálogo si ya está cargado
      if (state.items.length || state.loading) return;

      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const data = await getProducts();
        commit("SET_PRODUCTS", data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        commit("SET_ERROR", "Ups, hubo un problema al cargar el catálogo.");
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

  getters: {
    products(state) {
      return state.items;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    productById: (state) => (id) =>
      state.items.find((item) => String(item.id) === String(id)),
  },
};
