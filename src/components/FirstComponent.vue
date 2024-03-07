<script setup lang="ts">
  const message = defineModel('message', { default: "Holle Word" })

  function limpar() {
    message.value = ''
  }
</script>
<template>
  <h1>Meu primeiro Componente</h1>

  <div>
    Dizendo Olá: {{ message }}
    <br>
    <button @click="limpar">apaga tudo!</button>
  </div>

  <input v-model="message" />
</template>