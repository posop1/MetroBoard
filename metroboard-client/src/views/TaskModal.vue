<template>
  <v-dialog v-model="isOpenDialog">
    <v-card
      max-width="500"
      class="mx-auto"
    >
      <v-card-title>
        <span class="text-h5">asdasd</span>
      </v-card-title>
      <v-card-text> </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const isOpenDialog = ref(true)
const router = useRouter()

watch(
  () => isOpenDialog.value,
  () => router.replace('/')
)
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
