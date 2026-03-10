import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import ProductCard from "@/components/products/ProductCard.vue";

const createVuexStore = () =>
  createStore({
    modules: {
      favorites: {
        namespaced: true,
        state: () => ({
          items: [],
        }),
        getters: {
          isFavorite: () => () => false,
        },
        actions: {
          toggleFavorite: jest.fn(),
        },
      },
    },
  });

describe("ProductCard.vue", () => {
  it("renderiza el título, precio y botón de detalle", () => {
    const store = createVuexStore();

    const product = {
      id: 1,
      title: "Producto de prueba",
      price: 999,
      description: "Descripción de prueba",
      images: ["https://placehold.co/600x400/png"],
      category: {
        name: "test",
      },
    };

    const wrapper = mount(ProductCard, {
      props: {
        product,
      },
      global: {
        plugins: [store],
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>",
          },
          VCard: {
            template: "<div><slot /></div>",
          },
          VCardText: {
            template: "<div><slot /></div>",
          },
        },
      },
    });

    expect(wrapper.text()).toContain("Producto de prueba");
    expect(wrapper.text()).toContain("$999");
    expect(wrapper.text()).toContain("Ver detalle");
  });
});
