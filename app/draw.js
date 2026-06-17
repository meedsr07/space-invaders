import {gamePlay as G} from "./state.js"

const SHIELD = [
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,0,0,0,1,1,1],
    [1,1,0,0,0,0,0,0,0,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,1,1],
]

const ROWS = SHIELD.length;
export const COLS = SHIELD[0].length;





export  function draw(x, y,   d){

let frags = document.createDocumentFragment()
//	let bricks = [] 
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      if(!SHIELD[r][c] ) continue;
  			let div = document.createElement("div")   
			div.style.position = "absolute"
			div.classList.add("brick")
			div.style.backgroundColor = "green"
			div.style.left = "0px"
			div.style.right = "0px"
			let brickX = x+c * 6 
			let brickY = y+ r * 6 
			div.style.transform = `translate(${brickX}px, ${brickY}px)`
			frags.append(div)
			G.bricks.set({brickX, brickY} , div) 
			
    }
  }
//	G.shields.push({y : y+((ROWS*6)/2) , x : x+((COLS*6)/2), bricks: bricks }) 
	G.playGround.element.appendChild(frags)
}


