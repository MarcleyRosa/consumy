<script setup lang="ts">
import { Auth } from '../utils/auth';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const auth = new Auth()
const router = useRouter()

const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const signOut = () => {
  auth.signOut(() => {
    isLoggedIn.value = auth.isLoggedIn()
  })
  router.push('/')
}


</script>

<template>
  <main class="bg-white py-4">
    <div class="container mx-auto flex flex-col lg:flex-row justify-between items-center">
      <template v-if="currentUser">
        <div class="flex flex-col lg:flex-row items-center">
          <p class="text-sm lg:text-base font-semibold text-gray-800 mb-2 lg:mb-0">
            Hi, {{ currentUser && currentUser.email }}
          </p>
          <button
            @click="signOut"
            class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 mt-2 lg:mt-0 lg:ml-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3m10 8V4m0 16v-8"></path>
            </svg>
            Sair
          </button>
        </div>
      </template>
      <template v-else>
        <h3 class="text-sm lg:text-base font-semibold text-gray-800">
          Please log in to have access
        </h3>
        <nav class="mt-2 lg:mt-0 space-x-4">
          <RouterLink
            :to="{ name: 'signin' }"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign in
          </RouterLink>
        </nav>
      </template>
    </div>
  </main>
</template>