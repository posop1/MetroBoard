<template>
  <v-container>
    <h3 class="text-h5 mb-5">Boards</h3>
    <BoardList />
    <CreateBoardForm />
  </v-container>
</template>

<script setup lang="ts">
import BoardList from '@/components/Board/BoardList.vue'
import CreateBoardForm from '@/components/Board/CreateBoardForm.vue'
</script>
