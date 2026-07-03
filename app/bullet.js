import { gamePlay as G } from "./state.js";


export class Bullet {
    constructor(x, y, speed = 6 ) {

        this.element = document.createElement("div");
        this.element.classList.add("bullet");

        this.x = x;
        this.y = y;
        this.speed = speed;   
        
        this.width = 2;
        this.height = 8;

        G.playGround.element.append(this.element);
        this.hide()
        this.render();
    }
    
    update() {
        this.y -= this.speed;
        this.render();

        if (this.y < 0) {
            this.hide();
        }
    }

    render() {
        this.element.style.transform =
        `translate(${this.x}px, ${this.y}px)`;
    }
    show() {
        this.element.style.opacity = "1";
        this.alive = true;
    }
    hide() {
        this.element.style.opacity = "0";
        this.alive = false;
    }
}