document.addEventListener('DOMContentLoaded', function () {
  const game = document.getElementById('game');
  const leftPaddle = document.getElementById('leftPaddle');
  const rightPaddle = document.getElementById('rightPaddle');
  const ball = document.getElementById('ball');
  const scoreDisplay = document.getElementById('score');
  const resetButton = document.getElementById('resetButton');

  const paddleHeight = 80;
  const paddleSpeed = 5;
  let ballX = 250;
  let ballY = 150;
  let ballSpeedX = 3;
  let ballSpeedY = 3;
  let leftScore = 0;
  let rightScore = 0;

  function update() {
    // Move paddles
    document.addEventListener('keydown', function (event) {
      if (event.key === 'w' && parseInt(leftPaddle.style.top) > 0) {
        leftPaddle.style.top = `${parseInt(leftPaddle.style.top) - paddleSpeed}px`;
      }
      if (event.key === 's' && parseInt(leftPaddle.style.top) + paddleHeight < game.clientHeight) {
        leftPaddle.style.top = `${parseInt(leftPaddle.style.top) + paddleSpeed}px`;
      }
    });

    // AI for the right paddle
    if (parseInt(ball.style.top) + ball.clientHeight / 2 < parseInt(rightPaddle.style.top) + paddleHeight / 2) {
      rightPaddle.style.top = `${parseInt(rightPaddle.style.top) - paddleSpeed}px`;
    } else {
      rightPaddle.style.top = `${parseInt(rightPaddle.style.top) + paddleSpeed}px`;
    }

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    // Ball collision with walls
    if (ballY <= 0 || ballY >= game.clientHeight - ball.clientHeight) {
      ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= leftPaddle.clientWidth && ballY + ball.clientHeight >= parseInt(leftPaddle.style.top) && ballY <= parseInt(leftPaddle.style.top) + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      ballSpeedX *= 1.1; // Accelerate the ball
    }
    if (ballX + ball.clientWidth >= game.clientWidth - rightPaddle.clientWidth && ballY + ball.clientHeight >= parseInt(rightPaddle.style.top) && ballY <= parseInt(rightPaddle.style.top) + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      ballSpeedX *= 1.1; // Accelerate the ball
    }

    // Ball out of bounds (score)
    if (ballX <= 0) {
      rightScore++;
      resetBall();
    }
    if (ballX >= game.clientWidth - ball.clientWidth) {
      leftScore++;
      resetBall();
    }

    // Update score display
    scoreDisplay.textContent = `${leftScore} - ${rightScore}`;
  }

  function resetBall() {
    ballX = 250;
    ballY = 150;
    ballSpeedX = 3;
    ballSpeedY = 3;
  }

  // Reset button functionality
  resetButton.addEventListener('click', function () {
    leftScore = 0;
    rightScore = 0;
    resetBall();
    scoreDisplay.textContent = `${leftScore} - ${rightScore}`;
  });

  setInterval(update, 1000 / 60); // 60 frames per second
});
