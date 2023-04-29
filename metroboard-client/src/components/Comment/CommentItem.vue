<template>
  <v-list class="d-flex mb-2 align-center justify-space-between">
    <v-sheet class="d-flex align-center w-75">
      <v-icon class="mr-2">mdi-account</v-icon>
      <v-sheet class="d-flex flex-column w-100">
        <span class="text-medium-emphasis">{{ commentAuthor }}</span>
        <v-text-field
          v-if="isUpdate"
          variant="solo"
          label="Comment"
          density="compact"
          bg-color="grey-lighten-3"
          append-inner-icon="mdi-plus"
          single-line
          v-model="text"
          @click:append-inner="updateComment"
        >
        </v-text-field>
        <span v-else>{{ comment.text }}</span>
      </v-sheet>
    </v-sheet>
    <v-sheet class="d-flex flex-column">
      <v-sheet v-if="store.getters.getUser.username === commentAuthor">
        <v-btn
          v-if="isUpdate === false"
          icon="mdi-pencil"
          size="small"
          variant="plain"
          @click="() => (isUpdate = true)"
        ></v-btn>
        <v-btn
          v-else
          icon="mdi-close"
          size="small"
          variant="plain"
          @click="() => (isUpdate = false)"
        >
        </v-btn>
        <v-btn
          icon="mdi-delete"
          size="small"
          variant="plain"
          @click="() => emit('remove', comment._id)"
        ></v-btn>
      </v-sheet>
      <span class="text-disabled">{{ comment.createdAt.toString().slice(0, 10) }}</span>
    </v-sheet>
  </v-list>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import { IUser } from '@/store/modules/auth/types'
import { key } from '@/store/store'
import { IComment } from '@/types/comments'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

interface CommentItemProps {
  comment: IComment
}

const props = defineProps<CommentItemProps>()
const emit = defineEmits(['update', 'remove'])

const store = useStore(key)

const commentAuthor = ref<string>()
const text = ref<string>(props.comment.text)

const isUpdate = ref<boolean>(false)

const fetchAuthor = async () => {
  const { data } = await api.get<IUser>(`/user/${props.comment.author}`)

  commentAuthor.value = data.username
}

const updateComment = () => {
  if (text.value != '') {
    emit('update', { text: text.value, commentId: props.comment._id })
  }

  isUpdate.value = false
  text.value = ''
}

onMounted(() => {
  fetchAuthor()
})
</script>
