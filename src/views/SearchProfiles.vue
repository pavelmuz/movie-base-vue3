<template>
  <!-- Title card -->
  <div class="container search-user mx-auto mb-3">
    <!-- Search user form -->
    <div class="row">
      <div class="col-9">
        <input
          type="text"
          class="form-control search-user-input"
          style="color: #0b666a"
          placeholder="Найти пользователя"
        />
      </div>
      <div class="col-3">
        <button type="submit" class="btn search-user-btn">
          <i class="fa-solid fa-magnifying-glass"></i> Найти
        </button>
      </div>
    </div>
  </div>

  <!-- Found users list -->
  <search-profile-card v-for="profile in profiles" :profile="profile" />
</template>

<script setup>
import SearchProfileCard from '@/components/SearchProfileCard.vue'
import apiProfiles from '@/services/apiProfiles'
import { onMounted, ref } from 'vue'

const profiles = ref([])

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
.search-user {
  max-width: 600px;
}

.search-user-btn {
  background-color: transparent;
  border-color: #0b666a;
  color: #0b666a;
  width: 120px;
}

.search-user-btn:hover {
  background-color: #0b666a;
  color: #c3edc0;
}

.search-user-input::placeholder {
  color: #0b666a;
}
</style>
