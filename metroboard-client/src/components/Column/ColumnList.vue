<template>
  <CustomScrollbar
    :style="{ width: '100%', padding: '12px', minHeight: '90vh' }"
    direction="horizontal"
  >
    <v-list class="d-flex h-100">
      <ColumnItem
        v-for="column in props.columns"
        :key="column._id"
        :column="column"
      />
      <v-sheet
        v-if="isCreating"
        min-width="300"
        elevation="2"
        class="ma-5 pa-5"
      >
        <v-text-field
          type="text"
          label="Column title"
          variant="outlined"
          v-model="title"
          :error-messages="titleErrorMessage"
        ></v-text-field>
        <v-btn
          block
          class="mb-5"
          @click="createColumn"
          :loading="isLoading"
        >
          Add
        </v-btn>
        <v-btn
          block
          @click="() => (isCreating = false)"
          >Cancel</v-btn
        >
      </v-sheet>
      <v-sheet
        min-width="300"
        min-height="230"
        elevation="2"
        class="ma-5 d-flex flex-column align-center justify-center h-100"
      >
        <v-btn
          icon
          class="bg-red-darken-1"
          @click="() => (isCreating = true)"
        >
          <v-icon>mdi-plus</v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
            >Create new Column</v-tooltip
          >
        </v-btn>
      </v-sheet>
    </v-list>
  </CustomScrollbar>
</template>

<script setup lang="ts">
import { IColumn } from '@/store/modules/column/types'
import ColumnItem from './ColumnItem.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

interface ColumnListProps {
  columns: IColumn[]
}

const props = defineProps<ColumnListProps>()
const store = useStore(key)
const route = useRoute()

const isCreating = ref(false)
const isLoading = ref(false)

const title = ref('')
const titleErrorMessage = ref('')

const createColumn = async () => {
  isLoading.value = true

  if (title.value === '') {
    titleErrorMessage.value = 'Not correct column title'
    return
  }

  const newColumn = {
    title: title.value,
    boardId: route.params.boardId
  }

  await store.dispatch('createColumn', newColumn)

  isLoading.value = false
  isCreating.value = false
  title.value = ''
}
</script>

<style scoped></style>
