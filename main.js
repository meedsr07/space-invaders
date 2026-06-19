import { moveMobs, shot, moveRays, cleanExps}  from "./game.js"
import { gamePlay as G, keysstate } from "./app/state.js"
import {spawnMobs, spawnShields, spawenUfo, moveUfo } from "./app/scene.js"
import * as player  from "./app/player.js"
import { checkBulletEnemyCollision } from "./app/collision.js";




function startGame() {	
	G.score  = document.createElement("p") 
	G.textContent = 0 
	G.playGround.element  = document.createElement("div") 
	G.playGround.element.id = "container"
	G.playGround.element.appendChild(G.score)
	
	spawnMobs()

	document.body.appendChild(G.playGround.element)

	spawnShields()
	player.spawnPlayer()
	requestAnimationFrame(gameLoop)
	
}


let moveInterval = 800 
let lastFrame = 0 
let ufoInterval  = 100 
let shots  = 0  
let ufoTimer = 0 
let shotInterval = 1200 
let lastTime = 0 
let lastShot = 0
let delayTimer = 0 
let delay = 15000 + Math.random() * 15000 
let start = 0 
function gameLoop(timestamp) {
	const { interval, step } = getSpeed()	
	
	if (!lastTime) {
		delayTimer =  lastShot = start = lastTime = lastFrame =  ufoTimer = timestamp 	
	}
	const delta = timestamp-lastFrame
	
	if (timestamp-lastShot >= shotInterval) {
		shot()
		lastShot = timestamp
	}
	if (timestamp-lastTime >= interval) {
		moveMobs(step)
		lastTime = timestamp
	}
	if (timestamp-ufoTimer >= ufoInterval) { 
		if (G.ufo) {
			moveUfo()
		}
		ufoTimer = timestamp
	}
	if (keysstate.bullet) {
		player.spawenBullet()
		keysstate.bullet = false
	}
	if (timestamp-delayTimer >= delay) {
		if (!G.ufo && G.shots >= 10) {
			spawenUfo()
			G.shots = 0
		}	
		delay = 15000 + Math.random() * 15000 
		delayTimer = timestamp
	}
    if (keysstate.left) {
        player.moveLeft()
    }
    if (keysstate.right) {
        player.moveRight()
    }
	cleanExps(delta) 
	moveRays()
    player.updateBullets();
    checkBulletEnemyCollision();
   	lastFrame = timestamp  
	G.score.textContent = (timestamp-start) / 1000
	requestAnimationFrame(gameLoop)
}


function getSpeed() {
    const ratio = ( G.aliveMobs / 55) * 0.50 
    
    const interval = 100 + (700 * ratio)  
    const step =  (5+ 20 ) //Math.floor(5 + (20 * (1 - ratio))) 
   	 
    return { interval, step }
}

startGame() 
