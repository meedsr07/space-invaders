import { movMobs,  shout, movRays, cleanRays}  from "./game.js"
import { gamePlay as G } from "./state.js"
import draw from "./draw.js"

//import { spawenplayer, moveLeft, moveRight } from "./player.js"




function createMob(name, x, y) {
		let div = document.createElement("div")	
		div.id = "alien"
		div.style.top = y+"px"
		div.style.left = x+"px"
		div.classList.add(name)
		let col = G.layers[Math.round(y/85)]
		div.classList.add(col) 
		
		div.classList.add(name+"_1") 
		div.style.display = "block"
		let mob = {
				name: name,
				v: 1,
				col: col,
				element: div,
				
				x: x,
				y: y,
				alive: true,  // may not keep	
		}
		return mob
} 



function startGame() {	

	let element = document.createElement("div") 
	element.id = "container"


	
	spawnMobs(element)

	G.playGround = element
	document.body.appendChild(element)
	spawnShields()
	console.log(G.bricks)	
//	spawenplayer()
}




function spawnMobs(container) {
	//let offset = 2 
	let initX = 180
	let initY = 85
	let line = 0
	let fragment = 	document.createDocumentFragment()
	for (let i = 0; i < G.mobs.length ; i++ ) {
			let j = 2
			if (i === 0) {
				j = 1  
			}
		for (let k = 0; k < j ; k++) {
			let row = []
			for (let m = 0; m < 11; m++) {

				let mob = createMob(G.mobs[i], initX+(m * (40)), initY+(line * (40)  )) 
				row.push(mob)
				fragment.appendChild(mob.element)

			}		
			G.spawnedMobs.push([row, [...row].reverse()])

			line++
			container.appendChild(fragment) 	
			fragment = 	document.createDocumentFragment()
		} 
			
	}   	

	G.reversedMobs = [...G.spawnedMobs].reverse()
}


function spawnShields() {
	let offset = 200
	for (let i = 1 ; i <= 4 ; i++ ) {
			let cv = document.createElement("div")

			cv.classList.add("shield")
			cv.style.position = "absolute"
			cv.style.left = ((offset * i ) - 120 )  +"px" 
			cv.style.top = 500+"px"
			draw(cv, (offset * i) -120 , 500)

	} 
}



 
const movInterval = 50
const fireInterval = 800
const raysInterval = 1
let lastTime = 0 
let  cur = 0
let fireTimer = 0
let raysTimer = 0 

 function loop(timeStamp) {
	let d = timeStamp-lastTime	
	lastTime = timeStamp
	cur+= (d)
	fireTimer += d 
	raysTimer += d
	if (raysTimer >= raysInterval) {
		movRays()
		raysTimer = 0
	} 
	if (cur >= movInterval) {
		if (fireTimer >= fireInterval) {
				
				shout()
				fireTimer = 0
		} 		
	
		cleanRays() 	
		movMobs() 
		cur = 0
	} 	
	requestAnimationFrame(loop)

}

startGame()


/*document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }
});
*/
requestAnimationFrame(loop)



