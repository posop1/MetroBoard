<template>
  <v-dialog v-model="isOpenDialog">
    <v-sheet
      v-if="isLoading"
      class="mx-auto w-100 d-flex flex-row justify-center align-center"
      max-width="1000"
      min-height="400"
    >
      <v-progress-circular
        indeterminate
        color="red"
      ></v-progress-circular>
    </v-sheet>

    <v-sheet
      class="mx-auto w-100 h-100 d-flex flex-row justify-space-between pa-8"
      max-width="1000"
      min-height="400"
      v-else
    >
      <v-sheet class="w-100">
        <h2>{{ task?.title }}</h2>
        <br />
        <span>Author: {{ username }}</span>
        <br />
        <span>Created Date: {{ task?.createdAt.toString().slice(0, 10) }}</span>
        <br />
        <span v-if="task?.updatedAt !== task?.createdAt"
          >Updated Date: {{ task?.updatedAt.toString().slice(0, 10) }}</span
        >
        <span v-if="task?.deadline">Deadline: {{ task?.deadline }}</span>
        <v-textarea
          class="w-75 mt-5"
          bg-color="grey-lighten-3"
          clearable
          label="Description"
          variant="solo"
          v-if="isUpdate"
          v-model="description"
        ></v-textarea>
        <v-sheet
          v-else
          min-height="200"
          class="mt-5 bg-grey-lighten-3 w-75 pa-2"
        >
          <p>{{ task?.description }}</p>
        </v-sheet>
      </v-sheet>
      <v-sheet class="d-flex flex-column align-center">
        <v-btn
          icon="mdi-close"
          size="x-small"
          class="mb-3 bg-red-darken-1"
          @click="() => (isOpenDialog = false)"
        >
        </v-btn>
        <v-btn
          v-if="isUpdate"
          size="small"
          class="mb-3 bg-red-darken-1 w-100"
          @click="updateTask"
        >
          Complete Edit
        </v-btn>
        <v-btn
          v-else
          size="small"
          class="mb-3 bg-red-darken-1 w-100"
          @click="() => (isUpdate = true)"
        >
          Edit
        </v-btn>
        <v-btn
          size="small"
          class="bg-red-darken-1 w-100"
          @click="removeTask"
          >Delete</v-btn
        >
      </v-sheet>
    </v-sheet>
  </v-dialog>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import { IUser } from '@/store/modules/auth/types'
import { ITask } from '@/store/modules/task/types'
import { key } from '@/store/store'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore(key)

const task = ref<ITask>()

const isOpenDialog = ref(true)
const isUpdate = ref(false)
const isLoading = ref(false)

const description = ref<string>()
const username = ref<string>()

const fetchTask = async () => {
  isLoading.value = true

  const taskData = await api.get(`/task/${route.params.id}`)

  task.value = taskData.data
  description.value = task.value?.description

  const userData = await api.get<IUser>(`/user/${task.value?.author}`)

  username.value = userData.data.username

  isLoading.value = false
}

const removeTask = async () => {
  await store.dispatch('removeTask', { taskId: task.value?._id })
  isOpenDialog.value = false
}

const updateTask = async () => {
  isLoading.value = true

  const updatedTask = {
    taskId: task.value?._id,
    title: task.value?.title,
    description: description.value,
    author: store.getters.getUser.username,
    columnId: task.value?.columnId
  }
  await store.dispatch('updateTask', updatedTask)

  isUpdate.value = false
  fetchTask()
  isLoading.value = false
}

watch(
  () => isOpenDialog.value,
  () => router.replace('/')
)

onMounted(() => {
  fetchTask()
})
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
