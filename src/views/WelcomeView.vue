<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<template>
  <main>
    <h1>Delivety: Welcome</h1>
    <nav>
      <RouterLink :to="{ name: 'signin' }">Sign in</RouterLink>
    </nav>
  </main>
</template>