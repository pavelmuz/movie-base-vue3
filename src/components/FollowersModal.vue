<template>
  <n-modal :show="showModal" @update:show="updateShowFollowers">
    <n-card :bordered="false" size="huge" role="dialog" aria-modal="true" class="followers-modal">
      <n-flex vertical :size="10">
        <h2 class="modal-header">Подписчики:</h2>
        <n-flex
          v-for="follower in followers"
          :key="follower"
          align="center"
          :size="17"
          @click="goToProfile(follower.follower.id)"
          class="follower"
        >
          <img :src="follower.follower.profile_image" class="avatar-img-md" />
          <n-flex vertical :size="1">
            <h3>{{ follower.follower.username }}</h3>
            <p>{{ follower.follower.name }}</p>
          </n-flex>
        </n-flex>
      </n-flex>
    </n-card>
  </n-modal>
</template>

<script setup>
import { NCard, NFlex, NModal } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  followers: {
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

function updateShowFollowers(newValue) {
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
.followers-modal {
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

.follower {
  cursor: pointer;
}

.follower h3,
.follower p {
  margin: 0;
}

.follower p {
  font-size: medium;
}

.avatar-img-md {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
