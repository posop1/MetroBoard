<script setup lang="ts">
import { key } from '@/store/store'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore(key)

const isCreating = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const title = ref<string>()

const titleErrorMessage = ref<string>()

const createBoard = async () => {
  if (!title.value) {
    titleErrorMessage.value = 'Enter a name'
    return
  } else {
    isLoading.value = true
    titleErrorMessage.value = ''

    await store.dispatch('createBoard', { title: title.value })

    isLoading.value = false
    title.value = ''

    isCreating.value = false
  }
}
</script>

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
      @click="() => (isCreating = true)"
    >
      <v-icon>mdi-plus</v-icon>
      <v-tooltip
        activator="parent"
        location="bottom"
        >Create new Board</v-tooltip
      >
    </v-btn>
  </v-sheet>
  <v-dialog v-model="isCreating">
    <v-sheet
      max-width="500"
      class="mx-auto w-100 pa-5 d-flex flex-column align-center"
    >
      <span class="text-h6 mb-2">Create Board</span>
      <v-text-field
        class="w-100"
        label="Board name"
        variant="outlined"
        v-model="title"
        :error-messages="titleErrorMessage"
      ></v-text-field>
      <v-btn
        class="mb-2"
        block
        :loading="isLoading"
        @click="createBoard"
        >Create</v-btn
      >
      <v-btn
        block
        @click="() => (isCreating = false)"
        >Cancel</v-btn
      >
    </v-sheet>
  </v-dialog>
</template>
