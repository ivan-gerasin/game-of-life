const {Cell, DeadCell} = require('./cell')

const DEFAULT_PRESET_MAP = {
  '@': Cell,
  'default': DeadCell
}

class PresetMap {
  #map = new Map([
    [PresetMap.DEFAULT_KEY, DeadCell],
  ])

  constructor(map = DEFAULT_PRESET_MAP) {
    // Suppose it should be an object
    for (let [k,v] of Object.entries(map)) {
      if (!PresetMap.isValidKey(k)) {
        throw TypeError(PresetMap.INVALID_KEY_ERR_MSG)
      }
      this.#map.set(k,v)
    }
  }

  static DEFAULT_KEY = 'default'
  static INVALID_KEY_ERR_MSG = `Not valid key: it should be one char or "${PresetMap.DEFAULT_KEY}"`

  static isValidKey(key) {
    return 'string' === typeof key && (key.length === 1 || key === PresetMap.DEFAULT_KEY)
  }

  get(key) {
    if (PresetMap.isValidKey(key)) {
      if (this.#map.has(key)) {
        return this.#map.get(key)
      }
      return this.#map.get(PresetMap.DEFAULT_KEY)
    }
    throw TypeError(PresetMap.INVALID_KEY_ERR_MSG)
  }

}

module.exports = PresetMap