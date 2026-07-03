export class Timer {
	constructor(interval) {
		this.interval = interval; 
		this.lastTime = null;
	}
	
	tick(timestamp) {
		if (!this.lastTime) {
			this.lastTime = timestamp;		
			return false 
		}
		if (timestamp-this.lastTime >= this.interval) {
			this.lastTime = timestamp 
			return true
		}
		 
	}
	edit(interval) {
		this.interval = interval 
	}
}
