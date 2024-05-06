document.addEventListener('DOMContentLoaded', function() {
    const pong = document.getElementById('pong');
    const paddleLeft = document.getElementById('paddleLeft');
    const paddleRight = document.getElementById('paddleRight');
    const ball = document.getElementById('ball');

    let ballX = 50;
    let ballY = 50;
    let ballSpeedX = 2;
    let ballSpeedY = 2;

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