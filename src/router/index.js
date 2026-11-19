import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import CartView from "../views/CartView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import OrderConfirmationView from "../views/OrderConfirmationView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/producto/:id",
    name: "product-detail",
    component: ProductDetailView,
    props: true,
  },
  {
    path: "/favoritos",
    name: "favorites",
    component: FavoritesView,
  },
  {
    path: "/carrito",
    name: "cart",
    component: CartView,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
    // No se puede ir al checkout con el carrito vacío
    beforeEnter: () => {
      if (store.getters["cart/itemsCount"] === 0) {
        return { name: "cart" };
      }
      return true;
    },
  },
  {
    path: "/pedido-confirmado",
    name: "order-confirmation",
    component: OrderConfirmationView,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
