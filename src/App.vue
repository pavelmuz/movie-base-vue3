<template>
  <n-message-provider>
    <v-header />
    <router-view />
  </n-message-provider>
</template>

<script setup>
import VHeader from '@/components/VHeader.vue'
import { NMessageProvider } from 'naive-ui'
</script>
