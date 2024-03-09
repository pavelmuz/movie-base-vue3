<template>
  <!-- Notifications card -->
  <div class="title-container">
    <n-card :bordered="false" class="title-card">
      <n-flex>
        <h1 class="card-title">Уведомления</h1>
      </n-flex>
    </n-card>
  </div>

  <div v-if="notifications.length === 0" class="container">
    <n-card :bordered="false" class="title-card">
      <n-flex>
        <h3>Для вас нет уведомлений</h3>
      </n-flex>
    </n-card>
  </div>

  <notification-card
    v-for="notification in notifications"
    :key="notification"
    :notification="notification"
    :notification-type="notification.notification_type"
    @remove-notification="removeNotification"
  />
</template>

<script setup>
import NotificationCard from '@/components/NotificationCard.vue'
import apiNotifications from '@/services/apiNotifications'
import { NCard, NFlex } from 'naive-ui'
import { onMounted, ref } from 'vue'

const notifications = ref([])

async function fetchNotifications() {
  try {
    notifications.value = await apiNotifications.getNotifications()
  } catch (error) {
    console.log(error)
  }
}

async function removeNotification(notificationId) {
  try {
    await apiNotifications.deleteNotification(notificationId)
    await fetchNotifications()
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchNotifications()
})
</script>

<style scoped>
.title-container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.title-card {
  max-width: 700px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.card-title {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
