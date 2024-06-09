<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import { Request } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const data = ref([])
const route = useRoute()
const url = 'http://localhost:3000';
onMounted(async () => {
  const request = new Request(url)

  data.value = await request.get(`/store/${route.params.id}/products`)
})

</script>

<template>
  <div>
    <h1>Products</h1>
    <div v-for="{ title, id, price, image_url, store_id } in data" :key="id">
      <router-link :to="{ name: 'store/product', params: { id, store_id } }">
       <ProductItem :title="title" :price="price" :image="url + image_url" />
      </router-link> <br> <br>
      <br><br>
      <hr>
    </div>
  </div>
</template>