import ICell from './ICell'
import AbstractCell from './AbstractCell'
import {IClassicCellFactory} from '../cellFactory'

export default class Cell extends AbstractCell<IClassicCellFactory> {
  readonly isAlive = true
  nextGeneration(this: Cell): ICell<IClassicCellFactory> {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => cell.isAlive).length
    if (aliveNeighbors === 3 || aliveNeighbors === 2) {
      return this
    }
    return this.world.cellFactory.empty()
  }
}