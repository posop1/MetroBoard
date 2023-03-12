<template>
  <v-app-bar flat>
    <v-toolbar-title>
      <v-img
        src="https://www.metro-set.ru/data/common/logo/logo.svg"
        aspect-ratio="1/1"
        width="100"
        height="40"
        to="/"
      ></v-img>
    </v-toolbar-title>
    <v-row>
      <h2 class="text-h5">
        <span style="color: red">Metroset </span>
        - Board
      </h2>
    </v-row>
    <v-btn
      icon="mdi-login"
      :to="'/login'"
    ></v-btn>
  </v-app-bar>
</template>

<script setup lang="ts"></script>
