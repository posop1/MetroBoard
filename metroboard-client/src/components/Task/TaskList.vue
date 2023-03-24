<template>
  <CustomScrollbar
    :style="{ height: '70vh', width: '100%' }"
    :autoExpand="false"
    :autoHide="false"
  >
    <v-list class="d-flex flex-column h-100 w-100 pa-2 align-center">
      <draggable
        group="tasks"
        item-key="id"
        :list="tasks"
        tag="div"
        drag-class="drag"
        ghost-class="ghost"
        class="w-100"
        @change="updateTasks"
      >
        <template #item="{ element: task }">
          <TaskItem :task="task" />
        </template>
      </draggable>

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
          :errorMessages="titleErrorMessage"
        ></v-text-field>
        <v-btn
          block
          class="mb-5 mt-2"
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
        icon
        class="mt-5 bg-red-darken-1"
        @click="() => (isCreating = true)"
      >
        <v-icon>mdi-plus</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
          >Create new Task</v-tooltip
        >
      </v-btn>
    </v-list>
  </CustomScrollbar>
</template>

<script setup lang="ts">
import { ITask } from '@/store/modules/task/types'
import TaskItem from './TaskItem.vue'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import draggable from 'vuedraggable'

interface TaskListProps {
  columnId: string
}

const { columnId } = defineProps<TaskListProps>()
const store = useStore(key)

const tasks = ref<ITask[]>()

const isLoading = ref(false)
const isCreating = ref(false)

const title = ref('')
const titleErrorMessage = ref('')

const fetchTask = async () => {
  await store.dispatch('fetchTasks')

  tasks.value = store.getters.getTasks
  tasks.value = tasks.value?.filter((task) => task.columnId === columnId)
}

const createTask = async () => {
  isLoading.value = true

  if (title.value === '') {
    titleErrorMessage.value = 'Not correct task title'
    return
  }

  const newTask = {
    title: title.value,
    description: '',
    author: store.getters.getUser.username,
    columnId
  }

  await store.dispatch('createTask', newTask)
  fetchTask()

  isLoading.value = false
  title.value = ''
  isCreating.value = false
}

const updateTasks = (e: any) => {
  const task = e.added || e.moved

  if (!task) return

  const updatedTask = {
    taskId: task.element._id,
    title: task.element.title,
    columnId,
    description: task.element.description,
    author: store.getters.getUser.username
  }

  store.dispatch('updateTask', updatedTask)
}

onMounted(() => {
  fetchTask()
})
</script>

<style>
.scrollbar__wrapper {
  width: 100%;
  padding: 0px 10px;
}
</style>
