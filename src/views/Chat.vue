<template>
  <!-- Chat container -->
  <div class="container card chats-card">
    <!-- Back button -->
    <div class="row pb-2">
      <div class="col-auto pt-2">
        <router-link :to="{ name: 'chats' }" class="card-link text-decoration-none">
          <i class="fa-solid fa-chevron-left fa-xl"></i> Назад
        </router-link>
      </div>
    </div>
    <!-- Chat recipinet info -->
    <div class="row pb-2">
      <h5 class="card-title">
        Чат с пользователем:
        <a href="#" class="card-link text-decoration-none">
          <img :src="recipient.profile_image" class="avatar-img-sm mx-2" />
          {{ recipient.username }}
        </a>
      </h5>
    </div>
    <!-- Chat feed -->
    <div class="container card chat-feed">
      <div v-for="message in messageFeed" :key="message">
        <!-- Recipinets messages -->
        <div
          v-if="message.sender.id == recipientId"
          class="card py-2 my-2 message-bubble message-recipient"
        >
          <p class="card-text px-2">{{ message.body }}</p>
        </div>
        <!-- User messages -->
        <div
          v-else-if="message.sender.id == userId"
          class="card py-2 my-2 message-bubble message-sender ms-auto"
        >
          <p class="card-text px-2">{{ message.body }}</p>
        </div>
      </div>
    </div>
    <!-- Send message form -->
    <div class="row px-3">
      <textarea
        class="form-control message-input my-1"
        rows="2"
        placeholder="Введите сообщение"
        name="chat-message"
        v-model="message"
      ></textarea>
      <div class="col-auto">
        <button type="submit" class="btn edit-btn mb-2" @click.prevent="sendMessage">
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiChats from '@/services/apiChats'
import apiProfiles from '@/services/apiProfiles'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.userId
const recipientId = route.params.recipientId

const messageFeed = ref([])
const recipient = ref({})
const message = ref('')

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
.card-link {
  color: #c3edc0;
}

.edit-btn {
  background-color: #c3edc0;
}

.edit-btn:hover {
  background-color: #9cbd99;
}
.avatar-img-sm {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}
.chats-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 600px;
}

.chat-feed {
  background-color: #edf9ec;
}

.message-bubble {
  max-width: 220px;
}

.message-sender {
  background-color: #cff0cc;
}

.message-recipient {
  background-color: #afd5ac;
}

.message-input {
  background-color: #edf9ec;
}

.message-input:focus {
  background-color: #edf9ec;
  color: #0b666a;
}

::placeholder {
  color: #0b666a;
}
</style>
