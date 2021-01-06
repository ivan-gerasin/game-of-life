import {IRealPoint} from './IPoint'
import ICoordinate, {IRealCoordinate} from './ICoordinate'
import {ICell} from './cell'

export default interface IWorld {
  readonly size: number
  positionOf: (cell: ICell) => IRealPoint
  boundaryPolicy: (cell: ICoordinate) => ICell
  isValueOutOfBound: (position: number) => boolean
  isOutOfBound: (point: IRealCoordinate) => boolean
  at: (point: IRealCoordinate) => ICell
  nextGeneration: () => void
  exportGrid: () => ICell[][]

  //TODO: should be deprecated
  produceCell: () => ICell
  produceDeadCell: () => ICell
}