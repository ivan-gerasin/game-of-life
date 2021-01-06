import {IWorld} from '../world'
import ICell from './ICell'

export default interface ICellConstructor {
  new(world?: IWorld): ICell
}