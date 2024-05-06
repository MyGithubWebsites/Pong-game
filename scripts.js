document.addEventListener('DOMContentLoaded', function () {
  const game = document.getElementById('game');
  const leftPaddle = document.getElementById('leftPaddle');
  const rightPaddle = document.getElementById('rightPaddle');
  const ball = document.getElementById('ball');
  const paddleHeight = 60;
  const paddleSpeed = 5;
  let ballX = 250;
  let ballY = 150;
  let ballSpeedX = 3;
  let ballSpeedY = 3;

  function update() {
    // Move paddles
    document.addEventListener('keydown', function (event) {
      if (event.key === 'w' && parseInt(leftPaddle.style.top) > 0) {
        leftPaddle.style.top = `${parseInt(leftPaddle.style.top) - paddleSpeed}px`;
      }
      if (event.key === 's' && parseInt(leftPaddle.style.top) + paddleHeight < game.clientHeight) {
        leftPaddle.style.top = `${parseInt(leftPaddle.style.top) + paddleSpeed}px`;
      }
      if (event.key === 'ArrowUp' && parseInt(rightPaddle.style.top) > 0) {
        rightPaddle.style.top = `${parseInt(rightPaddle.style.top) - paddleSpeed}px`;
      }
      if (event.key === 'ArrowDown' && parseInt(rightPaddle.style.top) + paddleHeight < game.clientHeight) {
        rightPaddle.style.top = `${parseInt(rightPaddle.style.top) + paddleSpeed}px`;
      }
    });

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
    }
    if (ballX + ball.clientWidth >= game.clientWidth - rightPaddle.clientWidth && ballY + ball.clientHeight >= parseInt(rightPaddle.style.top) && ballY <= parseInt(rightPaddle.style.top) + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds (score)
    if (ballX <= 0 || ballX >= game.clientWidth - ball.clientWidth) {
      ballX = 250;
      ballY = 150;
      ballSpeedX = 3;
      ballSpeedY = 3;
    }
  }

  setInterval(update, 1000 / 60); // 60 frames per second
});
