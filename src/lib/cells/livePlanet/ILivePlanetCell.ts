import {ICell} from '../../../core/cell'
import ILivePlanetCellFactory from './ILivePlanetCellFactory'

export default interface ILivePlanetCell extends ICell<ILivePlanetCellFactory, ILivePlanetCell> {
  readonly isAlive: boolean
}