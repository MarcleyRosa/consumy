<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import { Request } from '@/utils/fetch';
import { formatCurrency } from '@/utils/formatCurrency';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { FullOrder } from '../utils/interfacesType';
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
})
</script>
<template>
  <div>
    <div v-for="{ product: { title, image_url }, amount, id, price, product_id } in data.order_items" :key="id">
      <router-link :to="{ name: 'store/product', params: { id: product_id, store_id: data.store_id } }">
        <p>{{  amount }}</p>
       <ProductItem :title="title" :price="+price" :image="url + image_url" />
      </router-link> <br> <br>
      <br><br>
      <hr>
    </div>
    {{ `Total: ${formatCurrency(total)}` }}
  </div>
</template>