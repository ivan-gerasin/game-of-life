import ICell from './ICell'
import Cell from './Cell'

export default class DeadCell extends Cell {
  nextGeneration(): ICell {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => Cell.isAlive(cell))
    if (aliveNeighbors.length === 3) {
      return this.world.produceCell()
    }
    return this
  }

  toString() {
    return `Dead cell`
  }
}
