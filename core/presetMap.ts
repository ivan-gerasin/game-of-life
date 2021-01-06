import IPresetMap from './IPresetMap'
import Cell from './cell/Cell'
import DeadCell from './cell/DeadCell'
import ICellConstructor from './cell/ICellConstructor'

type RawPresetMap = Record<string, ICellConstructor>

const DEFAULT_PRESET_MAP: RawPresetMap = {
  '#': Cell,
  'default': DeadCell
}

export default class PresetMap implements IPresetMap {
  private _map = new Map()

  constructor(map: RawPresetMap = DEFAULT_PRESET_MAP) {
    // Suppose it should be an object
    for (let [k,v] of Object.entries(map)) {
      if (!PresetMap.isValidKey(k)) {
        throw TypeError(PresetMap.INVALID_KEY_ERR_MSG)
      }
      this._map.set(k,v)
    }
  }

  static DEFAULT_KEY = 'default'
  static INVALID_KEY_ERR_MSG = `Not valid key: it should be one char or "${PresetMap.DEFAULT_KEY}"`

  static isValidKey(key: string) {
    return (key.length === 1 || key === PresetMap.DEFAULT_KEY)
  }

  private _get(key: string): ICellConstructor {
    const cell = this._map.get(key)
    if (cell) {
      return cell
    }
    throw ReferenceError(`No such key ${key}`)
  }

  get(key: string) {
    if (PresetMap.isValidKey(key)) {
      if (this._map.has(key)) {
        return this._get(key)
      }
      return this._get(PresetMap.DEFAULT_KEY)
    }
    throw TypeError(PresetMap.INVALID_KEY_ERR_MSG)
  }

}
