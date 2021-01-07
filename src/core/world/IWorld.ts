import {IRealPoint} from '../point'
import ICoordinate, {IRealCoordinate} from '../ICoordinate'
import {ICell} from '../cell'
import {ISettler} from '../settler'

export default interface IWorld<T extends ISettler<T>> {
  readonly size: number
  readonly settler: T
  positionOf: (cell: ICell<T>) => IRealPoint
  boundaryPolicy: (cell: ICoordinate) => ICell<T>
  isValueOutOfBound: (position: number) => boolean
  isOutOfBound: (point: IRealCoordinate) => boolean
  at: (point: IRealCoordinate) => ICell<T>
  nextGeneration: () => void
  exportGrid: () => ICell<T>[][] //replace with string
  settleCell: (cell: ICell<T>, position: IRealCoordinate) => void
}