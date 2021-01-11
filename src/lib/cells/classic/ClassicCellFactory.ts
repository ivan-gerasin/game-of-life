import {IWorld} from '../../../core/world'
import {ICellConstructor} from '../../../core/cell'
import {Nullable} from '../../../types/types'
import {IClassicCellFactory, DeadCell, Cell} from './index'
import IClassicCell from './IClassicCell'

type ClassicWorld = IWorld<IClassicCellFactory, IClassicCell>
type ClassicCellConstructor = ICellConstructor<IClassicCellFactory, IClassicCell>

export default class ClassicCellFactory implements IClassicCellFactory {
  private world: Nullable<ClassicWorld> = null

  private create(Cons: ClassicCellConstructor): IClassicCell {
    if (this.world) {
      return  new Cons(this.world)
    }
    throw new ReferenceError('ClassicCellFactory does not attached to the world')
  }

  attachWorld(world: ClassicWorld) {
    this.world = world
  }

  empty(): IClassicCell {
    return this.create(DeadCell)
  }

  alive(): IClassicCell {
    return this.create(Cell)
  }
}