<script lang="ts" setup>
import ProductItem from '@/components/ProductItem.vue';
import { Request } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatCurrency } from '@/utils/formatCurrency';

interface Product {
  title: string,
  image: string,
  price: number
}

const data = ref<Product>({} as Product)
const quantity = ref(1)
const route = useRoute()
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

    <button class="checkout">Adicionar {{ formatCurrency(data.price * quantity)}}</button>
  </div>
</template>

<style scoped>
  .checkout {
    width: 150px;
  }
</style>