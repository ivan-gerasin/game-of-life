import ICell from './ICell'
import {Nullable} from '../../types'
import {IWorld} from '../world'
import {IRealPoint} from '../point'
import {ISettler} from '../settler'

export default abstract class AbstractCell<T extends ISettler<T>> implements ICell<T> {
  private _world: Nullable<IWorld<T>> = null
  private _position: Nullable<IRealPoint> = null

  constructor(world?: IWorld<T>) {
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
  abstract nextGeneration(): ICell<T>

  abstract get isAlive(): boolean
}