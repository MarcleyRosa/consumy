<template>
  <div>
    <div v-if="isVisible" class="sidebar-modal-overlay" @click.self="close"></div>
    <div v-if="isVisible" class="sidebar-modal-content container">
      <button class="close-button" @click="close">X</button>
      
      <slot></slot>

    <div v-if="data.length > 0">
      <div v-for="{ price, product_id, quantity, id, product: { title, image } } in data" :key="id">
        <img class="image" :src="image" alt="">
        <p>{{ `${quantity}x ${title}` }}</p>
        <span>{{ formatCurrency(price * quantity) }}</span> <br>
        <button @click="edit" :id="product_id">Editar</button>
        <button @click="remove" :id="product_id">Remover</button>
        <br><br>
        <hr>
      </div>
      <p style="color: red;">{{ message }}</p>
      <p>{{ `Total: ${formatCurrency(total)}` }}</p>
      <button class="button" @click="checkout">Escolher forma de pagamento</button>
    </div>
    <p v-else>Carrinho vazio</p>
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
  console.log(data.value);
  
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
.sidebar-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Ajuste a opacidade conforme necessário */
  pointer-events: none; /* Permite interações com a página */
}

.sidebar-modal-content {
  position: fixed;
  top: 10%;
  right: 0;
  width: 300px; /* Ajuste conforme necessário */
  height: 89%;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  overflow-y: auto;
  pointer-events: auto; /* Permite interações dentro do modal */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.image {
  width: 60px;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.content {
  height: 1000px; /* Apenas para simular uma página longa */
  padding: 20px;
  background-color: #f0f0f0;
}

.button {
  position: fixed;
  bottom: 10px; /* Ajuste conforme necessário */
  right: 10px; /* Ajuste conforme necessário */
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000; /* Garante que o botão fique acima de outros elementos */
}

.button:hover {
  background-color: #0056b3;
}


</style>
