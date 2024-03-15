<template>
  <n-avatar :src="image" :size="diameter" color="#0b666a" round object-fit="cover" />
</template>

<script setup>
import { NAvatar } from 'naive-ui'

const props = defineProps({
  image: {
    type: String
  },
  size: {
    type: String,
    required: true
  }
})

const DiameterOptions = {
  small: 25,
  medium: 50,
  large: 90
}

const diameter = DiameterOptions[props.size]
</script>

<style scoped></style>
