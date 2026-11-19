<template>
  <section class="page-view">
    <div class="detail-header">
      <router-link to="/carrito" class="back-link"
        >← Volver al carrito</router-link
      >
    </div>

    <div class="section-heading">
      <p class="eyebrow">Último paso</p>
      <h1 class="page-title">Checkout</h1>
      <p class="page-subtitle">
        Esta es una tienda demo: no se realizan cobros ni se envían productos.
      </p>
    </div>

    <div class="cart-layout">
      <form class="checkout-form" novalidate @submit.prevent="submitOrder">
        <fieldset class="checkout-fieldset">
          <legend>Datos de contacto</legend>

          <div class="form-field">
            <label for="name">Nombre completo</label>
            <input
              id="name"
              v-model.trim="form.name"
              type="text"
              autocomplete="name"
              :aria-invalid="Boolean(visibleErrors.name)"
              @blur="touch('name')"
            />
            <p v-if="visibleErrors.name" class="form-error">
              {{ visibleErrors.name }}
            </p>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="email">Email</label>
              <input
                id="email"
                v-model.trim="form.email"
                type="email"
                autocomplete="email"
                :aria-invalid="Boolean(visibleErrors.email)"
                @blur="touch('email')"
              />
              <p v-if="visibleErrors.email" class="form-error">
                {{ visibleErrors.email }}
              </p>
            </div>

            <div class="form-field">
              <label for="phone">Teléfono</label>
              <input
                id="phone"
                v-model.trim="form.phone"
                type="tel"
                autocomplete="tel"
                placeholder="+56 9 1234 5678"
                :aria-invalid="Boolean(visibleErrors.phone)"
                @blur="touch('phone')"
              />
              <p v-if="visibleErrors.phone" class="form-error">
                {{ visibleErrors.phone }}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset class="checkout-fieldset">
          <legend>Dirección de envío</legend>

          <div class="form-field">
            <label for="address">Dirección</label>
            <input
              id="address"
              v-model.trim="form.address"
              type="text"
              autocomplete="street-address"
              placeholder="Calle, número, depto."
              :aria-invalid="Boolean(visibleErrors.address)"
              @blur="touch('address')"
            />
            <p v-if="visibleErrors.address" class="form-error">
              {{ visibleErrors.address }}
            </p>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="commune">Comuna</label>
              <input
                id="commune"
                v-model.trim="form.commune"
                type="text"
                :aria-invalid="Boolean(visibleErrors.commune)"
                @blur="touch('commune')"
              />
              <p v-if="visibleErrors.commune" class="form-error">
                {{ visibleErrors.commune }}
              </p>
            </div>

            <div class="form-field">
              <label for="region">Región</label>
              <select
                id="region"
                v-model="form.region"
                :aria-invalid="Boolean(visibleErrors.region)"
                @blur="touch('region')"
              >
                <option value="" disabled>Selecciona una región</option>
                <option v-for="region in regions" :key="region" :value="region">
                  {{ region }}
                </option>
              </select>
              <p v-if="visibleErrors.region" class="form-error">
                {{ visibleErrors.region }}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset class="checkout-fieldset">
          <legend>Método de pago (simulado)</legend>

          <label
            v-for="method in paymentMethods"
            :key="method.value"
            class="radio-option"
          >
            <input
              v-model="form.payment"
              type="radio"
              name="payment"
              :value="method.value"
            />
            <span>
              <strong>{{ method.label }}</strong>
              <small>{{ method.description }}</small>
            </span>
          </label>
        </fieldset>

        <label class="checkbox-option">
          <input
            v-model="form.terms"
            type="checkbox"
            @change="touch('terms')"
          />
          <span>Entiendo que esta es una compra de prueba.</span>
        </label>
        <p v-if="visibleErrors.terms" class="form-error">
          {{ visibleErrors.terms }}
        </p>

        <button type="submit" class="primary-button primary-button--full">
          Confirmar pedido · {{ formatPrice(total) }}
        </button>
      </form>

      <OrderSummary>
        <ul class="summary-items">
          <li v-for="item in items" :key="item.id">
            <span>{{ item.quantity }} × {{ item.title }}</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </li>
        </ul>
      </OrderSummary>
    </div>
  </section>
</template>

<script>
import OrderSummary from "@/components/cart/OrderSummary.vue";
import { formatPrice } from "@/utils/format";

const REGIONS = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana de Santiago",
  "Libertador General Bernardo O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes",
];

const PAYMENT_METHODS = [
  {
    value: "card",
    label: "Tarjeta de crédito o débito",
    description: "Pago simulado, no se piden datos de tarjeta.",
  },
  {
    value: "transfer",
    label: "Transferencia bancaria",
    description: "Recibirías los datos por email.",
  },
  {
    value: "cash",
    label: "Pago contra entrega",
    description: "Pagas al recibir el pedido.",
  },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s]{8,15}$/;

export default {
  name: "CheckoutView",
  components: {
    OrderSummary,
  },
  data() {
    return {
      regions: REGIONS,
      paymentMethods: PAYMENT_METHODS,
      submitted: false,
      touched: {},
      form: {
        name: "",
        email: "",
        phone: "",
        address: "",
        commune: "",
        region: "",
        payment: "card",
        terms: false,
      },
    };
  },
  computed: {
    items() {
      return this.$store.getters["cart/items"];
    },
    total() {
      return this.$store.getters["cart/total"];
    },
    errors() {
      const errors = {};
      const { name, email, phone, address, commune, region, terms } = this.form;

      if (name.length < 3) errors.name = "Ingresa tu nombre completo.";
      if (!EMAIL_PATTERN.test(email)) errors.email = "Ingresa un email válido.";
      if (!PHONE_PATTERN.test(phone))
        errors.phone = "Ingresa un teléfono válido (solo números).";
      if (address.length < 5) errors.address = "Ingresa tu dirección.";
      if (commune.length < 2) errors.commune = "Ingresa tu comuna.";
      if (!region) errors.region = "Selecciona una región.";
      if (!terms) errors.terms = "Debes aceptar para continuar.";

      return errors;
    },
    visibleErrors() {
      const visible = {};
      Object.keys(this.errors).forEach((field) => {
        if (this.submitted || this.touched[field]) {
          visible[field] = this.errors[field];
        }
      });
      return visible;
    },
  },
  methods: {
    formatPrice,
    touch(field) {
      this.touched = { ...this.touched, [field]: true };
    },
    async submitOrder() {
      this.submitted = true;

      if (Object.keys(this.errors).length) {
        this.$nextTick(() => {
          const firstInvalid = this.$el.querySelector("[aria-invalid='true']");
          if (firstInvalid) firstInvalid.focus();
        });
        return;
      }

      const customer = { ...this.form };
      delete customer.terms;
      await this.$store.dispatch("orders/placeOrder", customer);
      this.$router.push({ name: "order-confirmation" });
    },
  },
};
</script>
