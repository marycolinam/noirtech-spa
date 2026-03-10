<template>
  <ProductList />
</template>

<script>
import ProductList from "@/components/products/ProductList.vue";

export default {
  name: "HomeView",
  components: {
    ProductList,
  },
};
</script>
<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
