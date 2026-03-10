import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
