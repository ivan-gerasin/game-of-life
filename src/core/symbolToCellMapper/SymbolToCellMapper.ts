import ISymbolToCellMapper from './ISymbolToCellMapper'
import {ICellConstructor} from '../cell'
import {ISettler} from '../settler'

export type RawPresetMap<T extends ISettler<T>> = Record<string, ICellConstructor<T>>

export default class SymbolToCellMapper<T extends ISettler<T>> implements ISymbolToCellMapper<T> {
  private _map = new Map()

  constructor(map: RawPresetMap<T>) {
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

  private _get(key: string): ICellConstructor<T> {
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
