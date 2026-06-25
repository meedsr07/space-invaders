import { moveMobs, shot, moveRays, cleanExps } from "./game.js"
import { gamePlay as G, keysstate } from "./src/state.js"
import { spawnMobs, spawnShields, spawenUfo, moveUfo } from "./src/scene.js"
import { Player } from "./src/player.js";
import { Bullet } from "./src/bullet.js";
import { checkBulletEnemyCollision } from "./src/collision.js";
import { Timer } from "./src/timer.js";
import "./src/input.js";
import {drawLives} from './src/draw.js'




const timers = {
	moveMobs: new Timer(800),
	moveUfo: new Timer(50),
	shotMob: new Timer(1500),
	spawenUfo: new Timer((1500 + Math.random() * 1500), true)
}




let start = 0
let animationId = null

function startGame() {
	G.score = document.createElement("p")
	G.score.textContent = 0
	G.playGround.element = document.createElement("div")
	G.playGround.element.id = "container"
	G.playGround.element.appendChild(G.score)
	G.livesContainer = document.createElement('div')
	G.livesContainer.id = "livesContainer"
	document.body.append(G.livesContainer);
	spawnMobs()

	document.body.appendChild(G.playGround.element)

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




function gameLoop(timestamp) {
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
	moveRays()

	

	G.score.textContent = (timestamp - start) / 1000
	animationId = requestAnimationFrame(gameLoop)
}


function getSpeed() {
	const ratio = (G.aliveMobs / 55) * 0.50

	const interval = 100 + (700 * ratio)
	const step = (5 + 20) //Math.floor(5 + (20 * (1 - ratio))) 

	return { interval, step }
}

startGame() 
