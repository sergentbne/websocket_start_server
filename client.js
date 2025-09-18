const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket("ws://206.167.46.66:8080");

wss.on('error', console.error);

console.log('Websocket connected ws://localhost:8080');

let file = Bun.file("minimally_compressible_file.bin")
const data = await file.bytes()
// Connection event handler
wss.on("message", (message) => {
    console.log(`hello: ${message}`)
    wss.send(data)
});

