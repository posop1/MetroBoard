<template>
  <v-sheet
    elevation="2"
    class="pa-2 mt-3 rounded-lg"
    color="#E0E0E0"
    min-height="70"
  >
    <span class="font-weight-medium">{{ task.title }}</span>
  </v-sheet>
</template>

<script setup lang="ts">
import { ITask } from '@/types/task'

interface TaskItemProps {
  task: ITask
}

const { task } = defineProps<TaskItemProps>()
</script>
