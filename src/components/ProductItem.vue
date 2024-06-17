<script setup lang="ts">
import { formatCurrency } from '../utils/formatCurrency'

defineProps<{
  title: string,
  price: number
}>()

</script>
<template>
  <div>
    <p>{{ title }}</p> <br>
    <p>{{ formatCurrency(price) }}</p>
  </div>
</template>