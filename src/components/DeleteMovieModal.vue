<template>
  <n-modal :show="showModal" @update:show="updateShowDeleteMovie">
    <n-card :bordered="false" role="dialog" aria-modal="true" class="delete-modal">
      <n-flex vertical :size="1">
        <h2>Вы действительно хотите удалить {{ movie.title }}?</h2>
        <n-flex align="center" :size="20">
          <n-button
            color="#C3EDC0"
            text-color="#0b666a"
            @click="emitCloseModal"
            class="cancel-button"
            >Омена</n-button
          >
          <n-button
            color="#c8180b"
            text-color="#C3EDC0"
            @click="emitRemoveMovie(movie)"
            class="delete-button"
            ><i class="fa-solid fa-trash-can"></i> Удалить</n-button
          >
        </n-flex>
      </n-flex>
    </n-card>
  </n-modal>
</template>

<script setup>
import { NButton, NCard, NFlex, NModal } from 'naive-ui'
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  movie: {
    type: Object
  }
})

const emit = defineEmits(['update:show', 'closeModal', 'removeMovie'])
const showModal = ref(props.show)
const movie = ref({})

function updateShowDeleteMovie(newValue) {
  emit('update:show', newValue)
}

function emitRemoveMovie(movieId) {
  console.log(movieId)
  console.log('Emitted from modal')
  emit('removeMovie', movieId)
}

function emitCloseModal() {
  emit('closeModal')
}

watch(
  () => props.show,
  (newVal) => {
    showModal.value = newVal
  }
)

watch(
  () => props.movie,
  (newValue, oldValue) => {
    if (newValue) {
      movie.value = newValue
    }
  }
)
</script>

<style scoped>
.delete-modal {
  width: 550px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.delete-modal h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.cancel-button,
.delete-button {
  width: 150px;
  border-radius: 6px;
}

.fa-trash-can {
  margin-right: 8px;
}
</style>
