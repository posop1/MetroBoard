<template>
  <Sidebar />
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
</script>
