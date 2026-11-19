<template>
  <aside class="order-summary">
    <h2 class="order-summary__title">Resumen del pedido</h2>

    <dl class="order-summary__rows">
      <div class="order-summary__row">
        <dt>Subtotal ({{ itemsCount }} producto(s))</dt>
        <dd>{{ formatPrice(subtotal) }}</dd>
      </div>
      <div class="order-summary__row">
        <dt>Envío</dt>
        <dd>{{ shipping === 0 ? "Gratis" : formatPrice(shipping) }}</dd>
      </div>
      <div class="order-summary__row order-summary__row--total">
        <dt>Total</dt>
        <dd>{{ formatPrice(total) }}</dd>
      </div>
    </dl>

    <p v-if="missingForFreeShipping > 0" class="order-summary__note">
      Agrega {{ formatPrice(missingForFreeShipping) }} más para obtener envío
      gratis.
    </p>
    <p v-else class="order-summary__note order-summary__note--success">
      Tu pedido tiene envío gratis.
    </p>

    <slot />
  </aside>
</template>

<script>
import { formatPrice } from "@/utils/format";
import { FREE_SHIPPING_FROM } from "@/store/modules/cart";

export default {
  name: "OrderSummary",
  computed: {
    itemsCount() {
      return this.$store.getters["cart/itemsCount"];
    },
    subtotal() {
      return this.$store.getters["cart/subtotal"];
    },
    shipping() {
      return this.$store.getters["cart/shipping"];
    },
    total() {
      return this.$store.getters["cart/total"];
    },
    missingForFreeShipping() {
      return Math.max(0, FREE_SHIPPING_FROM - this.subtotal);
    },
  },
  methods: {
    formatPrice,
  },
};
</script>
