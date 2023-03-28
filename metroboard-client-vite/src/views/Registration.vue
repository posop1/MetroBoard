<template>
  <v-layout :full-height="true">
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <RegistrationForm />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script setup lang="ts">
import RegistrationForm from '@/components/Forms/RegistrationForm.vue'
</script>
