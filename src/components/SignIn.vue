<script setup lang="ts">
import { ref } from 'vue';
import { Auth } from '../utils/auth'
import { useRouter } from 'vue-router';


const email = defineModel('email', { default: ''})
const password = defineModel('password', { default: ''})
const remember = defineModel('remember', { default: false})
const awaiting = ref(false)

const router = useRouter()

function onSubmit() {
  let auth = new Auth(remember.value)
  awaiting.value = true
  auth.signIn(email.value, password.value, () => {
    awaiting.value = false
    router.push('/stores')
  }, () => {
    awaiting.value = false
    console.log('Não foi dessa vez!');
  })

}

</script>
<template>
  <div>
    <p>Email de test: pasquale.wisozk@example.com</p>
    <h1>Sign In</h1>

    <form @submit.prevent="onSubmit" action="">

      <label for="">E-mail:
        <input v-model="email" type="email">
      </label> <br>
      <label for="">Senha:
        <input v-model="password" type="password">
      </label> <br>
      <label for="">Remember me:
        <input v-model="remember" type="checkbox">
      </label> <br>
      
      <button v-show="!awaiting" type="submit">Sign In</button>
    </form>
    
  </div>
</template>../utils/auth