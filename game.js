import { gamePlay as G } from "./app/state.js"
import { Bullet } from "./app/bullet.js";
import { Player } from "./app/player.js";
import { Mob } from "./app/mob.js";
import { playerExplosion } from "./app/draw.js"
import {GameOver} from "./app/switcherHTML.js"
import { Entity } from "./app/mob.js"
import { timers } from "./main.js"
import { Collision } from "./app/collision.js"




export function shot() {
	let rev = [...G.spawnedMobs].reverse()
	let closedOne = null
	for (let row of rev) {
		for (let mob of row) {
			if (mob.alive && (!closedOne || Math.abs(closedOne.x - G.player.x) > Math.abs(mob.x - G.player.x))) {
				closedOne = mob
			}
		}
	}
	if (!closedOne) {
		return
	}
 
	let ray = G.rays.find(r => !r.alive)
	if (!ray) {
		return
	}
 
	ray.show()
	ray.x = closedOne.x + 20
	ray.y = closedOne.y + 20
	ray.element.style.transform = `translate(${ray.x}px, ${ray.y}px)`
	
}


 
export function createRays() {
	for (let i = 0; i < 6; i++) {
		let element = document.createElement("div")
		element.classList.add("bullet")
		element.classList.add("red")
		element.style.position = "absolute"
		element.style.left = "0px"
		element.style.top = "0px"
 
		let ray = new Entity(0, 0, element, false, 2, 8)
 
		G.rays.push(ray)
		ray.hide()
		G.playGround.element.appendChild(ray.element)
	}
}
 

 















export function moveRays() {
	for (let i = 0; i < G.rays.length; i++) {
		let ray = G.rays[i]
		if (!ray.alive) {
			continue
		}
 
		if (((ray.y + 20) + 4) > 600) {
			ray.hide()
			continue
		}
 
	
 
		ray.move(0, 4)
	}
}
 




export function cleanExps(timestamp) {
	for (let i = G.exps.length - 1; i >= 0; i--) {

		let exp = G.exps[i]


		if (exp.timer.tick(timestamp)) {
			exp.element.remove()
			G.exps.splice(i, 1)
		}
	}

}

export function moveMobs(xOffset) {
	xOffset *= G.direction
	let yOffset = 20
	let swip = false
	
	outer: for (let row of G.spawnedMobs) {

		for (let mob of row) {
			if (!mob.alive) continue
			if (!mob.canMove(xOffset, "x", G.playGround.width)) {
				swip = true
				break outer

			}
		}
	}
	if (swip) {
		G.direction *= -1
	}
	for (let row of G.spawnedMobs) {


		for (let mob of row) {
			if (!mob.alive) continue
			if (!mob.canMove(yOffset, "y", G.playGround.height)) {
				G.player.lives = 0 
				return
			}
			if (!swip) {
				mob.move(xOffset, "x", G.playGround.width)
			} else {
				mob.move(yOffset, "y", G.playGround.height)
			}

		}

	}


}


export function collisionHandler(def, inv) {
		if (def instanceof Bullet && inv instanceof Mob) {
				G.player.score += inv.kill()	
				def.hide()
				return
		}	
		if (def instanceof  Entity && inv instanceof Bullet) {
				def.hide();
				inv.hide();	
				return
		}
		if (def instanceof  Entity && inv instanceof Entity) {
				def.hide();
				inv.hide();	
				return
		}
		if (def instanceof  Bullet && inv instanceof Entity) {
				def.hide();
				inv.hide();	
				return
		}
		if (def instanceof  Entity && inv instanceof Mob) {
				def.hide();
				return
		}
		if (def instanceof  Player && inv instanceof Entity) {
				G.player.live--	
				G.playerHit = true;
				G.freezeEnemies = true;
		
				G.player.lives--			

				G.player.element.style.display = 'none'
				const exp = playerExplosion(G.player.x, G.player.y);
				setTimeout(() => {
					timers.shotMob.lastTime = performance.now()
					exp.style.display = 'none'
					G.player.element.style.display = "block";
					G.playerHit = false;
					G.freezeEnemies = false;
		}, 1500);
				inv.hide();
				return	
		}
}


