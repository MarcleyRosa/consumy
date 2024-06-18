<template>
  <div>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50" @click.self="close"></div>
    <div v-if="isVisible" class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 overflow-y-auto z-50">
      <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" @click="close">X</button>
      
      <slot></slot>

      <div v-if="data.length > 0" class="mt-6">
        <div v-for="{ price, product_id, quantity, id, product: { title } } in data" :key="id" class="mb-4">
          <div class="flex items-center mb-2">
            <div class="flex-1">
              <p class="text-lg font-medium">{{ `${quantity}x ${title}` }}</p>
              <span class="text-gray-600">{{ formatCurrency(price * quantity) }}</span>
            </div>
          </div>
          <div class="flex justify-between">
            <button @click="edit" :id="product_id" class="text-blue-500 hover:underline">Editar</button>
            <button @click="remove" :id="product_id" class="text-red-500 hover:underline">Remover</button>
          </div>
          <hr class="my-4">
        </div>
        <p class="text-red-500">{{ message }}</p>
        <p class="text-xl font-semibold">{{ `Total: ${formatCurrency(total)}` }}</p>
        <button class="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1" @click="checkout">
          Escolher forma de pagamento
        </button>
      </div>
      <p v-else class="text-center text-gray-500">Carrinho vazio</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Request } from '@/utils/fetch';
import { formatCurrency } from '@/utils/formatCurrency';
import type { cartItems } from '@/utils/interfacesType';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const isVisible = ref(true)
const router = useRouter()

const data = ref([] as cartItems[])
const total = ref(0)
const message = ref('')

const request = new Request('http://localhost:3000')

const requestData = async () => {
  data.value = await request.get('/cart')

  total.value = data.value.reduce((acc, curr) => acc += curr.price * curr.quantity, 0)
}

onMounted(() => {
  requestData()
})

const close = () => {
  isVisible.value = false
}

const remove = async (event: MouseEvent) => {
  const { id } = event.target as HTMLButtonElement;

  await request.delete(`/cart/remove_item/${id}`)
  message.value = 'Produto removido!'
  setTimeout(() => { message.value = ''}, 2000)
  requestData()
}

const edit = (event: MouseEvent) => {
  const { id } = event.target as HTMLButtonElement;
  const [items] = data.value
  const { product: { store_id } } = items
  router.push(`/store/${store_id}/products/${id}`)
  isVisible.value = false
}

const checkout = () => {
  isVisible.value = false
  router.push('/checkout')
}
</script>

<style scoped>

</style>
