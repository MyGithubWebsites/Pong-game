class Paddle {
  constructor(element) {
    this.element = element;
    this.y = 50;
    this.speed = 0;
    this.score = 0;
  }

  update() {
    this.y += this.speed;
    this.y = Math.max(Math.min(this.y, 100 - this.element.clientHeight), 0);
    this.element.style.top = `${this.y}%`;
  }
}

class Ball {
  constructor(element) {
    this.element = element;
    this.x = 50;
    this.y = 50;
    this.speedX = Math.random() > 0.5 ? 2 : -2;
    this.speedY = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y <= 0 || this.y >= 100) {
      this.speedY = -this.speedY;
    }

    this.element.style.left = `${this.x}%`;
    this.element.style.top = `${this.y}%`;
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.speedX = Math.random() > 0.5 ? 2 : -2;
    this.speedY = Math.random() * 2 - 1;
    this.element.style.left = `${this.x}%`;
    this.element.style.top = `${this.y}%`;
  }

  checkCollision(paddle) {
    if (this.x <= 10 && this.y >= paddle.y && this.y <= paddle.y + 80) {
      this.speedX = -this.speedX;
    } else if (this.x >= 90 && this.y >= paddle.y && this.y <= paddle.y + 80) {
      this.speedX = -this.speedX;
    }
  }
}

class Game {
  constructor() {
    this.leftPaddle = new Paddle(document.getElementById('leftPaddle'));
    this.rightPaddle = new Paddle(document.getElementById('rightPaddle'));
    this.ball = new Ball(document.getElementById('ball'));
    this.scoreElement = document.getElementById('score');

    document.addEventListener('keydown', (event) => {
      if (event.key === 'w') {
        this.leftPaddle.speed = -2;
      } else if (event.key === 's') {
        this.leftPaddle.speed = 2;
      } else if (event.key === 'ArrowUp') {
        this.rightPaddle.speed = -2;
      } else if (event.key === 'ArrowDown') {
        this.rightPaddle.speed = 2;
      }
    });

    document.addEventListener('keyup', () => {
      this.leftPaddle.speed = 0;
      this.rightPaddle.speed = 0;
    });

    this.leftScore = 0;
    this.rightScore = 0;
  }

  update() {
    this.leftPaddle.update();
    this.rightPaddle.update();
    this.ball.update();
    this.ball.checkCollision(this.leftPaddle);
    this.ball.checkCollision(this.rightPaddle);

    if (this.ball.x <= 0) {
      this.rightScore++;
      this.updateScore();
      this.ball.reset();
    } else if (this.ball.x >= 100) {
      this.leftScore++;
      this.updateScore();
      this.ball.reset();
    }
  }

  updateScore() {
    this.scoreElement.textContent = `${this.leftScore} - ${this.rightScore}`;
  }

  start() {
    setInterval(() => {
      this.update();
    }, 1000 / 60); // 60 frames per second
  }
}

const game = new Game();
game.start();
</script>
</body>
</html>
