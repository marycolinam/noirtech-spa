const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (value) => priceFormatter.format(Number(value) || 0);

export const getFinalPrice = (product) => {
  if (!product) return 0;

  const price = Number(product.price) || 0;
  const discount = Number(product.discountPercentage) || 0;

  return Math.round(price * (1 - discount / 100) * 100) / 100;
};

export const formatCategory = (category) => {
  if (!category) return "";

  return String(category)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getProductImage = (product, fallback) =>
  product?.thumbnail ||
  product?.images?.[0] ||
  product?.category?.image ||
  product?.image ||
  fallback;
