<template>
  <v-container>
    <ColumnList :columns="store.getters.getColumns" />
  </v-container>
</template>

<script setup lang="ts">
import ColumnList from '@/components/Column/ColumnList.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import { onMounted } from 'vue'

const store = useStore(key)

onMounted(() => {
  store.dispatch('fetchColumns')
})
</script>
