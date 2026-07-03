import { stopLoop, startLoop, startGame } from "../main.js";
import {gamePlay as G } from "./state.js"
import {creatStart ,creatUi ,creatGameOver ,creatYouWin } from "./genertorHTML.js"


let statuss = "start";

const game = document.querySelector("#game");


/* ---------- init ---------- */
OpenOrCancelPause()
creatStart()

/* ---------- events ---------- */
function OpenOrCancelPause(){
    window.addEventListener("keydown", (e) => {
    if (!e.repeat && e.key === "Escape") { 
        pause()
    }
    });
}

export function bindEvents() {
    document.querySelector("#start-btn")
    ?.addEventListener("click", Start);

    document.querySelector("#pause-btn")
        ?.addEventListener("click", pause);

    document.querySelector("#continue-btn")
        ?.addEventListener("click", pause);

    document.querySelector("#pause-restart-btn")
        ?.addEventListener("click", restart);

    document.querySelector("#pause-exit-btn")
        ?.addEventListener("click",  Exit);

    document.querySelector("#over-restart-btn")
        ?.addEventListener("click", restart);

    document.querySelector("#over-exit-btn")
        ?.addEventListener("click",  Exit);

    document.querySelector("#win-restart-btn")
        ?.addEventListener("click", restart);

    document.querySelector("#win-exit-btn")
        ?.addEventListener("click",  Exit);
}
/* ---------- status ---------- */

const allowedMoves = {
    start: ["game"],
    game: ["pause", "gameOver", "win", "start"],
    pause: ["game", "start"],
    gameOver: ["start", "game"],
    win: ["start", "game"]
};

function setStatus(newStatus) {
    if (!allowedMoves[statuss].includes(newStatus)) {
        statuss = "start";
        switchs();
        return;
    }

    statuss = newStatus;
    switchs();
}

function switchs() {
    switch (statuss) {
        case "start":
            creatStart();
            break;

        case "game":
            show(true, false);
            break;

        case "pause":
            show(true, true);
            break;

        case "gameOver":
            creatGameOver();
            break;

        case "win":
            creatYouWin();
            break;

        default:
            statuss = "start";
            creatStart();
    }
}

/* ---------- actions ---------- */

function Start() {
    creatUi();
    setStatus("game");
    startGame();
}

function pause() {
    if (statuss === "game") {
        setStatus("pause");
        stopLoop();
    } else if (statuss === "pause") {
        setStatus("game");
        startLoop();
    }
}

function restart() {
    stopLoop();
    creatUi();
    setStatus("game");
    startGame();
}

function Exit() {
    stopLoop();
    setStatus("start");
}

export function GameOver() {
    stopLoop();
    setStatus("gameOver");
}

export function YouWin() {
    stopLoop();
    setStatus("win");
}

/* ---------- ui helpers ---------- */

function show(ui, pauseMenu) {
    document.querySelector("#ui").className = ui ? "showFlex" : "hidden";
    document.querySelector("#pause-menu").className = pauseMenu ? "showFlex" : "hidden";
}

