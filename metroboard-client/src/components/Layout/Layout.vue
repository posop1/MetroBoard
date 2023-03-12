<template>
  <v-main>
    <v-layout :full-height="true">
      <Header />
      <router-view />
    </v-layout>
  </v-main>
</template>

<script setup lang="ts">
import Header from './Header.vue'
</script>

<style lang="scss" scoped></style>
