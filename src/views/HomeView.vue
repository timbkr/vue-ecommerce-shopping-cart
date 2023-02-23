<script setup lang="ts">
import ProductPage from '@/components/ProductPage.vue';

import { useProductsStore } from '@/stores/products';
const store = useProductsStore();

</script>

<template>
  <main>
    <ProductPage :product="store.products[0]"></ProductPage>
  </main>
</template>
