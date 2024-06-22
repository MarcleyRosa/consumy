<script setup lang="ts">
import { Request } from '@/utils/fetch'
import { reactive, ref } from 'vue'
import { PhCheckFat, PhXCircle } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = defineModel('email', { default: '' })
const password = defineModel('password', { default: '' })
const password_confirmation = defineModel('password_confirmation', { default: '' })
const street = defineModel('street', { default: '' })
const house_number = defineModel('house_number', { default: '' })
const neighborhood = defineModel('neighborhood', { default: '' })
const city = defineModel('city', { default: '' })
const state = defineModel('state', { default: '' })
const zip_code = defineModel('zip_code', { default: '' })
const message = ref('')

const url = 'http://localhost:3000'
const request = new Request(url)

const signUp = async () => {
  const body = reactive({
    user: {
      email,
      password,
      password_confirmation,
      address: { street, house_number, neighborhood, city, state, zip_code }
    }
  })
  try {
    const { email: data } = (await request.post('/new', body)) as { email: string | undefined }

    if (data) {
      router.push('/signin')
    }
  } catch (error) {
    message.value = 'Ocorreu um erro ao tentar criar a conta'
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
    <form @submit.prevent="signUp" action="">
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email:</label>
        <input required id="email" v-model="email" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Senha:</label>
        <div class="flex items-center">
          <input id="password" v-model="password" type="password" class="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <PhXCircle v-if="password_confirmation !== password || password.length < 4" color="red" :size="20" weight="fill" class="ml-2" />
          <PhCheckFat v-else color="green" :size="20" weight="fill" class="ml-2" />
        </div>
      </div>
      <div class="mb-6">
        <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-700">Confirme a Senha:</label>
        <div class="flex items-center">
          <input id="password_confirmation" v-model="password_confirmation" type="password" class="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <PhXCircle v-if="password_confirmation !== password || password.length < 4" color="red" :size="20" weight="fill" class="ml-2" />
          <PhCheckFat v-else color="green" :size="20" weight="fill" class="ml-2" />
        </div>
      </div>
      <p class="mb-6 text-lg font-semibold text-gray-700">Endereço</p>
      <div class="mb-6">
        <label for="street" class="block mb-2 text-sm font-medium text-gray-700">Rua:</label>
        <input required id="street" v-model="street" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="mb-6">
        <label for="house_number" class="block mb-2 text-sm font-medium text-gray-700">N°:</label>
        <input required id="house_number" v-model="house_number" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="mb-6">
        <label for="neighborhood" class="block mb-2 text-sm font-medium text-gray-700">Bairro:</label>
        <input required id="neighborhood" v-model="neighborhood" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="mb-6">
        <label for="city" class="block mb-2 text-sm font-medium text-gray-700">Cidade:</label>
        <input required id="city" v-model="city" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="mb-6">
        <label for="state" class="block mb-2 text-sm font-medium text-gray-700">Estado:</label>
        <input required id="state" v-model="state" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="mb-6">
        <label for="zip_code" class="block mb-2 text-sm font-medium text-gray-700">CEP:</label>
        <input required id="zip_code" v-model="zip_code" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="flex flex-col items-center">
        <button
          :disabled="password_confirmation !== password || password.length < 4"
          type="submit"
          class="px-6 py-3 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          Criar conta
        </button>
        <p v-if="password_confirmation !== password" class="text-red-500">Senhas não são iguais</p>
        <p v-if="password.length < 4" class="text-red-500">Senha menor que 4 caracteres</p>
        <p v-if="message" class="text-red-500">{{ message }}</p>
      </div>
    </form>
  </div>
</template>
