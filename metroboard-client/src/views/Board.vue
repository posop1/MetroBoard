<template>
  <Loading v-if="status === IStatus.LOADING" />
  <v-container
    :fluid="true"
    v-else
  >
    <v-sheet class="d-flex justify-space-between">
      <h3
        class="text-h5 mr-10"
        v-if="!isUpdate"
      >
        {{ board?.title }}
      </h3>
      <div v-if="!isUpdate">
        <v-btn
          class="mr-5"
          variant="tonal"
          @click="() => (isUpdate = true)"
          >Rename</v-btn
        >
        <v-btn
          variant="tonal"
          @click="removeBoard"
          >Delete</v-btn
        >
      </div>
      <v-sheet
        v-if="isUpdate"
        class="w-50 d-flex"
      >
        <v-text-field
          label="Title"
          class="mr-10"
          variant="filled"
          clearable
          density="compact"
          v-model="title"
        ></v-text-field>
        <v-btn
          class="mr-5"
          variant="tonal"
          @click="updateBoard"
          >Accept</v-btn
        >
        <v-btn
          variant="tonal"
          @click="() => (isUpdate = false)"
          >Cancel</v-btn
        >
      </v-sheet>
    </v-sheet>
    <ColumnList :columns="store.getters.getColumns" />
    <RouterView />
  </v-container>
</template>

<script setup lang="ts">
import ColumnList from '@/components/Column/ColumnList.vue'
import Loading from '@/components/Loading.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IStatus } from '@/types/common'
import api from '@/api/instance'
import { IBoard } from '@/store/modules/board/types'

const store = useStore(key)
const route = useRoute()
const router = useRouter()

const status = ref<IStatus>()
const board = ref<IBoard>()
const title = ref<string>()

const isUpdate = ref<boolean>(false)

const updateBoard = async () => {
  await store.dispatch('updateBoard', { id: board.value?._id, title: title.value })

  isUpdate.value = false

  fetchBoard()
}
const removeBoard = async () => {
  await store.dispatch('removeBoard', { id: route.params.boardId })
  router.push('/')
}

const fetchBoard = async () => {
  try {
    status.value = IStatus.LOADING

    const { data } = await api.get<IBoard>(`/board/${route.params.boardId}`)

    board.value = data
    title.value = data.title

    status.value = IStatus.COMPLETE
  } catch (error) {
    console.log(error)
    status.value = IStatus.ERROR
  }
}

const fetchColumns = async () => {
  try {
    status.value = IStatus.LOADING

    await store.dispatch('fetchColumns', { boardId: route.params.boardId })

    status.value = IStatus.COMPLETE
  } catch (error) {
    console.log(error)
    status.value = IStatus.ERROR
  }
}

onMounted(() => {
  fetchColumns()
  fetchBoard()
})

watch(
  () => route.params.boardId,
  async () => {
    if (route.params.boardId) {
      await fetchColumns()
    }
  }
)
</script>
