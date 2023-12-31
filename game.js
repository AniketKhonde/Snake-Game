const gameArea = document.getElementById('gameArea');
const blockSize = 20;
const gameWidth = gameArea.clientWidth;
const gameHeight = gameArea.clientHeight;
const initialSnake = [{ x: 10, y: 10 }];
let snake = [...initialSnake];
let food = generateFood();

let direction = 'right';
let gameLoop;

function generateFood() {
  const x = Math.floor(Math.random() * (gameWidth / blockSize)) * blockSize;
  const y = Math.floor(Math.random() * (gameHeight / blockSize)) * blockSize;
  return { x, y };
}

function drawSnake() {
  const snakeElement = document.createElement('div');
  snakeElement.style.width = blockSize + 'px';
  snakeElement.style.height = blockSize + 'px';
  snakeElement.style.backgroundColor = 'green';
  snakeElement.style.position = 'absolute';
  snake.forEach(segment => {
    const newSegment = snakeElement.cloneNode();
    newSegment.style.left = segment.x + 'px';
    newSegment.style.top = segment.y + 'px';
    gameArea.appendChild(newSegment);
  });
}

function drawFood() {
  const foodElement = document.createElement('div');
  foodElement.style.width = blockSize + 'px';
  foodElement.style.height = blockSize + 'px';
  foodElement.style.backgroundColor = 'red';
  foodElement.style.position = 'absolute';
  foodElement.style.left = food.x + 'px';
  foodElement.style.top = food.y + 'px';
  gameArea.appendChild(foodElement);
}

function update() {
  const head = { ...snake[0] };

  if (direction === 'up') head.y -= blockSize;
  else if (direction === 'down') head.y += blockSize;
  else if (direction === 'left') head.x -= blockSize;
  else if (direction === 'right') head.x += blockSize;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.x >= gameWidth ||
    head.y < 0 ||
    head.y >= gameHeight ||
    collision()
  ) {
    clearInterval(gameLoop);
    alert('Game Over!');
    snake = [...initialSnake];
    food = generateFood();
    gameLoop = setInterval(gameTick, 150);
  }

  updateGame();
}

function collision() {
  return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
}

function updateGame() {
  gameArea.innerHTML = '';
  drawSnake();
  drawFood();
}

function gameTick() {
  update();
}

document.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  if ((key === 'w' || key === 'arrowup') && direction !== 'down') direction = 'up';
  else if ((key === 's' || key === 'arrowdown') && direction !== 'up') direction = 'down';
  else if ((key === 'a' || key === 'arrowleft') && direction !== 'right') direction = 'left';
  else if ((key === 'd' || key === 'arrowright') && direction !== 'left') direction = 'right';
});

gameLoop = setInterval(gameTick, 150);
