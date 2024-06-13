<script setup lang="ts">
import { formatCurrency } from '../utils/formatCurrency'

defineProps<{
  title: string,
  price: number,
  image: string
}>()

</script>
<template>
  <div>
    <p>{{ title }}</p> <br>
    <p>{{ formatCurrency(price) }}</p>
    <img width="100px" :src="image" alt="">
  </div>
</template>