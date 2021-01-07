import ICellStyler from './ICellStyler'
import {Cell, DeadCell, ICell} from '../cell'
import {IWorld} from '../world'
import {ICellFactory} from '../cellFactory'

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

export default class CellStyler<T extends ICellFactory<T>> implements ICellStyler<T> {
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

  _getKeyFromInstance(instance: ICell<T>) {
    return instance.className
  }

  getStyleFor(cellInstance: ICell<T>) {
    const key = this._getKeyFromInstance(cellInstance)
    const cell = this.map.get(key)
    if (cell) {
      return cell
    }
    throw new ReferenceError(`No style defined for ${cellInstance}`)
  }

  exportStyledGridFromWorld(world: IWorld<T>): string[][] {
    const grid = world.exportGrid()
    // Suppose grid is a fair square array
    const gridSize = grid.length
    const styledGrid: string[][] = []
    for (let y = 0; y < gridSize; y++) {
      styledGrid[y] = [] as string[]
      for (let x = 0; x < gridSize; x++) {
        const cell = grid[y][x]
        styledGrid[y][x] = this.getStyleFor(cell)
      }
    }
    return styledGrid
  }
}
