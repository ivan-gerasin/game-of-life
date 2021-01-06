import {DeadCell, ICell, Cell} from '../cell'
import {Point} from '../point'
import {PresetMap} from '../presetMap'
import ICoordinate, {IRealCoordinate} from '../ICoordinate'
import IWorld from './IWorld'

const defaultPreset = new PresetMap()

type Preset = string[][] | string[]

export default class World implements IWorld {
  static DEFAULT_SIZE = 50
  private _grid: ICell[][] = []
  private readonly _size

  private _map = new WeakMap()

  constructor(size = World.DEFAULT_SIZE) {
    this._size = size
    for (let y = 0; y < size; y++) {
      this._grid[y] = []
      for (let x = 0; x < size; x++) {
        this.produceAndSettleDeadCell(Point.Point(x,y))
      }
    }
  }

  static buildWithPreset(preset: Preset, size = World.DEFAULT_SIZE, presetMap = defaultPreset) {
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
        if (Cons.name !== world.at(position).className) {
          const cell = new Cons(world)
          world.settleCell(cell, position)
        }
      }
    }
    return world
  }

  produceDeadCell(): DeadCell {
    return new DeadCell(this)
  }

  produceAndSettleDeadCell(pos: IRealCoordinate) {
    const {x,y} = pos
    const cell = this.produceDeadCell()
    this.setToGrid(x,y,cell)
  }

  get size() {
    return this._size
  }

  private dropCache() {
    this._map = new WeakMap()
  }

  private atGrid(x: number, y :number) {
    return this._grid[y][x]
  }

  private setToGrid(x: number, y:number, cell: ICell) {
    this._grid[y][x] = cell
  }

  private findCellPosition(cell: ICell) {
    // if (this._map.has(cell)) {
    //   return this._map.get(cell) //not working here
    // }

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const cellAtPosition = this.atGrid(x,y)
        this._map.set(cell, Point.Point(x,y))
        if (cellAtPosition === cell) {
          return this._map.get(cell)
        }
      }
    }
    return Point.EmptyPoint
  }

  positionOf(cell: ICell) {
    const fromThisWorld = cell.world === this
    const position = this.findCellPosition(cell)
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

  produceCell(): ICell {
    return new Cell(this)
  }

  settleCell(cell: ICell, position: IRealCoordinate) {
    const {x, y} = position
    const fromThisWorld = cell.world === this
    const alreadySettled = !this.findCellPosition(cell).isEmpty
    // if (!Cell.isAlive(cell)) {
    //   throw new Error('Can not settle dead cell')
    // }
    if (!fromThisWorld) {
      throw new Error('This cell does not belong to this world')
    }
    if (alreadySettled) {
      throw new Error('This cell already settled')
    }
    this.setToGrid(x,y,cell)
  }

  boundaryPolicy(coordinate: ICoordinate) {
    return this.produceDeadCell()
  }

  isValueOutOfBound(pos: number) {
    return pos < 0 || pos >= this._size
  }

  isOutOfBound(coordinate: IRealCoordinate) {
    const {x,y} = coordinate
    return this.isValueOutOfBound(x) || this.isValueOutOfBound(y)
  }

  at(coordinate: IRealCoordinate): ICell {
    const {x,y} = coordinate
    if (this.isOutOfBound(coordinate)) { return this.boundaryPolicy(coordinate) }
    return this.atGrid(x,y)
  }

  nextGeneration() {
    const newGrid: ICell[][] = []
    for (let y = 0; y < this._size; y++) {
      newGrid[y] = []
      for (let x = 0; x < this._size; x++) {
        const cell = this.atGrid(x,y)
        newGrid[y][x] = cell.nextGeneration()
      }
    }
    this._grid = newGrid
    this.dropCache()
  }

  exportGrid() {
    return this._grid
  }

}