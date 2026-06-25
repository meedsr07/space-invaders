import { moveMobs, shot, moveRays, cleanExps } from "./game.js"
import { gamePlay as G, keysstate } from "./app/state.js"
import { spawnMobs, spawnShields, spawenUfo, moveUfo } from "./app/scene.js"
import { Player } from "./app/player.js";
import { Bullet } from "./app/bullet.js";
import { checkBulletEnemyCollision } from "./app/collision.js";
import { Timer } from "./app/timer.js";
import "./app/input.js";
import {drawLives} from './app/draw.js'




const timers = {
	moveMobs: new Timer(800),
	moveUfo: new Timer(50),
	shotMob: new Timer(1500),
	spawenUfo: new Timer((1500 + Math.random() * 1500), true)
}




let start = 0


export var animationId = null
export function startGame() {
	G.time  = document.querySelector("#ui #time")
	G.time.textContent = 0
	//G.textContent = 0 
	G.playGround.element  = document.querySelector("#ui #container")
	G.livesContainer = document.createElement('div')
	G.livesContainer.id = "livesContainer"
	document.querySelector("#ui").append(G.livesContainer);
	spawnMobs()
	spawnShields()
	G.player = new Player()
	requestAnimationFrame(gameLoop)
}


function pause() {
	// add pause state 
	cancelAnimationFram(animationId)
	// add a counter to get paused time
	animationId = null
}

function resume() {
	for (let val of timers.values) {
		val.lastTime = performance.now()
	}
	animationId = requestAnimationFrame(gameLoop)
}


export function startLoop() {
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
}


export function stopLoop() {
    cancelAnimationFrame(animationId);
    animationId = null;
}

export function gameLoop(timestamp) {
	const { interval, step } = getSpeed()	
	if (!start) start = timestamp
	timers.moveMobs.edit(interval)
	cleanExps(timestamp)
	
	drawLives()
	// player.updateBullets();
	G.player.updateBullets()
	checkBulletEnemyCollision();
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
		console.log('you lose')
	}

	if (!G.freezeEnemies && timers.moveMobs.tick(timestamp)) {
		moveMobs(step)
	}
	if (!G.freezeEnemies && timers.shotMob.tick(timestamp)) {
		console.log("called")
		shot()
	}
	if (!G.freezeEnemies && timers.moveUfo.tick(timestamp)) {
		moveUfo()
	}
	if (!G.ufo && timers.spawenUfo.tick(timestamp)) {
		if (G.shots >= 10) {
			spawenUfo()
			G.shots = 0
		}
	}
	G.time.textContent = ((timestamp-start) / 1000).toFixed(3)
	moveRays()
	animationId = requestAnimationFrame(gameLoop)
}



function getSpeed() {
	const ratio = (G.aliveMobs / 55) * 0.50

	const interval = 100 + (700 * ratio)
	const step = (5 + 20) //Math.floor(5 + (20 * (1 - ratio))) 

	return { interval, step }
}
