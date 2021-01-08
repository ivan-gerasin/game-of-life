import {FactoryMethod, ICellFactory} from '../../../core/cellFactory'
import ILivePlanetCell from './ILivePlanetCell'

export default interface ILivePlanetCellFactory extends ICellFactory<ILivePlanetCellFactory, ILivePlanetCell> {
  alive: FactoryMethod<ILivePlanetCellFactory, ILivePlanetCell>
}