<template>
  <section class="page-view">
    <div class="section-heading">
      <p class="eyebrow">Tu compra</p>
      <h1 class="page-title">Carrito</h1>
    </div>

    <div v-if="items.length === 0" class="feedback-state empty-state">
      <p>Tu carrito está vacío.</p>
      <router-link to="/" class="primary-button">Ir al catálogo</router-link>
    </div>

    <div v-else class="cart-layout">
      <ul class="cart-list">
        <li v-for="item in items" :key="item.id" class="cart-item">
          <router-link :to="`/producto/${item.id}`" class="cart-item__image">
            <img :src="item.image" :alt="item.title" />
          </router-link>

          <div class="cart-item__info">
            <p v-if="item.brand" class="product-category">{{ item.brand }}</p>
            <router-link :to="`/producto/${item.id}`" class="cart-item__title">
              {{ item.title }}
            </router-link>
            <p class="cart-item__unit">{{ formatPrice(item.price) }} c/u</p>

            <div class="cart-item__controls">
              <QuantitySelector
                :model-value="item.quantity"
                :max="item.stock"
                @update:model-value="updateQuantity(item.id, $event)"
              />
              <button
                type="button"
                class="inline-button"
                @click="removeItem(item.id)"
              >
                Eliminar
              </button>
            </div>
          </div>

          <p class="cart-item__total">
            {{ formatPrice(item.price * item.quantity) }}
          </p>
        </li>
      </ul>

      <OrderSummary>
        <router-link to="/checkout" class="primary-button primary-button--full">
          Continuar al pago
        </router-link>
        <router-link to="/" class="secondary-link"
          >Seguir comprando</router-link
        >
        <button type="button" class="inline-button" @click="clearCart">
          Vaciar carrito
        </button>
      </OrderSummary>
    </div>
  </section>
</template>

<script>
import QuantitySelector from "@/components/shop/QuantitySelector.vue";
import OrderSummary from "@/components/cart/OrderSummary.vue";
import { formatPrice } from "@/utils/format";

export default {
  name: "CartView",
  components: {
    QuantitySelector,
    OrderSummary,
  },
  computed: {
    items() {
      return this.$store.getters["cart/items"];
    },
  },
  methods: {
    formatPrice,
    updateQuantity(id, quantity) {
      this.$store.dispatch("cart/updateQuantity", { id, quantity });
    },
    removeItem(id) {
      this.$store.dispatch("cart/removeFromCart", id);
    },
    clearCart() {
      this.$store.dispatch("cart/clearCart");
    },
  },
};
</script>
