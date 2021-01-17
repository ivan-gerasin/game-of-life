import {IWorld} from 'core/world'
import {IPoint} from 'core/point'
import {ICellFactory} from 'core/cellFactory'

export default interface ICell<
	FactoryType extends ICellFactory<FactoryType, CellType>,
	CellType extends ICell<FactoryType, CellType>
> {
	readonly className: string
	readonly world: IWorld<FactoryType, CellType>
	readonly position: IPoint
	atTop(): CellType
	atBottom(): CellType
	atLeft(): CellType
	atRight(): CellType
	atTopRight(): CellType
	atTopLeft(): CellType
	atBottomLeft(): CellType
	atBottomRight(): CellType
	getAllNeighborsList(): CellType[]
	nextGeneration(): CellType
}
