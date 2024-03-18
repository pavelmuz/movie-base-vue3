<template>
  <n-image
    :src="image"
    :width="width"
    object-fit="scale-down"
    :preview-disabled="true"
    class="movie-poster"
  />
</template>

<script setup>
import { NImage } from 'naive-ui'

const props = defineProps({
  image: {
    type: String
  },
  size: {
    type: String,
    required: true
  }
})

const WidthOptions = {
  small: 80,
  medium: 120,
  large: 220
}

const width = WidthOptions[props.size]
</script>

<style scoped>
.movie-poster {
  margin-top: 0;
  margin-right: 10px;
  border-radius: 6px;
}
</style>
