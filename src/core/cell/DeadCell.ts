import ICell from './ICell'
import AbstractCell from './AbstractCell'
import {IClassicCellFactory} from '../cellFactory'

export default class DeadCell extends AbstractCell<IClassicCellFactory> {
  readonly isAlive = false
  nextGeneration(): ICell<IClassicCellFactory> {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => cell.isAlive)
    if (aliveNeighbors.length === 3) {
      return this.world.cellFactory.alive()
    }
    return this
  }

}
