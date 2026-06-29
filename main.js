import { moveMobs, shot, moveRays, cleanExps } from "./game.js"
import { gamePlay as G, keysstate } from "./app/state.js"
import { YouWin , GameOver} from "./app/js.js"
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

function NewGame() {
	start = 0
	cancelAnimationFrame(animationId)
	document.querySelector("#ui #container").innerHTML = ""
	document.querySelector("#ui #livesContainer").innerHTML = ""
	G.playGround= {width: 800, height: 600}
	G.player= {}
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
	G.time  = document.querySelector("#ui #time")
	G.score  = document.getElementById("score")
	G.playGround.element  = document.querySelector("#ui #container")
	G.livesContainer = document.querySelector("#ui #livesContainer")
	spawnMobs()
	spawnShields()
	G.player = new Player()
	animationId = requestAnimationFrame(gameLoop)
}


export function startLoop() {
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
}


export function stopLoop() {
    // add pause state 
	cancelAnimationFrame(animationId)
	// add a counter to get paused time
	animationId = null
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
		GameOver()
		return
	}
	if (G.aliveMobs == 0){
		YouWin()
		returs  =n
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
	
	G.time.textContent = ((timestamp-start) / 1000).toFixed(0)
	G.score.textContent = G.player.score
	moveRays()
	animationId = requestAnimationFrame(gameLoop)
}



function getSpeed() {
	const ratio = (G.aliveMobs / 55) * 0.50

	const interval = 100 + (700 * ratio)
	const step = (5 + 20) //Math.floor(5 + (20 * (1 - ratio))) 

	return { interval, step }
}
