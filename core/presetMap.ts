import IPresetMap from './IPresetMap'

const {Cell, DeadCell} = require('./cell')

const DEFAULT_PRESET_MAP = {
  '@': Cell,
  'default': DeadCell
}

export default class PresetMap implements IPresetMap {
  private _map = new Map([
    [PresetMap.DEFAULT_KEY, DeadCell],
  ])

  constructor(map = DEFAULT_PRESET_MAP) {
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

  get(key: string) {
    if (PresetMap.isValidKey(key)) {
      if (this._map.has(key)) {
        return this._map.get(key)
      }
      return this._map.get(PresetMap.DEFAULT_KEY)
    }
    throw TypeError(PresetMap.INVALID_KEY_ERR_MSG)
  }

}
