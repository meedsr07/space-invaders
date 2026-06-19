// TODO tomorrow save state here insated 

export const gamePlay = {
		playGround: {width: 800, height: 600},
		player: {},	
	//	bullet:  {active: false, x: 0, y: 0, element: null},
		spawnedMobs: [],
		aliveMobs: 55,
		bricks: new Map(), 
		direction: 1,
		rays: [],
		shots: 0,
		exps: [],
		mobs : [{name: "squid_", points: 30}, {name: "crab_", points: 20}, {name: "octpus_", points: 10}, {name: "ufo_", points: 150, isUfo : true}]
}



export const keysstate = {
    left : false,
    right : false , 

}
