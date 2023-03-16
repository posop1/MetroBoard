<template>
  <CustomScrollbar
    :style="{ height: '70vh', width: '100%' }"
    :autoExpand="false"
    :autoHide="false"
  >
    <v-list class="d-flex flex-column h-100 w-100 pa-2 align-center">
      <TaskItem
        v-for="task in tasks"
        :key="task._id"
        :task="task"
      />

      <v-sheet
        v-if="isCreating"
        elevation="2"
        class="pa-5 w-100 bg-red-darken-1"
      >
        <v-text-field
          type="text"
          label="Task title"
          variant="outlined"
          v-model="title"
        ></v-text-field>
        <v-btn
          block
          class="mb-5"
          color="white"
          @click="createTask"
        >
          <span> Add </span>
        </v-btn>
        <v-btn
          block
          color="white"
          @click="() => (isCreating = false)"
          >Cancel</v-btn
        >
      </v-sheet>
      <v-btn
        v-else
        icon="mdi-plus"
        class="mt-5 bg-red-darken-1"
        @click="() => (isCreating = true)"
      ></v-btn>
    </v-list>
  </CustomScrollbar>
</template>

<script setup lang="ts">
import { ITask } from '@/store/modules/task/types'
import TaskItem from './TaskItem.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'

interface TaskListProps {
  tasks: ITask[]
  columnId: string
}

const { tasks, columnId } = defineProps<TaskListProps>()
const store = useStore(key)

const isCreating = ref(false)
const title = ref('')

const createTask = () => {
  const newTask = {
    title: title.value,
    description: '',
    author: store.getters.getUser.username,
    columnId
  }

  store.dispatch('createTask', newTask)
  title.value = ''
  isCreating.value = false
}
</script>

<style>
.scrollbar__wrapper {
  width: 100%;
  padding: 0px 10px;
}
</style>
