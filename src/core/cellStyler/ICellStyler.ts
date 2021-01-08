import {ICell} from '../cell'
import {IWorld} from '../world'
import {ICellFactory} from '../cellFactory'

export default interface ICellStyler<FactoryType extends ICellFactory<FactoryType, CellType>, CellType extends ICell<FactoryType,CellType>> {
  getStyleFor: (cellInstance: CellType) => string
  exportStyledGridFromWorld: (world: IWorld<FactoryType, CellType>) => string[][]
}