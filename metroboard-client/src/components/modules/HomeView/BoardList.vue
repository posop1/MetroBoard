<script setup lang="ts">
import CreateBoardModalForm from './CreateBoardModalForm.vue'
import BoardItem from './BoardItem.vue'
import { key } from '@/store/store'
import { useStore } from 'vuex'

const store = useStore(key)
</script>

<template>
  <v-list class="d-flex flex-wrap">
    <BoardItem
      v-for="board in store.getters.getBoards"
      :board="board"
      :key="board._id"
    />
    <CreateBoardModalForm />
  </v-list>
</template>
