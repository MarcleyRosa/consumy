<script setup lang="ts">
import { Request } from '@/utils/fetch';
import { formatCurrency } from '@/utils/formatCurrency';
import type { cartItems, orderId } from '@/utils/interfacesType';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import noImage from '../assets/produto-sem-foto.png'

const data = ref([] as cartItems[])
const total = ref(0)
const router = useRouter()
const message = ref('')
const valid = defineModel('valid', { default: ''})
const number = defineModel('number')
const cvv = defineModel('cvv')
const url = 'http://localhost:3000'


const request = new Request(url)

const requestData = async () => {
  data.value = await request.get('/cart')
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

try {
  const { order: { id }} = await request.post('/buyers/orders', order) as orderId
  
  await request.delete('/cart')
  router.push(`/order/${id}`)
} catch (error) {
  console.log(error);
}
}

</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
    <div
      v-for="{ price, product_id, quantity, id, product: { title, image_url } } in data"
      :key="id"
      class="flex items-center py-4 border-t border-gray-200"
    >
      <img
        :src="image_url ? url + image_url : noImage"
        alt=""
        class="w-20 h-20 object-cover rounded-lg mr-6"
      />
      <div class="flex-1">
        <p class="text-xl font-semibold text-gray-800">{{ `${quantity}x ${title}` }}</p>
        <span class="text-lg text-gray-600">{{ formatCurrency(price * quantity) }}</span>
      </div>
      <div class="flex space-x-4">
        <button
          @click="edit"
          :id="product_id"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Editar
        </button>
        <button
          @click="remove"
          :id="product_id"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300"
        >
          Remover
        </button>
      </div>
    </div>
    <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Pagamento:</h3>
    <div class="grid grid-cols-1 gap-6">
      <label class="block">
        <span class="text-gray-700">Número do cartão</span>
        <input
          v-model="number"
          type="text"
          class="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>
      <label class="block">
        <span class="text-gray-700">Validade</span>
        <input
          v-model="valid"
          type="text"
          class="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>
      <label class="block">
        <span class="text-gray-700">CVV</span>
        <input
          v-model="cvv"
          type="number"
          class="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>
    </div>
    <p class="text-red-600 mt-4">{{ message }}</p>
    <p class="text-2xl font-bold text-gray-900 mt-6">{{ `Total: ${formatCurrency(total)}` }}</p>
    <button
      @click="createOrder"
      class="mt-6 bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-500 transition duration-300"
    >
      Fazer pedido
    </button>
  </div>
</template>

