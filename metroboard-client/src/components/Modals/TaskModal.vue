<template>
  <v-dialog v-model="isOpenDialog">
    <v-card
      max-width="500"
      class="mx-auto"
    >
      <v-card-title>
        <span class="text-h5">{{ task?.title }}</span>
      </v-card-title>
      <v-card-text> </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import { ITask } from '@/store/modules/task/types'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const task = ref<ITask>()
const isOpenDialog = ref(true)

const fetchTask = async () => {
  try {
    const { data } = await api.get(`/task/${route.params.id}`)

    task.value = data
  } catch (error) {
    console.log(error)
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
