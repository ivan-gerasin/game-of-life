import ICell from './ICell'
import Cell from './Cell'
import AbstractCell from './AbstractCell'

export default class DeadCell extends AbstractCell {
  readonly isAlive = false
  nextGeneration(): ICell {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => cell.isAlive)
    if (aliveNeighbors.length === 3) {
      return this.world.produceCell()
    }
    return this
  }

}
