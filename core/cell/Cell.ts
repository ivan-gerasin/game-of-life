import ICell from './ICell'
import {Nullable} from '../../src/types'
import IWorld from '../IWorld'
import {IRealPoint} from '../IPoint'
import {DeadCell} from './cell'

export class Cell implements ICell {
  private _world: Nullable<IWorld> = null
  private _position: Nullable<IRealPoint> = null

  static isCell(instance: Object) {
    return instance instanceof Cell
  }

  static isAlive(cell: Object) {
    if (Cell.isCell(cell)) {
      return !(cell instanceof DeadCell)
    }
    throw TypeError('Not a cell')
  }

  static isDead(cell: Object) {
    return !Cell.isAlive(cell)
  }

  constructor(world?: IWorld) {
    if (world) {
      this._world = world
    }
  }

  get className() {
    return this.constructor.name
  }

  get world() {
    if (this._world) {
      return this._world
    }
    throw new Error('Cell is not attached to the world')
  }

  get position(): IRealPoint {
    if (!this._position) {
      this._position = this.world.positionOf(this)
    }
    return this._position
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
      this.atTopLeft(),
    ]
  }

  nextGeneration(this: Cell): ICell {
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

class ClassicCell extends Cell {

  nextGeneration(this: Cell): ICell {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => Cell.isAlive(cell)).length
    if (aliveNeighbors === 3 || aliveNeighbors === 2) {
      return this
    }
    return this.world.produceDeadCell()
  }
}