import {ICellFactory} from 'core/cellFactory'
import {ICellStyler} from 'engine/cellStyler'
import {ICell} from 'core/cell'
import {ISymbolToCellMapper} from 'engine/symbolToCellMapper'

export default interface IGameAssembly<
	FactoryType extends ICellFactory<FactoryType, CellType>,
	CellType extends ICell<FactoryType, CellType>
> {
	cellFactory: ICellFactory<FactoryType, CellType>
	styler: ICellStyler<FactoryType, CellType>
	symbolToCellMapper: ISymbolToCellMapper<FactoryType, CellType>
}
