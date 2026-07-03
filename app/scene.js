import { gamePlay as G } from "./state.js"
import { draw, COLS } from "./draw.js"
import { Mob } from "./mob.js" 


export function spawnMobs() {
   
    let initX = G.playGround.width/4 
    let initY = G.playGround.height / 10	
    let width = 40 
    let height = 40 
    let gap = 6 
    let line = 0
    let fragment = 	document.createDocumentFragment()
    for (let i = 0; i < G.mobs.length ; i++ ) {
            
            let j = 2
            // a specie in the game have juts one row 
            if (i === 0) {
                j = 1  
            }
        for (let k = 0; k < j ; k++) {
            let row = []
            for (let m = 0; m < 11; m++) {

                let mob = new Mob(G.mobs[i], initX+(m * (width+ gap)), initY+(line * (height+ gap / 2 )  )) 
                row.push(mob)
                fragment.appendChild(mob.element)

            }		
            G.spawnedMobs.push(row)

            line++
            G.playGround.element.appendChild(fragment) 	
            fragment = 	document.createDocumentFragment()
        } 
            
    }   	

   
}



export function spawnShields() {
    let slotW = G.playGround.width /  4 
    let shieldW = COLS * 6  
    for (let i = 0 ; i < 4 ; i++ ) {
            let centerX = slotW * i + slotW/2 	
            let x = centerX - shieldW/2 
            draw(x, 500)

    } 
}




