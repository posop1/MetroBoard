<template>
  <v-list class="d-flex flex-column h-100 w-100 pa-2 align-center">
    <TaskItem
      v-for="task in tasks"
      :key="task._id"
      :task="task"
    />
    <v-btn
      icon="mdi-plus"
      class="mt-5"
    ></v-btn>
  </v-list>
</template>

<script setup lang="ts">
import { ITask } from '@/types/task'
import TaskItem from './TaskItem.vue'

interface TaskListProps {
  tasks: ITask[]
}

const { tasks } = defineProps<TaskListProps>()
</script>
