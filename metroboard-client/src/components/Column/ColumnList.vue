<template>
  <v-list class="d-flex h-100">
    <ColumnItem
      v-for="column in columns"
      :key="column._id"
      :column="column"
    />
    <v-sheet
      min-width="300"
      elevation="2"
      class="ma-5 d-flex flex-column align-center justify-center"
    >
      <v-btn icon="mdi-plus"></v-btn>
    </v-sheet>
  </v-list>
</template>

<script setup lang="ts">
import { IColumn } from '@/store/modules/column/types'
import ColumnItem from './ColumnItem.vue'

interface ColumnListProps {
  columns: IColumn[]
}

const { columns } = defineProps<ColumnListProps>()
</script>
