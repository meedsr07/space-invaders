import { gamePlay } from "./state.js";
import { keysstate } from "./state.js";
import { checkBulletEnemyCollision } from "./collision.js";
import { Score } from "./collision.js";
// create the player and set the initial position of the player
function Spawenplayer() {
    const gamebox = document.getElementById('container')
    const player = document.createElement('div')
    player.id = 'playership'
    gamebox.append(player)

    const gameWidth = 800;
    const gameHeight = 600;
    const playerSize = 50;

    const x = gameWidth / 2 - playerSize / 2;

    const y = gameHeight - playerSize;

    gamePlay.player = {
        element: player,
        x: x,
        y: y,
        speed: 5
    };

    player.style.position = "absolute";
    player.classList.add("cyan")
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
}

function moveLeft() {
    gamePlay.player.x -= gamePlay.player.speed;
    updatePlayer();
}
console.log(gamePlay.Bullet)
function moveRight() {
    gamePlay.player.x += gamePlay.player.speed;
    updatePlayer();
}

// limit the player movement  and update the position of the player
function updatePlayer() {
    // limit the player movement to the game box
    if (gamePlay.player.x < 0) {
        gamePlay.player.x = 0;
    }
    if (gamePlay.player.x > 750) {
        gamePlay.player.x = 750;
    }
    // update the position of the player
    gamePlay.player.element.style.left = gamePlay.player.x + "px";
}


function SpawenBullet() {
    const gamebox = document.getElementById('container')
    if (gamePlay.Bullet.length > 0) return
    const bullet = document.createElement('div')
    bullet.id = 'bullet'
    gamebox.append(bullet)
    let shipX = gamePlay.player.x + 22
    let shipY = gamePlay.player.y
    gamePlay.Bullet.push({ element: bullet, x: shipX, y: shipY, speed: 10 })
    bullet.style.position = 'absolute'
    bullet.style.left = `${shipX}px`
    bullet.style.top = `${shipY}px`

}



function updateBullets() {
    for (let i = 0; i < gamePlay.Bullet.length; i++) {
        let bullet = gamePlay.Bullet[i];

        bullet.y -= bullet.speed;
        // update the position of the bullet
        bullet.element.style.top = bullet.y + "px";

        if (bullet.y < 0) {
            bullet.element.remove();
            // remove the bullet from the array
            gamePlay.Bullet.splice(i, 1);
            i--;
        }
    }
}




// save the state of the inputs of the player

document.addEventListener("keydown", (event) => {
    if (event.key === ' ') {
        SpawenBullet()
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






function gameLoop() {

    if (keysstate.left) {
        moveLeft()
    }
    if (keysstate.right) {
        moveRight()
    }

    updateBullets();
    checkBulletEnemyCollision();
    requestAnimationFrame(gameLoop);
}

Spawenplayer()
Score()
gameLoop();

