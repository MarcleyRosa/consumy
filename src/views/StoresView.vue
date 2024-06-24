<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Request } from '../utils/fetch';
import noProductImg from '../assets/produto-sem-foto.png';
import StoreComponenent from '../components/StoreComponent.vue'

const data = ref([]);
const products = ref({ result: { products: [] } });

const carouselWrapper = ref<HTMLElement | null>(null);
const currentIndex = ref(0);

const nextSlide = () => {
  if (carouselWrapper.value) {
    const items = carouselWrapper.value.children;
    if (currentIndex.value < items.length - 1) {
      currentIndex.value++;
      scrollCarousel();
    }
  }
};

const prevSlide = () => {
  if (carouselWrapper.value) {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      scrollCarousel();
    }
  }
};

const scrollCarousel = () => {
  if (carouselWrapper.value) {
    const width = carouselWrapper.value.clientWidth;
    carouselWrapper.value.scrollTo({
      left: width * currentIndex.value,
      behavior: 'smooth',
    });
  }
};

const url = 'http://localhost:3000';
onMounted(async () => {
  const request = new Request(url);

  data.value = await request.get('/stores');
  const page = Math.round(Math.random() * 6)

  products.value = await request.post('/products/linsting', { page, locale: 'pt-BR' });
});
</script>


<template>
  <div class="container mx-auto py-4">
    <div class="carousel-container relative">
      <div class="flex overflow-x-hidden space-x-4" ref="carouselWrapper">
        <div
        v-for="{ title, price, image_url, id } in products.result.products"
        :key="id"
        class="product-item flex-shrink-0 w-40 p-2"
        >
        <RouterLink class="product-item flex-shrink-0 w-40 p-2" :to="{ name: 'store/product', params: { store_id: 1, id } }">
            <div class="bg-white p-2 rounded-lg shadow-md">
              <p class="text-xs font-semibold">{{ title }}</p>
              <p class="text-xs text-gray-700">{{ price }}</p>
              <img :src="image_url ? url + image_url : noProductImg" alt="" class="w-full h-32 object-cover mt-1" />
            </div>
        </RouterLink>
      </div>
      </div>
      <button @click="prevSlide" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg">
        &lt;
      </button>
      <button @click="nextSlide" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg">
        &gt;
      </button>
    </div>
    <h2 class="text-2xl font-bold mb-4">Lojas:</h2>
    <StoreComponenent :data="data" />
  </div>
</template>

