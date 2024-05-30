<template>
  <div>
    <div v-if="isVisible" class="sidebar-modal-overlay" @click.self="close"></div>
    <div v-if="isVisible" class="sidebar-modal-content">
      <button class="close-button" @click="close">X</button>

      <slot></slot>
      <button>Escolher forma de pagamento</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const isVisible = ref(true)

const close = () => {
  isVisible.value = false
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
  height: 80%;
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
</style>
