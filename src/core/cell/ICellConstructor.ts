import {IWorld} from '../world'
import ICell from './ICell'
import {ICellFactory} from '../cellFactory'

export default interface ICellConstructor<T extends ICellFactory<T>> {
  new(world?: IWorld<T>): ICell<T>
}