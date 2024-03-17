<template>
  <div class="movie-container">
    <n-card :bordered="false" class="movie-card">
      <n-flex vertical :size="1">
        <!-- Movie owner -->
        <n-flex
          v-if="showOwner"
          align="center"
          class="profile-link"
          @click.prevent="goToProfile(movie.owner.id)"
        >
          <profile-avatar :image="movie.owner.profile_image" size="small" class="movie-owner" />
          <p class="movie-owner">{{ movie.owner.username }}</p>
        </n-flex>
        <n-flex :wrap="false">
          <n-flex vertical>
            <!-- Poster -->
            <movie-poster :image="movie.poster_url" size="large" />
            <n-flex v-if="authStore.isAuthenticated" class="movie-buttons">
              <!-- Like button -->
              <n-button
                v-if="likedMovie"
                text
                size="large"
                text-color="#C3EDC0"
                @click="emitRemoveLike(movie.id)"
              >
                <i class="fa-solid fa-heart fa-xl"></i>
              </n-button>
              <n-button
                v-if="!likedMovie"
                text
                size="large"
                text-color="#C3EDC0"
                @click="emitAddLike(movie.id)"
              >
                <i class="fa-regular fa-heart fa-xl card-button"></i>
              </n-button>
              <!-- New comment button -->
              <n-button text size="large" text-color="#C3EDC0" @click="showCommentModal = true">
                <i class="fa-regular fa-message fa-xl card-button"></i>
              </n-button>
              <!-- New comment modal -->
              <n-modal v-model:show="showCommentModal">
                <n-card
                  :bordered="false"
                  size="huge"
                  role="dialog"
                  aria-modal="true"
                  class="comment-modal"
                >
                  <n-flex vertical style="margin: 0">
                    <h2 class="modal-header">Комментарий:</h2>
                    <p class="input-label">Добавить комментарий:</p>
                    <n-input
                      v-model:value="commentMsg"
                      type="textarea"
                      placeholder=""
                      :rows="4"
                      class="comment-input"
                    />
                    <n-button
                      color="#C3EDC0"
                      text-color="#0b666a"
                      @click="emitAddComment({ commentMsg, movie })"
                      class="add-button"
                      >Добавить</n-button
                    >
                  </n-flex>
                </n-card>
              </n-modal>
            </n-flex>
            <!-- Likes count -->
            <n-button
              text
              text-color="#C3EDC0"
              @click.prevent="showLikesModal = true"
              class="likes-modal-open"
            >
              <strong>Нравится:</strong>{{ likesCount }}
            </n-button>
            <!-- Likers modal -->
            <likes-modal
              :likes="likes"
              :show="showLikesModal"
              @update:show="showLikesModal = $event"
            />
          </n-flex>
          <n-flex vertical class="movie-info">
            <n-flex :wrap="false">
              <!-- Movie title -->
              <h2 @click="goToMovieDetails(movie.id)">{{ movie.title }}</h2>
            </n-flex>
            <!-- Movie rating -->
            <n-flex align="center">
              <p><strong>Рейтинг: </strong></p>
              <n-rate :count="10" :allow-half="true" :value="movie.user_rating" readonly />
            </n-flex>
            <!-- Movie review -->
            <p><strong>Обзор: </strong>{{ movie.user_review }}</p>
          </n-flex>
          <!-- Movie options -->
          <options-dropdown
            v-if="showOptions"
            :show="showOptionsDropdown"
            @open-delete="showDeleteModal = true"
          />
          <!-- Delete Movie Modal -->
          <delete-movie-modal
            :show="showDeleteModal"
            :movie="movie"
            @update:show="showDeleteModal = $event"
            @close-modal="showDeleteModal = false"
            @remove-movie="$emit('removeMovie', movie)"
          />
        </n-flex>
        <!-- Last 2 comments -->
        <p v-for="comment in cardComments" :key="comment" class="card-comment">
          <strong>{{ comment.owner.username }}</strong> {{ comment.body }}
        </p>
        <!-- Link to show all comments -->
        <p @click="goToMovieDetails(movie.id)" class="all-comments">
          Показать все комментарии ({{ commentsCount }})
        </p>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import DeleteMovieModal from '@/components/DeleteMovieModal.vue'
import LikesModal from '@/components/LikesModal.vue'
import MoviePoster from '@/components/MoviePoster.vue'
import OptionsDropdown from '@/components/OptionsDropdown.vue'
import ProfileAvatar from '@/components/ProfileAvatar.vue'
import { useAuthStore } from '@/stores/authStore'
import { NButton, NCard, NFlex, NInput, NModal, NRate } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()
const authStore = useAuthStore()
const emit = defineEmits(['addComment', 'addLike', 'removeLike', 'removeMovie'])
const profileId = localStorage.getItem('profileId')

const movie = ref({})
const cardComments = ref([])
const likesCount = ref(0)
const commentsCount = ref(0)
const likes = ref([])
const userRating = ref(0)
const userReview = ref('')
const showCommentModal = ref(false)
const showLikesModal = ref(false)
const showOptionsDropdown = ref(false)
const showDeleteModal = ref(false)
const commentMsg = ref('')

const likedMovie = computed(() => {
  return props.movie.likes.some((like) => like.owner.id === profileId)
})

function emitAddComment({ commentMsg, movie }) {
  emit('addComment', { commentMsg, movie })
  showCommentModal.value = false
}

function emitAddLike(movieId) {
  emit('addLike', movieId)
}

function emitRemoveLike(movieId) {
  emit('removeLike', movieId)
}

function goToProfile(id) {
  if (id === profileId) {
    router.push({ name: 'account' })
  } else {
    router.push({ name: 'profile', params: { id: id } })
  }
}

function goToMovieDetails(id) {
  router.push({ name: 'movie', params: { movieId: id } })
}

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
.movie-container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.movie-card {
  max-width: 700px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.profile-link {
  cursor: pointer;
}

.movie-owner {
  margin-top: 0;
  margin-bottom: 10px;
}

.movie-buttons {
  margin-top: 10px;
}

.likes-modal-open {
  margin-right: auto;
  margin-top: 10px;
  font-size: medium;
}

.likes-modal-open strong {
  margin-right: 5px;
}

.movie-info h2,
.movie-info p,
.card-comment,
.all-comments {
  margin: 0;
}

.movie-info h2 {
  cursor: pointer;
}

.movie-info p,
.card-comment,
.all-comments {
  font-size: medium;
}

.all-comments {
  cursor: pointer;
}

.comment-modal {
  width: 500px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.modal-header {
  border-bottom: 1px solid #c3edc0;
  padding-bottom: 10px;
  margin: 0;
}

.input-label {
  margin-bottom: 0;
  margin: 0;
}

.comment-input {
  border-radius: 6px;
}

.add-button {
  width: 150px;
  border-radius: 6px;
  margin-top: 10px;
}
</style>
