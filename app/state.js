// TODO tomorrow save state here insated 

export const gamePlay = {
		playGround: {width: 800, height: 600},
		player: {},	
		spawnedMobs: [],
		freezeEnemies: false,
		playerHit : false,
		aliveMobs: 55,
		bricks: [], 
		direction: 1,
		rays: [],
		shots: 0,
		exps: [],
		mobs : [ {name: "octpus_", col: "green", points: 10} , {name: "crab_", col: "violet", points: 20},{name: "squid_", col: "cyan", points: 30}, {name: "ufo_", points: 150, col: "red", isUfo : true}]
}




export const keysstate = {
    left : false,
    right : false , 

}
