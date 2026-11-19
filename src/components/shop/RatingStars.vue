<template>
  <div
    class="rating-stars"
    :aria-label="`Valoración: ${roundedRating} de 5`"
    role="img"
  >
    <span
      v-for="star in 5"
      :key="star"
      class="rating-star"
      :class="{ 'rating-star--filled': star <= Math.round(rating) }"
      aria-hidden="true"
    >
      ★
    </span>
    <span v-if="showValue" class="rating-value">{{ roundedRating }}</span>
  </div>
</template>

<script>
export default {
  name: "RatingStars",
  props: {
    rating: {
      type: Number,
      default: 0,
    },
    showValue: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    roundedRating() {
      return (Math.round(this.rating * 10) / 10).toFixed(1);
    },
  },
};
</script>
