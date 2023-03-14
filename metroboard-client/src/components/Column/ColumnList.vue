<template>
  <v-list class="d-flex h-100">
    <ColumnItem
      v-for="column in columns"
      :key="column._id"
      :column="column"
    />
    <v-sheet
      v-if="isCreating"
      min-width="300"
      elevation="2"
      max-height="800"
      class="ma-5 pa-5"
    >
      <v-text-field
        type="text"
        label="Column title"
        variant="outlined"
        v-model="title"
      ></v-text-field>
      <v-btn
        block
        class="mb-5"
        @click="createColumn"
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
      max-height="800"
      class="ma-5 d-flex flex-column align-center justify-center"
    >
      <v-btn
        icon="mdi-plus"
        @click="() => (isCreating = true)"
      ></v-btn>
    </v-sheet>
  </v-list>
</template>

<script setup lang="ts">
import { IColumn } from '@/store/modules/column/types'
import ColumnItem from './ColumnItem.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import { ref } from 'vue'

interface ColumnListProps {
  columns: IColumn[]
}

const { columns } = defineProps<ColumnListProps>()
const store = useStore(key)

const isCreating = ref(false)
const title = ref('')

const createColumn = () => {
  store.dispatch('createColumn', { title: title.value })
  isCreating.value = false
  title.value = ''
}
</script>
