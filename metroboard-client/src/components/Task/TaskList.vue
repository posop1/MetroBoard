<template>
  <v-list class="d-flex flex-column h-100 w-100">
    <TaskItem
      v-for="task in tasks"
      :key="task._id"
      :task="task"
    />
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
