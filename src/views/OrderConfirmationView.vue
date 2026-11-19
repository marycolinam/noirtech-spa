<template>
  <section class="page-view">
    <div v-if="order" class="confirmation">
      <p class="confirmation__icon" aria-hidden="true">✓</p>
      <p class="eyebrow">Pedido confirmado</p>
      <h1 class="page-title">¡Gracias, {{ firstName }}!</h1>
      <p class="page-subtitle">
        Tu pedido <strong>{{ order.number }}</strong> fue registrado. Te
        enviaríamos la confirmación a {{ order.customer.email }}.
      </p>

      <div class="confirmation__card">
        <h2 class="order-summary__title">Detalle</h2>
        <ul class="summary-items">
          <li v-for="item in order.items" :key="item.id">
            <span>{{ item.quantity }} × {{ item.title }}</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </li>
        </ul>
        <dl class="order-summary__rows">
          <div class="order-summary__row">
            <dt>Subtotal</dt>
            <dd>{{ formatPrice(order.subtotal) }}</dd>
          </div>
          <div class="order-summary__row">
            <dt>Envío</dt>
            <dd>
              {{
                order.shipping === 0 ? "Gratis" : formatPrice(order.shipping)
              }}
            </dd>
          </div>
          <div class="order-summary__row order-summary__row--total">
            <dt>Total</dt>
            <dd>{{ formatPrice(order.total) }}</dd>
          </div>
        </dl>
        <p class="confirmation__address">
          <strong>Envío a:</strong> {{ order.customer.address }},
          {{ order.customer.commune }}, {{ order.customer.region }}
        </p>
      </div>

      <router-link to="/" class="primary-button"
        >Volver a la tienda</router-link
      >
    </div>

    <div v-else class="feedback-state empty-state">
      <p>No hay un pedido reciente.</p>
      <router-link to="/" class="primary-button">Ir al catálogo</router-link>
    </div>
  </section>
</template>

<script>
import { formatPrice } from "@/utils/format";

export default {
  name: "OrderConfirmationView",
  computed: {
    order() {
      return this.$store.getters["orders/lastOrder"];
    },
    firstName() {
      return this.order?.customer?.name?.split(" ")[0] || "";
    },
  },
  methods: {
    formatPrice,
  },
};
</script>
