
class Cell {
  #world
  #position

  static isAlive(cell) {
    if (cell instanceof Cell) {
      return !(cell instanceof DeadCell)
    }
    throw TypeError('Not a cell')
  }

  constructor(world) {
    this.#world = world
  }

  get world() {
    if (this.#world) {
      return this.#world
    }
    throw new Error('Cell is not attached to the world')
  }

  get position() {
    if (!this.#position) {
      this.#position = this.world.positionOf(this)
    }
    return this.#position
  }

  atTop() {
    return this.world.at(this.position.top)
  }

  atBottom() {
    return this.world.at(this.position.bottom)
  }

  atLeft() {
    return this.world.at(this.position.left)
  }

  atRight() {
    return this.world.at(this.position.right)
  }

  atTopRight() {
    return this.world.at(this.position.topRight)
  }

  atTopLeft() {
    return this.world.at(this.position.topLeft)
  }

  atBottomLeft() {
    return this.world.at(this.position.bottomLeft)
  }

  atBottomRight() {
    return this.world.at(this.position.bottomRight)
  }

  getAllNeighborsList() {
    // from top, clockwise
    return [
      this.atTop(),
      this.atTopRight(),
      this.atRight(),
      this.atBottomRight(),
      this.atBottom(),
      this.atBottomLeft(),
      this.atLeft(),
      this.atTopLeft()
    ]
  }

  nextGeneration() {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => Cell.isAlive(cell)).length
    if (aliveNeighbors === 3 || aliveNeighbors === 2) {
      return this
    }
    return this.world.produceDeadCell()
  }

  toString() {
    const pos = this.position
    return `Cell at ${pos}`
  }
}

class DeadCell extends Cell {
  nextGeneration() {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => Cell.isAlive(cell))
    if (aliveNeighbors.length === 3) {
      return this.world.produceCell()
    }
    return this
  }

  toString() {
    return `Dead cell`
  }
}

module.exports = {
  Cell, DeadCell
}