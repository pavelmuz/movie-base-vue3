<template>
  <!-- Chat container -->
  <div class="container card chats-card">
    <!-- Back button -->
    <div class="row pb-2">
      <div class="col-auto pt-2">
        <a href="#" @click.prevent="goBack" class="card-link text-decoration-none">
          <i class="fa-solid fa-chevron-left fa-xl"></i> Назад
        </a>
      </div>
    </div>
    <!-- Chat recipinet info -->
    <div class="row pb-2">
      <h5 class="card-title">
        Чат с пользователем:
        <router-link
          :to="{ name: 'profile', params: { id: recipientId } }"
          class="card-link text-decoration-none"
        >
          <img :src="recipient.profile_image" class="avatar-img-sm mx-2" />
          {{ recipient.username }}
        </router-link>
      </h5>
    </div>
    <!-- Chat feed -->
    <div ref="chatFeedRef" class="container card chat-feed">
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
    <div class="row">
      <form action="">
        <textarea
          class="form-control message-input my-1"
          rows="2"
          placeholder="Введите сообщение"
          name="chat-message"
          v-model="message"
        ></textarea>

        <button type="submit" class="btn edit-btn mb-2" @click.prevent="sendMessage">
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import apiChats from '@/services/apiChats'
import apiProfiles from '@/services/apiProfiles'
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
const chatFeedRef = ref(null)

function goBack() {
  router.back()
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

function scrollToEnd() {
  chatFeedRef.value.scrollTop = chatFeedRef.value.scrollHeight
}

onMounted(async () => {
  await fetchMessages()
  await fetchRecipient()
  scrollToEnd()
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
  overflow-y: auto;
  height: calc(100vh - 340px);
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
