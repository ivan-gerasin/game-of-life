// cell factory probably will be uniq, so defined interface?
import {ICell} from 'core/cell'
import {IWorld} from 'core/world'

export type FactoryMethod<
  FactoryType extends ICellFactory<FactoryType, CellType>,
  CellType extends ICell<FactoryType, CellType>
  > = () => CellType

// type FactoryType here is possibly extended ICellFactory
export default interface ICellFactory<FactoryType extends ICellFactory<FactoryType, CellType>, CellType extends ICell<FactoryType, CellType>> {
  attachWorld: (world: IWorld<FactoryType, CellType>) => void

  // Empty is used to fill world with cells where no cell defined
  empty: FactoryMethod<FactoryType, CellType>

}