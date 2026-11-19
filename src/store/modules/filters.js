export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "name", label: "Nombre (A-Z)" },
];

export default {
  namespaced: true,

  state: () => ({
    category: "all",
    search: "",
    sort: "relevance",
  }),

  mutations: {
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    RESET_CATEGORY(state) {
      state.category = "all";
    },
    SET_SEARCH(state, search) {
      state.search = search;
    },
    SET_SORT(state, sort) {
      state.sort = sort;
    },
    RESET_FILTERS(state) {
      state.category = "all";
      state.search = "";
      state.sort = "relevance";
    },
  },

  actions: {
    setCategory({ commit }, category) {
      commit("SET_CATEGORY", category);
    },
    resetCategory({ commit }) {
      commit("RESET_CATEGORY");
    },
    setSearch({ commit }, search) {
      commit("SET_SEARCH", search);
    },
    setSort({ commit }, sort) {
      commit("SET_SORT", sort);
    },
    resetFilters({ commit }) {
      commit("RESET_FILTERS");
    },
  },

  getters: {
    selectedCategory(state) {
      return state.category;
    },
    search(state) {
      return state.search;
    },
    sort(state) {
      return state.sort;
    },
  },
};
