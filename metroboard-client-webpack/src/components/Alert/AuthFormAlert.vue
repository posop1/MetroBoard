<template>
  <v-alert
    density="compact"
    v-if="status"
    type="error"
    title="Error"
    :text="status"
  ></v-alert>
</template>

<script setup lang="ts">
interface AuthFormAlertProps {
  status: string
}

const { status } = defineProps<AuthFormAlertProps>()
</script>
