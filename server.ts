// server.ts
import { WebSocketServer, WebSocket } from "ws";

// Create a WebSocket server on port 8080

main();

async function save_file(file_data: string) {
  let time = performance.now();

  let file_test = Bun.file("alternative_data");
  if (await file_test.exists()) {
    await file_test.delete();
  }
  // const json_data = JSON.parse(file_data);
  const raw_data = Buffer.from(file_data, "base64");
  await Bun.write("alternative_data", raw_data);
  console.log("file saved in %f", (performance.now() - time).toFixed(3));
}

async function get_data_of_file() {
  let data;
  let file_test = Bun.file("./alternative_data");

  let file_exists = await file_test.exists();
  if (!file_exists) {
    return "No Data";
  }
  data = (await file_test.bytes()).toBase64();
  return data;
}

function main() {
  const wss = new WebSocketServer({ port: 8080 });

  console.log("WebSocket server is running on ws://0.0.0.0:8080");

  wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected");

    // Send a welcome message to the client
    ws.send("Welcome to the WebSocket server!");

    // Message event handler

    ws.on("message", async (data: string) => {
      const file_data = JSON.parse(data);
      switch (file_data.type) {
        case "big_data": {
          save_file(file_data.data);
          break;
        }
        case "get_data": {
          let array_of_numb = new Array(5).fill(0);
          for (let i: number = 0; i < 5; i++) {
            array_of_numb[i] = Math.floor(Math.random() * 100);
          }
          let data = await get_data_of_file();
          let json_data = {
            type: "return_value",
            ultrasound: array_of_numb,
            data: data,
          };
          ws.send(JSON.stringify(json_data));
          break;
        }
      }
    });

    // Close event handler
    ws.on("close", (code: number, reason: Buffer) => {
      console.log("Client disconnected", { code, reason: reason.toString() });
    });

    // Error handler (recommended)
    ws.on("error", (err: Error) => {
      console.error("WebSocket error:", err);
    });
  });
}
