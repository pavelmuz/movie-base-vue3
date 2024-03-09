<template>
  <div class="notification-container">
    <n-card :bordered="false" class="notification-card">
      <n-flex align="center" :size="7">
        <n-flex
          @click="goToProfile(notification.sender.id)"
          align="center"
          :size="8"
          class="card-link"
        >
          <img :src="notification.sender.profile_image" class="avatar-img-sm" />
          <p>{{ notification.sender.username }}</p>
        </n-flex>
        <p v-if="notificationType == 'follow'">подписался на вас</p>
        <p v-else-if="notificationType == 'like'">нравится</p>
        <p v-else-if="notificationType == 'comment'">прокомментировал:</p>
        <p v-else-if="notificationType == 'message'">написал вам:</p>

        <p
          v-if="notificationType == 'like' || notificationType == 'comment'"
          @click="goToMovie(notification.movie.id)"
          class="card-link"
        >
          {{ notification.movie.title }}
        </p>
        <p
          v-else-if="notificationType == 'message'"
          @click="goToChat(notification.sender.id)"
          class="card-link"
        >
          {{ notification.message.body }}
        </p>
        <n-button
          @click="$emit('removeNotification', notification.id)"
          text
          text-color="#C3EDC0"
          class="delete-button"
          ><i class="fa-solid fa-xmark fa-xl"></i
        ></n-button>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import { NButton, NCard, NFlex } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  notification: {
    type: Object,
    required: true
  },
  notificationType: {
    type: String,
    required: true
  }
})

const router = useRouter()

const notification = ref({})

function goToProfile(id) {
  router.push({ name: 'profile', params: { id: id } })
}

function goToMovie(id) {
  router.push({ name: 'movie', params: { movieId: id } })
}

function goToChat(id) {
  router.push({ name: 'chat', params: { recipientId: id } })
}

watch(
  () => props.notification,
  (newValue, oldValue) => {
    if (newValue) {
      notification.value = newValue
    }
  },
  { immediate: true, deep: true }
)
</script>

<style scoped>
.notification-container {
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}

.notification-card {
  max-width: 700px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.avatar-img-sm {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}

.delete-button {
  margin-left: auto;
}

.card-link {
  cursor: pointer;
}

p {
  font-size: medium;
}
</style>
