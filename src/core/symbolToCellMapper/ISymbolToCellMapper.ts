import {ICellConstructor} from '../cell'
import {ISettler} from '../settler'

export default interface ISymbolToCellMapper<T extends ISettler<T>> {
  get: (key: string) => ICellConstructor<T>
}