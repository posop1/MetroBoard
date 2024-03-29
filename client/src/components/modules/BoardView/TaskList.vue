<script setup lang="ts">
import { ITask } from '@/store/modules/task/types'
import TaskItem from './TaskItem.vue'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import draggable from 'vuedraggable'
import { useRoute } from 'vue-router'
import { IStatus } from '@/types/common'
import Loading from '@/components/elements/Loading.vue'

interface TaskListProps {
  columnId: string
}

const props = defineProps<TaskListProps>()
const store = useStore(key)
const route = useRoute()

const tasks = ref<ITask[]>()

const status = ref<IStatus>()

const isLoading = ref(false)
const isCreating = ref(false)

const title = ref('')
const titleErrorMessage = ref('')

const fetchTask = async () => {
  try {
    status.value = IStatus.LOADING

    await store.dispatch('fetchTasks', { boardId: route.params.boardId })

    tasks.value = store.getters.getTasks
    tasks.value = tasks.value?.filter((task) => task.columnId === props.columnId)

    status.value = IStatus.COMPLETE
  } catch (error) {
    status.value = IStatus.ERROR
  }
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
    columnId: props.columnId,
    boardId: route.params.boardId
  }

  await store.dispatch('createTask', newTask)
  fetchTask()

  isLoading.value = false
  title.value = ''
  isCreating.value = false
}

const updateTasks = async (e: any) => {
  const task = e.added || e.moved

  if (!task) return

  await store.dispatch('updateTask', { taskId: task.element._id, columnId: props.columnId })
}

onMounted(() => {
  fetchTask()
})
</script>

<template>
  <Loading v-if="status === IStatus.LOADING" />
  <CustomScrollbar
    :style="{ height: '70vh', width: '100%' }"
    :autoExpand="false"
    :autoHide="false"
    v-else
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

<style>
.scrollbar__wrapper {
  width: 100%;
  padding: 0px 10px;
}
</style>
