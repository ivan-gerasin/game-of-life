import {ICellSettler} from './index'
import {ICellFactory} from 'core/cellFactory'
import {ICell} from 'core/cell'
import {IWorld, Preset} from 'core/world'
import {Point} from 'core/point'
import {ISymbolToCellMapper} from 'engine/symbolToCellMapper'

export default class CellSettler<
	F extends ICellFactory<F, C>,
	C extends ICell<F, C>
> implements ICellSettler<F, C> {
	constructor(
		private readonly symbolToCellMapper: ISymbolToCellMapper<F, C>
	) {}

	settle(world: IWorld<F, C>, preset: Preset): void {
		const size = world.size
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				const isSet = preset && preset[y] && preset[y][x]
				if (!isSet) {
					continue
				}
				const cellChar = preset[y][x]
				const Cons = this.symbolToCellMapper.get(cellChar)
				const position = Point.Point(x, y)
				if (Cons.name !== world.at(position).className) {
					const cell = new Cons(world)
					world.settleCell(cell, position)
				}
			}
		}
	}
}
