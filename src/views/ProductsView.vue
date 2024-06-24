<script setup lang="ts">
import { Request } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import productImage from '../assets/produto-sem-foto.png'
import storeImage from '../assets/loja-sem-foto.png'
import ProductsComponent from '@/components/ProductsComponent.vue';

const data = ref<any>([])
const getStore = ref<any>({})
const route = useRoute()
const url = 'http://localhost:3000';
onMounted(async () => {
  const request = new Request(url)

  data.value = await request.get(`/store/${route.params.id}/products`)

  getStore.value = await request.get(`/stores/${route.params.id}`)
})

</script>

<template>
  <div class="container mx-auto py-4">
    <div class="relative">
      <img
        :src="data[0]?.image_url ? url + data[0]?.image_url : productImage"
        alt="Cover Image"
        class="w-1/2 h-24 object-cover rounded-t-lg mx-auto"
      >
    </div>
    <div class="flex items-center justify-center mb-4">
      <img
        :src="getStore.image_url ? url + getStore.image_url : storeImage"
        alt="Store Image"
        class="w-12 h-12 object-cover rounded-full mr-4"
      >
      <span class="text-xl font-semibold">{{ getStore.name }}</span>
    </div>
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <ProductsComponent :data="data" />
  </div>
</template>