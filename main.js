import { moveMobs}  from "./game.js"
import { gamePlay as G } from "./app/state.js"
import {spawnMobs, spawnShields } from "./app/scene.js"



function startGame() {	
//	G.score  = document.createElement("p") 
	//G.textContent = 0 
	G.playGround.element  = document.createElement("div") 
	G.playGround.element.id = "container"
	//G.playGround.element.appendChild(G.score)
	
	spawnMobs()

	document.body.appendChild(G.playGround.element)

	spawnShields()
	requestAnimationFrame(gameLoop)
//	spawenplayer()
}


let moveInterval = 50 
let lastTime = 0 
let start = 0 
function gameLoop(timestamp) {
	if (!lastTime) {
			start = lastTime = timestamp
			
	}
	if (timestamp-lastTime >= moveInterval) {
		moveMobs()
		lastTime = timestamp
	}
	// G.score.textContent = (timestamp-start) / 1000
	requestAnimationFrame(gameLoop)
}





startGame() 
