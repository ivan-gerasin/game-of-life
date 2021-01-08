import {IWorld} from '../world'
import ICell from './ICell'
import {ICellFactory} from '../cellFactory'

export default interface ICellConstructor<FactoryType extends ICellFactory<FactoryType,CellType>, CellType extends ICell<FactoryType, CellType>> {
  new(world?: IWorld<FactoryType, CellType>): CellType
}