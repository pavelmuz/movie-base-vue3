<template>
  <div class="container">
    <n-card :bordered="false" class="register-card">
      <n-flex vertical>
        <h1 class="card-title">Создать аккаунт</h1>
        <p class="card-text">Имя пользователя:</p>
        <n-input v-model:value="username" type="text" placeholder="" :autofocus="true" />
        <p class="card-text">Полное имя:</p>
        <n-input v-model:value="name" type="text" placeholder="" />
        <p class="card-text">Электронная почта:</p>
        <n-input v-model:value="email" type="text" placeholder="" />
        <p class="card-text">Пароль:</p>
        <n-input
          v-model:value="password1"
          type="password"
          placeholder=""
          show-password-on="mousedown"
        />
        <p class="card-text">Подтвердите пароль:</p>
        <n-input
          v-model:value="password2"
          type="password"
          placeholder=""
          show-password-on="mousedown"
        />
        <n-button
          @click="register"
          size="large"
          color="#C3EDC0"
          text-color="#0b666a"
          class="register-button"
          >Создать аккаунт</n-button
        >
        <p class="card-text">
          Уже есть аккаунт?
          <strong @click="goToLogin" class="card-link">Войдите</strong>
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
const name = ref('')
const email = ref('')
const password1 = ref('')
const password2 = ref('')

function goToLogin() {
  router.push({ name: 'login' })
}

async function register() {
  try {
    await authStore.register({
      username: username.value,
      email: email.value,
      first_name: name.value,
      password1: password1.value,
      password2: password2.value
    })
    router.push({ name: 'feed' })
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.register-card {
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

.register-button {
  width: 170px;
  margin-top: 10px;
  margin-right: auto;
  border-radius: 6px;
}

.register-button:hover {
  background-color: #9cbd99;
}

.card-link {
  cursor: pointer;
}
</style>
