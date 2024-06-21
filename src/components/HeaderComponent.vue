<script setup lang="ts">
import { ref } from 'vue';
import ModalCart from './ModalCart.vue';
import UserProfile from './UserProfile.vue';
import { useRoute, useRouter } from 'vue-router';
import { PhShoppingCart, PhArrowArcLeft, PhSignOut, PhCalendarDots } from "@phosphor-icons/vue";
import { Auth } from '@/utils/auth';


const route = useRoute()
const router = useRouter()
const isModal = ref(false)

const auth = new Auth()

const isLoggedIn = ref(auth.isLoggedIn())

const signOut = () => {
  auth.signOut(() => {
    isLoggedIn.value = auth.isLoggedIn()
  })
  router.push('/')
}



</script>
<template>
  <div v-if="route.path !== '/' && route.path !== '/signin'" class="bg-white shadow-md py-4 cent">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <div v-if="isModal">
          <ModalCart />
        </div>
        <UserProfile />
      </div>
      <div class="flex items-center space-x-4">
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



<style scoped>
  .cent {
    background-color: darkgray;
    text-align: center;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
</style>