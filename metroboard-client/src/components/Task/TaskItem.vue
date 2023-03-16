<template>
  <v-dialog v-model="isOpenDialog">
    <template v-slot:activator="{ props }">
      <v-hover v-slot="{ isHovering, props }">
        <v-sheet
          :elevation="isHovering ? 5 : 2"
          class="pa-3 mb-7 rounded-lg w-100 d-flex flex-column bg-red-darken-1 card"
          :class="isHovering ? 'bg-red-lighten-3' : 'undefined'"
          min-height="90"
          v-bind="props"
          @click="() => (isOpenDialog = true)"
        >
          <span class="font-weight-medium text-h6">{{ task.title }}</span>
          <span class="text-subtitle-2">{{ task.author }}</span>
        </v-sheet>
      </v-hover>
    </template>
    <v-card
      max-width="500"
      class="mx-auto"
    >
      <v-card-title>
        <span class="text-h5">{{ task.title }}</span>
      </v-card-title>
      <v-card-text>
        {{ task.description }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ITask } from '@/types/task'
import { ref } from 'vue'

interface TaskItemProps {
  task: ITask
}

const { task } = defineProps<TaskItemProps>()

const isOpenDialog = ref(false)
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
