<template>
  <li class="nav-item">
    <router-link :to="link" class="nav-link">{{ title }}</router-link>
  </li>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  link: {
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.nav-link {
  color: #c3edc0;
}

.nav-link:hover {
  color: #9cbd99;
}
</style>
