<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Request } from '../utils/fetch'
import { useRouter } from 'vue-router';
import imageStore from '../assets/loja-sem-foto.png'

const data = ref([])
const router = useRouter()

const start = (event: MouseEvent) => {
  const { id } = event.target as HTMLButtonElement;
  console.log('idddddddd', id);
  
  router.push(`/store/${id}/products`);
};

const url = 'http://localhost:3000'
onMounted(async() => {
  const request = new Request(url)

  data.value = await request.get('/stores')
  
})

</script>

<template>
  <div>

    <h2><strong>Lojas:</strong></h2> <br>

    <div v-for="{ name, id, image_url } in data" :key="id" :id="id">
      <button @click="start" :id=id>
        <span :id="id">{{ name }}</span> <br>
        <img :id="id" style="width: 100px;" :src="image_url ? url + image_url : imageStore" alt="">
      </button>
      <br><br>
      <hr>
    </div>
  </div>
</template>