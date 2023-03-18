<template>
  <CustomScrollbar
    :style="{ width: '100%', padding: '12px' }"
    direction="horizontal"
  >
    <v-list class="d-flex h-100">
      <ColumnItem
        v-for="column in columns"
        :key="column._id"
        :column="column"
        :tasks="tasks.filter((task) => task.columnId === column._id)"
      />
      <v-sheet
        v-if="isCreating"
        min-width="300"
        elevation="2"
        class="ma-5 pa-5"
      >
        <v-text-field
          type="text"
          label="Column title"
          variant="outlined"
          v-model="title"
          :error-messages="titleErrorMessage"
        ></v-text-field>
        <v-btn
          block
          class="mb-5"
          @click="createColumn"
          :loading="isLoading"
        >
          Add
        </v-btn>
        <v-btn
          block
          @click="() => (isCreating = false)"
          >Cancel</v-btn
        >
      </v-sheet>
      <v-sheet
        min-width="300"
        elevation="2"
        class="ma-5 d-flex flex-column align-center justify-center"
      >
        <v-btn
          icon="mdi-plus"
          class="bg-red-darken-1"
          @click="() => (isCreating = true)"
        ></v-btn>
      </v-sheet>
    </v-list>
  </CustomScrollbar>
</template>

<script setup lang="ts">
import { IColumn } from '@/store/modules/column/types'
import ColumnItem from './ColumnItem.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import { ref } from 'vue'
import { ITask } from '@/store/modules/task/types'

interface ColumnListProps {
  columns: IColumn[]
  tasks: ITask[]
}

const { columns, tasks } = defineProps<ColumnListProps>()
const store = useStore(key)

const isCreating = ref(false)
const isLoading = ref(false)

const title = ref('')
const titleErrorMessage = ref('')

const createColumn = async () => {
  isLoading.value = true

  if (title.value === '') {
    titleErrorMessage.value = 'Not correct column title'
    return
  }

  await store.dispatch('createColumn', { title: title.value })

  isLoading.value = false
  isCreating.value = false
  title.value = ''
}
</script>

<style scoped>
.scroll-area {
  position: relative;
  margin: auto;
  width: 600px;
  height: 400px;
}
</style>
