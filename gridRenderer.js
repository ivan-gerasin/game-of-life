const {Cell, DeadCell} = require('./cell')

class GridRenderer {
  #context
  #scaleFactor

  constructor(context, scaleFactor = 1) {
    this.#context = context
    this.#scaleFactor = scaleFactor
  }

  get dotSize() {
    return this.#scaleFactor
  }

  scalePosition(pos) {
    return pos*this.#scaleFactor
  }

  putDot(x,y,color) {
    const dotSize = this.dotSize
    if (color === 'black') {
      this.#context.fillStyle = 'rgb(0, 0, 0)';
    } else {
      this.#context.fillStyle = 'rgb(255, 255, 255)';
    }
    const scaledX = this.scalePosition(x)
    const scaledY = this.scalePosition(y)
    this.#context.fillRect(scaledX,scaledY,dotSize,dotSize)
  }

  render(grid) {
    // Suppose grid is a fair square array
    const gridSize = grid.length
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = grid[y][x]
        const color = Cell.isAlive(cell) ? 'black' : 'white'
        this.putDot(x,y,color)
      }
    }
  }
}
module.exports = GridRenderer