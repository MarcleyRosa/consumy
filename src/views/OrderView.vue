<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import { Request } from '@/utils/fetch';
import { formatCurrency } from '@/utils/formatCurrency';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FullOrder, OptionsState } from '../utils/interfacesType';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { options, messageState } from '../utils';

const state = ref<OptionsState>('loading')
const route = useRoute()
const data = ref<FullOrder>({
order_items: [],
id: 0,
buyer_id: 0,
store_id: 0,
created_at: '',
updated_at: '',
state: ''
})
const url = 'http://localhost:3000';
const total = ref(0)
const router = useRouter()
const request = new Request(url)

const buyAgain = async () => {
  const products = data.value.order_items.map(({ product_id, amount }) => {
    return { product_id, quantity: amount }
  })

  await request.post('/cart/add_item', { products })

  router.push('/checkout')
}


onMounted(async () => {

  data.value = await request.get(`/order/${route.params.id}`)

  total.value = data.value.order_items.reduce((acc, curr) => acc += +curr.price * curr.amount, 0)

  await fetchEventSource(`${url}/state/order/${route.params.id}`, {
    ...options,
    async onopen(response) {
      if (response.ok) {
        console.log('connect')
        return
      }
    },
    onmessage(msg) {
      if (msg.event === 'state-order') {
        const data = JSON.parse(msg.data)
        state.value = data.state
      }
    }
  })
})
</script>
<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <p class="text-lg font-semibold mb-4">{{ messageState[state] }}</p>
    <div v-for="{ product: { title, image_url }, amount, id, price } in data.order_items" :key="id" class="mb-6 border border-gray-300 rounded-lg p-4">
      <div class="flex items-center">
        <p class="mr-4 text-gray-700 font-medium">{{ `${amount} x` }}</p>
        <ProductItem :title="title" :price="+price" class="flex-1"/>
        <img :src="url + image_url" alt="" class="w-16 h-16 object-cover ml-4 rounded">
      </div>
    </div>
    <p class="text-xl font-bold mb-4">{{ `Total: ${formatCurrency(total)}` }}</p>
    <button v-if="messageState[state] === 'completed'" @click="buyAgain" class="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
      Pedir novamente
    </button>
  </div>
</template>