<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import { Request } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import productImage from '../assets/produto-sem-foto.png'
import storeImage from '../assets/loja-sem-foto.png'

const data = ref<any>([])
const getStore = ref<any>({})
const route = useRoute()
const router = useRouter()
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
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="{ title, id, price, image_url, store_id, stock } in data"
        :key="id"
        class="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:shadow-lg hover:scale-105"
      >
        <button
          :disabled="stock === 0"
          @click="router.push(`/store/${store_id}/products/${id}`)"
          class="w-full h-full flex items-center justify-between"
          :class="{'opacity-50 cursor-not-allowed': stock === 0}"
        >
          <div class="flex flex-col items-center">
            <ProductItem :title="title" :price="price" />
            <p v-if="stock === 0" class="text-red-500 mt-2">Produto Esgotado!</p>
          </div>
          <img
            :src="image_url ? url + image_url : productImage"
            alt="Product Image"
            class="w-24 h-16 object-cover rounded-lg ml-4"
            :id="id"
          >
        </button>
      </div>
    </div>
  </div>
</template>