<template>
  <Sidebar v-if="store.getters.checkAuth" />
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import { key } from '@/store/store'
import Sidebar from './Sidebar.vue'
import { useStore } from 'vuex'

const store = useStore(key)
</script>
