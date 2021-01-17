import AbstractCell from 'core/cell/AbstractCell'
import {ILivePlanetCell, ILivePlanetCellFactory, LiveCellType} from './index'

export default class Water extends AbstractCell<ILivePlanetCellFactory, ILivePlanetCell> implements ILivePlanetCell {
	readonly type = LiveCellType.Water
	nextGeneration(): ILivePlanetCell {
		return this
	}
	toString(): string {
		return 'Water'
	}
}