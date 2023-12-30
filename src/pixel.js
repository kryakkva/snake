class Pixel {
  constructor(nodeEl, name, top, left, direction) {
    this.nodeEl = nodeEl;
    this.name = name;
    this.top = top;
    this.left = left;
    this.direction = direction;
    this.initialPixel();
  }

  initialPixel() {
    this.nodeEl.className = this.name;
    this.nodeEl.style.top = `${this.top}px`;
    this.nodeEl.style.left = `${this.left}px`;
  }
}
