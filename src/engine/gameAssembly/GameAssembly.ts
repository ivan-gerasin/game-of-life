import {IGameAssembly} from './index'
import {ICellFactory} from 'core/cellFactory'
import {ICell} from 'core/cell'
import {ICellStyler} from 'engine/cellStyler'
import {ISymbolToCellMapper} from 'engine/symbolToCellMapper'

export default class GameAssembly<
	FactoryType extends ICellFactory<FactoryType, CellType>,
	CellType extends ICell<FactoryType, CellType>
> implements IGameAssembly<FactoryType, CellType> {
	constructor(
		readonly cellFactory: ICellFactory<FactoryType, CellType>,
		readonly styler: ICellStyler<FactoryType, CellType>,
		readonly symbolToCellMapper: ISymbolToCellMapper<FactoryType, CellType>
	) {}
}
