<template>
  <div class="price-tag" :class="{ 'price-tag--large': large }">
    <span class="price-tag__final">{{ formatPrice(finalPrice) }}</span>
    <template v-if="hasDiscount">
      <span class="price-tag__original">{{ formatPrice(product.price) }}</span>
      <span class="price-tag__discount">-{{ discount }}%</span>
    </template>
  </div>
</template>

<script>
import { formatPrice, getFinalPrice } from "@/utils/format";

export default {
  name: "PriceTag",
  props: {
    product: {
      type: Object,
      required: true,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    discount() {
      return Math.round(Number(this.product.discountPercentage) || 0);
    },
    hasDiscount() {
      return this.discount >= 1;
    },
    finalPrice() {
      return getFinalPrice(this.product);
    },
  },
  methods: {
    formatPrice,
  },
};
</script>
