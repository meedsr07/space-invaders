import {gamePlay as G}  from "./app/state.js"





export  function shot() {
 	let rev = [...G.spawnedMobs].reverse() 
	let closedOne = null 
	for (let row of rev) {
		for (let mob of row[0]) {
			if ( mob.alive &&  ( !closedOne || Math.abs(closedOne.x-G.player.x) > Math.abs(mob.x-G.player.x)   ) )  {
				closedOne = mob
			} 
		}
	}
	let ray = {height: 10, width:10 } 
	ray.element = document.createElement("div")
	//ray.name = "ray_"+rand(1, 3)+"_"
	ray.element.classList.add("bullet")
	ray.element.style.position = "absolute"
	ray.element.classList.add("red")
	ray.element.style.left = "0px" 
	ray.element.style.top = "0px"
	ray.x = closedOne.x+20
	ray.y = closedOne.y+20
	ray.element.style.transform =  `translate(${ray.x}px, ${ray.y}px)`
	G.rays.push(ray) 
	G.playGround.element.appendChild(ray.element)
}

function killPlayer(ray) {
		 const hit = 
			    ray.x < G.player.x+6 + G.player.width-6  &&
   				ray.x + ray.width > G.player.x+6  &&
			    ray.y < G.player.y +G.player.height &&
			    ray.y + ray.height > G.player.y;
                    if (hit) {
                    ray.element.style.display = "none";// Todo later:
					alert("failed")
                    return
                }
	
}
function hitShield(b) {
    for (let py = b.y+b.height; py >=  b.y + b.height/2; py--) {
        for (let px = b.x; px <= b.x + b.width/2; px++) {
            const key = `${px},${py}`;
            if (G.bricks.has(key)) {
                G.bricks.get(key).remove();
                G.bricks.delete(key);
                b.element.style.display = "none";
					G.rays.splice(G.rays.indexOf(b), 1)	
                    return true;
            }
        }
    }
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
			for (let brick of G.bricks) { // must update to handle map
					if ( ( (brick.x+3) >=  mob.x &&  (brick.x+3) <= mob.x+48) && ( (brick.y+3) >=  mob.y &&  (brick.y+3) <= mob.y+32)) {
						shield.bricks.splice(G.bricks.indexOf(brick), 1)
						brick.element.remove()

					}
			}
}


export function  moveRays() {
	for (let i = 0; i < G.rays.length; i++ ) {
			let ray = G.rays[i]
			if ( ((ray.y+20)+ 4) > 600 ) { 
			//	destroyRay(ray, "red")
				G.rays.splice(i, 1)
				i--	
				ray.element.remove()
				continue 
				//return 
			}
			if (hitShield(ray) || killPlayer(ray)) {
					continue 
			} 
			ray.y += 3
			ray.element.style.transform =  `translate(${ray.x}px, ${ray.y}px)`	
	} 
}

function  destroyRay(ray, col) {
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

export   function moveMobs(xOffset) {
		console.log(xOffset)
		xOffset *= G.direction
	//	let xOffset = ( 5* G.direction) 
		let yOffset = 20
		let swip = false	

		for (let row of G.spawnedMobs) {
			let index  = 0 
			if (G.direction > 0) {
				index = 1
			}
		
			for (let mob of row[index]) {
		
					
		
				if (!mob.move(xOffset, "x", G.playGround.width) && mob.alive) {
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
					if (!mob.move(yOffset, "y", G.playGround.height) && mob.alive) {
						console.log("game Over")
					}
					
			   }
			}
		} 
}


const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
