<script setup lang="ts">
import { ref } from 'vue';
import { Auth } from '../utils/auth'
import { useRouter } from 'vue-router';


const email = defineModel('email', { default: ''})
const password = defineModel('password', { default: ''})
const remember = defineModel('remember', { default: false})
const awaiting = ref(false)
const message = ref('')

const router = useRouter()

function onSubmit() {
  let auth = new Auth(remember.value)
  awaiting.value = true
  auth.signIn(email.value, password.value, () => {
    awaiting.value = false
    router.push('/stores')
  }, () => {
    awaiting.value = false
    message.value = 'usuário ou senha inválido'
    console.log('Não foi dessa vez!');
  })

}

</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <p class="text-gray-600 mb-4">Email de teste: pasquale.wisozk@example.com</p>
      <h1 class="text-2xl font-bold mb-6 text-center">Sign In</h1>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-gray-700">E-mail:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700">Senha:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <p style="color: red" v-if="message">{{ message }}</p>
        <div class="flex items-center">
          <input
            v-model="remember"
            type="checkbox"
            id="remember"
            class="mr-2"
          />
          <label for="remember" class="text-gray-700">Remember me</label>
        </div>
        <button
          :disabled="awaiting"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="submit"
           @click="router.push('/signup')"
        >
        Criar conta
        </button>
        <button
          :disabled="awaiting"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
input[type="checkbox"]:checked + label .w-5 {
  @apply bg-blue-500 border-blue-500;
}
input[type="checkbox"]:checked + label .w-5::after {
  content: "";
  @apply block w-3 h-3 bg-white rounded-sm;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
}
</style>