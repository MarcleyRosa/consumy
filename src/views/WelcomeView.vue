<script setup lang="ts">
import UserProfile from '../components/UserProfile.vue'
import capa1 from '../assets/esque1.jpeg'
import capa2 from '../assets/dire1.jpeg'

</script>

<template>
  <div class="min-h-screen grid grid-cols-12">
    <div class="col-span-4 bg-cover bg-center" :style="{ backgroundImage: `url(${capa1})` }"></div>
    <div class="col-span-4 flex items-center justify-center bg-white bg-opacity-75">
      <div class="p-8 rounded-lg shadow-lg">
        <UserProfile />
      </div>
    </div>
    <div class="col-span-4 bg-cover bg-center" :style="{ backgroundImage: `url(${capa2})` }"></div>
  </div>
</template>