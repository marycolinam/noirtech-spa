import { createStore } from "vuex";
import cart, { SHIPPING_COST } from "@/store/modules/cart";
import ui from "@/store/modules/ui";

const createCartStore = () =>
  createStore({
    modules: {
      cart: { ...cart, state: () => ({ items: [] }) },
      ui,
    },
  });

const laptop = {
  id: 1,
  title: "Laptop de prueba",
  price: 1000,
  discountPercentage: 10,
  stock: 3,
  thumbnail: "laptop.png",
};

const cable = {
  id: 2,
  title: "Cable USB-C",
  price: 20,
  discountPercentage: 0,
  stock: 10,
  thumbnail: "cable.png",
};

describe("Módulo cart", () => {
  it("agrega productos con el precio con descuento y suma cantidades", async () => {
    const store = createCartStore();

    await store.dispatch("cart/addToCart", { product: laptop });
    await store.dispatch("cart/addToCart", { product: laptop });

    expect(store.getters["cart/items"]).toHaveLength(1);
    expect(store.getters["cart/items"][0].price).toBe(900);
    expect(store.getters["cart/itemsCount"]).toBe(2);
    expect(store.getters["cart/subtotal"]).toBe(1800);
  });

  it("no permite superar el stock disponible", async () => {
    const store = createCartStore();

    await store.dispatch("cart/addToCart", { product: laptop, quantity: 10 });

    expect(store.getters["cart/quantityInCart"](laptop.id)).toBe(3);
  });

  it("cobra envío bajo el mínimo y lo hace gratis sobre el mínimo", async () => {
    const store = createCartStore();

    await store.dispatch("cart/addToCart", { product: cable });
    expect(store.getters["cart/shipping"]).toBe(SHIPPING_COST);
    expect(store.getters["cart/total"]).toBe(20 + SHIPPING_COST);

    await store.dispatch("cart/addToCart", { product: laptop });
    expect(store.getters["cart/shipping"]).toBe(0);
  });

  it("actualiza cantidades, elimina productos y vacía el carrito", async () => {
    const store = createCartStore();

    await store.dispatch("cart/addToCart", { product: cable });
    await store.dispatch("cart/addToCart", { product: laptop });

    await store.dispatch("cart/updateQuantity", { id: cable.id, quantity: 4 });
    expect(store.getters["cart/quantityInCart"](cable.id)).toBe(4);

    await store.dispatch("cart/removeFromCart", cable.id);
    expect(store.getters["cart/items"]).toHaveLength(1);

    await store.dispatch("cart/clearCart");
    expect(store.getters["cart/itemsCount"]).toBe(0);
  });

  it("muestra un aviso al agregar un producto", async () => {
    const store = createCartStore();

    await store.dispatch("cart/addToCart", { product: cable });

    expect(store.getters["ui/toast"].visible).toBe(true);
    expect(store.getters["ui/toast"].message).toContain("Cable USB-C");
  });
});
