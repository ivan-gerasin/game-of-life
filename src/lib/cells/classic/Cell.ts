import AbstractCell from 'core/cell/AbstractCell'
import {IClassicCellFactory} from './index'
import IClassicCell from './IClassicCell'


export default class Cell extends AbstractCell<IClassicCellFactory, IClassicCell> implements IClassicCell {
	readonly isAlive = true
	nextGeneration(this: Cell): IClassicCell {
		const neighbors = this.getAllNeighborsList()
		const aliveNeighbors = neighbors.filter(cell => cell.isAlive).length
		if (aliveNeighbors === 3 || aliveNeighbors === 2) {
			return this
		}
		return this.world.cellFactory.empty()
	}
}