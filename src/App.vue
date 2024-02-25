<template>
  <v-header />
  <router-view />
  <v-footer />
</template>

<script setup>
import vFooter from '@/components/vFooter.vue'
import vHeader from '@/components/vHeader.vue'
</script>
