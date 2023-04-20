<template>
  <v-list class="d-flex">
    <BoardItem
      v-for="board in store.getters.getBoards"
      :board="board"
      :key="board._id"
    />
  </v-list>
</template>

<script setup lang="ts">
import BoardItem from './BoardItem.vue'
import { key } from '@/store/store'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore(key)

onMounted(() => {
  store.dispatch('fetchBoards')
})
</script>
