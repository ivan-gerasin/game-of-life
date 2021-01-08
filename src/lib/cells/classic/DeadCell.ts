import AbstractCell from '../../../core/cell/AbstractCell'
import {IClassicCellFactory, IClassicCell} from './index'

export default class DeadCell extends AbstractCell<IClassicCellFactory, IClassicCell> implements IClassicCell {
  readonly isAlive = false
  nextGeneration(): IClassicCell {
    const neighbors = this.getAllNeighborsList()
    const aliveNeighbors = neighbors.filter(cell => cell.isAlive)
    if (aliveNeighbors.length === 3) {
      return this.world.cellFactory.alive()
    }
    return this
  }

  toString() {
    return 'DeadCell'
  }
}
