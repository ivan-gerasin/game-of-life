import ISymbolToCellMapper from './ISymbolToCellMapper'
import {ICell, ICellConstructor} from 'core/cell'
import {ICellFactory} from 'core/cellFactory'

export type RawPresetMap<FactoryType extends ICellFactory<FactoryType,CellType>, CellType extends ICell<FactoryType,CellType>> = Record<string, ICellConstructor<FactoryType,CellType>>

export default class SymbolToCellMapper<FactoryType extends ICellFactory<FactoryType, CellType>, CellType extends ICell<FactoryType,CellType>> implements ISymbolToCellMapper<FactoryType, CellType> {
  private _map = new Map()

  constructor(map: RawPresetMap<FactoryType, CellType>) {
    // Suppose it should be an object
    for (let [k,v] of Object.entries(map)) {
      if (!SymbolToCellMapper.isValidKey(k)) {
        throw TypeError(SymbolToCellMapper.INVALID_KEY_ERR_MSG)
      }
      this._map.set(k,v)
    }
  }

  static DEFAULT_KEY = 'default'
  static INVALID_KEY_ERR_MSG = `Not valid key: it should be one char or "${SymbolToCellMapper.DEFAULT_KEY}"`

  static isValidKey(key: string) {
    return (key.length === 1 || key === SymbolToCellMapper.DEFAULT_KEY)
  }

  private _get(key: string): ICellConstructor<FactoryType,CellType> {
    const cell = this._map.get(key)
    if (cell) {
      return cell
    }
    throw ReferenceError(`No such key ${key}`)
  }

  get(key: string) {
    if (SymbolToCellMapper.isValidKey(key)) {
      if (this._map.has(key)) {
        return this._get(key)
      }
      return this._get(SymbolToCellMapper.DEFAULT_KEY)
    }
    throw TypeError(SymbolToCellMapper.INVALID_KEY_ERR_MSG)
  }

}
