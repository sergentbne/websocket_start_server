import WebSocket from "ws";
import { DataGetter } from "./GetData.ts";

// Create a WebSocket server on port 8080
const wss = new WebSocket("ws://206.167.46.66:8080");
const the_file = new DataGetter("minimally_compressible_file.bin");
const file_data = await the_file.base64();
const user_in = await get_user_input();

wss.on("error", console.error);

console.log("Websocket connected ws://localhost:8080");
wss.on("open", () => {
  switch (user_in) {
    case "1": {
      wss.send(JSON.stringify({ type: "big_data", data: file_data }));
      break;
    }
    case "2": {
      wss.send(JSON.stringify({ type: "get_data" }));
      break;
    }
  }
});

// Connection event handler
wss.on("message", (message: WebSocket.Data) => {
  console.log(message.toString());
});

async function get_user_input() {
  const user_in = prompt(
    "what do you want to do: \n(1): send a big file (test)\n(2): get the data"
  );
  return user_in;
}
