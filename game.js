import {gamePlay as G}  from "./app/state.js"





export  function shot() {
 	let rev = [...G.spawnedMobs].reverse() 
	let closedOne = null 
	for (let row of rev) {
		for (let mob of row[0]) {
			if ((!closedOne ) || (  Math.abs(closedOne.x-G.player.x) > Math.abs(mob.x-G.player.x)   ) )  {
				closedOne = mob
			} 
		}
	}
	let ray = {} 
	ray.element = document.createElement("div")
	ray.id = 1
	ray.name = "ray_"+rand(1, 3)+"_"
	ray.element.style.backgroundImage = "url(assets/"+ray.name+ray.id+".png)"
	ray.element.id = "ray"
	ray.element.style.position = "absolute"
	ray.element.style.left = 0 
	ray.element.style.top = 0
	ray.x = closedOne.x+20
	ray.y = closedOne.y+20
	ray.element.style.transform =  `translate(${ray.x}px, ${ray.y}px)`
	G.rays.push(ray) 
	G.playGround.element.appendChild(ray.element)
}


function destroyShield(ray) {
		let shield = null 
		let head = {x: ray.x+10, y: ray.y+20  } 
		
		for (let sh of G.shields) {
				if ( Math.abs(sh.x-head.x) <= (6 * 6) &&  Math.abs(sh.y-head.y) <= (6*4)  ) {
						shield = sh 
						break 
				}
		}
		if (!shield) {
				return 
		}
		let queue = [] 
		let makeExp = false
		 for (let brick of shield.bricks) {
				if ( Math.abs((brick.x+3)-head.x) <= 8   &&  Math.abs((brick.y+3)-(head.y)) <= 16 ) {
				if (Math.abs((brick.x+3)-head.x) <= 3  &&  Math.abs((brick.y+3)-(head.y)) <= 10    ) {
						makeExp = true
						
				}
					queue.push(brick) 
				}
		 }
		if (makeExp === true) {
				destroyRay(ray, "green")
				for (let br of queue) {
						shield.bricks.splice(shield.bricks.indexOf(br), 1)
						br.element.remove()
					
				} 
		} else {
			return false
		}
		return true 	
}

function overridShields(mob) {
	for (let shield of G.shields) {
			for (let brick of shield.bricks) {
					if ( ( (brick.x+3) >=  mob.x &&  (brick.x+3) <= mob.x+48) && ( (brick.y+3) >=  mob.y &&  (brick.y+3) <= mob.y+32)) {
						shield.bricks.splice(shield.bricks.indexOf(brick), 1)
						brick.element.remove()

					}
			}
	}	
}


export function  movRays() {
	for (let ray of G.rays ) {
			if ( ((ray.y+20)+ 4) > 600 ) { 
				destroyRay(ray, "red")
				return 
			}
			if (destroyShield(ray)) {
					return 
			} 
			ray.y += 4
			ray.id = ((ray.id+1)%5) || 1
			ray.element.classList.remove(ray.col)
			ray.element.style.backgroundImage = "url(assets/"+ray.name+ray.id+".png)"
			ray.element.classList.add(ray.col)
			ray.element.style.transform =  `translate(${ray.x}px, ${ray.y}px)`	
	} 
}

function  destroyRay(ray, col) {
		G.rays.splice(G.rays.indexOf(ray), 1)
		ray.element.remove()
		let exp = document.createElement("div")
		exp.classList.add("ray_exp")
		exp.style.position = "absolute"
		exp.style.left = 0
		exp.style.right = 0
		exp.style.transform =  `translate(${ray.x}px, ${ray.y+10}px)`	
		exp.classList.add(col)
		G.playGround.element.appendChild(exp)
		G.expQueue.push({element: exp, frames: 4 })
}

export function  cleanRays() {
		let i = 0 
		let copy = G.expQueue
		for (let exp of copy)  {
			if (!exp.frames) {
				exp.element.style.display = "none"
				G.expQueue.splice(G.expQueue.indexOf(exp, 1)) 
			} else {
				exp.frames--
			}
		}
		
}

export   function moveMobs() {
		let xOffset = ( 5* G.direction) 
		let yOffset = 20
		let swip = false	

		for (let row of G.spawnedMobs) {
			let index  = 0 
			if (G.direction > 0) {
				index = 1
			}
		
			for (let mob of row[index]) {
		
			
		
				if (!mob.move(xOffset, "x", G.playGround.width)) {
						swip = true 
						break
				} 	
			

			}
		
		}
		if (swip) {
				if (G.direction === 1) {
					G.direction = -1 
				} else {
					G.direction = 1
				}
			for (let row of G.reversedMobs) {
			
				for (let mob of row[0]) {
					if (!mob.move(yOffset, "y", G.playGround.height)) {
						alert("game Over")
					}
					
			   }
			}
		} 
}


const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
