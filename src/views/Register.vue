<template>
  <div class="container card auth-card mx-auto">
    <div class="row p-2">
      <!-- Card title -->
      <h4 class="card-title">Создать аккаунт</h4>
      <!-- Register form -->
      <div>
        <div class="mb-3">
          <label class="form-label">Имя пользователя:</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            name="username"
            style="color: #0b666a"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Полное имя:</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            name="fullname"
            style="color: #0b666a"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Электронная почта:</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            name="email"
            style="color: #0b666a"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Пароль:</label>
          <input
            v-model="password1"
            type="password"
            class="form-control"
            name="password"
            style="color: #0b666a"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Подтвердите пароль:</label>
          <input
            v-model="password2"
            type="password"
            class="form-control"
            name="confirm-password"
            style="color: #0b666a"
          />
        </div>
        <button @click.prevent="register" class="btn auth-btn mt-2">Создать аккаунт</button>
      </div>

      <!-- Login link -->
      <p class="card-text py-3">
        Уже есть аккаунт?
        <router-link :to="{ name: 'login' }" class="card-link">Войдите</router-link>
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
const name = ref('')
const email = ref('')
const password1 = ref('')
const password2 = ref('')

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
  width: 160px;
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
