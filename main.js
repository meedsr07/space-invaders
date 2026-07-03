import { moveMobs, shot, moveRays, cleanExps, createRays, collisionHandler} from "./game.js"
import { gamePlay as G, keysstate } from "./app/state.js"
import { YouWin , GameOver} from "./app/switcherHTML.js"
import { spawnMobs, spawnShields} from "./app/scene.js"
import { Player } from "./app/player.js";
import { Bullet } from "./app/bullet.js";
import { Collision } from "./app/collision.js";
import { Timer } from "./app/timer.js";
import "./app/input.js";
import {drawLives} from './app/draw.js'



export const timers = {
	moveMobs: new Timer(800),
	shotMob: new Timer(1500),
}




let start = 0


var animationId = null
let idsetInterval = null
function NewGame() {
	start = 0
	cancelAnimationFrame(animationId)
	document.querySelector("#ui #container").innerHTML = ""
	document.querySelector("#ui #livesContainer").innerHTML = ""
	G.playGround= {width: 800, height: 600}
	G.player= {};
	G.collision = null;
	G.spawnedMobs= []
	G.freezeEnemies= false
	G.playerHit = false
	G.aliveMobs= 55
	G.bricks= []
	G.direction= 1
	G.rays= []
	G.shots= 0
	G.exps= []
    keysstate.left = false
    keysstate.right = false 
}

export function startGame() {
	NewGame()
	timer()
	G.time  = document.querySelector("#ui #time")
	G.score  = document.getElementById("score")
	G.playGround.element  = document.querySelector("#ui #container")
	G.livesContainer = document.querySelector("#ui #livesContainer")
	spawnMobs()
	spawnShields()
	createRays()
	G.player = new Player()
	G.collision = new Collision([G.spawnedMobs.flat(), G.rays,  G.player.bullet].flat(), [G.player, G.bricks, G.player.bullet].flat() )
	animationId = requestAnimationFrame(gameLoop)
}


export function startLoop() {
    cancelAnimationFrame(animationId);
	timers.shotMob.lastTime = performance.now()
	timer()
    animationId = requestAnimationFrame(gameLoop);
}


export function stopLoop() {
    // add pause state 
	cancelAnimationFrame(animationId)
	clearInterval(idsetInterval)
	// add a counter to get paused time
	idsetInterval = null
	animationId = null
}

export function gameLoop(timestamp) {
	const interval = getSpeed()	
	timers.moveMobs.edit(interval)
	cleanExps(timestamp)
	
	drawLives()
	// player.updateBullets();
	G.player.updateBullets()
	//checkBulletEnemyCollision();
	G.collision.check(collisionHandler)
	if (!G.playerHit && keysstate.bullet) {
		G.player.spawnBullet()
		keysstate.bullet = false
	}
	if (!G.playerHit && keysstate.left) {

		G.player.moveLeft()
	}
	if (!G.playerHit && keysstate.right) {

		G.player.moveRight()
	}
	if (G.player.lives  === 0) {
		GameOver()
		return
	}
	if (G.aliveMobs == 0){
		YouWin()
		return
	}

	if (!G.freezeEnemies && timers.moveMobs.tick(timestamp)) {
		moveMobs(14)
	}
	if (!G.freezeEnemies && timers.shotMob.tick(timestamp)) {
		shot()
	}
	G.score.textContent = G.player.score
	moveRays()
	animationId = requestAnimationFrame(gameLoop)
}


function timer(){
	idsetInterval = setInterval(()=>{
		start += 10
		if(start%1000 == 0){
			let min = String(((start/1000)/60).toFixed(0)).padStart(2,"0")
			let sec = String(((start/1000)%60).toFixed(0)).padStart(2,"0")
			G.time.textContent = min + ":"+ sec
		}
	},10)
	
}


function getSpeed() {
    const maxAlive = 55;

    const maxInterval = 800; 
    const minInterval = 25; 

    let t = (G.aliveMobs - 1) / (maxAlive - 1);
    t = Math.max(0, Math.min(1, t));

    const curved = t * t;

    const interval = minInterval + (maxInterval - minInterval) * curved;

    return interval
}