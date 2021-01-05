const {Cell, DeadCell} = require('./cell')
const Point = require('./point')
const PresetMap = require('./presetMap')

const defaultPreset = new PresetMap()

class World {
  static DEFAULT_SIZE = 50
  #grid = []
  #size

  #map = new WeakMap()

  constructor(size = World.DEFAULT_SIZE) {
    this.#size = size
    for (let y = 0; y < size; y++) {
      this.#grid[y] = []
      for (let x = 0; x < size; x++) {
        this.produceAndSettleDeadCell(Point.Point(x,y))
      }
    }
  }

  static buildWithPreset(preset, size = World.DEFAULT_SIZE, presetMap = defaultPreset) {
    const world = new World(size)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const isSet = preset && preset[y] && preset[y][x]
        if (!isSet) {
          continue
        }
        const cellChar = preset[y][x]
        const Cons = presetMap.get(cellChar)
        const position = Point.Point(x,y)
        if (Cons.name !== world.at(position)) {
          const cell = new Cons(world)
          world.settleCell(cell, position)
        }

        // const isCell = preset[y][x] === '@'
        // if (isSet && isCell) {
        //   world.produceAndSettle(Point.Point(x,y))
        // }
      }
    }
    return world
  }

  produceDeadCell() {
    return new DeadCell(this)
  }

  produceAndSettleDeadCell(pos) {
    const {x,y} = pos
    const cell = this.produceDeadCell()
    this._setToGrid(x,y,cell)
  }

  get size() {
    return this.#size
  }

  _dropCache() {
    this.#map = new WeakMap()
  }

  _atGrid(x,y) {
    return this.#grid[y][x]
  }

  _setToGrid(x,y,cell) {
    this.#grid[y][x] = cell
  }

  __findCellPosition(cell) {
    // if (this.#map.has(cell)) {
    //   return this.#map.get(cell) //not working here
    // }

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const cellAtPosition = this._atGrid(x,y)
        this.#map.set(cell, Point.Point(x,y))
        if (cellAtPosition === cell) {
          return this.#map.get(cell)
        }
      }
    }
    return Point.EmptyPoint
  }

  positionOf(cell) {
    const fromThisWorld = cell.world === this
    const position = this.__findCellPosition(cell)
    const isEmptyPoint = position.isEmpty
    if (fromThisWorld && !isEmptyPoint) {
      return position
    } else if (!fromThisWorld && !isEmptyPoint){
      throw new Error('Cell does not belong to this world, but found')
    } else if (!fromThisWorld && isEmptyPoint) {
      throw new Error('Cell does not belong to this world')
    }
    throw new Error('Cell is not attached to the world')
  }

  produceCell() {
    return new Cell(this)
  }

  settleCell(cell, position) {
    const {x, y} = position
    const fromThisWorld = cell.world === this
    const alreadySettled = !this.__findCellPosition(cell).isEmpty
    // if (!Cell.isAlive(cell)) {
    //   throw new Error('Can not settle dead cell')
    // }
    if (!fromThisWorld) {
      throw new Error('This cell does not belong to this world')
    }
    if (alreadySettled) {
      throw new Error('This cell already settled')
    }
    this._setToGrid(x,y,cell)
  }

  produceAndSettle(pos) {
    const cell = this.produceCell()
    this.settleCell(cell, pos)
    return cell
  }

  boundaryPolicy(cell) {
    return this.produceDeadCell()
  }

  isValueOutOfBound(pos) {
    return pos < 0 || pos >= this.#size
  }

  isOutOfBound(position) {
    const {x,y} = position
    return this.isValueOutOfBound(x) || this.isValueOutOfBound(y)
  }

  at(point) {
    const {x,y} = point
    if (this.isOutOfBound(point)) { return this.boundaryPolicy(point) }
    return this._atGrid(x,y)
  }

  nextGeneration() {
    const newGrid = []
    for (let y = 0; y < this.#size; y++) {
      newGrid[y] = []
      for (let x = 0; x < this.#size; x++) {
        const cell = this._atGrid(x,y)
        newGrid[y][x] = cell.nextGeneration()
      }
    }
    this.#grid = newGrid
    this._dropCache()
  }

  exportGrid() {
    return this.#grid
  }

}

module.exports = World