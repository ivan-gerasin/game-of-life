import {IWorld} from '../world'
import {Cell, DeadCell, ICell, ICellConstructor} from '../cell'
import {Nullable} from '../../types'
import {IClassicSettler} from './index'

export default class Settler implements IClassicSettler {
  private world: Nullable<IWorld<IClassicSettler>> = null

  private create(Cons: ICellConstructor<IClassicSettler>): ICell<IClassicSettler> {
    if (this.world) {
      return  new Cons(this.world)
    }
    throw new TypeError('Settler does not attached to the world')
  }

  attachWorld(world: IWorld<IClassicSettler>) {
    this.world = world
  }

  empty(): ICell<IClassicSettler> {
    return this.create(DeadCell)
  }

  alive(): ICell<IClassicSettler> {
    return this.create(Cell)
  }
}