<script lang="ts" setup>
import ProductItem from '@/components/ProductItem.vue';
import { Request } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatCurrency } from '@/utils/formatCurrency';
import ModalComponent from '@/components/ModalComponent.vue';
import type { Product } from '../utils/interfacesType'

const data = ref<Product>({} as Product)
const quantity = ref(1)
const route = useRoute()
const router = useRouter()
const url = 'http://localhost:3000'

const addCart = async () => {
  const request = new Request(url)

  await request.post('/cart/add_item', { products: [{ product_id: data.value.id, quantity: quantity.value }]})

  router.back()
}

onMounted(async () => {
  const request = new Request(url)

  data.value = await request.get(`/products/${route.params.id}`)
})

</script>
<template>
  <ModalComponent>
    <div class="p-6 bg-white rounded-lg shadow-md">
      <div class="flex items-center mb-4">
        <ProductItem :title="data.title" :price="data.price" class="flex-1" />
        <img :src="url + data.image_url" alt="" class="w-24 h-24 object-cover rounded ml-4">
      </div>
      <div class="flex items-center justify-center mb-4">
        <button :disabled="quantity === 1" @click="() => quantity -= 1" class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">-</button>
        <span class="mx-4 text-lg font-semibold">{{ quantity }}</span>
        <button @click="() => quantity += 1" class="px-4 py-2 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      <button @click="addCart" class="w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-900 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        Adicionar {{ formatCurrency(data.price * quantity) }}
      </button>
    </div>
  </ModalComponent>
</template>


<style scoped>
  .checkout {
    width: 150px;
  }
</style>