<template>
  <n-dropdown
    :show="showDropdown"
    placement="left-start"
    size="large"
    :options="profileOptions"
    style="background-color: #237578; border-radius: 6px"
  >
    <n-button
      :bordered="false"
      text
      text-color="#C3EDC0"
      size="large"
      @click="showDropdown = !showDropdown"
      class="profile-dropdown-btn"
    >
      <i class="fa-solid fa-ellipsis fa-xl dropdown-btn"></i>
    </n-button>
  </n-dropdown>
</template>

<script setup>
import { NButton, NDropdown } from 'naive-ui'
import { h, ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['openEdit', 'openDelete'])

const showDropdown = ref(props.show)

const emitOpenEdit = () => {
  showDropdown.value = false
  emit('openEdit')
}

const emitOpenDelete = () => {
  showDropdown.value = false
  emit('openDelete')
}

function renderEditOption() {
  return h(
    'div',
    {
      style: {
        margin: '5px 15px',
        color: '#c3edc0',
        cursor: 'pointer'
      },
      onClick: emitOpenEdit
    },
    [h('i', { class: 'fa-solid fa-pen-to-square', style: { 'margin-right': '5px' } }), 'Изменить']
  )
}

function renderDeleteOption() {
  return h(
    'div',
    {
      style: {
        margin: '5px 15px',
        color: '#c3edc0',
        cursor: 'pointer'
      },
      onClick: emitOpenDelete
    },
    [h('i', { class: 'fa-solid fa-trash-can', style: { 'margin-right': '5px' } }), 'Удалить']
  )
}

const profileOptions = [
  {
    key: 'edit',
    type: 'render',
    render: renderEditOption
  },
  {
    key: 'delete',
    type: 'render',
    render: renderDeleteOption
  }
]
</script>

<style scoped>
.profile-dropdown-btn {
  margin-left: auto;
  margin-bottom: auto;
  margin-top: 15px;
}
</style>
