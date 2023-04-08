<template>
  <v-list class="d-flex">
    <BoardItem
      v-for="board in props.boards"
      :board="board"
      :key="board._id"
    />
  </v-list>
</template>

<script setup lang="ts">
import { IBoard } from '@/store/modules/board/types'
import BoardItem from './BoardItem.vue'

interface BoardListProps {
  boards: IBoard[]
}

const props = defineProps<BoardListProps>()
</script>
