<template>
  <v-container :fluid="true">
    <ColumnList :columns="store.getters.getColumns" />
    <RouterView />
  </v-container>
</template>

<script setup lang="ts">
import ColumnList from '@/components/Column/ColumnList.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore(key)
const route = useRoute()

onMounted(() => {
  store.dispatch('fetchColumns', { boardId: route.params.boardId })
})
</script>
