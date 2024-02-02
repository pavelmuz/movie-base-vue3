<template>
  <div class="container auth-card card mx-auto">
    <div class="row p-2">
      <!-- Card title -->
      <h4 class="card-title">Войти в аккаунт</h4>
      <!-- Login form -->
      <form action="" method="post">
        <div class="mb-3">
          <label class="form-label">Имя пользователя:</label>
          <input type="text" class="form-control" name="username" style="color: #0b666a" />
        </div>
        <div class="mb-3">
          <label class="form-label">Пароль:</label>
          <input type="password" class="form-control" name="password" style="color: #0b666a" />
        </div>
        <button type="submit" class="btn auth-btn">Войти</button>
      </form>
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
      <a href="#" class="card-link mt-2">Забыли пароль?</a>
      <p class="card-text my-3">
        Еще нет аккаунта?
        <router-link :to="{ name: 'register' }" class="card-link">Зарегистрируйтесь</router-link>
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
