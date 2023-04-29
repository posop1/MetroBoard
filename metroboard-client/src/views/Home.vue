<template>
  <v-container>
    <h3 class="text-h5 mb-5">Boards</h3>
    <BoardList />
  </v-container>
</template>

<script setup lang="ts">
import BoardList from '@/components/Board/BoardList.vue'
import { key } from '@/store/store'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const store = useStore(key)

onMounted(() => {
  store.dispatch('fetchBoards')
})
</script>
