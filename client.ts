import WebSocket from 'ws';
import {DataGetter} from "./GetData.ts";
import 'ora';
import ora from 'ora';


// Create a WebSocket server on port 8080
const wss = new WebSocket("ws://localhost:8080");
const the_file = new DataGetter("minimally_compressible_file.bin");
const file_data = await the_file.base64();

wss.on('error', console.error);

console.log('Websocket connected ws://localhost:8080');
wss.on("open", () => {
    const spinner = ora('sending big file').start();
    wss.send(JSON.stringify({type: "big_data", data: file_data}));
    spinner.stop();
})

// Connection event handler
wss.on("message", (message: WebSocket.Data) => {
    console.log(message.toString());
});

