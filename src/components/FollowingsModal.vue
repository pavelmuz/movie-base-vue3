<template>
  <n-modal :show="showModal" @update:show="updateShowFollowings">
    <n-card :bordered="false" size="huge" role="dialog" aria-modal="true" class="followings-modal">
      <n-flex vertical :size="10">
        <h2 class="modal-header">Подписки:</h2>
        <n-flex
          v-for="following in followings"
          :key="following"
          align="center"
          :size="17"
          @click="goToProfile(following.following.id)"
          class="follow"
        >
          <profile-avatar size="medium" :image="following.following.profile_image" />
          <n-flex vertical :size="1">
            <h3>{{ following.following.username }}</h3>
            <p>{{ following.following.name }}</p>
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
  followings: {
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

function updateShowFollowings(newValue) {
  emit('update:show', newValue)
}

function goToProfile(id) {
  if (id === profileId) {
    router.push({ name: 'account' })
  } else {
    router.push({ name: 'profile', params: { id: id } })
  }
  showModal.value = false
}

watch(
  () => props.show,
  (newVal) => {
    showModal.value = newVal
  }
)
</script>

<style scoped>
.followings-modal {
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

.follow {
  cursor: pointer;
}

.follow h3,
.follow p {
  margin: 0;
}

.follow p {
  font-size: medium;
}
</style>
