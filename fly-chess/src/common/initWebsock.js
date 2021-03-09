var W3CWebSocket = require("websocket").w3cwebsocket;
import bus from "./bus";
import store from "@/store";

var url = "ws://192.168.0.197:8881/";

var client = new W3CWebSocket(url, "echo-protocol");

client.onerror = function() {
  console.log("Connection Error");
};

client.onopen = function() {
  console.log("WebSocket Client Connected");
  console.log(client);
  if (client.readyState === client.OPEN) {
    store.commit("app/SET_CLIENT", client);
  }
};

client.onclose = function() {
  console.log("echo-protocol Client Closed");
};

client.onmessage = function(e) {
  if (typeof e.data === "string") {
    let data = {};
    try {
      data = JSON.parse(e.data);
    } catch (error) {
      console.log(error);
    }
    bus.$emit("onmessage", data);
  }
};
