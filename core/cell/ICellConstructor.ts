import IWorld from '../IWorld'
import ICell from './ICell'

export default interface ICellConstructor {
  new(world?: IWorld): ICell
}