import { gamePlay as G } from "./state.js";

export function checkBulletEnemyCollision() {
    if (G.player.bullets.length === 0) return
    for (const bullet of G.player.bullets) {
        if (hitShield(bullet)) {
            return
        }
        // looping for the enemy arr
        for (let r = 0; r < G.spawnedMobs.length; r++) {
            let row = G.spawnedMobs[r][0];

            for (let m = 0; m < row.length; m++) {

                let enemy = row[m];
                // skip the enemy if he dead 
                if (!enemy.alive) continue;

                // check if the bullet rectangle intersects with the enemy rectangle
                const hit =
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y;

                if (hit) {

                    bullet.element.remove();
                    bullet.dead = true
                    enemy.kill();
                    G.aliveMobs--
                    G.bullet = null;


                    return
                }
            }
        }
        if (G.ufo) {
            let enemy = G.ufo
            const hit =
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y;
            if (hit) {

                bullet.element.remove();

                enemy.kill();
                G.aliveMobs--
                G.ufo = null
                G.bullet = null;
            }

        }

    }
}




function hitShield(bullet) {
    for (let brick of  G.bricks) {
        if (!brick.alive) continue
         const hit =
                    bullet.x < brick.x + brick.width &&
                    bullet.x + bullet.width > brick.x &&
                    bullet.y < brick.y + brick.height &&
                    bullet.y + bullet.height > brick.y;
                if (hit) {
                    brick.alive = false
                    brick.element.style.opacity = "0"
                    bullet.element.remove();
                    bullet.dead = true
                    return true
                }

    }
}
