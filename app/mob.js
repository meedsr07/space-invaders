import {gamePlay as G } from "./state.js"
import { Timer } from "./timer.js";





export class Entity {
	constructor(x, y, element, alive = true, width = 0, height = 0) {
		this.x = x
		this.y = y
		this.element = element
		this.alive = alive
		this.width = width
		this.height = height
	}
 
	move(dx, dy) {
		this.x += dx   
		this.y += dy
		this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
	}
 
	hide() {
		this.element.style.opacity = "0"
		this.alive = false
	}
    show() {
		this.element.style.opacity = "1"
		this.alive = true
	}
}


export class Mob {
    
    constructor(specie, x, y, width = 48, height = 24) {

        // dom elment 
        let div = document.createElement("div")	
        div.classList.add("alien")
        div.style.top = "0px"
        div.style.left = "0px"
        div.style.transform = `translate(${x}px, ${y}px)`	
        div.classList.add(specie.name+"1") 
        div.classList.add(specie.col) 
        this.specie = specie
        this.element = div 
        this.x = x
        this.y = y
        this.width =  width 	
        this.height = height 
        this.alive = true
    }


    canMove(offset, axis, max) {
        return  this[axis]+offset+this.width <=  max &&  this[axis]+offset >=  0  
    }

    move(offset, axis, max) {
        this[axis] += offset 
        if (this.image === 1   ) {
            this.element.classList.replace(this.specie.name+this.image, this.specie.name+2)  
            this.image = 2
        } else   {
            this.element.classList.replace(this.specie.name+this.image, this.specie.name+1)  
            this.image = 1 
        }
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }




    kill() {
        this.element.style.opacity = "0" 
        this.alive = false
        let exp = document.createElement("div")
        exp.classList.add(this.specie.name+"exp")
        exp.classList.add(this.specie.col)
        exp.style.position = "absolute"
        exp.style.left = 0
        exp.style.right = 0
        exp.style.transform =  `translate(${this.x}px, ${this.y}px)`	
        G.playGround.element.appendChild(exp)
        G.aliveMobs--
        G.exps.push({element: exp, timer : new Timer(100) })
        return this.specie.points
    }
}
