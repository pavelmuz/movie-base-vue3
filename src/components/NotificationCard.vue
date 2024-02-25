<template>
  <div class="container card movie-card mb-1">
    <div class="row py-1">
      <div class="col-auto my-auto pe-0">
        <a href="#" class="card-link text-decoration-none">
          <img :src="notification.sender.profile_image" class="avatar-img-sm" />
        </a>
      </div>
      <div v-if="notificationType == 'follow'" class="col-auto my-auto px-1">
        <a href="#" class="card-link text-decoration-none">
          <p class="card-text">{{ notification.sender.username }} подписался на вас</p>
        </a>
      </div>
      <div v-else-if="notificationType == 'like'" class="col-auto my-auto px-1">
        <a href="#" class="card-link text-decoration-none">
          <p class="card-text">{{ notification.sender.username }} нравится</p>
        </a>
      </div>
      <div v-else-if="notificationType == 'comment'" class="col-auto my-auto px-1">
        <a href="#" class="card-link text-decoration-none">
          <p class="card-text">{{ notification.sender.username }} прокомментировал:</p>
        </a>
      </div>
      <div v-else-if="notificationType == 'message'" class="col-auto my-auto px-1">
        <a href="#" class="card-link text-decoration-none">
          <p class="card-text">{{ notification.sender.username }} написал вам:</p>
        </a>
      </div>
      <div
        v-if="notificationType == 'like' || notificationType == 'comment'"
        class="col-6 my-auto me-auto ps-1"
      >
        <a href="#" class="card-link text-decoration-none">
          <p class="card-text">{{ notification.movie.title }}</p>
        </a>
      </div>
      <div v-else-if="notificationType == 'message'" class="col-6 my-auto me-auto ps-1">
        <a href="#" class="card-link text-decoration-none">
          <p class="card-text">{{ notification.message.body }}</p>
        </a>
      </div>
      <div class="col-auto ms-auto">
        <button class="btn notification-btn ps-auto" @click.prevent="deleteNotification">
          <i class="fa-solid fa-xmark fa-xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiNotifications from '@/services/apiNotifications'
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

async function deleteNotification() {
  try {
    await apiNotifications.deleteNotification(props.notification.id)
    location.reload()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.card-link,
.notification-btn {
  color: #c3edc0;
}

.notification-btn:hover {
  color: #9cbd99;
}

.movie-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.avatar-img-sm {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
