import ICellFactory, {FactoryMethod} from './ICellFactory'

export default interface IClassicCellFactory extends ICellFactory<IClassicCellFactory> {
  alive: FactoryMethod<IClassicCellFactory>
}