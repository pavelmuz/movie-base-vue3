<template>
  <nav class="navbar fixed-top navbar-expand-lg mb-3">
    <div class="container-fluid">
      <router-link :to="{ name: 'feed' }">
        <img src="@/assets/images/logo.png" class="rounded-circle img-fluid mx-3 nav-logo" />
      </router-link>
      <router-link class="navbar-brand" :to="{ name: 'feed' }">Movie Base</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fa-solid fa-bars fa-lg"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <header-link :link="{ name: 'feed' }" title="Лента" />
          <header-link :link="{ name: 'profiles' }" title="Найти" />
          <header-link :link="{ name: 'search' }" title="Добавить фильм" />
          <header-link :link="{ name: 'notifications' }" title="Уведомления" />
          <header-link :link="{ name: 'chats' }" title="Сообщения" />
          <header-link :link="{ name: 'account' }" title="Профиль" />
          <header-link :link="{ name: 'login' }" title="Войти/Регистрация" />
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8000/api">API</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
              ><i class="fa-solid fa-right-from-bracket fa-lg"></i> Выйти</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import HeaderLink from '@/components/HeaderLink.vue'
</script>

<style scoped>
.navbar {
  background-color: #1b3333;
}

.nav-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-link,
.navbar-brand {
  color: #c3edc0;
}

.nav-link:hover,
.navbar-brand:hover {
  color: #9cbd99;
}
.link-active {
  color: #9cbd99;
}
.navbar-toggler {
  color: #c3edc0;
  border-color: #c3edc0;
}
</style>
