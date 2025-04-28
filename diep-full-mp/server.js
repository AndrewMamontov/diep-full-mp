
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { makeWorld, spawnPlayer, applyInput, stepWorld } from './world.js';

const app=express();
const srv=http.createServer(app);
const io=new Server(srv,{cors:{origin:"*"}});
let world=makeWorld();

io.on('connection',sock=>{
  const player=spawnPlayer(sock.id,world);
  sock.emit('init',{world,selfId:sock.id});
  sock.on('input',inp=>applyInput(player,inp));
  sock.on('shoot',ang=>player.queue.push(ang));
  sock.on('disconnect',()=>delete world.players[sock.id]);
});

setInterval(()=>{stepWorld(world,0.05);io.emit('snapshot',world);},50);

app.use('/',express.static('public'));
const PORT=process.env.PORT||3000;
srv.listen(PORT,()=>console.log('Server',PORT));
