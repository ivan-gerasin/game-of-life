import ICellStyler from './ICellStyler'
import {ICell} from 'core/cell'
import {IWorld} from 'core/world'
import {ICellFactory} from 'core/cellFactory'
import {ColoredGrid, Color} from 'types'

type CellName = string
type CellColorPair = [CellName, Color]
type ListOfCellColors = CellColorPair[]

export type CellStylerMap = Map<CellName, Color>

export default class CellStyler<
	FactoryType extends ICellFactory<FactoryType, CellType>,
	CellType extends ICell<FactoryType, CellType>
> implements ICellStyler<FactoryType, CellType> {
	private map: CellStylerMap

	static fromObject<
		FactoryType extends ICellFactory<FactoryType, CellType>,
		CellType extends ICell<FactoryType, CellType>
	>(map: Record<CellName, Color>): CellStyler<FactoryType, CellType> {
		const rawMap = []
		for (const [key, val] of Object.entries(map)) {
			if (typeof key === 'string' && typeof val === 'string') {
				rawMap.push([key, val] as CellColorPair)
			}
		}
		return new CellStyler<FactoryType, CellType>(rawMap)
	}

	static fromArray<
		FactoryType extends ICellFactory<FactoryType, CellType>,
		CellType extends ICell<FactoryType, CellType>
	>(map: ListOfCellColors): CellStyler<FactoryType, CellType> {
		// default case
		return new CellStyler<FactoryType, CellType>(map)
	}

	constructor(map: ListOfCellColors) {
		// Expect to have a valid argument to create a map
		this.map = new Map(map)
	}

	_getKeyFromInstance(instance: CellType): string {
		return instance.className
	}

	getStyleFor(cellInstance: CellType): Color {
		const key = this._getKeyFromInstance(cellInstance)
		const cell = this.map.get(key)
		if (cell) {
			return cell
		}
		throw new ReferenceError(`No style defined for ${cellInstance}`)
	}

	exportStyledGridFromWorld(
		world: IWorld<FactoryType, CellType>
	): ColoredGrid {
		const grid = world.exportGrid()
		// Suppose grid is a fair square array
		const gridSize = grid.length
		const styledGrid: string[][] = []
		for (let y = 0; y < gridSize; y++) {
			styledGrid[y] = [] as string[]
			for (let x = 0; x < gridSize; x++) {
				const cell = grid[y][x]
				styledGrid[y][x] = this.getStyleFor(cell)
			}
		}
		return styledGrid
	}
}
