<template>
  <v-alert
    density="compact"
    v-if="status"
    type="error"
    title="Error"
    :text="props.status"
  ></v-alert>
</template>

<script setup lang="ts">
interface AuthFormAlertProps {
  status: string
}

const props = defineProps<AuthFormAlertProps>()
</script>
