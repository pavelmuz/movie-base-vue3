<template>
  <div class="container auth-card card mx-auto">
    <div class="row p-2">
      <!-- Card title -->
      <h4 class="card-title">Войти в аккаунт</h4>
      <!-- Login form -->
      <div>
        <div class="mb-3">
          <label class="form-label">Имя пользователя:</label>
          <input
            type="text"
            v-model="username"
            class="form-control"
            name="username"
            style="color: #0b666a"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Пароль:</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            name="password"
            style="color: #0b666a"
          />
        </div>
        <button class="btn auth-btn" @click="login">Войти</button>
      </div>
      <p class="card-text pt-2 mb-1">или войдите с помощью:</p>
      <!-- Social Logins -->
      <div class="row me-auto">
        <div class="col-auto">
          <a class="btn social-btn me-2 my-2" href="#" role="button">
            <i class="fa-brands fa-google"></i> Google
          </a>
        </div>
        <div class="col-auto">
          <a class="btn social-btn me-2 my-2" href="#" role="button">
            <i class="fa-brands fa-yandex"></i> Яндекс
          </a>
        </div>
        <div class="col-auto">
          <a class="btn social-btn me-2 my-2" href="#" role="button">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
        </div>
        <div class="col-auto">
          <a class="btn social-btn me-2 my-2" href="#" role="button">
            <i class="fa-solid fa-at"></i> Mail.Ru
          </a>
        </div>
      </div>
      <!-- Forgot passowrd and register links -->
      <a href="http://localhost:8000/reset_password/" class="card-link mt-2">Забыли пароль?</a>
      <p class="card-text my-3">
        Еще нет аккаунта?
        <router-link :to="{ name: 'register' }" class="card-link">Зарегистрируйтесь</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')

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
.card-link {
  color: #c3edc0;
}

.auth-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.auth-btn {
  background-color: #c3edc0;
  width: 130px;
}

.auth-btn:hover {
  background-color: #9cbd99;
}

.social-btn {
  background-color: #c3edc0;
  width: 130px;
}

.social-btn:hover {
  background-color: #9cbd99;
}
</style>
