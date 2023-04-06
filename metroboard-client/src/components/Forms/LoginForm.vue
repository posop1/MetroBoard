<template>
  <v-sheet
    width="400"
    class="mx-auto bg-white rounded-lg"
    elevation="8"
  >
    <v-form @submit.prevent="submitHandler">
      <v-container>
        <v-row class="my-2 mx-auto">
          <span class="text-h5 mx-auto">Login</span>
        </v-row>
        <v-text-field
          v-model="username"
          label="Username"
          variant="outlined"
          :error-messages="usernameErrorMessage"
          class="mb-3"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          variant="outlined"
          :error-messages="passwordErrorMessage"
          class="mb-3"
        ></v-text-field>
        <v-row class="mb-3">
          <v-btn
            to="/registration"
            variant="plain"
            >Create Account</v-btn
          >
        </v-row>
        <AuthFormAlert :status="status" />
        <v-btn
          type="submit"
          block
          class="mt-2 bg-white"
          :loading="isLoading"
          >Submit</v-btn
        >
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { key } from '@/store/store'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AuthFormAlert from '../Alert/AuthFormAlert.vue'

const store = useStore(key)
const router = useRouter()

const isLoading = ref(false)

const username = ref('')
const usernameErrorMessage = ref('')

const password = ref('')
const passwordErrorMessage = ref('')

const status = ref('')

const submitHandler = async () => {
  if (!username.value) {
    usernameErrorMessage.value = 'Not valid username'
    return
  } else if (!password.value) {
    passwordErrorMessage.value = 'Not valid password'
    return
  } else {
    passwordErrorMessage.value = ''
    usernameErrorMessage.value = ''

    isLoading.value = true

    await store.dispatch('loginUser', { username: username.value, password: password.value })

    isLoading.value = false
  }

  password.value = ''
  username.value = ''
  status.value = store.getters.getUserStatus
}

watch(
  () => store.getters.checkAuth,
  () => router.push('/'),
  { deep: true }
)
</script>
