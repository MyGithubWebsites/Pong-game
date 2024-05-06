document.addEventListener('DOMContentLoaded', function () {
  const paddleSpeed = 5;
  const ballSpeed = 5;
  let leftScore = 0;
  let rightScore = 0;

  const leftPaddle = document.getElementById('leftPaddle');
  const rightPaddle = document.getElementById('rightPaddle');
  const ball = document.querySelector('.ball');
  const leftScoreDisplay = document.getElementById('leftScore');
  const rightScoreDisplay = document.getElementById('rightScore');

  let ballX = 400;
  let ballY = 200;
  let ballDirectionX = 1;
  let ballDirectionY = 1;

  function movePaddle(paddle, direction) {
    let paddleTop = parseInt(paddle.style.top) || 0;
    paddle.style.top = (paddleTop + direction * paddleSpeed) + 'px';
    // Limit paddles within bounds
    if (parseInt(paddle.style.top) < 0) {
      paddle.style.top = '0px';
    }
    if (parseInt(paddle.style.top) > 320) {
      paddle.style.top = '320px';
    }
  }

  function moveBall() {
    ballX += ballDirectionX * ballSpeed;
    ballY += ballDirectionY * ballSpeed;

    // Check collision with walls
    if (ballY <= 0 || ballY >= 380) {
      ballDirectionY *= -1;
    }

    // Check collision with paddles
    if (ballX <= 20 && ballY >= parseInt(leftPaddle.style.top) && ballY <= parseInt(leftPaddle.style.top) + 80) {
      ballDirectionX *= -1;
    }

    if (ballX >= 760 && ballY >= parseInt(rightPaddle.style.top) && ballY <= parseInt(rightPaddle.style.top) + 80) {
      ballDirectionX *= -1;
    }

    // Check if ball has passed paddles
    if (ballX <= 0) {
      rightScore++;
      rightScoreDisplay.textContent = rightScore;
      resetBall();
    }

    if (ballX >= 780) {
      leftScore++;
      leftScoreDisplay.textContent = leftScore;
      resetBall();
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
  }

  function resetBall() {
    ballX = 400;
    ballY = 200;
    ballDirectionX = Math.random() < 0.5 ? 1 : -1;
    ballDirectionY = Math.random() < 0.5 ? 1 : -1;
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'w') {
      movePaddle(leftPaddle, -1);
    } else if (event.key === 's') {
      movePaddle(leftPaddle, 1);
    } else if (event.key === 'ArrowUp') {
      movePaddle(rightPaddle, -1);
    } else if (event.key === 'ArrowDown') {
      movePaddle(rightPaddle, 1);
    }
  });

  function gameLoop() {
    moveBall();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
