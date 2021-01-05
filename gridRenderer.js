class GridRenderer {
  #context
  #scaleFactor
  #cellStyler

  constructor(context, cellStyler, scaleFactor = 1) {
    this.#context = context
    this.#scaleFactor = scaleFactor
    this.#cellStyler = cellStyler
  }

  get dotSize() {
    return this.#scaleFactor
  }

  scalePosition(pos) {
    return pos*this.#scaleFactor
  }

  putDot(x,y,color) {
    const dotSize = this.dotSize
    this.#context.fillStyle = color
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
        const color = this.#cellStyler.getStyleFor(cell)
        this.putDot(x,y,color)
      }
    }
  }
}
module.exports = GridRenderer