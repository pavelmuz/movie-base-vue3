<template>
  <div class="chat-container">
    <n-card :bordered="false" class="chat-card">
      <n-flex vertical :size="3">
        <n-flex align="center" @click="goBack" size="small" class="back-button">
          <i class="fa-solid fa-chevron-left fa-xl"></i>
          <p>Назад</p>
        </n-flex>
        <n-flex align="center">
          <h3>Чат с пользователем:</h3>
          <n-flex align="center" @click="goToProfile(recipient.id)" class="profile-link">
            <img :src="recipient.profile_image" class="avatar-img-sm" />
            <h3>{{ recipient.username }}</h3>
          </n-flex>
        </n-flex>
        <n-card :bordered="false" class="chat-feed">
          <n-flex v-for="message in messageFeed" :key="message">
            <n-card
              v-if="message.sender.id == recipientId"
              :bordered="false"
              size="small"
              class="message-sender"
            >
              <p class="message-text">{{ message.body }}</p>
            </n-card>
            <n-card
              v-else-if="message.sender.id == userId"
              :bordered="false"
              size="small"
              class="message-recipient"
            >
              <p class="message-text">{{ message.body }}</p>
            </n-card>
          </n-flex>
        </n-card>
        <n-input
          v-model:value="message"
          type="textarea"
          placeholder="Введите сообщение"
          :rows="2"
          class="message-input"
        />
        <n-button
          @click="sendMessage"
          size="large"
          color="#C3EDC0"
          text-color="#0b666a"
          class="message-button"
          >Отправить</n-button
        >
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import apiChats from '@/services/apiChats'
import apiProfiles from '@/services/apiProfiles'
import { NButton, NCard, NFlex, NInput } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userId = computed(() => {
  return localStorage.getItem('profileId')
})
const recipientId = route.params.recipientId

const messageFeed = ref([])
const recipient = ref({})
const message = ref('')

function goBack() {
  router.back()
}

function goToProfile(id) {
  router.push({ name: 'profile', params: { id: id } })
}

async function fetchMessages() {
  try {
    messageFeed.value = await apiChats.getChat(recipientId)
  } catch (error) {
    console.log(error)
  }
}

async function fetchRecipient() {
  try {
    recipient.value = await apiProfiles.getProfile(recipientId)
  } catch (error) {
    console.log(error)
  }
}

async function sendMessage() {
  try {
    await apiChats.postMessage(recipientId, {
      message: message.value
    })
    message.value = ''
    await fetchMessages()
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchMessages()
  await fetchRecipient()
})
</script>

<style scoped>
.chat-container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.chat-card {
  max-width: 600px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.chat-feed {
  background-color: #edf9ec;
  overflow-y: auto;
  height: calc(100vh - 400px);
}

.message-button {
  width: 170px;
  margin-top: 10px;
  margin-right: auto;
  border-radius: 6px;
}

.message-button:hover {
  background-color: #9cbd99;
}

.avatar-img-sm {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}

.message-bubble {
  max-width: 220px;
}

.message-sender {
  background-color: #afd5ac;
  max-width: 220px;
  margin-right: auto;
  border-radius: 8px;
  margin-bottom: 2px;
}

.message-recipient {
  background-color: #cff0cc;
  max-width: 220px;
  margin-left: auto;
  border-radius: 8px;
  margin-bottom: 2px;
}

.message-text {
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 500;
  color: #0b666a;
}

.message-input {
  background-color: #edf9ec;
}

.back-button {
  cursor: pointer;
}

.back-button p {
  margin: 0;
}

.profile-link {
  cursor: pointer;
}
</style>
