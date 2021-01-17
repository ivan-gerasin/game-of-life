import {ICell} from 'core/cell'
import {IWorld} from 'core/world'
import {ICellFactory} from 'core/cellFactory'

export default interface ICellStyler<
	FactoryType extends ICellFactory<FactoryType, CellType>,
	CellType extends ICell<FactoryType, CellType>
> {
	getStyleFor: (cellInstance: CellType) => string
	exportStyledGridFromWorld: (
		world: IWorld<FactoryType, CellType>
	) => string[][]
}
