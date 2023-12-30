// const screen = document.querySelector('.screen');

// let x = 0;
// let y = 0;

// for (let i = 0; i < 352; i += 1) {
//   const pixel = document.createElement('div');
//   pixel.className = 'pixel';
//   if (x === 220) {
//     x = 0;
//     y += 10;
//   }
//   pixel.style.top = `${y}px`;
//   pixel.style.left = `${x}px`;
//   x += 10;
//   screen.append(pixel);
// }
let pause = false;

function createSnake(direction) {
  const head = new Pixel(document.createElement('div'), 'head', 80, 110, direction);
  let x = 110;
  const body = [];
  for (let i = 0; i < 2; i += 1) {
    body.push(new Pixel(document.createElement('div'), 'pixel', 80, (x -= 10), direction));
  }
  return new Snake(head, body);
}

/**
 *
 * @param {Snake} snake
 */
function generateEatPos() {
  const x = Math.floor(Math.random() * 21) * 10;
  const y = Math.floor(Math.random() * 13) * 10;
  return [x, y];
}

/**
 *
 * @param {Snake} snake
 */
function checkEatPos(x, y, snake) {
  if (snake.head.top === y && snake.head.left === x) return false;
  for (let i = 0; i < snake.body.length; i += 1) {
    if (snake.body[i].top === y && snake.body[i].left === x) return false;
  }
  return true;
}

/**
 *
 * @param {Snake} snake
 */
function generateEat(screen, snake) {
  let [x, y] = generateEatPos(snake);
  while (!checkEatPos(x, y, snake)) {
    [x, y] = generateEatPos(snake);
  }
  const eat = new Pixel(document.createElement('div'), 'eat', y, x);
  screen.append(eat.nodeEl);
  return eat;
}

function play(screen, snake) {
  const divScore = document.querySelector('.score');
  divScore.innerText = '0000';
  let score = 0;
  snake.drawSnake(screen);
  let eat = generateEat(screen, snake);
  let timerId = setTimeout(
    function makeMove() {
      if (!pause) {
        snake.moveSnake();
        eat = snake.eatCheck(eat);
        snake.reDrawSnake();
        if (!eat) {
          divScore.innerText = `000${(score += 1)}`.slice(-4);
          eat = generateEat(screen, snake);
        }
      }
      snake.canChengeDirection = true;
      timerId = setTimeout(makeMove, 200, screen, snake, eat);
      if (snake.isDead) {
        eat.nodeEl.remove();
        setTimeout(() => {
          const msg = document.createElement('div');
          msg.className = 'message';
          msg.innerHTML = '<h1>GAME OVER</h1>to start again press "r"';
          screen.append(msg);
        }, 110 * (snake.body.length + 1));
        snake.deadSnake(screen);
        clearTimeout(timerId);
      }
    },
    300,
    screen,
    snake,
    eat
  );
}

function setPause(screen, snake) {
  const eat = screen.querySelector('.eat');
  pause = !pause;
  if (pause) {
    const msg = document.createElement('div');
    msg.className = 'message';
    msg.innerHTML = '<h1>PAUSE</h1>to play press "p"';
    snake.hide();
    eat.style.display = 'none';
    screen.append(msg);
  } else {
    const msg = document.querySelector('.message');
    msg.remove();
    snake.show();
    eat.style.display = 'block';
  }
}

function main() {
  const screen = document.querySelector('.screen');
  let direction = 'right';
  let snake = createSnake(direction);
  let start = true;
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 's':
        if (start) {
          screen.innerHTML = '';
          play(screen, snake);
          start = false;
        }
        break;
      case 'p':
        if (!start) setPause(screen, snake);
        break;
      case 'ArrowUp':
        if (!pause && !start) direction = 'up';
        break;
      case 'ArrowRight':
        if (!pause && !start) direction = 'right';
        break;
      case 'ArrowDown':
        if (!pause && !start) direction = 'down';
        break;
      case 'ArrowLeft':
        if (!pause && !start) direction = 'left';
        break;
      case 'r':
        if (snake.isDead) {
          screen.innerHTML = '';
          snake = createSnake('right');
          snake.canChengeDirection = false;
          play(screen, snake);
        }
        break;
      default:
        break;
    }
    if (snake.canChengeDirection && !pause) {
      snake.setDirection(direction);
      snake.canChengeDirection = false;
    }
  });
}

main();
