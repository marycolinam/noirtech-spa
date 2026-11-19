<template>
  <div class="quantity-selector" role="group" aria-label="Cantidad">
    <button
      type="button"
      class="quantity-button"
      :disabled="modelValue <= 1"
      aria-label="Disminuir cantidad"
      @click="update(modelValue - 1)"
    >
      −
    </button>
    <span class="quantity-value" aria-live="polite">{{ modelValue }}</span>
    <button
      type="button"
      class="quantity-button"
      :disabled="modelValue >= max"
      aria-label="Aumentar cantidad"
      @click="update(modelValue + 1)"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  name: "QuantitySelector",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      default: 99,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    update(value) {
      const clamped = Math.min(Math.max(1, value), this.max);
      this.$emit("update:modelValue", clamped);
    },
  },
};
</script>
