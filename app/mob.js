




export class Mob {
	
	constructor(specie, x, y, width, height) {

		// dom elment 
		let div = document.createElement("div")	
		div.id = "alien"
		div.style.top = "0px"
		div.style.left = "0px"
		div.style.transform = `translate(${x}px, ${y}px)`
		div.classList.add(specie.name)
		
		div.classList.add(specie.name+"1") 
		div.style.display = "block"
		this.specie = specie
		this.element = div 
		this.x = x
		this.y = y
		this.width = 40
		this.height = 40 
		this.image = 1
	}



	move(offset, axis, max) {

		if (this[axis]+offset+this.width >= max || this[axis]+offset <=  0  ){
				return false 
		}
		this[axis] += offset 
		if (this.image === 1 ) {
			this.element.classList.replace(this.specie.name+this.image, this.specie.name+2)  
			this.image = 2
		} else {
			this.element.classList.replace(this.specie.name+this.image, this.specie.name+1)  
			this.image = 1 
		}
		this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

		return true 	

	}
	




	kill() {
			this.element.remove() 
			//spawn exp image just replace background image and append to cleaning quene  
	}
	

}
