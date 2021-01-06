import DeadCell from './cell/DeadCell'
import ICellStyler from './ICellStyler'
import ICell from './cell/ICell'
import Cell from './cell/Cell'

function rgb(r: number,g:number,b:number): string {
  return `rgb(${r},${g},${b})`
}

const DEFAULT_MAP: ListOfCellColors = (function () {
  const cell = new Cell()
  const deadCell = new DeadCell()

  return [
    [deadCell.constructor.name, rgb(255,255,255)],
    [cell.constructor.name, rgb(0,0,0)]
  ] as ListOfCellColors
})()

type CellName = string
type Color = string
type CellColorPair = [CellName, Color]
type ListOfCellColors = CellColorPair[]

export type CellStylerMap = Map<CellName, Color>

export default class CellStyler implements ICellStyler{
  private map: CellStylerMap

  static fromObject(map: Record<CellName, Color>) {
    const rawMap = []
    for (let [key, val] of Object.entries(map)) {
      if (typeof key === 'string' && val === 'string') {
        rawMap.push([key, val] as readonly[string,string])
      }
    }
    return new Map(rawMap)
  }

  static fromArray(map: ListOfCellColors) {
    // default case
    return new CellStyler(map)
  }

  static defaultStyler() {
    return new CellStyler()
  }

  constructor(map: ListOfCellColors = DEFAULT_MAP) {
    // Expect to have a valid argument to create a map
    this.map = new Map(map)
  }

  _getKeyFromInstance(instance: ICell) {
    return instance.className
  }

  getStyleFor(cellInstance: ICell) {
    const key = this._getKeyFromInstance(cellInstance)
    const cell = this.map.get(key)
    if (cell) {
      return cell
    }
    throw new ReferenceError(`No style defined for ${cellInstance}`)
  }
}
