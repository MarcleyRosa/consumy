<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Request } from '../utils/fetch'
import { useRouter } from 'vue-router';


const data = ref([])
const router = useRouter()

const start = (event: MouseEvent) => {
  const { id } = event.target as HTMLButtonElement;
  router.push(`/store/${id}/products`);
};


onMounted(async() => {
  const request = new Request('http://localhost:3000')

  data.value = await request.get('/stores')
  
})

</script>

<template>
  <div>

    <h2><strong>Lojas:</strong></h2> <br>

    <div v-for="{ name, id } in data" :key="id">
      <span>{{ name }}</span> <br>
      <button @click="start" :id=id>Entrar</button>
      <br><br>
      <hr>
    </div>
  </div>
</template>