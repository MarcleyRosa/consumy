<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Request } from '../utils/fetch'
import { useRouter } from 'vue-router';
import imageStore from '../assets/loja-sem-foto.png'

const data = ref([])
const router = useRouter()

const start = (id: string) => {
  router.push(`/store/${id}/products`);
};

const url = 'http://localhost:3000'
onMounted(async() => {
  const request = new Request(url)

  data.value = await request.get('/stores')
  
})

</script>

<template>
  <div class="container mx-auto py-4">
    <h2 class="text-2xl font-bold mb-4">Lojas:</h2>

    <div class="flex flex-wrap -mx-4">
      <div v-for="{ name, id, image_url, active } in data" :key="id" :id="id" class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4">
        <button
          :disabled="!active"
          @click="() => start(id)"
          class="flex items-center bg-white rounded-lg p-4 w-full h-full transition-transform duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
          :class="{'opacity-50 cursor-not-allowed': !active}"
        >
          <img
            v-if="image_url"
            :src="url + image_url"
            alt="Store Image"
            class="w-16 h-16 rounded-full"
          >
          <img
            v-else
            :src="imageStore"
            alt="Default Image"
            class="w-16 h-16 rounded-full"
          >
          <div class="ml-4">
            <span class="text-lg font-semibold block">{{ name }}</span>
            <span v-if="!active" class="block text-sm text-red-500">Fechado</span>
            <span v-else class="block text-sm text-gray-500">Loja</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
