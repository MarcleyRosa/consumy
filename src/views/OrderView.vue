<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import { Request } from '@/utils/fetch';
import { formatCurrency } from '@/utils/formatCurrency';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
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


onMounted(async () => {
  const request = new Request(url)

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
  <div>
    <p>{{ messageState[state] }}</p>
    <div v-for="{ product: { title, image_url }, amount, id, price } in data.order_items" :key="id">
        <p>{{  amount }}</p>
       <ProductItem :title="title" :price="+price" :image="url + image_url" />
      <br><br>
      <hr>
    </div>
    {{ `Total: ${formatCurrency(total)}` }}
  </div>
</template>