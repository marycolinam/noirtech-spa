export default {
  namespaced: true,

  state: () => ({
    items: [],
  }),

  mutations: {
    ADD_FAVORITE(state, productId) {
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }
    },

    REMOVE_FAVORITE(state, productId) {
      state.items = state.items.filter((id) => id !== productId);
    },
  },

  actions: {
    toggleFavorite({ state, commit }, productId) {
      if (state.items.includes(productId)) {
        commit("REMOVE_FAVORITE", productId);
      } else {
        commit("ADD_FAVORITE", productId);
      }
    },
  },

  getters: {
    favoriteItems(state) {
      return state.items;
    },

    favoritesCount(state) {
      return state.items.length;
    },

    isFavorite: (state) => (productId) => {
      return state.items.includes(productId);
    },
  },
};
