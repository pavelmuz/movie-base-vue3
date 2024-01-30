<template>
  <!-- Profile card -->
  <div class="container card profile-card mx-auto mb-2">
    <div class="row py-3 px-3">
      <!-- Profile avatar -->
      <div class="col-auto">
        <img src="@/assets/images/test_avatar.png" class="avatar-img-lg" />
      </div>
      <!-- Profile info -->
      <div class="col-6 me-auto">
        <h3 class="card-title">{{ profile.username }}</h3>
        <p class="card-text">
          {{ profile.name }}
          {{ profile.birthday }}
        </p>
        <div class="row">
          <!-- Movies count -->
          <div class="col-auto text-center">
            <p class="card-text my-0 fw-light">6</p>
            <p class="card-txt my-0 fw-light">фильмы</p>
          </div>
          <!-- Followers count + modal button -->
          <div
            class="col-auto text-center modal-link"
            data-bs-toggle="modal"
            data-bs-target="#followers"
          >
            <p class="card-text my-0 fw-light">2</p>
            <p class="card-txt my-0 fw-light">подписчики</p>
          </div>
          <!-- Followers modal -->
          <div class="modal fade" id="followers" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <!-- Modal title -->
                  <h1 class="modal-title fs-5">Подписчики:</h1>
                  <button class="btn modal-close" data-bs-dismiss="modal">
                    <i class="fa-solid fa-xmark fa-xl"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <!-- Followers list -->
                  <div class="row">
                    <!-- Profile avatar -->
                    <div class="col-auto my-auto pe-0">
                      <a href="#" class="card-link text-decoration-none">
                        <img src="@/assets/images/test_avatar.png" class="avatar-img-md" />
                      </a>
                    </div>
                    <!-- Profile info -->
                    <div class="col-6 my-auto">
                      <a href="#" class="card-link text-decoration-none">
                        <div class="card-body">
                          <h5 class="card-title">test_user</h5>
                          <p class="card-subtitle">Test User</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Follow count + modal button -->
          <div
            class="col-auto text-center modal-link"
            data-bs-toggle="modal"
            data-bs-target="#following"
          >
            <p class="card-text my-0 fw-light">88</p>
            <p class="card-txt my-0 fw-light">подписки</p>
          </div>
          <!-- Follow modal -->
          <div class="modal fade" id="following" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <!-- Modal title -->
                  <h1 class="modal-title fs-5">Подписки:</h1>
                  <button class="btn modal-close" data-bs-dismiss="modal">
                    <i class="fa-solid fa-xmark fa-xl"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <!-- Follow list -->
                  <div class="row">
                    <!-- Profile avatar -->
                    <div class="col-auto my-auto pe-0">
                      <a href="#" class="card-link text-decoration-none">
                        <img src="@/assets/images/test_avatar.png" class="avatar-img-md" />
                      </a>
                    </div>
                    <!-- Profile info -->
                    <div class="col-6 my-auto">
                      <a href="#" class="card-link text-decoration-none">
                        <div class="card-body">
                          <h5 class="card-title">test_user</h5>
                          <p class="card-subtitle">Test User</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Profile options dropdown -->
      <div class="col-auto ms-auto">
        <div class="dropdown dropstart">
          <!-- Open dropdown button -->
          <button
            class="btn dropdown-btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-ellipsis fa-xl"></i>
          </button>
          <!-- Dropdown menu -->
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item edit-link" href="#">
                <i class="fa-solid fa-pen-to-square"></i> Изменить
              </a>
            </li>
            <li>
              <a class="dropdown-item delete-link" href="#">
                <i class="fa-solid fa-trash-can"></i> Удалить аккаунт
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <movie-card v-for="movie in feedData" :key="movie" :movie="movie" />
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import apiMovibase from '@/includes/apiMoviebase'
export default {
  name: 'Account',
  components: {
    MovieCard
  },
  data() {
    return {
      profile: {},
      feedData: {}
    }
  },
  async mounted() {
    try {
      this.profile = await apiMovibase.getProfile('477aed47-d388-46c9-9375-e21f8896a5ba')
      this.feedData = await apiMovibase.getProfileFeed('477aed47-d388-46c9-9375-e21f8896a5ba')
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.card-link,
.modal-close,
.notification-btn {
  color: #c3edc0;
}

.modal-close:hover {
  color: #9cbd99;
}

.link-active {
  color: #9cbd99;
}

.profile-card,
.modal-content {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.dropdown-btn {
  color: #c3edc0;
  border-color: transparent;
}

.dropdown-menu {
  border-color: #c3edc0;
  background-color: #0b666a;
}

.dropdown-item {
  color: #c3edc0;
}

.dropdown-item:hover {
  background-color: #0b666a;
}

.edit-link {
  color: #ffff00;
}

.edit-link:hover {
  color: #cccc00;
}

.delete-link {
  color: #fa1e0e;
}

.delete-link:hover {
  color: #c8180b;
}

.avatar-img-md {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-img-lg {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}

.modal-link {
  cursor: pointer;
}

.modal-header {
  border-bottom: 2px solid #c3edc0;
}
</style>
