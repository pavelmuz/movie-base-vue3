<template>
  <div class="container">
    <n-card :bordered="false" class="search-card">
      <n-flex justify="space-between" align="center">
        <n-input
          v-model:value="searchQuery"
          type="text"
          placeholder="Найти пользователя"
          size="large"
          class="search-input"
        />
        <n-button ghost color="#0b666a" class="search-button"
          ><i class="fa-solid fa-magnifying-glass"></i> Найти</n-button
        >
      </n-flex>
    </n-card>
  </div>

  <!-- Found users list -->
  <search-profile-card v-for="profile in profiles" :profile="profile" />
</template>

<script setup>
import SearchProfileCard from '@/components/SearchProfileCard.vue'
import apiProfiles from '@/services/apiProfiles'
import { NButton, NCard, NFlex, NInput } from 'naive-ui'
import { onMounted, ref } from 'vue'

const profiles = ref([])
const searchQuery = ref('')

async function fetchProfiles() {
  try {
    profiles.value = await apiProfiles.getProfiles()
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchProfiles()
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}

.search-card {
  max-width: 600px;
  background-color: transparent;
  color: #c3edc0;
  border-radius: 10px;
}

.search-input {
  flex: 1;
}

.search-user {
  max-width: 600px;
}

.search-button {
  width: 120px;
  border-radius: 6px;
}

.search-button:hover {
  background-color: #0b666a;
  color: #c3edc0;
}

.search-user-input::placeholder {
  color: #0b666a;
}
</style>
