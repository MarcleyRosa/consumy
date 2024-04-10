<script setup lang="ts">
import { auth } from '@/auth';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const currentUser = ref(auth.currentUser())

const signOut = () => {
  auth.signOut(() => {
    currentUser.value = auth.currentUser()
  })
}

</script>

<template>
  <main>
    <h1>Delivety: Welcome</h1>
    <template v-if="currentUser">
      <h3>
        Hi, {{ currentUser.email }}
      </h3>
      <br>
      <nav>
        <a @click="signOut"></a>
      </nav>
    </template>
    <nav>
      <RouterLink :to="{ name: 'signin' }">Sign in</RouterLink>
    </nav>
  </main>
</template>