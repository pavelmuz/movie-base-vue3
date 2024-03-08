<template>
  <div class="movie-container">
    <n-card class="movie-card2">
      <n-flex vertical>
        <!-- Movie owner -->
        <n-flex v-if="showOwner" @click.prevent="goToProfile(movie.owner.id)">
          <img :src="movie.owner.profile_image" class="avatar-img-sm" />
          <h6 class="card-text">{{ movie.owner.username }}</h6>
        </n-flex>
        <n-flex>
          <n-flex vertical>
            <!-- Poster -->
            <img :src="movie.poster_url" class="rounded movie-card-poster" />
            <n-flex>
              <!-- Like button -->
              <n-button
                v-if="likedMovie"
                text
                text-color="#C3EDC0"
                @click.prevent="$emit('removeLike', movie.id)"
              >
                <i class="fa-solid fa-heart fa-xl"></i>
              </n-button>
              <n-button
                v-if="!likedMovie"
                text
                text-color="#C3EDC0"
                @click.prevent="$emit('addLike', movie.id)"
              >
                <i class="fa-regular fa-heart fa-xl card-button"></i>
              </n-button>
              <!-- New comment button -->
              <n-button text text-color="#C3EDC0">
                <i class="fa-regular fa-message fa-xl card-button"></i>
              </n-button>
            </n-flex>
            <!-- Likes count -->
            <n-button text text-color="#C3EDC0" @click.prevent="showLikes = true">
              <strong>Нравится: </strong>{{ likesCount }}
            </n-button>
            <!-- Likers modal -->
            <n-modal v-model:show="showLikes">
              <n-card
                class="likes-modal"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
              >
                <n-flex vertical :size="1">
                  <h4>Нравится: {{ likesCount }}</h4>
                  <div
                    v-for="like in likes"
                    :key="like"
                    class="like"
                    @click.prevent="goToProfile(like.owner.id)"
                  >
                    <n-flex :size="30" class="liker">
                      <img :src="like.owner.profile_image" class="avatar-img-md" />
                      <n-flex vertical :size="1">
                        <h5>{{ like.owner.username }}</h5>
                        <p>{{ like.owner.name }}</p>
                      </n-flex>
                    </n-flex>
                  </div>
                </n-flex>
              </n-card>
            </n-modal>
          </n-flex>
          <n-flex vertical>
            <n-flex>
              <!-- Movie title -->
              <h5>{{ movie.title }}</h5>
              <!-- Movie options -->
              <n-button v-if="showOptions" :bordered="false" text-color="#C3EDC0" size="large" text>
                <i class="fa-solid fa-ellipsis fa-xl dropdown-btn"></i>
              </n-button>
            </n-flex>
            <!-- Movie rating -->
            <p><strong>Рейтинг: </strong>{{ movie.user_rating }}</p>
            <!-- Movie review -->
            <p><strong>Обзор: </strong>{{ movie.user_review }}</p>
          </n-flex>
        </n-flex>
        <!-- Last 2 comments -->
        <p v-for="comment in cardComments" :key="comment">
          <strong>{{ comment.owner.username }}</strong> {{ comment.body }}
        </p>
        <!-- Link to show all comments -->
        <p class="card-subtitle">Показать все комментарии ({{ commentsCount }})</p>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { NButton, NCard, NFlex, NModal } from 'naive-ui'
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
let profileId = localStorage.getItem('profileId')

const movie = ref({})
const cardComments = ref([])
const likesCount = ref(0)
const commentsCount = ref(0)
const likes = ref([])
const userRating = ref(0)
const userReview = ref('')
const commentMsg = ref('')
const showLikes = ref(false)

const likedMovie = computed(() => {
  return props.movie.likes.some((like) => like.owner.id === profileId)
})

const movieOwner = computed(() => {
  if (props.movie.owner.id === profileId) {
    return true
  }
  return false
})

function goToProfile(id) {
  if (id === profileId) {
    router.push({ name: 'account' })
  } else {
    router.push({ name: 'profile', params: { id: id } })
  }
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

.movie-card2 {
  max-width: 700px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.likes-modal {
  width: 500px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.liker {
  cursor: pointer;
}

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
