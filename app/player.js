import { gamePlay as G, keysstate } from "./state.js";
// create the player and set the initial position of the player
export function spawnPlayer() {
    const gamebox = G.playGround 
    const player = document.createElement('div')
    player.id = 'playership'
    gamebox.element.append(player)

	let height = 25 
	let	width = 50 
    const x = G.playGround.width/8 - width/2 
    const y = G.playGround.height - height;

    G.player = {
		width,
		height,
        element: player,
        x: x,
        y: y,
        speed: 5
    };

    player.style.position = "absolute";
    player.classList.add("cyan")
    player.style.left = `0px`;
    player.style.top = `0px`;
	 G.player.element.style.transform = `translate(${G.player.x}px, ${G.player.y}px)`;

}

export function moveLeft() {
    G.player.x -= G.player.speed;
    updatePlayer();
}
export function moveRight() {
    G.player.x += G.player.speed;
    updatePlayer();
}

// limit the player movement  and update the position of the player
function updatePlayer() {
    // limit the player movement to the game box
    if (G.player.x < 0) {
        G.player.x = 0;
    }
    if (G.player.x > 750) {
        G.player.x = 750;
    }
    // update the position of the player
    G.player.element.style.transform = `translate(${G.player.x}px, ${G.player.y}px)`;
}
export function spawenBullet() {
    const gamebox = G.playGround.element  
    if (G.bullet) return
    const bullet = document.createElement('div')
    bullet.classList.add('bullet')
    gamebox.append(bullet)
    let shipX = G.player.x + 25
	let shipY = G.player.y+10
    G.bullet = ({ element: bullet, x: shipX, y: shipY, speed: 4, height: 10, width: 10 })
    bullet.style.position = 'absolute'
    bullet.style.left = `0px`
    bullet.style.top = `0px`
	bullet.style.transform = `translate(${shipX}px, ${shipY}px)`

}



export function updateBullets() {
        if (!G.bullet) return 

        G.bullet.y -= G.bullet.speed;
        // update the position of the bullet
        G.bullet.element.style.transform  = `translate(${G.bullet.x}px, ${G.bullet.y}px)`

        if (G.bullet.y < 0) {
            // remove the bullet from the array

			G.bullet.element.remove()
            G.bullet = null
        }
}



// save the state of the inputs of the player

document.addEventListener("keydown", (event) => {
    if (event.key === ' ' && !G.bullet) {
        keysstate.bullet = true
    }
    if (event.key === "ArrowLeft") {
        keysstate.left = true
        keysstate.right = false
    }

    if (event.key === "ArrowRight") {
        keysstate.right = true
        keysstate.left = false
    }
});


document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
        keysstate.left = false
    }
    if (event.key === "ArrowRight") {
        keysstate.right = false
    }

})








