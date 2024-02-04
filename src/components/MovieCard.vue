<template>
  <div class="container card movie-card mx-auto mb-2">
    <!-- Movie owner info -->
    <router-link
      v-if="showOwner"
      :to="{ name: 'profile', params: { id: movie.owner.id } }"
      class="row pt-2 card-link text-decoration-none"
    >
      <div class="col-auto">
        <img src="@/assets/images/test_avatar.png" class="avatar-img-sm" />
      </div>
      <div class="col ps-0">
        <p class="card-text">{{ movie.owner.username }}</p>
      </div>
    </router-link>
    <div class="row pt-2">
      <div class="col-4">
        <!-- Movie poster -->
        <img :src="movie.poster_url" class="rounded movie-card-poster" />
        <div class="row py-0">
          <!-- Like and unlike buttons -->
          <form action="" method="post" class="col-auto my-auto px-0">
            <button type="submit" class="btn card-button card-button" name="movie">
              <i class="fa-solid fa-heart fa-xl"></i>
            </button>
            <!-- <button type="submit" class="btn card-button" name="movie">
                <i class="fa-regular fa-heart fa-xl card-button"></i>
              </button> -->
          </form>
          <!-- New comment section -->
          <div class="col-auto my-auto ps-0">
            <!-- Add comment modal open button -->
            <p class="card-text modal-link mb-0" data-bs-toggle="modal" data-bs-target="#comment">
              <i class="fa-regular fa-message fa-xl card-button"></i>
            </p>
            <!-- Add comment modal -->
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
                    <!-- Add new comment form -->
                    <div class="row">
                      <form action="" method="post" class="pb-2">
                        <label class="form-label">Добавить комментарий:</label>
                        <textarea class="form-control" rows="3"></textarea>
                        <button type="submit" class="btn edit-btn" name="comment">Добавить</button>
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
        <a href="#" class="card-link text-decoration-none">
          <div class="row">
            <!-- Movie title -->
            <div class="col-8 me-auto pt-2">
              <h5 class="card-title">{{ movie.title }}</h5>
            </div>
            <!-- Movie options -->
            <div v-if="showOptions" class="col-auto">
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
                    <a class="dropdown-item edit-link" href="{% url 'edit-movie' movie.id %}">
                      <i class="fa-solid fa-pen-to-square"></i> Изменить
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item delete-link" href="{% url 'delete-movie' movie.id %}">
                      <i class="fa-solid fa-trash-can"></i> Удалить фильм
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p class="card-text"><strong>Рейтинг: </strong>{{ movie.user_rating }}</p>
          <p class="card-text"><strong>Обзор: </strong>{{ movie.user_review }}</p>
        </a>
      </div>
    </div>
    <!-- Total likes -->
    <div class="row">
      <!-- Likes modal open buuton -->
      <p class="card-text modal-link mb-0" data-bs-toggle="modal" data-bs-target="#modal">
        <strong>Нравится: </strong>{{ totalLikes }}
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
              <!-- List of users liked -->
              <div class="row">
                <!-- User avatar -->
                <div class="col-auto my-auto pe-0">
                  <a href="#" class="card-link text-decoration-none">
                    <img src="@/assets/images/test_avatar.png" class="avatar-img-md" />
                  </a>
                </div>
                <!-- User info -->
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
    <!-- Last 2 comments -->
    <div class="row pb-2">
      <p v-for="comment in cardComments" :key="comment" class="card-text mb-0">
        <strong>{{ comment.owner.username }}</strong> {{ comment.body }}
      </p>
    </div>
    <!-- Show all comments button -->
    <div class="row mb-2">
      <a href="#" class="card-link text-decoration-none">
        <p class="card-subtitle">Показать все комментарии ({{ totalComments }})</p>
      </a>
    </div>
  </div>
</template>

<script setup>
import apiMoviebase from '@/includes/apiMoviebase'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  showOwner: {
    type: Boolean,
    required: true
  },
  showOptions: {
    type: Boolean,
    required: true
  }
})

const likes = ref({})
const comments = ref({})
const cardComments = ref({})
const movieId = ref('')

const totalLikes = computed(() => likes.value.length)
const totalComments = computed(() => comments.value.length)

async function fetchMovieData() {
  movieId.value = props.movie.id
  try {
    likes.value = await apiMoviebase.getMovieLikes(movieId.value)
    comments.value = await apiMoviebase.getMovieComments(movieId.value)
    cardComments.value = await apiMoviebase.getMovieCardComments(movieId.value)
    cardComments.value.reverse()
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchMovieData()
})
</script>

<style scoped>
.card-link,
.modal-close {
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

.avatar-img-sm {
  width: 25px;
  height: 25px;
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
