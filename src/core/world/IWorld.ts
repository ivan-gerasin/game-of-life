import {IRealPoint} from 'core/point'
import ICoordinate, {IRealCoordinate} from 'core/ICoordinate'
import {ICell} from 'core/cell'
import {ICellFactory} from 'core/cellFactory'

export default interface IWorld<FactoryType extends ICellFactory<FactoryType,CellType>, CellType extends ICell<FactoryType,CellType>> {
  readonly size: number
  readonly cellFactory: FactoryType
  positionOf: (cell: CellType) => IRealPoint
  boundaryPolicy: (cell: ICoordinate) => CellType
  isValueOutOfBound: (position: number) => boolean
  isOutOfBound: (point: IRealCoordinate) => boolean
  at: (point: IRealCoordinate) => CellType
  nextGeneration: () => void
  exportGrid: () => CellType[][] //replace with string
  settleCell: (cell: CellType, position: IRealCoordinate) => void
}