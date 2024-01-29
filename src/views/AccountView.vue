<template>
  <!-- Profile card -->
  <div class="container card profile-card mx-auto">
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

  <div id="cards-list">
    <!-- Profile movies list -->
    {% for movie in movies %}
    <!-- Movie card -->
    <div v-for="movie in feedData" :key="movie" class="container card movie-card mx-auto my-2">
      <div class="row pt-2">
        <!-- Poster, like, comment section -->
        <div class="col-4">
          <!-- Movie poster -->
          <img :src="movie.poster_url" class="rounded movie-card-poster" />
          <!-- Like and unlike buttons -->
          <div class="row py-0">
            <form action="" method="post" class="col-auto my-auto px-0">
              <button class="btn card-button">
                <i class="fa-solid fa-heart fa-xl card-button"></i>
              </button>
              <!-- <button class="btn card-button">
                <i class="fa-regular fa-heart fa-xl card-button"></i>
              </button> -->
            </form>
            <div class="col-auto my-auto ps-0">
              <!-- Add new comment button -->
              <p class="card-text modal-link mb-0" data-bs-toggle="modal" data-bs-target="#comment">
                <i class="fa-regular fa-message fa-xl card-button"></i>
              </p>
              <!-- Add new comment modal -->
              <div class="modal fade" id="comment" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <!-- Modal title -->
                      <h1 class="modal-title fs-5">Комментарий:</h1>
                      <button class="btn modal-close" data-bs-dismiss="modal">
                        <i class="fa-solid fa-xmark fa-xl"></i>
                      </button>
                    </div>
                    <div class="modal-body">
                      <!-- Add comment form -->
                      <div class="row">
                        <form action="" method="post" class="pb-2">
                          <label class="form-label">Добавить комментарий:</label>
                          <textarea class="form-control" rows="3"></textarea>
                          <button type="submit" class="btn edit-btn" name="comment">
                            Добавить
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Movie info -->
        <div class="col-8">
          <!-- Movie title + options -->
          <div class="row">
            <!-- Movie title -->
            <div class="col-8 me-auto pt-2">
              <h5 class="card-title">{{ movie.title }}</h5>
            </div>
            <!-- Movie options -->
            <div class="col-auto">
              <!-- Movie options dropdown -->
              <div class="dropdown dropstart">
                <!-- Open dropdown -->
                <button
                  class="btn dropdown-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-ellipsis fa-xl"></i>
                </button>
                <!-- Dropdown -->
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item edit-link" href="#">
                      <i class="fa-solid fa-pen-to-square"></i> Изменить
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item delete-link" href="#">
                      <i class="fa-solid fa-trash-can"></i> Удалить фильм
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Movie rating and review -->
          <a href="#" class="card-link text-decoration-none">
            <p class="card-text"><strong>Рейтинг: </strong>{{ movie.user_rating }}</p>
            <p class="card-text"><strong>Обзор: </strong>{{ movie.user_review }}</p>
          </a>
        </div>
      </div>
      <!-- Likes section -->
      <div class="row">
        <!-- Total likes + open likes modal -->
        <p class="card-text modal-link mb-0" data-bs-toggle="modal" data-bs-target="#modal">
          <strong>Нравится: </strong>88
        </p>
        <!-- Likes modal -->
        <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <!-- Modal title -->
                <h1 class="modal-title fs-5">Нравится:</h1>
                <button class="btn modal-close" data-bs-dismiss="modal">
                  <i class="fa-solid fa-xmark fa-xl"></i>
                </button>
              </div>
              <div class="modal-body">
                <!-- Likers list -->
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
                        <p class="card-subtitle">Pavel Muz</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Last comments -->
      <div class="row pb-2">
        <!-- Last comments list -->
        <p class="card-text mb-0"><strong>test_user</strong> Some test comment</p>
      </div>
      <!-- Show all comments button -->
      <div class="row mb-2">
        <a href="#" class="card-link text-decoration-none">
          <p class="card-subtitle">Показать все комментарии (76)</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import apiMovibase from '@/includes/apiMoviebase'
export default {
  name: 'Account',
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

.movie-card,
.profile-card,
.modal-content {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.movie-card-poster {
  max-width: 220px;
}

.card-button {
  color: #c3edc0;
}

.edit-btn {
  background-color: #c3edc0;
}

.edit-btn:hover {
  background-color: #9cbd99;
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
