import ICell from './ICell'
import {IWorld} from 'core/world'
import {IRealPoint} from 'core/point'
import {ICellFactory} from 'core/cellFactory'
import {Nullable} from 'types'

export default abstract class AbstractCell<
  FactoryType extends ICellFactory<FactoryType, CellType>,
  CellType extends ICell<FactoryType, CellType>
  > implements ICell<FactoryType, CellType> {

  private readonly _world: Nullable<IWorld<FactoryType, CellType>> = null
  private _position: Nullable<IRealPoint> = null

  constructor(world?: IWorld<FactoryType, CellType>) {
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
      // Here `this as unknown as CellType` is a hack to avoid error:
      /**
       * 'AbstractCell<FactoryType, CellType>' is assignable to the constraint
       * of type 'CellType', but 'CellType' could be instantiated with
       * a different subtype of constraint 'ICell<FactoryType, CellType>'.
       * */
      this._position = this.world.positionOf(this as unknown as CellType)
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
  abstract nextGeneration(): CellType

}