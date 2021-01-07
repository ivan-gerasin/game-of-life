import {DeadCell, ICell, Cell} from '../cell'
import {Point} from '../point'
import {ISymbolToCellMapper} from '../symbolToCellMapper'
import ICoordinate, {IRealCoordinate} from '../ICoordinate'
import IWorld from './IWorld'
import ISettler from '../settler/ISettler'

type Preset = string[][] | string[]

export default class World<T extends ISettler<T>> implements IWorld<T> {
  static DEFAULT_SIZE = 50
  private _grid: ICell<T>[][] = []
  private _map = new WeakMap()
  private readonly _size

  readonly settler: T

  constructor(settler: T, size = World.DEFAULT_SIZE) {
    this.settler = settler
    settler.attachWorld(this)
    this._size = size
    for (let y = 0; y < size; y++) {
      this._grid[y] = []
      for (let x = 0; x < size; x++) {
        const emptyCell = this.settler.empty()
        this.setToGrid(x,y,emptyCell)
      }
    }
  }

  static buildWithPreset<T extends ISettler<T>>(settler: T, preset: Preset, symbolToCellMapper: ISymbolToCellMapper<T>, size = World.DEFAULT_SIZE) {
    const world = new World<T>(settler, size)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const isSet = preset && preset[y] && preset[y][x]
        if (!isSet) {
          continue
        }
        const cellChar = preset[y][x]
        const Cons = symbolToCellMapper.get(cellChar)
        const position = Point.Point(x,y)
        if (Cons.name !== world.at(position).className) {
          const cell = new Cons(world)
          world.settleCell(cell, position)
        }
      }
    }
    return world
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

  private setToGrid(x: number, y:number, cell: ICell<T>) {
    this._grid[y][x] = cell
  }

  private findCellPosition(cell: ICell<T>) {
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

  positionOf(cell: ICell<T>) {
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

  settleCell(cell: ICell<T>, position: IRealCoordinate) {
    const {x, y} = position
    const fromThisWorld = cell.world === this
    const alreadySettled = !this.findCellPosition(cell).isEmpty
    if (!fromThisWorld) {
      throw new Error('This cell does not belong to this world')
    }
    if (alreadySettled) {
      throw new Error('This cell already settled')
    }
    this.setToGrid(x,y,cell)
  }

  boundaryPolicy(coordinate: ICoordinate) {
    return this.settler.empty()
  }

  isValueOutOfBound(pos: number) {
    return pos < 0 || pos >= this._size
  }

  isOutOfBound(coordinate: IRealCoordinate) {
    const {x,y} = coordinate
    return this.isValueOutOfBound(x) || this.isValueOutOfBound(y)
  }

  at(coordinate: IRealCoordinate): ICell<T> {
    const {x,y} = coordinate
    if (this.isOutOfBound(coordinate)) { return this.boundaryPolicy(coordinate) }
    return this.atGrid(x,y)
  }

  nextGeneration() {
    const newGrid: ICell<T>[][] = []
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