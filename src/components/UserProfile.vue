<script setup lang="ts">
import { auth } from '../auth';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const signOut = () => {
  auth.signOut(() => {
    isLoggedIn.value = auth.isLoggedIn()
  })
}

</script>

<template>
  <main>
    <template v-if="currentUser">
      <h3>
        Hi, {{ currentUser && currentUser.email }}
      </h3>
      <br>
      <nav>
        <a @click="signOut"></a>
      </nav>
    </template>
    <template v-else>
      <h3>Please log in to have access</h3>
      <br>
      <nav>
        <RouterLink :to="{ name: 'signin' }">Sign in</RouterLink>
      </nav>
    </template>
  </main>
</template>