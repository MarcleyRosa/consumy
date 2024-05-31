<script setup lang="ts">
import { Request } from '@/utils/fetch';
import { formatCurrency } from '@/utils/formatCurrency';
import { onMounted, ref } from 'vue';

const data = ref([] as any)
const total = ref(0)

onMounted(async() => {
  const request = new Request('http://localhost:3000')

  data.value = await request.get('/cart')
})

const remove = () => {

}

</script>

<template>
  <div>
    <h1>Checkout</h1>
    <div v-for="{ price, id, product: { title } } in data.cart_items" :key="id">
      <p>{{ title }}</p>
      <span>{{ formatCurrency(price) }}</span> <br>
      <button @click="remove" :id=id>Entrar</button>
      <br><br>
      <hr>
    </div>
    <p>{{ `Total: ${total}` }}</p>
  </div>
</template>