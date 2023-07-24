<script setup>
import { ref, reactive, onMounted } from "vue";

let msg = ref("");
let logs = reactive([]);
let userName = ref("");
let isLogined = ref(false);
let wsUri =
  "wss://s9550.fra1.piesocket.com/v3/1?api_key=K1T1w9QmDdE0gbJvAdmuAMwcyhJvD6mLVKIIUSBv&notify_self=1";

const websocket = new WebSocket(wsUri);

websocket.onopen = function (evt) {
  onOpen(evt);
};
websocket.onclose = function (evt) {
  onClose(evt);
};
websocket.onmessage = function (evt) {
  onMessage(evt);
};
websocket.onerror = function (evt) {
  onError(evt);
};

function onOpen(evt) {
  writeLog("<p class='pb-2 mb-2 border-b-2'>Welcome to movie finder chat</p>");
}

function onClose(evt) {
  writeLog("Websocket DISCONNECTED");
}

function onMessage(evt) {
  writeLog("<span>" + evt.data + "</span>");
}

function onError(evt) {
  writeLog('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function sendMessage() {
  websocket.send(`${userName.value}: ${msg.value}`);
  msg.value = "";
}

function writeLog(message) {
  logs.push(message);
}

const setUserName = () => {
  localStorage.setItem("userName", userName.value);
  isLogined.value = true;
};

onMounted(() => {
  if (localStorage.getItem("userName")) {
    userName.value = localStorage.getItem("userName");
    isLogined.value = true;
  }
});
</script>
<template>
  <div class="chat mb-4 h-80 w-full overflow-auto border-b-2 px-4 md:px-0">
    <p v-for="(msg, index) in logs" :key="index" v-html="msg"></p>
  </div>
  <el-form
    @submit.prevent="sendMessage()"
    class="w-full px-4 md:px-0"
    v-if="isLogined"
  >
    <el-form-item label="Your message">
      <el-input
        style="
          --el-input-bg-color: transparent;
          --el-input-border-color: gray;
          --el-input-text-color: white;
        "
        v-model="msg"
        placeholder="Enter message"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="sendMessage()" type="primary">Send</el-button>
    </el-form-item>
  </el-form>
  <el-form @submit.prevent="setUserName()" class="w-full px-4 md:px-0" v-else>
    <el-form-item label="Join chat">
      <el-input
        style="
          --el-input-bg-color: transparent;
          --el-input-border-color: gray;
          --el-input-text-color: white;
        "
        v-model="userName"
        placeholder="Enter your username"
      />
    </el-form-item>
    <el-form-item>
      <el-button @submit="setUserName()" type="primary">Join</el-button>
    </el-form-item>
  </el-form>
</template>
