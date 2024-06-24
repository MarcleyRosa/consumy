<script setup lang="ts">
import { useRouter } from 'vue-router';
import productImage from '../assets/produto-sem-foto.png'
import ProductItem from '@/components/ProductItem.vue';
import type { Product } from '@/utils/interfacesType';

const router = useRouter()
const url = 'http://localhost:3000';

defineProps<{
  data: Product[]
}>()


</script>

<template>
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
        >
      </button>
    </div>
  </div>
</template>