
import { v4 as uuid } from 'uuid';

export function makeWorld(){
  const shapes=[];
  for(let i=0;i<40;i++){shapes.push({id:uuid(),x:200+Math.random()*800,y:200+Math.random()*500,size:20});}
  return {players:{}, bullets:[], shapes};
}
export function spawnPlayer(id,w){
  const p={id,x:640,y:360,queue:[],input:{}};
  w.players[id]=p;return p;
}
export function applyInput(p,inp){p.input=inp;}
export function stepWorld(w,dt){
  for(const p of Object.values(w.players)){
     const spd=120;
     p.x+=( (p.input.d?1:0)-(p.input.a?1:0) )*spd*dt;
     p.y+=( (p.input.s?1:0)-(p.input.w?1:0) )*spd*dt;
  }
}
