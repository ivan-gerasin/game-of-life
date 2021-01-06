import ICell from './ICell'
import AbstractCell from './AbstractCell'

export default class Cell extends AbstractCell {
  readonly isAlive = true
  nextGeneration(this: Cell): ICell {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => cell.isAlive).length
    if (aliveNeighbors === 3 || aliveNeighbors === 2) {
      return this
    }
    return this.world.produceDeadCell()
  }
}