<template>
  <v-app-bar
    density="compact"
    :elevation="8"
  >
    <v-toolbar-title>
      <v-img
        src="https://www.metro-set.ru/data/common/logo/logo.svg"
        aspect-ratio="1/1"
        width="100"
        height="40"
      ></v-img>
    </v-toolbar-title>

    <v-btn
      icon="mdi-login"
      :to="'/login'"
    ></v-btn>
  </v-app-bar>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
