class Snake {
  constructor(head, body, canChengeDirection = true, isDead = false) {
    this.head = head;
    this.body = body;
    this.isDead = isDead;
    this.canChengeDirection = canChengeDirection;
  }

  hide() {
    this.head.nodeEl.style.display = 'none';
    this.body.forEach((el) => {
      el.nodeEl.style.display = 'none';
    });
  }

  show() {
    this.head.nodeEl.style.display = 'block';
    this.body.forEach((el) => {
      el.nodeEl.style.display = 'block';
    });
  }

  drawSnake(screen) {
    screen.append(this.head.nodeEl);
    this.body.forEach((el) => {
      screen.append(el.nodeEl);
    });
  }

  deadSnake(screen) {
    const {body} = this;
    const {head} = this;
    setTimeout(
      function delSnake() {
        body.pop().nodeEl.remove();
        const timer = setTimeout(delSnake, 100, head, body, screen);
        if (!body.length) {
          setTimeout(() => head.nodeEl.remove(), 200);
          clearTimeout(timer);
        }
      },
      0,
      head,
      body,
      screen
    );
  }

  reDrawSnake() {
    if (!this.isDead) {
      this.head.initialPixel();
      this.body.forEach((el) => el.initialPixel());
    }
  }

  setDirection(direction) {
    if (this.head.direction !== direction) {
      switch (direction) {
        case 'up':
          if (this.head.direction !== 'down') this.head.direction = direction;
          break;
        case 'down':
          if (this.head.direction !== 'up') this.head.direction = direction;
          break;
        case 'left':
          if (this.head.direction !== 'right') this.head.direction = direction;
          break;
        case 'right':
          if (this.head.direction !== 'left') this.head.direction = direction;
          break;
        default:
          break;
      }
    }
  }

  eatCheck(eat) {
    if (this.head.top === eat.top && this.head.left === eat.left) {
      eat.top = this.body.at(-1).top;
      eat.left = this.body.at(-1).left;
      eat.name = this.body.at(-1).name;
      eat.direction = this.body.at(-1).direction;
      this.body.push(eat);
      return null;
    }
    return eat;
  }

  deadCheck() {
    if (this.head.top < 0 || this.head.top > 130) this.isDead = true;
    if (this.head.left < 0 || this.head.left > 210) this.isDead = true;
    this.body.forEach((el) => {
      if (this.head.top === el.top && this.head.left === el.left) {
        this.isDead = true;
      }
    });
    return this.isDead;
  }

  moveSnake() {
    for (let i = this.body.length - 1; i > 0; i -= 1) {
      this.body[i].top = this.body[i - 1].top;
      this.body[i].left = this.body[i - 1].left;
      this.body[i].direction = this.body[i - 1].direction;
    }
    this.body[0].top = this.head.top;
    this.body[0].left = this.head.left;
    this.body[0].direction = this.head.direction;
    switch (this.head.direction) {
      case 'up':
        this.head.top -= 10;
        break;
      case 'down':
        this.head.top += 10;
        break;
      case 'left':
        this.head.left -= 10;
        break;
      case 'right':
        this.head.left += 10;
        break;

      default:
        break;
    }
    this.deadCheck();
  }
}
