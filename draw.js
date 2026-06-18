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
const COLS = SHIELD[0].length;





export default function draw(shield, x, y,   d){

let frags = document.createDocumentFragment()
	let bricks = [] 
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      if(!SHIELD[r][c] ) continue;
  			let div = document.createElement("div")   
			div.style.position = "absolute"
			div.classList.add("brick")
			div.style.backgroundColor = "green"
			div.style.left = "0px"
			div.style.right = "0px"
			div.style.transform = `translate(${x+c * 6}px, ${ y+r * 6}px)`
			frags.append(div)
			if (r === 4 && c === 4 ) {
				G.player = {x: x+c * 6,  y : y+r * 6}  // mock player for testing
			}
			bricks.push({element : div, x: x+c * 6, y: y+r*6 }) 
			
    }
  }
	G.shields.push({y : y+((ROWS*6)/2) , x : x+((COLS*6)/2), bricks: bricks }) 
	G.playGround.appendChild(frags)
}


