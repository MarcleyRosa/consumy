<template>
  <div>
    <div v-if="isVisible" class="sidebar-modal-overlay" @click.self="close"></div>
    <div v-if="isVisible" class="sidebar-modal-content container">
      <button class="close-button" @click="close">X</button>

      <slot></slot>
      <button class="button" @click="checkout">Escolher forma de pagamento</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const isVisible = ref(true)
const router = useRouter()

const close = () => {
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
