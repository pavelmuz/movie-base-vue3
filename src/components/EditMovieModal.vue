<template>
  <n-modal :show="showModal" @update:show="updateShowEditMovie">
    <n-card :bordered="false" role="dialog" aria-modal="true" class="edit-modal">
      <n-flex vertical>
        <h2>{{ movie.title }}</h2>
      </n-flex>
      <n-flex :wrap="false" align="start">
        <movie-poster :image="movie.poster_url" size="medium" />
        <n-flex vertical :size="1">
          <p>Ваш обзор:</p>
          <n-input
            v-model:value="movie.user_review"
            type="textarea"
            placeholder=""
            :autosize="{ minRows: 3, maxRows: 5 }"
            class="message-input"
          />
          <p>Ваша оценка:</p>
          <n-rate
            :count="10"
            :allow-half="true"
            :value="movie.user_rating"
            :on-update:value="handleRating"
            size="large"
          />
          <n-flex align="center" :size="20" class="modal-buttons">
            <n-button
              color="#C3EDC0"
              text-color="#0b666a"
              @click="emitCloseModal"
              class="cancel-button"
              >Омена</n-button
            >
            <n-button
              color="#C3EDC0"
              text-color="#0b666a"
              @click="emitEditMovie(movie)"
              class="save-button"
              ><i class="fa-solid fa-floppy-disk"></i> Сохранить</n-button
            >
          </n-flex>
        </n-flex>
      </n-flex>
    </n-card>
  </n-modal>
</template>

<script setup>
import MoviePoster from '@/components/MoviePoster.vue'
import { NButton, NCard, NFlex, NInput, NModal, NRate } from 'naive-ui'
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  movie: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:show', 'closeModal', 'editMovie'])
const showModal = ref(props.show)
const movie = ref(props.movie)

function updateShowEditMovie(newValue) {
  emit('update:show', newValue)
}

function emitCloseModal() {
  emit('closeModal')
}

function emitEditMovie(movie) {
  emit('editMovie', movie)
}

function handleRating(value) {
  movie.value.user_rating = value
}

watch(
  () => props.show,
  (newVal) => {
    showModal.value = newVal
  }
)
</script>

<style scoped>
.edit-modal {
  width: 550px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.edit-modal h2 {
  margin-top: 0;
}

.cancel-button,
.save-button {
  width: 150px;
  border-radius: 6px;
  margin-top: 10px;
}

.save-button i {
  margin-right: 5px;
}

.edit-modal p {
  font-size: medium;
  margin: 0;
}

.message-input {
  border-radius: 6px;
}
</style>
