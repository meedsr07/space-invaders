// TODO tomorrow save state here insated 

export const gamePlay = {
		playGround: {width: 800, height: 600},
		player: {},	
		spawnedMobs: [],
		bricks: new Map(), 
		highestSccore: 0,
		currentScore: 0,
		direction: 1,
		speed: 0,
		rays: [],
		functionsQueue: [],
		expQueue: [],
		mobs : [{name: "squid_", points: 30, ufo: false}, {name: "crab_", points: 20, ufo : false}, {name: "octpus_", points: 10, ufo : false}, {name: "ufo_", points: 150, ufo : true}]

}



