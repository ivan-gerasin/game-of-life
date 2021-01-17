import ICell from './ICell'
import {IWorld} from 'core/world'
import {ICellFactory} from 'core/cellFactory'

export default interface ICellConstructor<
	FactoryType extends ICellFactory<FactoryType, CellType>,
	CellType extends ICell<FactoryType, CellType>
> {
	new (world?: IWorld<FactoryType, CellType>): CellType
}
