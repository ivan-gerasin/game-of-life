import {ICell} from '../cell'
import {IWorld} from '../world'
import {ISettler} from '../settler'

export default interface ICellStyler<T extends ISettler<T>> {
  getStyleFor: (cellInstance: ICell<T>) => string
  exportStyledGridFromWorld: (world: IWorld<T>) => string[][]
}