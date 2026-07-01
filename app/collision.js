import { gamePlay as G } from "./state.js";



export class Collision {
	constructor(invaders, earth) {
		this.invaders = invaders;		
		this.earth = earth;
	}	
	check(handler) {
		for (let inv of this.invaders) {
			if (!inv.alive) continue
				for (let def of this.earth) {

					if (!def.alive) continue
						if (overlap(def, inv)) {
							handler(def, inv);
							break
						}		
				}		
		} 				
	}
}


function overlap(a, b) {
	return   a.x  < b.x+b.width  &&
		a.x +a.width  >  b.x &&
		a.y < b.y+b.height &&	
		a.y + a.height > b.y	
}
