import ICell from './ICell'
import AbstractCell from './AbstractCell'
import {ISettler} from '../settler'

export default class Cell<T extends ISettler<T>> extends AbstractCell<T> {
  readonly isAlive = true
  nextGeneration(this: Cell<T>): ICell<T> {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => cell.isAlive).length
    if (aliveNeighbors === 3 || aliveNeighbors === 2) {
      return this
    }
    return this.world.settler.empty()
  }
}