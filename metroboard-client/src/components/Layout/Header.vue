<template>
  <v-app-bar elevation="1">
    <v-toolbar-title>
      <router-link to="/">
        <v-img
          src="https://www.metro-set.ru/data/common/logo/logo.svg"
          aspect-ratio="1/1"
          width="100"
          height="40"
        ></v-img>
      </router-link>
    </v-toolbar-title>
    <v-row>
      <h2 class="text-h5">
        <span style="color: red">Metroset </span>
        - Board
      </h2>
    </v-row>
    <v-btn
      v-if="store.getters.checkAuth === true"
      icon="mdi-logout"
      @click="
        () => {
          router.push('/login')
          store.dispatch('logout')
        }
      "
    >
    </v-btn>
    <v-btn
      v-else
      icon="mdi-login"
      :to="'/login'"
    ></v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { key } from '@/store/store'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore(key)
const router = useRouter()
</script>
