<script setup lang="ts">
import { Request } from '@/utils/fetch';
import { formatCurrency } from '@/utils/formatCurrency';
import type { cartItems, orderId } from '@/utils/interfacesType';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const data = ref([] as cartItems[])
const total = ref(0)
const router = useRouter()
const message = ref('')
const valid = defineModel('valid', { default: ''})
const number = defineModel('number')
const cvv = defineModel('cvv')


const request = new Request('http://localhost:3000')

const requestData = async () => {
  data.value = await request.get('/cart')
  console.log(data.value);
  
  total.value = data.value.reduce((acc, curr) => acc += curr.price * curr.quantity, 0)
}

onMounted(() => {
  requestData()
})

watch(message, () => {
  requestData()
})

watch(data, () => {
  if (data.value.length === 0) router.push('/stores')
})

const remove = async (event: MouseEvent) => {
  const { id } = event.target as HTMLButtonElement;

  await request.delete(`/cart/remove_item/${id}`)
  message.value = 'Produto removido!'
  setTimeout(() => { message.value = ''}, 2000)
}

const edit = (event: MouseEvent) => {
  const { id } = event.target as HTMLButtonElement;
  const [items] = data.value
  const { product: { store_id } } = items
  router.push(`/store/${store_id}/products/${id}`)
}

const createOrder = async () => {

  const cartItems = data.value
  const [items] = cartItems
  const { product: { store_id } } = items

  const payment = { valid: valid.value, cvv: cvv.value, number: number.value, value: total.value }

  const order_items = cartItems.map(({ price, product_id, quantity }) => ({ price, product_id, amount: quantity}))

  const order = {
    order: {
      store_id
    },
    order_items,
    payment
}

  const { order: { id }} = await request.post('/buyers/orders', order) as orderId
  
  await request.delete('/cart')
  router.push(`/order/${id}`)
}

</script>

<template>
  <div>
    <h1>Checkout</h1>
    <div v-for="{ price, product_id, quantity, id, product: { title } } in data" :key="id">
      <p>{{ `${quantity}x ${title}` }}</p>
      <span>{{ formatCurrency(price * quantity) }}</span> <br>
      <button @click="edit" :id="product_id">Editar</button>
      <button @click="remove" :id="product_id">Remover</button>
      <br><br>
      <hr>
    </div>
    <label for="">Número do cartão
        <input v-model="number" type="text"> <br>
      </label>
      <label for="">Validade <br>
        <input v-model="valid" type="text"> <br>
      </label>
      <label for="">cvv <br>
        <input v-model="cvv" type="number">
      </label>
    <p style="color: red;">{{ message }}</p>
    <p>{{ `Total: ${formatCurrency(total)}` }}</p>

    <button @click="createOrder">Fazer pedido</button>
  </div>
</template>