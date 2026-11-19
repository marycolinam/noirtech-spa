export default {
  namespaced: true,

  state: () => ({
    toast: {
      visible: false,
      message: "",
    },
  }),

  mutations: {
    SHOW_TOAST(state, message) {
      state.toast = { visible: true, message };
    },
    HIDE_TOAST(state) {
      state.toast = { ...state.toast, visible: false };
    },
  },

  getters: {
    toast(state) {
      return state.toast;
    },
  },
};
