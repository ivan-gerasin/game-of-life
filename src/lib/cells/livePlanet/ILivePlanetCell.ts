import {ICell} from 'core/cell'
import ILivePlanetCellFactory from './ILivePlanetCellFactory'
import LiveCellType from './LiveCellType'

export default interface ILivePlanetCell extends ICell<ILivePlanetCellFactory, ILivePlanetCell> {
  readonly type: LiveCellType
}