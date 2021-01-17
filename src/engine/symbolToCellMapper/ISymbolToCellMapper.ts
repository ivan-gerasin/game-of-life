import {ICell, ICellConstructor} from 'core/cell'
import {ICellFactory} from 'core/cellFactory'

export default interface ISymbolToCellMapper<
	FactoryType extends ICellFactory<FactoryType, CellType>,
	CellType extends ICell<FactoryType, CellType>
> {
	get: (key: string) => ICellConstructor<FactoryType, CellType>
}
