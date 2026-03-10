import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import ProductList from "@/components/products/ProductList.vue";

describe("ProductList.vue", () => {
  it("muestra mensaje vacío cuando no hay productos filtrados", () => {
    const store = createStore({
      modules: {
        products: {
          namespaced: true,
          getters: {
            products: () => [],
            loading: () => false,
            error: () => null,
          },
          actions: {
            fetchProducts: jest.fn(),
          },
        },
        filters: {
          namespaced: true,
          getters: {
            selectedCategory: () => "all",
          },
          actions: {
            setCategory: jest.fn(),
            resetCategory: jest.fn(),
          },
        },
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
      getters: {
        availableCategories: () => [],
        filteredProducts: () => [],
      },
    });

    const wrapper = mount(ProductList, {
      global: {
        plugins: [store],
        stubs: {
          VContainer: {
            template: "<div><slot /></div>",
          },
          VRow: {
            template: "<div><slot /></div>",
          },
          VCol: {
            template: "<div><slot /></div>",
          },
          ProductCard: true,
        },
      },
    });

    expect(wrapper.text()).toContain(
      "No hay productos para la categoría seleccionada.",
    );
  });
});
