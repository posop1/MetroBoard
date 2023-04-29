<template>
  <v-navigation-drawer
    class="bg-white"
    elevation="1"
  >
    <v-sheet class="d-flex justify-center pa-2 w-100">
      <router-link
        to="/"
        class="d-flex justify-space-between align-center w-100 text-decoration-none"
      >
        <v-img
          src="https://www.metro-set.ru/data/common/logo/logo.svg"
          aspect-ratio="1/1"
          class="mr-16"
          height="40"
        ></v-img>
        <h1 class="text-h5 text-red-darken-1 font-weight-bold">
          Metro<span class="text-black">Board</span>
        </h1>
      </router-link>
    </v-sheet>
    <v-list color="transparent">
      <v-list-item>
        <router-link
          to="/"
          class="text-decoration-none"
        >
          <v-btn
            color="white"
            block
          >
            <v-icon class="mr-5">mdi-home</v-icon>
            Home
          </v-btn>
        </router-link>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-sheet class="pa-2 d-flex flex-column align-center">
      <h3 class="text-h6">Boards</h3>
      <v-list class="w-100">
        <v-list-item
          v-for="board in boards"
          :key="board._id"
          link
          :to="`/board/${board._id}`"
        >
          <v-icon class="mr-5">mdi-developer-board</v-icon>
          {{ board.title }}
        </v-list-item>
      </v-list>
    </v-sheet>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          v-if="store.getters.checkAuth === true"
          variant="tonal"
          block
          @click="
            () => {
              router.push('/login')
              store.dispatch('logout')
            }
          "
        >
          Logout
        </v-btn>
        <v-btn
          v-else
          block
          class="mr-5"
          variant="flat"
          :to="'/login'"
        >
          Login
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { key } from '@/store/store'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore(key)
const router = useRouter()

const boards = computed(() => {
  return store.getters.getBoards
})
</script>
