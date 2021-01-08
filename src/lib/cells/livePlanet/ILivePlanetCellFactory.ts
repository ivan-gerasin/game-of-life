import {FactoryMethod, ICellFactory} from '../../../core/cellFactory'
import ILivePlanetCell from './ILivePlanetCell'

export default interface ILivePlanetCellFactory extends ICellFactory<ILivePlanetCellFactory, ILivePlanetCell> {
  plant: FactoryMethod<ILivePlanetCellFactory, ILivePlanetCell>
  water: FactoryMethod<ILivePlanetCellFactory, ILivePlanetCell>
  herbivore: FactoryMethod<ILivePlanetCellFactory, ILivePlanetCell>
  predator: FactoryMethod<ILivePlanetCellFactory, ILivePlanetCell>
}