const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket("ws://localhost:8080");

console.log('Websocket connected ws://localhost:8080');


// Connection event handler
wss.on("message", (message) => {
    console.log(`hello: ${message}`)

});