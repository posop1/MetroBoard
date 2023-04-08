<template>
  <div>
    <div>
      <v-hover v-slot="{ isHovering, props }">
        <router-link
          :to="`${route.params.boardId}/task/${task._id}`"
          class="w-100 text-decoration-none"
        >
          <v-sheet
            :elevation="isHovering ? 5 : 2"
            class="pa-3 mb-7 rounded-lg w-100 d-flex flex-column bg-red-darken-1 card"
            :class="isHovering ? 'bg-red-lighten-3' : 'undefined'"
            min-height="90"
            v-bind="props"
          >
            <span class="font-weight-medium text-h6">{{ task.title }}</span>
            <span class="text-subtitle-2">{{ username }}</span>
          </v-sheet>
        </router-link>
      </v-hover>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import { IUser } from '@/store/modules/auth/types'
import { ITask } from '@/store/modules/task/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

interface TaskItemProps {
  task: ITask
}

const props = defineProps<TaskItemProps>()
const route = useRoute()

const username = ref()

const fetchUser = async () => {
  try {
    const { data } = await api.get<IUser>(`/user/${props.task.author}`)

    username.value = data.username
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
.card {
  cursor: pointer;
}
.ghost {
  background: lightgray;
  border-radius: 6px;
}
.ghost > div {
  visibility: hidden;
}
.drag > div {
  transform: rotate(5deg);
}
</style>
