<template>
  <!-- Chats card -->
  <div class="title-container">
    <n-card :bordered="false" class="title-card">
      <n-flex>
        <h1 class="card-title">Чаты</h1>
      </n-flex>
    </n-card>
  </div>

  <div v-if="activeChats.length === 0" class="title-container">
    <n-card :bordered="false" class="title-card">
      <n-flex>
        <h3>У вас нет активных чатов</h3>
      </n-flex>
    </n-card>
  </div>

  <!-- Active chats -->
  <div v-for="chat in activeChats" :key="chat" class="chat-container">
    <n-card @click="goToChat(chat.id)" :bordered="false" class="chat-card">
      <n-flex align="center">
        <img :src="chat.profile_image" class="avatar-img-md" />
        <p>{{ chat.username }}</p>
        <n-button text text-color="#C3EDC0" class="chat-button"
          ><i class="fa-solid fa-chevron-right fa-2xl"></i
        ></n-button>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import apiChats from '@/services/apiChats'
import { NButton, NCard, NFlex } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeChats = ref([])

function goToChat(id) {
  router.push({ name: 'chat', params: { recipientId: id } })
}

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
.title-container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.title-card {
  max-width: 600px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.chat-container {
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}

.chat-card {
  max-width: 600px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
  cursor: pointer;
}

.card-title {
  margin-top: 0;
  margin-bottom: 0;
}

.avatar-img-md {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.chat-button {
  margin-left: auto;
}

p {
  font-size: large;
  font-weight: 500;
  margin: 0;
}
</style>
