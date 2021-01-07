import {IRealPoint} from '../point'
import ICoordinate, {IRealCoordinate} from '../ICoordinate'
import {ICell} from '../cell'
import {ICellFactory} from '../cellFactory'

export default interface IWorld<T extends ICellFactory<T>> {
  readonly size: number
  readonly cellFactory: T
  positionOf: (cell: ICell<T>) => IRealPoint
  boundaryPolicy: (cell: ICoordinate) => ICell<T>
  isValueOutOfBound: (position: number) => boolean
  isOutOfBound: (point: IRealCoordinate) => boolean
  at: (point: IRealCoordinate) => ICell<T>
  nextGeneration: () => void
  exportGrid: () => ICell<T>[][] //replace with string
  settleCell: (cell: ICell<T>, position: IRealCoordinate) => void
}