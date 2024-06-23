<script setup lang="ts">
import { formatDate } from '@/utils'
import { Request } from '@/utils/fetch'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import type { User } from '../utils/interfacesType.ts'
import { useRouter } from 'vue-router'

const url = 'http://localhost:3000'
const request = new Request(url)
const data = ref<User>({} as User)
const router = useRouter()

onMounted(async () => {
  data.value = await request.get('/profile')
})

function confirmAction() {
  Swal.fire({
    title: 'Você tem certeza?',
    text: 'Você não poderá reverter isso!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, prosseguir!',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await request.delete(`/profile/${data.value.id}`)
      router.push('/')
      console.log('Ação confirmada!')
      Swal.fire('Confirmado!', 'Sua ação foi confirmada.', 'success')
    } else {
      console.log('Ação cancelada!')
    }
  })
}
</script>

<template>
  <div class="profile-container bg-white p-6 rounded-lg shadow-md">
    <p class="profile-title text-2xl font-semibold mb-4">Profile</p>
    <button @click="confirmAction" class="delete-button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Excluir Perfil</button>
    <p class="email text-lg text-gray-700 mt-4">{{ data.email }}</p>
    <p class="created-at text-gray-500">{{ `Conta criada em: ${formatDate(data.created_at)}` }}</p>
    <div v-if="data.address" class="address mt-4">
      <p class="address-title text-lg font-medium">Endereço:</p>
      <p class="address-details text-gray-700">
        {{
          `${data.address.street} N° ${data.address.house_number}, ${data.address.neighborhood} - ${data.address.city}-${data.address.state}`
        }}
      </p>
      <p class="zip-code text-gray-500">{{ `CEP: ${data.address.zip_code}` }}</p>
    </div>
  </div>
</template>

