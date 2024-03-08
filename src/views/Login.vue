<template>
  <div class="container">
    <n-card :bordered="false" class="login-card">
      <n-flex vertical>
        <h1 class="card-title">Войти в аккаунт</h1>
        <p class="card-text">Имя пользователя:</p>
        <n-input v-model:value="username" type="text" placeholder="" :autofocus="true" />
        <p class="card-text">Пароль:</p>
        <n-input
          v-model:value="password"
          type="password"
          placeholder=""
          show-password-on="mousedown"
        />
        <n-button
          @click="login"
          size="large"
          color="#C3EDC0"
          text-color="#0b666a"
          class="login-button"
          >Войти</n-button
        >
        <p class="card-text">
          Еще нет аккаунта?
          <strong @click="goToRegister" class="card-link">Зарегистрируйтесь</strong>
        </p>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { NButton, NCard, NFlex, NInput } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')

function goToRegister() {
  router.push({ name: 'register' })
}

async function login() {
  try {
    await authStore.login({
      username: username.value,
      password: password.value
    })
    router.push({ name: 'account' })
  } catch (error) {
    console.log('Error', error)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.login-card {
  max-width: 700px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.card-title,
.card-text {
  margin-top: 0;
  margin-bottom: 0;
}

.card-text {
  font-size: medium;
}

.login-button {
  width: 170px;
  margin-top: 10px;
  margin-right: auto;
  border-radius: 6px;
}

.login-button:hover {
  background-color: #9cbd99;
}

.card-link {
  cursor: pointer;
}
</style>
