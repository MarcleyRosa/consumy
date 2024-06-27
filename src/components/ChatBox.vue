<template>
  <div id="chat-container">
    <h1>Chat App 2</h1>
    <div id="chat-box">
      <div v-for="(message, index) in messages" :key="index" :class="message.class">
        {{ message.content }}
      </div>
    </div>
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createConsumer } from '@rails/actioncable'

const props = defineProps<{
  senderId: number,
  receiverId: number
}>()

const messages = ref<{ content: string, class: string }[]>([])
const newMessage = ref<string>('')

let chatChannel: any = null

onMounted(() => {
  const consumer = createConsumer('ws://localhost:3000/cable')
  chatChannel = consumer.subscriptions.create(
    { channel: 'ChatChannel', sender_id: props.senderId, receiver_id: props.receiverId },
    {
      received(data: { message: string }) {
         console.log("Received data:", data);
        messages.value.push({ content: data.message, class: 'bot-message' })
      },
      speak(message: string) {
        this.perform('speak', { message: message })
      }
    }
  )
})

const sendMessage = () => {
  if (newMessage.value.trim() === '') return
  messages.value.push({ content: newMessage.value, class: 'user-message' })
  chatChannel.speak(newMessage.value)
  newMessage.value = ''
}
</script>

<style scoped>
#chat-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}
#chat-box {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
.user-message {
  text-align: right;
  color: blue;
  margin-bottom: 10px;
}
.bot-message {
  text-align: left;
  color: green;
  margin-bottom: 10px;
}
input {
  width: calc(100% - 90px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;
}
</style>
