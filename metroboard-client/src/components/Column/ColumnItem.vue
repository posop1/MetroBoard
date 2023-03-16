<template>
  <v-sheet
    min-width="350"
    min-height="100"
    elevation="2"
    class="ma-5 d-flex flex-column align-center pa-5 h-100 sheet"
  >
    <v-row class="mb-5 w-100 d-flex flex-row align-center justify-space-between">
      <input
        v-model="columnTitle"
        type="text"
        v-if="isUpdate"
        class="py-2 px-5 bg-grey-lighten-3"
      />
      <p
        v-else
        class="py-2 px-5"
      >
        {{ column.title }}
      </p>
      <v-menu v-if="isUpdate === false">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-dots-horizontal"
            v-bind="props"
            size="x-small"
          >
          </v-btn>
        </template>

        <v-list class="mt-2">
          <v-list-item>
            <v-btn
              class="w-100 bg-red-darken-1"
              size="small"
              @click="isUpdateHandler"
            >
              <v-icon size="x-small">mdi-pen</v-icon>
              <span>Edit</span>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              class="w-100 bg-red-darken-1"
              size="small"
              @click="deleteColumn"
            >
              <v-icon size="x-small">mdi-delete</v-icon>
              <span>Delete</span>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="isUpdate"
        icon="mdi-cancel"
        size="x-small"
        @click="isUpdateHandler"
      >
      </v-btn>
      <v-btn
        v-if="isUpdate"
        icon="mdi-check"
        size="x-small"
        @click="updateColumn"
      ></v-btn>
    </v-row>
    <TaskList
      v-if="tasks"
      :tasks="tasks"
    />
  </v-sheet>
</template>

<script setup lang="ts">
import { IColumn } from '@/store/modules/column/types'
import { ITask } from '@/types/task'
import { ref } from 'vue'
import TaskList from '../Task/TaskList.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'

interface ColumnItemProps {
  column: IColumn
  tasks: ITask[]
}
const { column, tasks } = defineProps<ColumnItemProps>()
const store = useStore(key)

const isUpdate = ref(false)
const columnTitle = ref(column.title)

const isUpdateHandler = () => {
  isUpdate.value = !isUpdate.value
}

const updateColumn = () => {
  store.dispatch('updateColumn', { id: column._id, title: columnTitle.value })

  isUpdate.value = false
  column.title = columnTitle.value
}
const deleteColumn = () => {
  store.dispatch('removeColumn', { columnId: column._id })
}
</script>

<style scoped>
.input {
  background: #eeeeee;
  border-radius: 5px;
  padding: 0px 0px;
  outline: none;
}
.sheet {
  max-height: 83vh;
}
</style>
