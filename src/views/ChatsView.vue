<template>
  <!-- Chats card -->
  <div class="container card chats-card mb-2" id="cards-list">
    <div class="row p-2 py-3 my-auto">
      <h4 class="card-title my-auto">Чаты</h4>
    </div>
  </div>

  <!-- Active chats -->
  <div v-for="chat in activeChats" :key="chat" class="container card chats-card my-1">
    <div class="row py-2">
      <!-- Prodile avatar -->
      <div class="col-auto my-auto">
        <img src="@/assets/images/test_avatar.png" class="avatar-img-md" />
      </div>
      <!-- Profile username -->
      <div class="col-auto my-auto">
        <h5 class="card-text">{{ chat.username }}</h5>
      </div>
      <!-- Link to chat -->
      <div class="col-auto my-auto ms-auto me-3">
        <router-link
          class="card-link"
          :to="{
            name: 'chat',
            params: { userId: '477aed47-d388-46c9-9375-e21f8896a5ba', recipientId: chat.id }
          }"
          role="button"
        >
          <i class="fa-solid fa-chevron-right fa-2xl"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiMoviebase from '@/includes/apiMoviebase'
import { onMounted, ref } from 'vue'

const activeChats = ref({})

async function fetchActiveChats() {
  try {
    activeChats.value = await apiMoviebase.getActiveChats('477aed47-d388-46c9-9375-e21f8896a5ba')
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
