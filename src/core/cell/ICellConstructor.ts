import {IWorld} from '../world'
import ICell from './ICell'
import {ISettler} from '../settler'

export default interface ICellConstructor<T extends ISettler<T>> {
  new(world?: IWorld<T>): ICell<T>
}