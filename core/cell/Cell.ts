import ICell from './ICell'
import AbstractCell from './AbstractCell'

export default class Cell extends AbstractCell {
  nextGeneration(this: Cell): ICell {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => Cell.isAlive(cell)).length
    if (aliveNeighbors === 3 || aliveNeighbors === 2) {
      return this
    }
    return this.world.produceDeadCell()
  }
}