import AbstractCell from 'core/cell/AbstractCell'
import {ILivePlanetCell, ILivePlanetCellFactory, LiveCellType} from './index'

export default class Herbivore
	extends AbstractCell<ILivePlanetCellFactory, ILivePlanetCell>
	implements ILivePlanetCell {
	readonly type = LiveCellType.Herbivore
	nextGeneration(): ILivePlanetCell {
		const neighbours = this.getAllNeighborsList().map(cell => cell.type)
		const amountOfFood = neighbours.filter(
			type => type === LiveCellType.Plant
		).length
		const rivals = neighbours.filter(
			type => type === LiveCellType.Herbivore
		).length

		if (amountOfFood === 0) {
			this.die()
		}

		const TOO_DANGEROUS_PREDATORS_NUMBER = 3
		const predatorsAround = neighbours.filter(
			type => type === LiveCellType.Predator
		).length

		if (predatorsAround >= TOO_DANGEROUS_PREDATORS_NUMBER) {
			this.die()
		}

		const ENOUGH_FOOD_RATIO = 0.5
		if (amountOfFood / rivals > ENOUGH_FOOD_RATIO) {
			return this
		}

		return this.die()
	}

	private die() {
		return this.world.cellFactory.empty()
	}

	toString(): string {
		return 'Herbivore'
	}
}
