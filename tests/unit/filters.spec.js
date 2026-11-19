import store from "@/store";

jest.mock("@/services/productService", () => ({
  getProducts: jest.fn(),
}));

const products = [
  {
    id: 1,
    title: "iPhone 13 Pro",
    brand: "Apple",
    category: "smartphones",
    price: 1000,
    rating: 4.1,
  },
  {
    id: 2,
    title: "MacBook Pro",
    brand: "Apple",
    category: "laptops",
    price: 2000,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Galaxy Tab",
    brand: "Samsung",
    category: "tablets",
    price: 400,
    rating: 3.9,
  },
];

describe("Búsqueda, filtro y orden del catálogo", () => {
  beforeEach(() => {
    store.commit("products/SET_PRODUCTS", products);
    store.commit("filters/RESET_FILTERS");
  });

  it("busca por nombre o marca sin importar mayúsculas", () => {
    store.commit("filters/SET_SEARCH", "apple");
    expect(store.getters.filteredProducts.map((p) => p.id)).toEqual([1, 2]);
  });

  it("combina categoría y búsqueda", () => {
    store.commit("filters/SET_CATEGORY", "laptops");
    store.commit("filters/SET_SEARCH", "mac");
    expect(store.getters.filteredProducts.map((p) => p.id)).toEqual([2]);
  });

  it("ordena por precio y por valoración", () => {
    store.commit("filters/SET_SORT", "price-asc");
    expect(store.getters.filteredProducts.map((p) => p.id)).toEqual([3, 1, 2]);

    store.commit("filters/SET_SORT", "rating");
    expect(store.getters.filteredProducts.map((p) => p.id)).toEqual([2, 1, 3]);
  });
});
