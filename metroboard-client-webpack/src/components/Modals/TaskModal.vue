<template>
  <v-dialog v-model="isOpenDialog">
    <v-sheet
      v-if="isLoading || !task"
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
        <v-text-field
          v-if="isUpdate"
          class="w-75"
          variant="solo"
          label="Title"
          clearable
          bg-color="grey-lighten-3"
          density="compact"
          v-model="title"
        ></v-text-field>

        <h2 v-else>{{ task?.title }}</h2>
        <br />

        <span>Author: {{ authorUsername }}</span>
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
          auto-grow
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

        <CommentList :taskId="task?._id" />
      </v-sheet>
      <v-sheet class="d-flex flex-column align-center">
        <v-btn
          icon="mdi-close"
          size="x-small"
          class="mb-3 bg-red-darken-1"
          @click="() => (isOpenDialog = false)"
        >
        </v-btn>

        <div v-if="store.getters.getUser.username === authorUsername">
          <v-btn
            v-if="isUpdate"
            size="small"
            block
            class="mb-3 bg-red-darken-1"
            @click="updateTask"
          >
            Complete Edit
          </v-btn>

          <v-btn
            v-else
            block
            size="small"
            class="mb-3 bg-red-darken-1"
            @click="() => (isUpdate = true)"
          >
            Edit
          </v-btn>

          <v-btn
            size="small"
            block
            class="bg-red-darken-1"
            @click="removeTask"
            >Delete</v-btn
          >
        </div>
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
import CommentList from '../Comment/CommentList.vue'

const router = useRouter()
const route = useRoute()
const store = useStore(key)

const task = ref<ITask>()

const isOpenDialog = ref<boolean>(true)
const isUpdate = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const isError = ref<boolean>(false)

const description = ref<string>()
const title = ref<string>()
const authorUsername = ref<string>()

const fetchTask = async () => {
  try {
    isLoading.value = true

    const taskData = await api.get(`/task/${route.params.id}`)

    task.value = taskData.data
    description.value = task.value?.description
    title.value = task.value?.title

    const userData = await api.get<IUser>(`/user/${task.value?.author}`)

    authorUsername.value = userData.data.username

    isLoading.value = false
  } catch (error) {
    isError.value = true
  }
}

const removeTask = async () => {
  try {
    await store.dispatch('removeTask', { taskId: task.value?._id })
    isOpenDialog.value = false
  } catch (error) {
    isError.value = true
  }
}

const updateTask = async () => {
  try {
    isLoading.value = true

    const updatedTask = {
      taskId: task.value?._id,
      title: title.value,
      description: description.value,
      columnId: task.value?.columnId
    }
    await store.dispatch('updateTask', updatedTask)

    isUpdate.value = false
    fetchTask()
    isLoading.value = false
  } catch (error) {
    isError.value = true
  }
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
