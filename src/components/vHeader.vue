<template>
  <div class="container">
    <n-card :bordered="false" class="navbar">
      <n-flex align="center">
        <n-flex class="brand" @click.prevent="goTo('feed')">
          <img src="@/assets/images/logo.png" class="nav-logo" />
          <h2>MovieBase</h2>
        </n-flex>
        <h3 @click="goTo('feed')" class="navlink">Лента</h3>
        <h3 @click="goTo('profiles')" class="navlink">Найти</h3>
        <h3 v-if="authStore.isAuthenticated" @click="goTo('search')" class="navlink">
          Добавить фильм
        </h3>
        <h3 v-if="authStore.isAuthenticated" @click="goTo('notifications')" class="navlink">
          Уведомления
        </h3>
        <h3 v-if="authStore.isAuthenticated" @click="goTo('chats')" class="navlink">Сообщения</h3>
        <h3 v-if="authStore.isAuthenticated" @click="goTo('account')" class="navlink">Профиль</h3>
        <h3 v-if="!authStore.isAuthenticated" @click="goTo('login')" class="navlink">
          Войти/Регистрация
        </h3>
        <h3 v-if="authStore.isAuthenticated" @click="logout" class="navlink">
          <i class="fa-solid fa-right-from-bracket fa-lg"></i> Выйти
        </h3>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { NCard, NFlex, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const message = useMessage()

function goTo(routeName) {
  router.push({ name: routeName })
}

async function logout() {
  try {
    await authStore.logout()
    router.push({ name: 'login' })
    message.success('Вы вышли из аккаунта', {
      closable: true,
      duration: 5e3
    })
  } catch (error) {
    console.log('Logout error')
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  margin-bottom: 1%;
}

.navbar {
  width: 100%;
  background-color: #1b3333;
  color: #c3edc0;
  border-radius: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.navbar h2 {
  margin-right: 10px;
}

.brand {
  cursor: pointer;
}

.brand:hover {
  color: #9cbd99;
}

.navlink {
  cursor: pointer;
}

.navlink:hover {
  color: #9cbd99;
}

.nav-logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
