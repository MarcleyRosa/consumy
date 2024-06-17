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
    <div class="container mx-auto flex justify-between items-center">
      <template v-if="currentUser">
        <h3 class="text-lg font-semibold text-gray-800">
          Hi, {{ currentUser && currentUser.email }}
        </h3>
        <nav class="space-x-4">
          <button
            @click="signOut"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </nav>
      </template>
      <template v-else>
        <h3 class="text-lg font-semibold text-gray-800">
          Please log in to have access
        </h3>
        <nav class="space-x-4">
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
