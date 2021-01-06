import ICell from './ICell'
import {Nullable} from '../../src/types'
import IWorld from '../IWorld'
import {IRealPoint} from '../IPoint'
import DeadCell from './DeadCell'

export default abstract class AbstractCell implements ICell {
  private _world: Nullable<IWorld> = null
  private _position: Nullable<IRealPoint> = null

  static isCell(instance: Object) {
    return instance instanceof AbstractCell
  }

  static isAlive(cell: Object) {
    if (AbstractCell.isCell(cell)) {
      return !(cell instanceof DeadCell)
    }
    throw TypeError('Not a cell')
  }

  static isDead(cell: Object) {
    return !AbstractCell.isAlive(cell)
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

  // Mandatory method for any ICell implementation
  // actual logic of cell
  abstract nextGeneration(): ICell
}