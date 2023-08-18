const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Draw player's ship
function drawShip(x, y) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 20, y + 20);
    ctx.lineTo(x + 20, y + 20);
    ctx.closePath();
    ctx.fill();
}

drawShip(400, 550);
let shipX = 400;
let shipY = 550;
let shipSpeed = 0;

window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') shipSpeed = -5;
    if (event.key === 'ArrowRight') shipSpeed = 5;
});

window.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') shipSpeed = 0;
});

let bullets = [];

window.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        bullets.push({ x: shipX, y: shipY - 10, speed: -5 });
    }
});

function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x - 2, bullet.y - 2, 4, 4);
    });
}

function updateBullets() {
    bullets.forEach(bullet => {
        bullet.y += bullet.speed;
    });
}
let enemies = [
    { x: 100, y: 100, speed: 1 },
    // More enemies
];

function drawEnemies() {
    ctx.fillStyle = 'blue';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x - 10, enemy.y - 10, 20, 20);
    });
}

function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.x += enemy.speed;
        // Additional behavior
    });
}
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}


function hitEnemy(enemyIndex) {
    enemies.splice(enemyIndex, 1);
    score += 10;
}

let level = 1;

function nextLevel() {
    level++;
    // Increase difficulty
    enemies.push({ x: 50 * level, y: 100, speed: 1 * level });
    // Additional changes for new level
}

function checkLevelCompletion() {
    if (enemies.length === 0) {
        nextLevel();
    }
}

function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.x += Math.sin(enemy.y) * enemy.speed;
        enemy.y += enemy.speed;
    });
}
function update() {
    shipX += shipSpeed;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShip(shipX, shipY);
    requestAnimationFrame(update);
    drawScore();
    drawEnemies();
    updateEnemies();
    checkLevelCompletion();
}
