<script setup lang="ts">
  const message = defineModel('message', { default: "Holle Word" })
</script>
<template>
  <h1>Meu primeiro Componente</h1>

  <div>
    Dizendo Olá: {{ message }}
  </div>

  <input v-model="message" />
</template>