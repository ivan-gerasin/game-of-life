const {Cell, DeadCell} = require('./cell')

function rgb(r,g,b) {
  return `rgb(${r},${g},${b})`
}

const DEFAULT_MAP = (function () {
  const cell = new Cell()
  const deadCell = new DeadCell()

  return [
    [deadCell.constructor.name, rgb(255,255,255)],
    [cell.constructor.name, rgb(0,0,0)]
  ]
})()

class CellStyler {
  #map

  static fromObject(map) {
    const rawMap = []
    for (let [key, val] of map.entries()) {
      rawMap.push([key, val])
    }
    return new Map(rawMap)
  }

  static fromArray(map) {
    // default case
    return new CellStyler(map)
  }

  static defaultStyler() {
    return new CellStyler()
  }

  constructor(map = DEFAULT_MAP) {
    // Expect to have a valid argument to create a map
    this.#map = new Map(map)
  }

  _getKeyFromInstance(instance) {
    return instance.constructor.name
  }

  getStyleFor(cellInstance) {
    const key = this._getKeyFromInstance(cellInstance)
    if (this.#map.has(key)) {
      return this.#map.get(key)
    }
    throw ReferenceError(`No style defined for ${cellInstance}`)
  }
}

module.exports = CellStyler