import IWorld from './IWorld'
import IPoint from './IPoint'

export default interface ICell {
  readonly className: string
  readonly world: IWorld
  readonly position: IPoint
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