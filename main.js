import { moveMobs, shot, moveRays}  from "./game.js"
import { gamePlay as G, keysstate } from "./app/state.js"
import {spawnMobs, spawnShields } from "./app/scene.js"
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
let shotInterval = 1200 
let lastTime = 0 
let lastShot = 0
let start = 0 
function gameLoop(timestamp) {
	const { interval, step } = getSpeed()	
	if (!lastTime) {
		lastShot = start = lastTime = timestamp 
			
	}

	
	if (timestamp-lastShot >= shotInterval) {
		shot()
		lastShot = timestamp
	}
	if (timestamp-lastTime >= interval) {
		moveMobs(step)
		lastTime = timestamp
	}

	if (keysstate.bullet) {
		player.spawenBullet()
		keysstate.bullet = false
	}
    if (keysstate.left) {
        player.moveLeft()
    }
    if (keysstate.right) {
        player.moveRight()
    }
	moveRays()
    player.updateBullets();
    checkBulletEnemyCollision();
    
	 G.score.textContent = (timestamp-start) / 1000
	requestAnimationFrame(gameLoop)
}


function getSpeed() {
    const ratio = G.aliveMobs / 55  
    
    const interval = 100 + (700 * ratio)  
    const step = Math.floor(5 + (20 * (1 - ratio))) 
    
    return { interval, step }
}

startGame() 
