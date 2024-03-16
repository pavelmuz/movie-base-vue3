<template>
  <n-modal :show="showModal" @update:show="updateShowLikes">
    <n-card :bordered="false" size="huge" role="dialog" aria-modal="true" class="likes-modal">
      <n-flex vertical :size="10">
        <h2 class="modal-header">Нравится: {{ likes.length }}</h2>
        <n-flex
          v-for="like in likes"
          :key="like"
          align="center"
          :size="17"
          @click="goToProfile(like.owner.id)"
          class="profile"
        >
          <profile-avatar size="medium" :image="like.owner.profile_image" />
          <n-flex vertical :size="1">
            <h3>{{ like.owner.username }}</h3>
            <p>{{ like.owner.name }}</p>
          </n-flex>
        </n-flex>
      </n-flex>
    </n-card>
  </n-modal>
</template>

<script setup>
import ProfileAvatar from '@/components/ProfileAvatar.vue'
import { NCard, NFlex, NModal } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  likes: {
    type: Array,
    required: false
  },
  show: {
    type: Boolean,
    required: true
  }
})

const showModal = ref(props.show)
const emit = defineEmits(['update:show'])
const router = useRouter()
const profileId = localStorage.getItem('profileId')

function updateShowLikes(newValue) {
  emit('update:show', newValue)
}

function goToProfile(id) {
  if (id === profileId) {
    router.push({ name: 'account' })
  } else {
    router.push({ name: 'profile', params: { id: id } })
  }
}

watch(
  () => props.show,
  (newVal) => {
    showModal.value = newVal
  }
)
</script>

<style scoped>
.likes-modal {
  width: 500px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.modal-header {
  border-bottom: 1px solid #c3edc0;
  padding-bottom: 10px;
  margin-top: 0;
}

.profile {
  cursor: pointer;
}

.profile h3,
.profile p {
  margin: 0;
}

.profile p {
  font-size: medium;
}
</style>
