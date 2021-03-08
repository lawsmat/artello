/*
 * Created on Tue 3/24/2020
 *
 * Copyright (c) 2020 - DroneBlocks, LLC
 * Author: Dennis Baldwin
 * URL: https://github.com/dbaldwin/tello-video-nodejs-websockets
 *
 * PLEASE REVIEW THE README FILE FIRST
 * YOU MUST POWER UP AND CONNECT TO TELLO BEFORE RUNNING THIS SCRIPT
 */

// Fixed up by MoonBarc, but all credit goes to denis :)
//   (3/8/21)

// Import necessary modules for the project
// A basic http server that we'll access to view the stream
const http = require('http');

// To keep things simple we read the index.html page and send it to the client
const fs = require('fs');

// WebSocket for broadcasting stream to connected clients
const WebSocket = require('ws');

// We'll spawn ffmpeg as a separate process
const spawn = require('child_process').spawn;

// HTTP and streaming ports
const HTTP_PORT = 3000;
const STREAM_PORT = 3001


async function createServer() {
  /*
    1. Create the web server that the user can access at
    http://localhost:3000/index.html
  */
  server = http.createServer(function(request, response) {

    // Log that an http connection has come through
    console.log(
      'HTTP Connection on ' + HTTP_PORT + ' from: ' + 
      request.socket.remoteAddress + ':' +
      request.socket.remotePort
    );

    // Read file from the local directory and serve to user
    // in this case it will be index.html
    fs.readFile(__dirname + '/www' + request.url, function (err,data) {
      if (err) {
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return;
      }
      response.writeHead(200);
      response.end(data);
    });

  }).listen(HTTP_PORT); // Listen on port 3000


  /*
    2. Create the stream server where the video stream will be sent
  */
  const streamServer = http.createServer(function(request, response) {

    // Log that a stream connection has come through
    console.log(
      'Stream Connection on ' + STREAM_PORT + ' from: ' + 
      request.socket.remoteAddress + ':' +
      request.socket.remotePort
    );

    // When data comes from the stream (FFmpeg) we'll pass this to the web socket
    request.on('data', function(data) {
      // Now that we have data let's pass it to the web socket server
      webSocketServer.broadcast(data);
    });

  }).listen(STREAM_PORT); // Listen for streams on port 3001

  /*
    3. Begin web socket server
  */
  const webSocketServer = new WebSocket.Server({
    server: streamServer
  });

  // Broadcast the stream via websocket to connected clients
  webSocketServer.broadcast = function(data) {
    webSocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
}

/*
  5. Begin the ffmpeg stream. You must have Tello connected first
*/

async function stream() {
  var args = [
    "-i", "udp://0.0.0.0:11111",
    "-r", "30",
    "-s", "960x720",
    "-codec:v", "mpeg1video",
    "-b", "800k",
    "-f", "mpegts",
    "http://127.0.0.1:3001/stream"
  ];

  // Spawn an ffmpeg instance
  var streamer = spawn('ffmpeg', args, {shell: true});
  // Uncomment if you want to see ffmpeg stream info
  //streamer.stderr.pipe(process.stderr);
  streamer.on("exit", function(code){
      console.log("Failure", code);
  });
}

module.exports = {
  createServer,
  stream
}