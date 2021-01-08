import {IClassicCellFactory} from './index'
import {ICell} from '../../../core/cell'

export default interface IClassicCell extends ICell<IClassicCellFactory, IClassicCell> {
  readonly isAlive: boolean
}