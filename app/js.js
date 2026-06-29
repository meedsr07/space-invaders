import { stopLoop, startLoop, startGame } from "../main.js";
import {gamePlay as G } from "./state.js"

function creatListMobs(){
    let container = document.querySelector("#start .list-score")
    let c = document.createDocumentFragment()
    let a = G.mobs.reverse()
    console.log(a)
    for (let i = 0 ; i < a-1 ; i++){
        let newDiv = document.createElement("div")
        newDiv.innerHTML = `
        <div class = "${a.name}1"></div>
        <h3>=<span>${a.points}</span></h3>`
        newDiv.classList.add("flexed")
        newDiv.classList.add(`a${i}`)
        c.append(newDiv)
}
container.append(c)
}


let statuss = "start";

const game = document.querySelector("#game");

/* ---------- protected functions ---------- */

const safeStart = debounce(throttle(Start, 500), 100);
const safePause = debounce(throttle(pause, 200), 100);
const safeRestart = debounce(throttle(restart, 500), 100);
const safeExit = debounce(throttle(Exit, 500), 100);

/* ---------- init ---------- */

creatStart()

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        safePause();
    }
});

/* ---------- screens ---------- */

function creatStart() {
    game.innerHTML = `
        <div id="background">
            <div class = "stars"></div>
        </div>

        <div id="start" class="showFlex">
            <h1>space invaders</h1>
            <div class="list-score"></div>
            <button id="start-btn">start game</button>
        </div>
    `;

    
    creatListMobs()
    bindEvents();
}

function creatUi() {
    game.innerHTML = `
        <div id="background">
            <div class = "stars"></div>
        </div>

        <div id="ui" class="showFlex">
            <div class="table-res">
                <h2 class="t" id="score">0</h2>
                <button id="pause-btn"><i class="fa-solid fa-pause"></i></button>
                <h2 id="time" class="t">03:56</h2>
            </div>

            <div id="livesContainer"></div>
            <div id="container"></div>
        </div>

        <div id="pause-menu" class="hidden">
            <div class="menu-game">
                <div class="controls-menu">
                    <button id="continue-btn">Continue</button>
                    <button id="pause-restart-btn">Restart</button>
                    <button id="pause-exit-btn">Exit</button>
                </div>
            </div>
        </div>
    `;

    bindEvents();
}

function creatGameOver() {
    game.innerHTML = `
    <div id="background">
            <div class = "stars"></div>
    </div>
        <div id="gameOver">
            <div class="box">
                <h1>Game over</h1>
                <div class="button-gameover">
                    <button id="over-restart-btn" class="b1">Restart</button>
                    <button id="over-exit-btn" class="b2">Exit</button>
                </div>
            </div>
        </div>
    `;

    bindEvents();
}

function creatYouWin() {
    game.innerHTML = `
        <div id="background">
            <div class = "stars"></div>
        </div>

        <div id="youWin">
            <div class="box">
                <h1>You Win</h1>
                <div class="button-win">
                    <button id="win-restart-btn" class="b1">Restart</button>
                    <button id="win-exit-btn" class="b2">Exit</button>
                </div>
            </div>
        </div>
    `;

    bindEvents();
}

/* ---------- events ---------- */

function bindEvents() {
    document.querySelector("#start-btn")
        ?.addEventListener("click", safeStart);

    document.querySelector("#pause-btn")
        ?.addEventListener("click", safePause);

    document.querySelector("#continue-btn")
        ?.addEventListener("click", safePause);

    document.querySelector("#pause-restart-btn")
        ?.addEventListener("click", safeRestart);

    document.querySelector("#pause-exit-btn")
        ?.addEventListener("click", safeExit);

    document.querySelector("#over-restart-btn")
        ?.addEventListener("click", safeRestart);

    document.querySelector("#over-exit-btn")
        ?.addEventListener("click", safeExit);

    document.querySelector("#win-restart-btn")
        ?.addEventListener("click", safeRestart);

    document.querySelector("#win-exit-btn")
        ?.addEventListener("click", safeExit);
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

    console.log(`Status changed: ${statuss} -> ${newStatus}`);
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

/* ---------- debounce + throttle ---------- */

function throttle(fn, delay) {
    let lastTime = 0;

    return function (...args) {
        const now = performance.now();

        if (now - lastTime >= delay) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

function debounce(fn, delay = 300) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}