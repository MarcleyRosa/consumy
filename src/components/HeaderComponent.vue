<script setup lang="ts">
import { ref } from 'vue';
import ModalCart from './ModalCart.vue';
import UserProfile from './UserProfile.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { PhShoppingCart, PhArrowArcLeft, PhSignOut, PhCalendarDots, PhUserCircle } from "@phosphor-icons/vue";
import { Auth } from '@/utils/auth';


const route = useRoute()
const router = useRouter()
const isModal = ref(false)

const auth = new Auth()

const isLoggedIn = ref(auth.isLoggedIn())
const filter = defineModel('filter', { default: ''})

const signOut = () => {
  auth.signOut(() => {
    isLoggedIn.value = auth.isLoggedIn()
  })
  router.push('/')
}

const onSubmit = () => {
  router.push({ path: '/search/itens', query: { q: filter.value } })
  filter.value = ''
}



</script>
<template>
  <div v-if="route.path !== '/' && route.path !== '/signin' && route.path !== '/signup'" class="bg-white shadow-md py-4 cent">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <div v-if="isModal">
          <ModalCart />
        </div>
        <UserProfile />
      </div>
      <!-- <PhMagnifyingGlass color="white" :size="20" weight="fill" />-->
      <form @submit.prevent="onSubmit" class="space-y-4">
      <div class="search-container">
        <input v-model="filter" class="search-input" type="text" placeholder="Busque por item ou loja">
        <button type="submit" style="display: none;"></button>
      </div>
      </form>
      <div class="flex items-center space-x-4">
        <RouterLink :to="{ name: 'profile' }">
          <PhUserCircle :size="32" weight="fill" />
        </RouterLink>
        <button
          v-if="route.path !== '/orders'"
          @click="() => router.push('/orders')"
        >
        <PhCalendarDots :size="32" weight="fill" />
        </button>
        <button @click="router.back()">
          <PhArrowArcLeft :size="32" weight="fill" />
        </button>
        <button
          @click="() => isModal = !isModal"
        >
        <PhShoppingCart :size="32" weight="fill" />
        </button>
        <button
            @click="signOut"
  
          >
          <PhSignOut :size="32" weight="fill" />
          </button>
      </div>
    </div>
  </div>
</template>



<style>
  .search-container {
    position: relative;
    display: inline-block;
    width: 300px;
  }
  
  .search-input {
    width: 100%;
    padding: 10px 30px 10px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .search-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    fill: white;
    width: 20px;
    height: 20px;
    pointer-events: none;
  }
</style>