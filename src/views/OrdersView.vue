<script setup lang="ts">
import { Request } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import { formatDate } from '../utils'
import { useRouter } from 'vue-router';
import { messageState } from '../utils'
import type { Orders } from '../utils/interfacesType'

const data = ref<Orders>()
const router = useRouter()
const url = 'http://localhost:3000';
onMounted(async () => {
  const request = new Request(url)

  data.value = await request.get('/buyers/orders')

})
</script>
<template>
  <div class="p-4 text-center">
    <h1 class="text-3xl font-bold mb-4">Meus Pedidos</h1>
    <div v-for="order in data?.orders" :key="order.id" class="mb-4 p-4 border rounded-lg shadow-md">
      <button @click="() => router.push(`/order/${order.id}`)" class="w-full text-left">
        <p class="text-gray-700 font-semibold mb-2">{{ formatDate(order.created_at) }}</p>
        <p :class="{ 'text-red-500': messageState[order.state] !== 'completed', 'text-green-500': messageState[order.state] === 'completed' }">{{ messageState[order.state] }}</p>
        <div v-for="{ product: { title }, id } in order.order_items" :key="id">
          <p class="text-sm text-gray-600">{{ title }}</p>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
  #state {
    color: green;
  }
  #no-state {
    color: darkgray;
  }
</style>