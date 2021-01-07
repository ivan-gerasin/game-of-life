// cell factory probably will be uniq, so defined interface?
import {ICell} from '../cell'
import {IWorld} from '../world'

export type FactoryMethod<T extends ICellFactory<T>> = () => ICell<T>

// type T here is possibly extended ICellFactory
export default interface ICellFactory<T extends ICellFactory<T>> {
  attachWorld: (world: IWorld<T>) => void

  // Empty is used to fill world with cells where no cell defined
  empty: FactoryMethod<T>

}