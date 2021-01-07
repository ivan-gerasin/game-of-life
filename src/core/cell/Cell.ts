import ICell from './ICell'
import AbstractCell from './AbstractCell'
import {ICellFactory} from '../cellFactory'

export default class Cell<T extends ICellFactory<T>> extends AbstractCell<T> {
  readonly isAlive = true
  nextGeneration(this: Cell<T>): ICell<T> {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => cell.isAlive).length
    if (aliveNeighbors === 3 || aliveNeighbors === 2) {
      return this
    }
    return this.world.cellFactory.empty()
  }
}