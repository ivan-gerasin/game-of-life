import {EmptyCell, Herbivore, ILivePlanetCell, ILivePlanetCellFactory, Plant, Predator, Water} from './index'
import {Nullable} from 'types'
import {IWorld} from 'core/world'
import {ICellConstructor} from 'core/cell'

type LivePlanetWorld = IWorld<ILivePlanetCellFactory, ILivePlanetCell>
type LivePlanetCellConstructor = ICellConstructor<ILivePlanetCellFactory, ILivePlanetCell>

export default class LivePlanetCellFactory implements ILivePlanetCellFactory {
  private world: Nullable<LivePlanetWorld> = null

  attachWorld(world: LivePlanetWorld) {
    this.world = world
  }

  private create(Cons: LivePlanetCellConstructor): ILivePlanetCell {
    if (this.world) {
      return new Cons(this.world)
    }
    throw new ReferenceError('Factory not attached to the world')
  }

  empty() {
    return this.create(EmptyCell)
  }

  water() {
    return this.create(Water)
  }

  plant() {
    return this.create(Plant)
  }

  herbivore() {
    return this.create(Herbivore)
  }

  predator() {
    return this.create(Predator)
  }

}