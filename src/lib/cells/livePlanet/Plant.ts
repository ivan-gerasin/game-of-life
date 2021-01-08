import AbstractCell from '../../../core/cell/AbstractCell'
import {ILivePlanetCell, ILivePlanetCellFactory} from './index'
import LiveCellType from './LiveCellType'

export default class Plant extends AbstractCell<ILivePlanetCellFactory, ILivePlanetCell> implements ILivePlanetCell {
  readonly type = LiveCellType.Plant
  nextGeneration(): ILivePlanetCell {
    const neighbors = this.getAllNeighborsList().map(cell => cell.type)
    const hasWater = neighbors.includes(LiveCellType.Water)

    if (!hasWater) {
      return this.world.cellFactory.empty()
    }

    const herbivoresAround = neighbors.filter(type => type === LiveCellType.Herbivore).length
    const TOO_MUCH_HERBIVORES = 3
    if (herbivoresAround >= TOO_MUCH_HERBIVORES) {
      return this.world.cellFactory.empty()
    }

    return this
  }
  toString() {
    return 'Plant'
  }
}