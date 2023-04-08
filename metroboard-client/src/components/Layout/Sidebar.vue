<template>
  <v-navigation-drawer
    class="bg-white"
    elevation="1"
  >
    <v-sheet class="d-flex justify-space-between align-center pt-2">
      <router-link to="/">
        <v-img
          src="https://www.metro-set.ru/data/common/logo/logo.svg"
          aspect-ratio="1/1"
          width="100"
          height="40"
        ></v-img>
      </router-link>
      <v-btn
        v-if="store.getters.checkAuth === true"
        class="mr-5"
        icon="mdi-logout"
        variant="flat"
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
        class="mr-5"
        variant="flat"
        :to="'/login'"
      ></v-btn>
    </v-sheet>
    <v-list color="transparent">
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-box"
        title="Account"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-gavel"
        title="Admin"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { key } from '@/store/store'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore(key)
const router = useRouter()
</script>
