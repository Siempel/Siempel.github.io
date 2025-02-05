
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

canvas.width = 600;
canvas.height = 600;

const gridSize = 30;
const tileCount = canvas.width / gridSize;

let snake = [
  { x: 10, y: 10 },
];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;

document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp':
      if (dy === 0) { dx = 0; dy = -1; }
      break;
    case 'ArrowDown':
      if (dy === 0) { dx = 0; dy = 1; }
      break;
    case 'ArrowLeft':
      if (dx === 0) { dx = -1; dy = 0; }
      break;
    case 'ArrowRight':
      if (dx === 0) { dx = 1; dy = 0; }
      break;
  }
});

function drawGame() {
  // Clear canvas
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Move snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreElement.textContent = `Score: ${score}`;
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }

  // Draw snake
  ctx.fillStyle = '#27ae60';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
  });

  // Draw food
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

  // Check collision with walls
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    resetGame();
    return;
  }

  // Check collision with self
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
      return;
    }
  }

  setTimeout(drawGame, 100);
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = { x: 5, y: 5 };
  dx = 0;
  dy = 0;
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
  drawGame();
}

drawGame();

