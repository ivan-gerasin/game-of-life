import {IWorld} from '../world'
import {Cell, DeadCell, ICell, ICellConstructor} from '../cell'
import {Nullable} from '../../types'
import {IClassicCellFactory} from './index'

export default class ClassicCellFactory implements IClassicCellFactory {
  private world: Nullable<IWorld<IClassicCellFactory>> = null

  private create(Cons: ICellConstructor<IClassicCellFactory>): ICell<IClassicCellFactory> {
    if (this.world) {
      return  new Cons(this.world)
    }
    throw new TypeError('ClassicCellFactory does not attached to the world')
  }

  attachWorld(world: IWorld<IClassicCellFactory>) {
    this.world = world
  }

  empty(): ICell<IClassicCellFactory> {
    return this.create(DeadCell)
  }

  alive(): ICell<IClassicCellFactory> {
    return this.create(Cell)
  }
}