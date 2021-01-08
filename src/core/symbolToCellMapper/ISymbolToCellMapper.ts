import {ICell, ICellConstructor} from '../cell'
import {ICellFactory} from '../cellFactory'

export default interface ISymbolToCellMapper<FactoryType extends ICellFactory<FactoryType, CellType>, CellType extends ICell<FactoryType,CellType>> {
  get: (key: string) => ICellConstructor<FactoryType, CellType>
}