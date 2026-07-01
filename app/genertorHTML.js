import {bindEvents} from "./switcherHTML.js"
import { gamePlay as G} from "./state.js"
export function creatStart() {
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

export function creatUi() {
    game.innerHTML = `
        <div id="background">
            <div class = "stars"></div>
        </div>

        <div id="ui" class="showFlex">
            <div class="table-res">
                <h2 class="t" id="score">0</h2>
                <button id="pause-btn"><i class="fa-solid fa-pause"></i></button>
                <h2 id="time" class="t">00:00</h2>
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

export function creatGameOver() {
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

export function creatYouWin() {
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


/*Create list start Mobs*/
function creatListMobs(){
    let container = document.querySelector("#start .list-score")
    let c = document.createDocumentFragment()
    let a = [...G.mobs].reverse()
    for (let i = 0 ; i < a.length ; i++){
        let newDiv = document.createElement("div")
        newDiv.innerHTML = `
        <div class = "${a[i].name}1 ${a[i].col}"></div>
        <h3>=<span>${a[i].points}</span></h3>`
        newDiv.classList.add("flexed")
        newDiv.classList.add(`a${i}`)
        c.append(newDiv)
}
container.append(c)
}