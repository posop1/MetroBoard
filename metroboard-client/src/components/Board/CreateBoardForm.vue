<template>
  <v-sheet
    class="bg-red-darken-1 mr-5 mb-5 rounded-lg d-flex justify-center align-center"
    height="150"
    width="200"
  >
    <v-btn
      icon
      class="bg-white"
      variant="flat"
    >
      <v-icon>mdi-plus</v-icon>
      <v-tooltip
        activator="parent"
        location="bottom"
        >Create new Board</v-tooltip
      >
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isCreating = ref<boolean>(false)
//TODO: доделать
</script>
