<script setup lang="ts">
import { ref } from 'vue';
import ModalCart from './ModalCart.vue';
import NavBar from './NavBar.vue';
import UserProfile from './UserProfile.vue';

const isModal = ref(false)


</script>
<template>
  <div class="cent">
    <div v-if="isModal">
      <ModalCart />
    </div>
    <UserProfile />
    <NavBar />
    <button @click="() => isModal = !isModal">Carrinho</button>
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