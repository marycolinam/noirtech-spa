import axios from "axios";

const API_URL = "https://dummyjson.com/products/category";

// Categorías de tecnología que se muestran en el catálogo
export const CATEGORIES = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
];

export const getProducts = async () => {
  const responses = await Promise.all(
    CATEGORIES.map((category) =>
      // limit: 0 devuelve todos los productos de la categoría
      axios.get(`${API_URL}/${category}`, { params: { limit: 0 } })
    )
  );

  return responses.flatMap((response) => response.data.products);
};
