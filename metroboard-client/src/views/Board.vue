<template>
  <v-container :fluid="true">
    <Loading v-if="status === IStatus.LOADING" />
    <ColumnList
      :columns="store.getters.getColumns"
      v-else
    />
    <RouterView />
  </v-container>
</template>

<script setup lang="ts">
import ColumnList from '@/components/Column/ColumnList.vue'
import Loading from '@/components/Loading.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { IStatus } from '@/types/common'

const store = useStore(key)
const route = useRoute()

const status = ref<IStatus>()

const fetchColumns = async () => {
  try {
    status.value = IStatus.LOADING

    await store.dispatch('fetchColumns', { boardId: route.params.boardId })

    status.value = IStatus.COMPLETE
  } catch (error) {
    console.log(error)
    status.value = IStatus.ERROR
  }
}

onMounted(() => {
  fetchColumns()
})
</script>
