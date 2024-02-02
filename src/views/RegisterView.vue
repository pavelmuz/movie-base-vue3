<template>
  <div class="container card auth-card mx-auto">
    <div class="row p-2">
      <!-- Card title -->
      <h4 class="card-title">Создать аккаунт</h4>
      <!-- Register form -->
      <form action="" method="post">
        <div class="mb-3">
          <label class="form-label">Имя пользователя:</label>
          <input type="text" class="form-control" name="username" style="color: #0b666a" />
        </div>
        <div class="mb-3">
          <label class="form-label">Полное имя:</label>
          <input type="text" class="form-control" name="fullname" style="color: #0b666a" />
        </div>
        <div class="mb-3">
          <label class="form-label">Электронная почта:</label>
          <input type="email" class="form-control" name="email" style="color: #0b666a" />
        </div>
        <div class="mb-3">
          <label class="form-label">Пароль:</label>
          <input type="password" class="form-control" name="password" style="color: #0b666a" />
        </div>
        <div class="mb-3">
          <label class="form-label">Подтвердите пароль:</label>
          <input
            type="password"
            class="form-control"
            name="confirm-password"
            style="color: #0b666a"
          />
        </div>
        <button type="submit" class="btn auth-btn mt-2">Создать аккаунт</button>
      </form>
      <!-- Login link -->
      <p class="card-text py-3">
        Уже есть аккаунт?
        <router-link :to="{ name: 'login' }" class="card-link">Войдите</router-link>
      </p>
    </div>
  </div>
</template>

<script setup></script>

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
