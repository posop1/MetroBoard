<template>
  <CustomScrollbar
    :style="{ height: '70vh', width: '100%' }"
    :autoExpand="false"
    :autoHide="false"
  >
    <v-list class="d-flex flex-column h-100 w-100 pa-2 align-center">
      <TaskItem
        v-for="task in tasks"
        :key="task._id"
        :task="task"
      />

      <v-btn
        icon="mdi-plus"
        class="mt-5 bg-red-darken-1"
      ></v-btn>
    </v-list>
  </CustomScrollbar>
</template>

<script setup lang="ts">
import { ITask } from '@/store/modules/task/types'
import TaskItem from './TaskItem.vue'

interface TaskListProps {
  tasks: ITask[]
}

const { tasks } = defineProps<TaskListProps>()
</script>

<style>
.scrollbar__wrapper {
  width: 100%;
  padding: 0px 10px;
}
</style>
