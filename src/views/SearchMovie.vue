<template>
  <div class="container">
    <n-card :bordered="false" class="search-card">
      <n-flex vertical>
        <h1 class="card-title">Найти фильм</h1>
        <p class="card-text">Название:</p>
        <n-input v-model:value="movieTitle" type="text" placeholder="" :autofocus="true" />
        <n-button
          size="large"
          color="#C3EDC0"
          text-color="#0b666a"
          :disabled="buttonEnabled"
          class="search-button"
          @click="goToSearchResults"
          ><i class="fa-solid fa-magnifying-glass"></i> Найти</n-button
        >
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import { NButton, NCard, NFlex, NInput } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const movieTitle = ref('')

const buttonEnabled = computed(() => {
  return movieTitle.value === ''
})

function goToSearchResults() {
  router.push({ name: 'search-results', params: { title: movieTitle.value } })
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.search-card {
  max-width: 700px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.card-title,
.card-text {
  margin-top: 0;
  margin-bottom: 0;
}

.card-text {
  font-size: medium;
}

.search-button {
  width: 170px;
  margin-top: 10px;
  margin-right: auto;
  border-radius: 6px;
}

.search-button:hover {
  background-color: #9cbd99;
}
</style>
