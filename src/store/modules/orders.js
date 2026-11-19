import { loadFromStorage } from "@/utils/storage";

export const LAST_ORDER_KEY = "noirtech_last_order";

const createOrderNumber = () =>
  `NT-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;

export default {
  namespaced: true,

  state: () => ({
    lastOrder: loadFromStorage(LAST_ORDER_KEY, null),
  }),

  mutations: {
    SET_LAST_ORDER(state, order) {
      state.lastOrder = order;
    },
  },

  actions: {
    // Pedido simulado: no hay pago real ni backend
    placeOrder({ commit, rootGetters, dispatch }, customer) {
      const order = {
        number: createOrderNumber(),
        date: new Date().toISOString(),
        customer,
        items: rootGetters["cart/items"].map((item) => ({ ...item })),
        subtotal: rootGetters["cart/subtotal"],
        shipping: rootGetters["cart/shipping"],
        total: rootGetters["cart/total"],
      };

      commit("SET_LAST_ORDER", order);
      dispatch("cart/clearCart", null, { root: true });

      return order;
    },
  },

  getters: {
    lastOrder(state) {
      return state.lastOrder;
    },
  },
};
