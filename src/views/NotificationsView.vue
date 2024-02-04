<template>
  <!-- Notifications card -->
  <div class="container card movie-card mb-2">
    <div class="row p-2">
      <h4 class="card-title">Уведомления</h4>
    </div>
  </div>

  <notification-card
    v-for="notification in notifications"
    :key="notification"
    :notification="notification"
    :notification-type="notification.notification_type"
  />
</template>

<script setup>
import NotificationCard from '@/components/NotificationCard.vue'
import apiMoviebase from '@/includes/apiMoviebase'
import { onMounted, ref } from 'vue'

const notifications = ref({})

async function fetchNotifications() {
  try {
    notifications.value = await apiMoviebase.getNotifications(
      '477aed47-d388-46c9-9375-e21f8896a5ba'
    )
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchNotifications()
})
</script>

<style scoped>
.movie-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}
</style>
