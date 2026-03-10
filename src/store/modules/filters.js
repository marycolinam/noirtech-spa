export default {
  namespaced: true,

  state: () => ({
    category: "all",
  }),

  mutations: {
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    RESET_CATEGORY(state) {
      state.category = "all";
    },
  },

  actions: {
    setCategory({ commit }, category) {
      commit("SET_CATEGORY", category);
    },
    resetCategory({ commit }) {
      commit("RESET_CATEGORY");
    },
  },

  getters: {
    selectedCategory(state) {
      return state.category;
    },
  },
};
