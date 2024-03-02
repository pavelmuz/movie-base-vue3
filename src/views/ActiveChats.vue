<template>
  <!-- Chats card -->
  <div class="container card chats-card mb-2" id="cards-list">
    <div class="row p-2 py-3 my-auto">
      <h4 class="card-title my-auto">Чаты</h4>
    </div>
  </div>

  <div v-if="activeChats.length === 0" class="container card chats-card mb-1">
    <div class="row py-1">
      <p class="card-text">У вас нет активных чатов</p>
    </div>
  </div>

  <!-- Active chats -->
  <div v-for="chat in activeChats" :key="chat" class="container card chats-card my-1">
    <router-link
      class="card-link row py-2 text-decoration-none"
      :to="{
        name: 'chat',
        params: { recipientId: chat.id }
      }"
      role="button"
    >
      <!-- Prodile avatar -->
      <div class="col-auto my-auto">
        <img :src="chat.profile_image" class="avatar-img-md" />
      </div>
      <!-- Profile username -->
      <div class="col-auto my-auto">
        <h5 class="card-text">{{ chat.username }}</h5>
      </div>
      <!-- Link to chat -->
      <div class="col-auto my-auto ms-auto me-3">
        <i class="fa-solid fa-chevron-right fa-2xl"></i>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import apiChats from '@/services/apiChats'
import { onMounted, ref } from 'vue'

const activeChats = ref([])

async function fetchActiveChats() {
  try {
    activeChats.value = await apiChats.getActiveChats()
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchActiveChats()
})
</script>

<style scoped>
.card-link {
  color: #c3edc0;
}

.avatar-img-md {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.chats-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 600px;
}
</style>
