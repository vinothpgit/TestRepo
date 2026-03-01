// Pong Game in JavaScript

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
const aiPaddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;
let playerScore = 0;
let aiScore = 0;

const scoreText = () => {
    context.font = '16px Arial';
    context.fillStyle = '#FFF';
    context.fillText('Player: ' + playerScore, 8, 20);
    context.fillText('AI: ' + aiScore, canvas.width - 70, 20);
};

const drawBall = () => {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
};

const drawPaddle = (x, y) => {
    context.beginPath();
    context.rect(x, y, paddleWidth, paddleHeight);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
};

const collisionDetection = () => {
    // Player Paddle Collision
    if (y + ballRadius > canvas.height - paddleHeight && x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        playerScore++;
    }
    // AI Paddle Collision
    if (y - ballRadius < paddleHeight && x > aiPaddleX && x < aiPaddleX + paddleWidth) {
        dy = -dy;
        aiScore++;
    }
};

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(paddleX, canvas.height - paddleHeight);
    drawPaddle(aiPaddleX, 0);
    scoreText();
    collisionDetection();

    // Ball Movement
    x += dx;
    y += dy;

    // Wall Collision
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // AI Paddle Movement
    if (x > aiPaddleX + paddleWidth / 2) {
        aiPaddleX += 4;
    } else {
        aiPaddleX -= 4;
    }

    requestAnimationFrame(draw);
};

const keyDownHandler = (event) => {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = true;
    }
};

const keyUpHandler = (event) => {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = false;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = false;
    }
};

const mouseMoveHandler = (event) => {
    const relativeX = event.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
canvas.addEventListener('mousemove', mouseMoveHandler);

draw();