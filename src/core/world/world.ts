import IWorld from './IWorld'
import {ICell} from 'core/cell'
import {Point} from 'core/point'
import ICoordinate, {IRealCoordinate} from 'core/ICoordinate'
import {ICellFactory} from 'core/cellFactory'

export type Preset = string[][] | string[]

export default class World<FactoryType extends ICellFactory<FactoryType,CellType>, CellType extends ICell<FactoryType,CellType>> implements IWorld<FactoryType,CellType> {
  static DEFAULT_SIZE = 50
  private _grid: CellType[][] = []
  private _map = new WeakMap()
  private readonly _size

  readonly cellFactory: FactoryType

  constructor(cellFactory: FactoryType, size = World.DEFAULT_SIZE) {
    this.cellFactory = cellFactory
    cellFactory.attachWorld(this)
    this._size = size
    for (let y = 0; y < size; y++) {
      this._grid[y] = []
      for (let x = 0; x < size; x++) {
        const emptyCell = this.cellFactory.empty()
        this.setToGrid(x,y,emptyCell)
      }
    }
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

  private setToGrid(x: number, y:number, cell: CellType) {
    this._grid[y][x] = cell
  }

  private findCellPosition(cell: CellType) {
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

  positionOf(cell: CellType) {
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

  settleCell(cell: CellType, position: IRealCoordinate) {
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
    return this.cellFactory.empty()
  }

  isValueOutOfBound(pos: number) {
    return pos < 0 || pos >= this._size
  }

  isOutOfBound(coordinate: IRealCoordinate) {
    const {x,y} = coordinate
    return this.isValueOutOfBound(x) || this.isValueOutOfBound(y)
  }

  at(coordinate: IRealCoordinate): CellType {
    const {x,y} = coordinate
    if (this.isOutOfBound(coordinate)) { return this.boundaryPolicy(coordinate) }
    return this.atGrid(x,y)
  }

  nextGeneration() {
    const newGrid: CellType[][] = []
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