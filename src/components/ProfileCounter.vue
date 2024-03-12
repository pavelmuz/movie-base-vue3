<template>
  <n-flex vertical :size="1" align="center">
    <p class="card-counter">{{ counter }}</p>
    <p class="card-text">{{ text }}</p>
  </n-flex>
</template>

<script setup>
import { NFlex } from 'naive-ui'

const props = defineProps({
  counter: {
    type: Number,
    required: false
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.card-counter {
  margin: 0;
  font-size: medium;
}

.card-text {
  margin: 0;
  font-size: medium;
}
</style>
