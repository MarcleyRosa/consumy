<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings cent">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.cent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f4f4f4;
  text-align: center;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
   .greetings h3 {
    text-align: left;
  }
}
</style>
