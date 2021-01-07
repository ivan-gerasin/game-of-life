import {ICellConstructor} from '../cell'
import {ICellFactory} from '../cellFactory'

export default interface ISymbolToCellMapper<T extends ICellFactory<T>> {
  get: (key: string) => ICellConstructor<T>
}