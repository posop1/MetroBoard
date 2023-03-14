<template>
  <div
    v-for="column in columns"
    :key="column._id"
  >
    {{ column.title }}
  </div>
</template>

<script setup lang="ts">
import { IColumn } from '@/store/modules/column/types'

interface ColumnListProps {
  columns: IColumn[]
}

const { columns } = defineProps<ColumnListProps>()
</script>
