import { gamePlay as G } from "./state.js"
import { draw, COLS } from "./draw.js"
import { Mob } from "./mob.js" 


export function spawnMobs() {
    //let offset = 2 
    let initX = G.playGround.width/4 
    let initY = G.playGround.height / 10	
    let width = 40 
    let height = 40
    let line = 0
    let fragment = 	document.createDocumentFragment()
    for (let i = 0; i < G.mobs.length ; i++ ) {
            if (G.mobs[i].isUfo) continue
            let j = 2
            // a specie in the game have juts one row 
            if (i === 0) {
                j = 1  
            }
        for (let k = 0; k < j ; k++) {
            let row = []
            for (let m = 0; m < 11; m++) {

                let mob = new Mob(G.mobs[i], initX+(m * (width)), initY+(line * (height)  )) 
                row.push(mob)
                fragment.appendChild(mob.element)

            }		
            G.spawnedMobs.push([row, [...row].reverse()])

            line++
            G.playGround.element.appendChild(fragment) 	
            fragment = 	document.createDocumentFragment()
        } 
            
    }   	

    G.reversedMobs = [...G.spawnedMobs].reverse()
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


export function spawenUfo() {
    let width = 60 
    let height = 40
    let  x = G.playGround.width-width
    let y =   (height + height/2) 
    G.ufo = new Mob(G.mobs[G.mobs.length-1], x, y) 
    G.playGround.element.appendChild(G.ufo.element)
    G.ufo.element.classList.add("red")
    //console.log(G.ufo)
}

export function moveUfo() {
    if (!G.ufo) return 
    let offset = -5 
    if (G.ufo.canMove(offset, "x", G.playGround.width)) {
        G.ufo.move(offset, "x")
    } else {
        G.ufo.kill()
        G.ufo = null
    }
}
