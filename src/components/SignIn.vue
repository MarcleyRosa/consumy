<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '../auth'
import { useRouter } from 'vue-router';


const email = defineModel('email', { default: ''})
const password = defineModel('password', { default: ''})
const awaiting = ref(false)

const router = useRouter()

function onSubmit() {
  awaiting.value = true
  auth.signIn(email.value, password.value, () => {
    awaiting.value = false
    router.push('/')
  })

}

</script>
<template>
  <div>
    <h1>Sign In</h1>

    <form @submit.prevent="onSubmit()" action="">

      <label for="">E-mail:
        <input v-model="email" type="email">
      </label> <br>
      <label for="">Senha:
        <input v-model="password" type="password">
      </label> <br>
      
      <button v-show="!awaiting" type="submit">Sign In</button>
    </form>
    
  </div>
</template>