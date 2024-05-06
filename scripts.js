document.addEventListener('DOMContentLoaded', function() {
    const pong = document.getElementById('pong');
    const paddleLeft = document.getElementById('paddleLeft');
    const paddleRight = document.getElementById('paddleRight');
    const ball = document.getElementById('ball');

    let ballX = 50;
    let ballY = 50;
    let ballSpeedX = 2;
    let ballSpeedY = 2;
// Add scoring variables
let leftScore = 0;
let rightScore = 0;
const maxScore = 10;

// Add scoring display elements
const leftScoreDisplay = document.createElement('div');
leftScoreDisplay.id = 'leftScore';
leftScoreDisplay.textContent = leftScore;
game.appendChild(leftScoreDisplay);

const rightScoreDisplay = document.createElement('div');
rightScoreDisplay.id = 'rightScore';
rightScoreDisplay.textContent = rightScore;
game.appendChild(rightScoreDisplay);

function updateScore() {
  leftScoreDisplay.textContent = leftScore;
  rightScoreDisplay.textContent = rightScore;

  // Check for game over
  if (leftScore >= maxScore || rightScore >= maxScore) {
    gameOver();
  }
}

// Add keyboard controls for paddles
const paddleSpeed = 2;
document.addEventListener('keydown', function(event) {
  if (event.key === 'w') {
    movePaddle(leftPaddle, -paddleSpeed);
  } else if (event.key === 's') {
    movePaddle(leftPaddle, paddleSpeed);
  } else if (event.key === 'ArrowUp') {
    movePaddle(rightPaddle, -paddleSpeed);
  } else if (event.key === 'ArrowDown') {
    movePaddle(rightPaddle, paddleSpeed);
  }
});

function movePaddle(paddle, speed) {
  let currentTop = parseInt(paddle.style.top) || 50;
  let newTop = currentTop + speed;

  // Limit paddle movement within game area
  newTop = Math.max(0, Math.min(100 - parseInt(paddle.style.height), newTop));

  paddle.style.top = newTop + '%';
}

function gameOver() {
  // Display game over message
  const gameOverMsg = document.createElement('div');
  gameOverMsg.textContent = 'Game Over';
  gameOverMsg.style.position = 'absolute';
  gameOverMsg.style.top = '50%';
  gameOverMsg.style.left = '50%';
  gameOverMsg.style.transform = 'translate(-50%, -50%)';
  gameOverMsg.style.fontSize = '24px';
  gameOverMsg.style.color = 'white';
  gameOverMsg.style.textShadow = '2px 2px black';
  game.appendChild(gameOverMsg);

  // Display winner message
  const winnerMsg = document.createElement('div');
  if (leftScore >= maxScore) {
    winnerMsg.textContent = 'Left Player Wins!';
  } else {
    winnerMsg.textContent = 'Right Player Wins!';
  }
  winnerMsg.style.position = 'absolute';
  winnerMsg.style.top = '60%';
  winnerMsg.style.left = '50%';
  winnerMsg.style.transform = 'translate(-50%, -50%)';
  winnerMsg.style.fontSize = '18px';
  winnerMsg.style.color = 'white';
  winnerMsg.style.textShadow = '1px 1px black';
  game.appendChild(winnerMsg);
}

// Reset the game
function resetGame() {
  leftScore = 0;
  rightScore = 0;
  updateScore();
  const gameOverMsg = document.querySelector('div');
  const winnerMsg = document.querySelectorAll('div')[1];
  gameOverMsg.remove();
  winnerMsg.remove();
}

// Add collision sound effect
const collisionSound = new Audio('collision_sound.mp3');
collisionSound.volume = 0.5;

function playCollisionSound() {
  collisionSound.play();
}

// Update the update function
function update() {
  // ...
  if (ballX <= 0) {
    rightScore++;
    updateScore();
    playCollisionSound();
    resetBall();
  } else if (ballX >= 100) {
    leftScore++;
    updateScore();
    playCollisionSound();
    resetBall();
  }
  // ...
}

// Reset the ball position and speed
function resetBall() {
  ballX = 50;
  ballY = 50;
  ballSpeedX = Math.random() > 0.5 ? 2 : -2;
  ballSpeedY = Math.random() * 2 - 1; // Random vertical speed
  ball.style.left = ballX + '%';
  ball.style.top = ballY + '%';
}

// Add restart functionality
document.addEventListener('keydown', function(event) {
  if (event.key === 'r') {
    resetGame();
  }
});

    function update() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY <= 0 || ballY >= 100) {
            ballSpeedY *= -1;
        }

        if (ballX <= 0 || ballX >= 100) {
            ballSpeedX *= -1;
        }

        ball.style.left = ballX + '%';
        ball.style.top = ballY + '%';

        requestAnimationFrame(update);
    }

    update();
});
