<script setup>
import { ref, reactive, onMounted } from "vue";
let msg = ref("");
let logs = reactive([]);
let userName = ref(localStorage.getItem("userName") || "");
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
  writeLog("CONNECTED");
  sendMessage("Hello world");
}

function onClose(evt) {
  writeLog("Websocket DISCONNECTED");
}

function onMessage(evt) {
  writeLog('<span style="color: blue;">RESPONSE: ' + evt.data + "</span>");
  websocket.close();
}

function onError(evt) {
  writeLog('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function sendMessage(message) {
  writeLog("SENT: " + message);
  websocket.send(message);
}

function writeLog(message) {
  logs.push(message);
}
</script>
<template>
  <div class="chat">
    <p v-for="(msg, index) in logs" :key="index" v-html="msg"></p>
  </div>
  <el-form class="w-96">
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
      <el-button type="primary" @click="sendMessage(msg)">Send</el-button>
    </el-form-item>
  </el-form>
</template>
