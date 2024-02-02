<template>
  <!-- Title card -->
  <div class="container search-user mx-auto mb-3">
    <!-- Search user form -->
    <form action="" method="get">
      <div class="row">
        <div class="col-9">
          <input
            type="text"
            class="form-control search-user-input"
            style="color: #0b666a"
            placeholder="Найти пользователя"
          />
        </div>
        <div class="col-3">
          <button type="submit" class="btn search-user-btn">
            <i class="fa-solid fa-magnifying-glass"></i> Найти
          </button>
        </div>
      </div>
    </form>
  </div>

  <!-- Found users list -->
  <div
    v-for="profile in profiles"
    :key="profile"
    class="container card search-user-card mx-auto my-1"
  >
    <div class="row">
      <!-- User Avatar -->
      <div class="col-1 my-auto">
        <a href="#" class="card-link text-decoration-none">
          <img src="@/assets/images/test_avatar.png" class="avatar-img-md" />
        </a>
      </div>
      <!-- User info -->
      <div class="col-8 my-auto">
        <a href="#" class="card-link text-decoration-none">
          <div class="card-body">
            <h5 class="card-title">{{ profile.username }}</h5>
            <p class="card-subtitle">{{ profile.name }}</p>
          </div>
        </a>
      </div>
      <!-- Follow-unfollow buttons -->
      <div class="col-3 my-auto">
        <!-- Unfollow action -->
        <button type="submit" class="btn following-btn" name="unfollow-{{ profile.id }}">
          Подписан
        </button>
        <!-- Follow action -->
        <!-- <button type="submit" class="btn follow-btn" name="follow-{{ profile.id }}">
          Подписаться
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import apiMoviebase from '@/includes/apiMoviebase'
import { onMounted, ref } from 'vue'

const profiles = ref({})

const getProfiles = async () => {
  try {
    profiles.value = await apiMoviebase.getProfiles()
  } catch (error) {
    console.log(error)
  }
}

onMounted(getProfiles)
</script>

<style scoped>
.card-link {
  color: #c3edc0;
}
.avatar-img-md {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.search-user-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 600px;
}

.follow-btn {
  background-color: transparent;
  border-color: #c3edc0;
  color: #c3edc0;
  width: 130px;
}

.follow-btn:hover {
  background-color: #c3edc0;
  color: #0b666a;
}

.following-btn {
  background-color: #c3edc0;
  width: 130px;
}

.following-btn:hover {
  background-color: transparent;
  border-color: #c3edc0;
}

.search-user {
  max-width: 600px;
}

.search-user-btn {
  background-color: transparent;
  border-color: #0b666a;
  color: #0b666a;
  width: 120px;
}

.search-user-btn:hover {
  background-color: #0b666a;
  color: #c3edc0;
}

.search-user-input::placeholder {
  color: #0b666a;
}
</style>
