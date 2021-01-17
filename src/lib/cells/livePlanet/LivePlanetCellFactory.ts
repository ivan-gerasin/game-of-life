import {EmptyCell, Herbivore, ILivePlanetCell, ILivePlanetCellFactory, Plant, Predator, Water} from './index'
import {Nullable} from 'types/types'
import {IWorld} from 'core/world'
import {ICellConstructor} from 'core/cell'

type LivePlanetWorld = IWorld<ILivePlanetCellFactory, ILivePlanetCell>
type LivePlanetCellConstructor = ICellConstructor<ILivePlanetCellFactory, ILivePlanetCell>

export default class LivePlanetCellFactory implements ILivePlanetCellFactory {
	private world: Nullable<LivePlanetWorld> = null

	attachWorld(world: LivePlanetWorld): void {
		this.world = world
	}

	private create(Cons: LivePlanetCellConstructor): ILivePlanetCell {
		if (this.world) {
			return new Cons(this.world)
		}
		throw new ReferenceError('Factory not attached to the world')
	}

	empty(): ILivePlanetCell {
		return this.create(EmptyCell)
	}

	water(): ILivePlanetCell {
		return this.create(Water)
	}

	plant(): ILivePlanetCell {
		return this.create(Plant)
	}

	herbivore(): ILivePlanetCell {
		return this.create(Herbivore)
	}

	predator(): ILivePlanetCell {
		return this.create(Predator)
	}

}