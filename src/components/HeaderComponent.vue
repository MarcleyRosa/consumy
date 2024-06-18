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
          class="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M14 4a2 2 0 0 1 2 2v.153l-1.061 6.365a2 2 0 0 1-1.973 1.634H7.034a2 2 0 0 1-1.973-1.634L4 6.153V6a2 2 0 0 1 2-2h8ZM5.293 7.293A1 1 0 0 1 6 7h8a1 1 0 0 1 .707 1.707L13.414 14H6.586l-1.293-5.293ZM7 16a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"/>
          </svg>
          Carrinho
        </button>
        <button @click="() => router.push('/stores')" class="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-3.586c0-.377-.21-.725-.553-.895l-4-2.5a1 1 0 0 1 0-1.61l4-2.5a1 1 0 0 1 1.106.104A1 1 0 0 1 11 7.586V11a1 1 0 0 0 1 1h4a1 1 0 0 1 0 2h-4v2a1 1 0 0 1-1 1Zm1-12.414V3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2.414L3.276 8.07 6 9.828V13a1 1 0 0 0 1 1h4a1 1 0 0 1 0 2H7a3 3 0 0 1-3-3v-3.172l1.724-1.758L7 4.414V3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1.414l1.276 1.758L14 8.828V12a1 1 0 0 1-1 1h-4a1 1 0 0 0-1 1v2h4a3 3 0 0 0 3-3V9.828l2.724-1.758L17 5.414V3a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v2.414l2.724 1.758L10 7.828V11a1 1 0 0 0 1 1h4a1 1 0 0 1 0 2h-4v-2Z"/>
          </svg>
        </button>
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