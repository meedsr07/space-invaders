import { gamePlay as G } from "./state.js";


export class Bullet {
    constructor(x, y, speed = 6 ) {

        this.element = document.createElement("div");
        this.element.classList.add("bullet");

        this.x = x;
        this.y = y;
        this.speed = speed;

        this.width = 10;
        this.height = 10;

        G.playGround.element.append(this.element);

        this.render();
    }

    update() {
        this.y -= this.speed;
        this.render();

        if (this.y < 0) {
            this.dead = true;
            this.destroy();
        }
    }

    render() {
        this.element.style.transform =
            `translate(${this.x}px, ${this.y}px)`;
    }

    destroy() {
        this.element.remove();
    }
}