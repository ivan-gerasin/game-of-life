import ICell from './ICell'
import AbstractCell from './AbstractCell'
import {IClassicSettler} from '../settler'

export default class DeadCell extends AbstractCell<IClassicSettler> {
  readonly isAlive = false
  nextGeneration(): ICell<IClassicSettler> {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => cell.isAlive)
    if (aliveNeighbors.length === 3) {
      return this.world.settler.alive()
    }
    return this
  }

}
