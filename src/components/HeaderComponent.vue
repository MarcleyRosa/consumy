<script setup lang="ts">
import { ref } from 'vue';
import ModalCart from './ModalCart.vue';
import UserProfile from './UserProfile.vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()
const isModal = ref(false)


</script>
<template>
  <div v-if="route.path !== '/' && route.path !== '/signin'" class="bg-white shadow-md py-4">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <div v-if="isModal">
          <ModalCart />
        </div>
        <UserProfile />
      </div>
      <div class="flex items-center space-x-4">
        <button
          v-if="route.path !== '/orders'"
          @click="() => router.push('/orders')"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Meus pedidos
        </button>
        <button
          @click="() => isModal = !isModal"
          class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Carrinho
        </button>
        <button @click="router.push('/stores')">Pagina Inicial</button>
      </div>
    </div>
  </div>
</template>



<style scoped>
  .cent {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f4f4f4;
    text-align: center;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
</style>