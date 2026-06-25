import { keysstate  , gamePlay as G} from "./state.js";

document.addEventListener("keydown", (event) => {
    if (event.key === ' ' &&  G.player.bullets.length === 0) {
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