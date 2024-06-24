<script setup lang="ts">
import { Auth } from '../utils/auth';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const auth = new Auth()

const currentUser = ref(auth.currentUser())

</script>

<template>
  <main class="w-full">
    <div class="container mx-auto flex flex-col lg:flex-row justify-between items-center">
      <template v-if="currentUser?.email">
        <div class="flex flex-col lg:flex-row items-center">
          <p class="text-sm lg:text-base font-semibold text-gray-800 mb-2 lg:mb-0">
            Hi, {{ currentUser && currentUser.email }}
          </p>
        </div>
      </template>
      <template v-else>
        <nav class="mt-2 lg:mt-0 space-x-4">
          <RouterLink
            :to="{ name: 'signin' }"
            class="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Sign in
          </RouterLink>
        </nav>
      </template>
    </div>
  </main>
</template>


<style scoped>
  .cent {
    background-color: bg-white;
    text-align: center;
    padding: 10px;
  }
</style>