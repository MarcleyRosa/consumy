<template>
  <div id="chat-container">
    <h1>Chat App</h1>
    <p>{{ messages }}</p>
    <div id="chat-box">
      <div v-for="message in messages" :key="message.id" :class="messageClass(message)">
        {{ message.content }}
      </div>
    </div>
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message...">
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import consumer from '../consumer';

export default {
  props: {
    senderId: Number,
    receiverId: Number,
  },
  setup(props) {
    const messages = ref([]);
    const newMessage = ref('');

    const messageClass = (message) => {
      return message.sender_id === props.senderId ? 'user-message' : 'bot-message';
    };

    const chatChannel = ref(null);

    onMounted(() => {
      chatChannel.value = consumer.subscriptions.create(
        { channel: 'ChatChannel', sender_id: props.senderId, receiver_id: props.receiverId },
        {
          received(data) {
            messages.value.push({ content: data.message.content, class: 'bot-message' });
          },
          speak(message) {
            return this.perform('speak', { message: message });
          }
        }
      );
    });

    const sendMessage = () => {
      if (newMessage.value.trim() === '') return;
      messages.value.push({ content: newMessage.value, class: 'user-message' });
      chatChannel.value.speak(newMessage.value);
      newMessage.value = '';
    };

    return {
      messages,
      newMessage,
      sendMessage,
      messageClass
    };
  }
};
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
