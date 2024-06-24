<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Request } from '../utils/fetch';
import { useRouter } from 'vue-router';
import imageStore from '../assets/loja-sem-foto.png';
import noProductImg from '../assets/produto-sem-foto.png';

const data = ref([]);
const router = useRouter();
const products = ref({ result: { products: [] } });

const start = (id: string) => {
  router.push(`/store/${id}/products`);
};

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
    <div class="flex flex-wrap -mx-4">
      <div
        v-for="{ name, id, image_url, active } in data"
        :key="id"
        :id="id"
        class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4"
      >
        <button
          :disabled="!active"
          @click="() => start(id)"
          class="flex items-center bg-white rounded-lg p-4 w-full h-full transition-transform duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
          :class="{ 'opacity-50 cursor-not-allowed': !active }"
        >
          <img
            v-if="image_url"
            :src="url + image_url"
            alt="Store Image"
            class="w-16 h-16 rounded-full"
          />
          <img
            v-else
            :src="imageStore"
            alt="Default Image"
            class="w-16 h-16 rounded-full"
          />
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

