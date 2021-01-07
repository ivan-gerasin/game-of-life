// settlers probably will be uniq, so defined interface?
import {ICell} from '../cell'
import {IWorld} from '../world'

export type SettlerMethod<T extends ISettler<T>> = () => ICell<T>

// type T here is possibly extended ISettler
export default interface ISettler<T extends ISettler<T>> {
  attachWorld: (world: IWorld<T>) => void

  // Empty is used to fill world with cells where no cell defined
  empty: SettlerMethod<T>

}