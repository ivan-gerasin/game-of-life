import {ICell} from '../cell'
import {IWorld} from '../world'
import {ICellFactory} from '../cellFactory'

export default interface ICellStyler<T extends ICellFactory<T>> {
  getStyleFor: (cellInstance: ICell<T>) => string
  exportStyledGridFromWorld: (world: IWorld<T>) => string[][]
}