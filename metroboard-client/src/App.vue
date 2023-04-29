<template>
  <v-app>
    <v-layout>
      <Loading v-if="isLoading" />
      <Layout v-else />
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import Layout from './components/Layout/Layout.vue'
import Loading from './components/Loading.vue'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from './store/store'

const store = useStore(key)

const isLoading = ref<boolean>()

const fetchMeAndBoards = async () => {
  try {
    isLoading.value = true

    await store.dispatch('getMe')
    await store.dispatch('fetchBoards')

    isLoading.value = false
  } catch (error) {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchMeAndBoards()
})
</script>
