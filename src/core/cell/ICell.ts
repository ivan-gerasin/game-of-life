import {IWorld} from '../world'
import IPoint from '../point/IPoint'
import {ISettler} from '../settler'

export default interface ICell<T extends ISettler<T>> {
  readonly className: string
  readonly world: IWorld<T>
  readonly position: IPoint
  readonly isAlive: boolean
  atTop(): ICell<T>
  atBottom(): ICell<T>
  atLeft(): ICell<T>
  atRight(): ICell<T>
  atTopRight(): ICell<T>
  atTopLeft(): ICell<T>
  atBottomLeft(): ICell<T>
  atBottomRight(): ICell<T>
  getAllNeighborsList(): ICell<T>[]
  nextGeneration(): ICell<T>
}