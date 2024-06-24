<script setup lang="ts">
import UserProfile from '../components/UserProfile.vue'

</script>

<template>
  <div class="min-h-screen bg-cover bg-center flex items-center justify-center" style="background-image: url('path-to-your-background-image.jpg');">
    <div class="w-full max-w-4xl mx-auto bg-white bg-opacity-75 rounded-lg shadow-lg overflow-hidden">
      <div class="grid grid-cols-12">
        <div class="col-span-12 lg:col-span-8 flex items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-purple-500">
          <div class="text-center text-white">
            <h1 class="text-4xl font-bold mb-4">Bem-vindo ao Delivry</h1>
            <p class="text-lg mb-8">Please log in to have access</p>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4 flex items-center justify-center bg-white p-8">
          <UserProfile />
        </div>
      </div>
    </div>
  </div>
</template>