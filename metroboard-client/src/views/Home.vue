<template>
  <v-container>
    <h3 class="text-h5 mb-5">Boards</h3>
    <BoardList :boards="store.getters.getBoards" />
    <CreateBoardForm />
  </v-container>
</template>

<script setup lang="ts">
import { key } from '@/store/store'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import BoardList from '@/components/Board/BoardList.vue'
import CreateBoardForm from '@/components/Board/CreateBoardForm.vue'

const store = useStore(key)

onMounted(() => {
  store.dispatch('fetchBoards')
})
</script>
