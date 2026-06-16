import { gamePlay } from "./state.js";


export function checkBulletEnemyCollision() {

    for (let i = 0; i < gamePlay.Bullet.length; i++) {
        let bullet = gamePlay.Bullet[i];
        // get the position of the bullet part of the screen
        const bulletRect = bullet.element.getBoundingClientRect();
        // loop  in  enemies in the gamePlay.spawnedMobs array  
        for (let r = 0; r < gamePlay.spawnedMobs.length; r++) {
            let row = gamePlay.spawnedMobs[r];
            for (let m = 0; m < row.length; m++) {
                let enemy = row[m];

                // if (!enemy || !enemy.element) continue;

                const enemyRect = enemy.element.getBoundingClientRect();
                // check if the bullet rectangle intersects with the enemy rectangle
                const hit =
                    bulletRect.left < enemyRect.right &&
                    bulletRect.right > enemyRect.left &&
                    bulletRect.top < enemyRect.bottom &&
                    bulletRect.bottom > enemyRect.top;

                if (hit) {
                    updateScore(enemy)
                    // remove DOM elements
                    bullet.element.remove();
                    enemy.element.remove();

                    // remove from arrays
                    gamePlay.Bullet.splice(i, 1);
                    row.splice(m, 1);

                    i--;
                    m--;

                    return
                }
            }
        }
    }
}


export function Score() {
    const Score = document.createElement('div')
    Score.id = 'score'
    Score.textContent = 'Score : 0'
    document.body.append(Score)
}

function updateScore(enemy) {
    if (enemy.name === "squid") {
        gamePlay.currentScore += 25;
    }

    if (enemy.name === "crab") {
        gamePlay.currentScore += 15;
    }

    if (enemy.name === "octpus") {
        gamePlay.currentScore += 10;
    }

    const score = document.getElementById('score');
    score.textContent = `Score : ${gamePlay.currentScore}`;
}