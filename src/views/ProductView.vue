<script lang="ts" setup>
import ProductItem from '@/components/ProductItem.vue';
import { Request } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatCurrency } from '@/utils/formatCurrency';

interface Product {
  id: number,
  title: string,
  image: string,
  price: number
}

const data = ref<Product>({} as Product)
const quantity = ref(1)
const route = useRoute()
const router = useRouter()

const addCart = async () => {
  const request = new Request('http://localhost:3000')

  await request.post('/cart/add_item', { product_id: data.value.id, quantity: quantity.value })

  router.back()
}

onMounted(async () => {
  const request = new Request('http://localhost:3000')

  data.value = await request.get(`/products/${route.params.id}`)
})

</script>
<template>
  <div>
    <ProductItem :title="data.title" :image="data.image" :price="data.price" />
    <button :disabled="quantity === 1" @click="() => quantity -= 1">-</button>
    <span>{{  quantity }}</span>
    <button @click="() => quantity += 1">+</button>

    <button class="checkout" @click="addCart">Adicionar {{ formatCurrency(data.price * quantity)}}</button>
  </div>
</template>

<style scoped>
  .checkout {
    width: 150px;
  }
</style>