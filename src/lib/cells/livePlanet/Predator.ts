import AbstractCell from '../../../core/cell/AbstractCell'
import {ILivePlanetCell, ILivePlanetCellFactory} from './index'
import LiveCellType from './LiveCellType'

export default class Predator extends AbstractCell<ILivePlanetCellFactory, ILivePlanetCell> implements ILivePlanetCell {
  readonly type = LiveCellType.Predator
  nextGeneration(): ILivePlanetCell {
    const neighbours = this.getAllNeighborsList().map(cell => cell.type)
    const amountOfFood = neighbours.filter(type => type === LiveCellType.Herbivore).length
    if (amountOfFood === 0) {
      return this.world.cellFactory.empty()
    }
    const rivals = neighbours.filter(type => type === LiveCellType.Predator).length

    const ENOUGH_FOOD_RATIO = 0.8
    if (amountOfFood/rivals > ENOUGH_FOOD_RATIO) {
      return this
    }

    return this.world.cellFactory.empty()
  }
  toString() {
    return 'Predator'
  }
}