import {IWorld} from '../world'
import IPoint from '../point/IPoint'

export default interface ICell {
  readonly className: string
  readonly world: IWorld
  readonly position: IPoint
  readonly isAlive: boolean
  atTop(): ICell
  atBottom(): ICell
  atLeft(): ICell
  atRight(): ICell
  atTopRight(): ICell
  atTopLeft(): ICell
  atBottomLeft(): ICell
  atBottomRight(): ICell
  getAllNeighborsList(): ICell[]
  nextGeneration(): ICell
}