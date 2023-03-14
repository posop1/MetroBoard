<template>
  <v-sheet
    elevation="2"
    class="pa-3 mb-7 rounded-lg w-100 d-flex flex-column bg-grey-lighten-3"
    min-height="90"
  >
    <span class="font-weight-medium text-h6">{{ task.title }}</span>
    <span class="text-subtitle-2">{{ task.author }}</span>
  </v-sheet>
</template>

<script setup lang="ts">
import { ITask } from '@/types/task'

interface TaskItemProps {
  task: ITask
}

const { task } = defineProps<TaskItemProps>()
</script>
