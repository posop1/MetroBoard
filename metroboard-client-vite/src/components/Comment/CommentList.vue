<template>
  <v-list>
    <v-text-field
      :loading="isLoading"
      class="w-75 mt-5"
      variant="solo"
      label="Comment"
      clearable
      density="compact"
      bg-color="grey-lighten-3"
      append-inner-icon="mdi-plus"
      single-line
      v-model="text"
      @click:append-inner="addComment"
    >
    </v-text-field>
    <v-sheet
      v-if="comments?.length === 0"
      class="w-75 d-flex justify-center"
    >
      <span>No comments</span>
    </v-sheet>
    <CommentItem
      v-for="comment in comments"
      :comment="comment"
      :key="comment._id"
      @remove="removeComment"
      @update="updateComment"
    />
  </v-list>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import { IComment } from '@/types/comments'
import { onMounted, ref } from 'vue'
import CommentItem from './CommentItem.vue'

interface CommentListProps {
  taskId: string
}

const props = defineProps<CommentListProps>()

const comments = ref<IComment[]>()
const text = ref<string>()

const isLoading = ref<boolean>(false)

const fetchComments = async () => {
  isLoading.value = true

  const { data } = await api.get(`/task/${props.taskId}/comments`)

  comments.value = data
  isLoading.value = false
}

const addComment = async () => {
  isLoading.value = true

  const newComment = {
    taskId: props.taskId,
    text: text.value
  }

  const { data } = await api.post('/comment', newComment)

  comments.value?.push(data)

  text.value = ''
  isLoading.value = false
}

const removeComment = async (commentId: string) => {
  isLoading.value = true

  const { data } = await api.delete(`/comment/${commentId}`)
  console.log(data)

  comments.value = comments.value?.filter((comment) => comment._id !== commentId)

  isLoading.value = false
}

const updateComment = async ({ text, commentId }: { text: string; commentId: string }) => {
  isLoading.value = true

  const { data } = await api.put<IComment>(`/comment/${commentId}`, { text })

  const comment = comments.value?.find((comment) => comment._id === commentId)

  if (comment != undefined) {
    comment.text = data.text
    comment.updatedAt = data.updatedAt
  }

  isLoading.value = false
}

onMounted(() => {
  fetchComments()
})
</script>
