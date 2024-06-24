<script setup lang="ts">
import { Request } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProductsComponent from '@/components/ProductsComponent.vue';
import StoreComponenent from '@/components/StoreComponent.vue';


const route = useRoute()
const data = ref({ products: [], stores: []})

const url = 'http://localhost:3000';
onMounted(async () => {
  const request = new Request(url);

  data.value = await request.get(`/search?q=${encodeURIComponent(route.query.q as string)}`);
});
</script>
<template>
  <div>
    <ProductsComponent v-if="data.products.length > 0" :data="data.products" />
    <StoreComponenent :data="data.stores" />
    <div v-if="data.products.length === 0 && data.stores.length === 0" class="flex items-center justify-center min-h-screen">
      <h1 class="text-4xl font-bold text-gray-700">Nenhum produto ou loja encontrado</h1>
    </div>
  </div>
</template>