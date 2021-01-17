import ICellFactory, {FactoryMethod} from 'core/cellFactory/ICellFactory'
import IClassicCell from './IClassicCell'

export default interface IClassicCellFactory
	extends ICellFactory<IClassicCellFactory, IClassicCell> {
	alive: FactoryMethod<IClassicCellFactory, IClassicCell>
}
