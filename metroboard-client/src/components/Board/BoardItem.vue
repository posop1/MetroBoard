<template>
  <RouterLink
    :to="`/board/${board._id}`"
    class="text-decoration-none"
  >
    <v-sheet
      class="bg-red-darken-1 mr-5 mb-5 rounded-lg d-flex justify-center align-center"
      height="150"
      width="200"
    >
      <span class="text-h6">{{ board.title }}</span>
    </v-sheet>
  </RouterLink>
</template>

<script lang="ts" setup>
import { IBoard } from '@/store/modules/board/types'
import { ref } from 'vue'

interface BoardItemProps {
  board: IBoard
}

const props = defineProps<BoardItemProps>()

const board = ref<IBoard>(props.board)
</script>
