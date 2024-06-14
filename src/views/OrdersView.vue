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
  <div>
    <div v-for="order in data?.orders" :key="order.id">
      <button style="width: 250px;" @click="() => router.push(`/order/${order.id}`)">
        <p>{{ formatDate(order.created_at) }}</p>
        <p :id="messageState[order.state] !== 'completed' ? 'state' : 'no-state'">{{ messageState[order.state] }}</p>
        <div v-for="{ product: { title }, id } in order.order_items" :key="id">
          <p>{{ title }}</p>
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