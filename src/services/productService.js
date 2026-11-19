import axios from "axios";

const API_URL = "https://dummyjson.com/products/category";

// Categorías de tecnología que se muestran en el catálogo
const CATEGORIES = ["smartphones", "laptops", "tablets", "mobile-accessories"];
const PRODUCTS_PER_CATEGORY = 3;

export const getProducts = async () => {
  const responses = await Promise.all(
    CATEGORIES.map((category) =>
      axios.get(`${API_URL}/${category}`, {
        params: { limit: PRODUCTS_PER_CATEGORY },
      })
    )
  );

  return responses.flatMap((response) => response.data.products);
};
