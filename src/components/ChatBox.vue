<template>
  <div class="fixed bottom-0 right-0 m-4">
    <button v-if="!isChatOpen" @click="toggleChat" class="bg-blue-500 text-white px-4 py-2 rounded-full">Abrir Chat</button>
    <div v-if="isChatOpen" id="chat-container" class="w-80 bg-white rounded-lg shadow-lg border border-gray-300">
      <div class="p-4 border-b border-gray-300 flex justify-between items-center">
        <h1 class="text-xl font-semibold text-gray-700">Chat</h1>
        <button @click="toggleChat" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div id="chat-box" class="p-4 overflow-y-auto h-64">
        <div v-for="(message, index) in messages" :key="index" :class="[message.class, 'mb-2']">
          {{ `${message.class === 'user-message' ? 'Eu: ' : `${data.name}: `}${message.content}` }}
        </div>
      </div>
      <div class="p-4 border-t border-gray-300 flex">
        <input 
          type="text" 
          v-model="newMessage" 
          @keyup.enter="sendMessage" 
          placeholder="Digite sua mensagem..." 
          class="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
        />
        <button @click="sendMessage" class="bg-blue-500 text-white px-4 py-2 rounded-r-lg send-button">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { createConsumer } from '@rails/actioncable'
import { Request } from '@/utils/fetch';

const props = defineProps<{
  senderId: number,
  receiverId: number
}>()

const isChatOpen = ref(false)
const messages = ref<{ content: string, class: string }[]>([])
const newMessage = ref<string>('')
const url = 'http://localhost:3000';
const data = ref()
const request = new Request(url)

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

let chatChannel: any = null

const isDuplicateMessage = (messageContent: string) => {
  return messages.value.some(message => message.content === messageContent);
};

onMounted(async () => {
  data.value = await request.get(`/stores/${props.receiverId}`)

  messages.value = await request.get(`/messages?sender_id=${props.senderId}&receiver_id=${props.receiverId}`)
  
  const consumer = createConsumer('ws://localhost:3000/cable')
  chatChannel = consumer.subscriptions.create(
    { channel: 'ChatChannel', sender_id: props.senderId, receiver_id: props.receiverId },
    {
      received(data: { message: string, sender_id: number }) {
        if (data.sender_id !== props.senderId && !isDuplicateMessage(data.message)) {
          messages.value.push({ content: data.message, class: 'bot-message' })
        }
      },
      speak(message: string) {
        this.perform('speak', { message: message })
      }
    }
  )

})

onUnmounted(() => {
  if (chatChannel) {
    chatChannel.unsubscribe();
  }
})

const sendMessage = () => {
  if (newMessage.value.trim() === '') return
  messages.value.push({ content: newMessage.value, class: 'user-message' })
  chatChannel.speak(newMessage.value)
  newMessage.value = ''
}
</script>

<style scoped>
.user-message {
  text-align: right;
  color: blue;
}
.bot-message {
  text-align: left;
  color: green;
}

</style>
