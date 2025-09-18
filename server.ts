// server.ts
import { WebSocketServer } from "ws";
import WebSocket from 'ws';

// Create a WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

// Connection event handler
wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');

    // Send a welcome message to the client
    ws.send('Welcome to the WebSocket server!');

    // Message event handler
    ws.on('message', (message: WebSocket.Data, isBinary: boolean) => {
        // Normalize message to string for logging/echoing
        if (isBinary) {
            console.log("Recieved a binary file")
        } else
        {
            const text = typeof message === 'string' ? message : message.toString();
            console.log(`Received: ${text}`);
        }


        // Echo the message back to the client
        ws.send('Server received something');
    });

    // Close event handler
    ws.on('close', (code: number, reason: Buffer) => {
        console.log('Client disconnected', { code, reason: reason.toString() });
    });

    // Error handler (recommended)
    ws.on('error', (err: Error) => {
        console.error('WebSocket error:', err);
    });
});
