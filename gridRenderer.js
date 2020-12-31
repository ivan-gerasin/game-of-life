const {Cell, DeadCell} = require('./cell')

class GridRenderer {
  #context
  #gridSize

  constructor(context, gridSize) {
    this.#context = context
    this.#gridSize = gridSize
  }

  putDot(x,y,color) {
    const DOT_WIDTH = 1
    const DOT_HEIGHT = 1
    if (color === 'black') {
      this.#context.fillStyle = 'rgb(0, 0, 0)';
    } else {
      this.#context.fillStyle = 'rgb(255, 255, 255)';
    }
    this.#context.fillRect(x,y,DOT_WIDTH,DOT_HEIGHT)
  }

  render(grid) {
    for (let y = 0; y < this.#gridSize; y++) {
      for (let x = 0; x < this.#gridSize; x++) {
        const cell = grid[y][x]
        const color = Cell.isAlive(cell) ? 'black' : 'white'
        this.putDot(x,y,color)
      }
    }
  }
}
module.exports = GridRenderer