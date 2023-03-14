<template>
  <v-sheet
    min-width="300"
    min-height="100"
    elevation="2"
    class="ma-5 d-flex flex-column align-center pa-5"
  >
    {{ column.title }}
    <TaskList
      v-if="tasks"
      :tasks="tasks"
    />
  </v-sheet>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import { IColumn } from '@/store/modules/column/types'
import { ITask } from '@/types/task'
import { ref, onMounted } from 'vue'
import TaskList from '../Task/TaskList.vue'

interface ColumnItemProps {
  column: IColumn
}
const { column } = defineProps<ColumnItemProps>()

const tasks = ref<ITask[]>()

const fetchTasks = async () => {
  try {
    const { data } = await api.get(`/column/${column._id}`)

    tasks.value = data
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchTasks()
})
</script>
