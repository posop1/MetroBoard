<template>
  <v-app>
    <v-layout>
      <Layout />
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import Layout from './components/Layout/Layout.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { key } from './store/store'

const store = useStore(key)

onMounted(() => {
  store.dispatch('getMe')
})
</script>
