var W3CWebSocket = require("websocket").w3cwebsocket;
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
    console.log("Received: '" + e.data + "'");
  }
};
