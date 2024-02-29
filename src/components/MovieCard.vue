<template>
  <div class="container card movie-card mx-auto mb-2">
    <!-- Movie owner info -->
    <router-link
      v-if="showOwner && movieOwner"
      :to="{ name: 'account' }"
      class="row pt-2 card-link text-decoration-none"
    >
      <div class="col-auto">
        <img :src="movie.owner.profile_image" class="avatar-img-sm" />
      </div>
      <div class="col ps-0">
        <p class="card-text">{{ movie.owner.username }}</p>
      </div>
    </router-link>
    <router-link
      v-if="showOwner && !movieOwner"
      :to="{ name: 'profile', params: { id: movie.owner.id } }"
      class="row pt-2 card-link text-decoration-none"
    >
      <div class="col-auto">
        <img :src="movie.owner.profile_image" class="avatar-img-sm" />
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
            <button
              v-if="likedMovie"
              class="btn card-button card-button"
              name="movie"
              @click.prevent="$emit('removeLike', movie.id)"
            >
              <i class="fa-solid fa-heart fa-xl"></i>
            </button>
            <button
              v-if="!likedMovie"
              class="btn card-button"
              name="movie"
              @click.prevent="$emit('addLike', movie.id)"
            >
              <i class="fa-regular fa-heart fa-xl card-button"></i>
            </button>
          </form>
          <!-- New comment section -->
          <div class="col-auto my-auto ps-0">
            <!-- Add comment modal open button -->
            <p
              class="card-text modal-link mb-0"
              data-bs-toggle="modal"
              :data-bs-target="'#comment' + movie.id"
            >
              <i class="fa-regular fa-message fa-xl card-button"></i>
            </p>
            <!-- Add comment modal -->
            <div class="modal fade" :id="'comment' + movie.id" tabindex="-1" aria-hidden="true">
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
                        <textarea
                          class="form-control"
                          rows="3"
                          v-model="commentMsg"
                          style="color: #0b666a"
                        ></textarea>
                        <button
                          class="btn edit-btn mt-2"
                          name="comment"
                          data-bs-dismiss="modal"
                          @click.prevent="$emit('addComment', movie.id, commentMsg)"
                        >
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
        <router-link
          :to="{ name: 'movie', params: { movieId: movie.id } }"
          class="card-link text-decoration-none"
        >
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
                    <a
                      class="dropdown-item edit-link"
                      data-bs-toggle="modal"
                      :data-bs-target="'#edit-' + movie.id"
                    >
                      <i class="fa-solid fa-pen-to-square"></i> Изменить
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item delete-link"
                      data-bs-toggle="modal"
                      :data-bs-target="'#delete-' + movie.id"
                    >
                      <i class="fa-solid fa-trash-can"></i> Удалить фильм
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Delete Movie modal -->
            <div class="modal fade" :id="'delete-' + movie.id" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5">
                      Вы действительно хотите удалить {{ movie.title }}?
                    </h1>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-auto">
                        <button class="btn edit-btn mt-2" data-bs-dismiss="modal" name="comment">
                          Отмена
                        </button>
                      </div>
                      <div class="col-auto">
                        <button
                          class="btn delete-btn mt-2"
                          name="comment"
                          @click.prevent="$emit('removeMovie', movie.id)"
                          data-bs-dismiss="modal"
                        >
                          <i class="fa-solid fa-trash-can"></i> Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Edit Movie modal -->
            <div class="modal fade" :id="'edit-' + movie.id" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5">Изменить {{ movie.title }}:</h1>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label class="form-label">Обзор:</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        style="color: #0b666a"
                        v-model="userReview"
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Рейтинг:</label>
                      <input
                        type="number"
                        v-model="userRating"
                        class="form-control"
                        style="color: #0b666a"
                      />
                    </div>
                    <div class="row">
                      <div class="col-auto">
                        <button class="btn edit-btn mt-2" data-bs-dismiss="modal" name="comment">
                          Отмена
                        </button>
                      </div>
                      <div class="col-auto">
                        <button
                          class="btn save-btn mt-2"
                          name="comment"
                          @click.prevent="$emit('editMovie', movie.id, userReview, userRating)"
                          data-bs-dismiss="modal"
                        >
                          <i class="fa-solid fa-pen-to-square"></i> Изменить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="card-text"><strong>Рейтинг: </strong>{{ movie.user_rating }}</p>
          <p class="card-text"><strong>Обзор: </strong>{{ movie.user_review }}</p>
        </router-link>
      </div>
    </div>
    <!-- Total likes -->
    <div class="row">
      <!-- Likes modal open buuton -->
      <p
        class="card-text modal-link mb-0"
        data-bs-toggle="modal"
        :data-bs-target="'#likes-' + movie.id"
      >
        <strong>Нравится: </strong>{{ likesCount }}
      </p>
      <!-- Likes modal -->
      <div class="modal fade" :id="'likes-' + movie.id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <!-- Modal title -->
              <h1 class="modal-title fs-5">Нравится: {{ likesCount }}</h1>
              <button class="btn modal-close" data-bs-dismiss="modal">
                <i class="fa-solid fa-xmark fa-xl"></i>
              </button>
            </div>
            <div class="modal-body">
              <!-- List of users liked -->
              <div v-for="like in likes" :key="like" class="row">
                <!-- User avatar -->
                <div class="col-auto my-auto pe-0">
                  <a href="#" class="card-link text-decoration-none">
                    <img :src="like.owner.profile_image" class="avatar-img-md" />
                  </a>
                </div>
                <!-- User info -->
                <div class="col-6 my-auto">
                  <a href="#" class="card-link text-decoration-none">
                    <div class="card-body">
                      <h5 class="card-title">{{ like.owner.username }}</h5>
                      <p class="card-subtitle">{{ like.owner.name }}</p>
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
        <p class="card-subtitle">Показать все комментарии ({{ commentsCount }})</p>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

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

const movie = ref({})
const cardComments = ref([])
const likesCount = ref(0)
const commentsCount = ref(0)
const likes = ref([])
const userRating = ref(0)
const userReview = ref('')
const commentMsg = ref('')
let profileId = localStorage.getItem('profileId')

const likedMovie = computed(() => {
  return props.movie.likes.some((like) => like.owner.id === profileId)
})

const movieOwner = computed(() => {
  if (props.movie.owner.id === profileId) {
    return true
  }
  return false
})

watch(
  () => props.movie,
  (newValue, oldValue) => {
    if (newValue) {
      movie.value = newValue
      cardComments.value = newValue.comments.slice(-2)
      likesCount.value = newValue.likes.length
      commentsCount.value = newValue.comments.length
      likes.value = newValue.likes
      userRating.value = newValue.user_rating
      userReview.value = newValue.user_review
    }
  },
  { immediate: true, deep: true }
)
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

.delete-btn {
  background-color: #fa1e0e;
}

.delete-btn:hover {
  background-color: #c8180b;
}

.save-btn {
  background-color: #ffff00;
}

.save-btn:hover {
  background-color: #cccc00;
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
