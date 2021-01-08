import AbstractCell from 'core/cell/AbstractCell'
import {ILivePlanetCell, ILivePlanetCellFactory} from './index'
import LiveCellType from './LiveCellType'

export default class EmptyCell extends AbstractCell<ILivePlanetCellFactory, ILivePlanetCell> implements ILivePlanetCell {
  readonly type = LiveCellType.Empty
  nextGeneration(): ILivePlanetCell {
    const neighbors = this.getAllNeighborsList().map(cell => cell.type)

    if (this.canBreedPredators(neighbors)) {
      return this.world.cellFactory.predator()
    }

    if (this.canBreedHerbivore(neighbors)) {
      return this.world.cellFactory.herbivore()
    }

    if (this.canGrowPlant(neighbors)) {
      return this.world.cellFactory.plant()
    }

    return this
  }

  private canBreedPredators(neighbours: LiveCellType[]): boolean {
    const hasFood = this.hasEnoughFood(neighbours, LiveCellType.Herbivore, 1)
    const hasParents = this.hasParents(neighbours, LiveCellType.Predator, 1)
    return hasFood && hasParents
  }

  private canBreedHerbivore(neighbours: LiveCellType[]): boolean {
    const hasFood = this.hasEnoughFood(neighbours, LiveCellType.Plant, 2)
    const hasParents = this.hasParents(neighbours, LiveCellType.Herbivore, 1)
    return hasFood && hasParents
  }

  private canGrowPlant(neighbours: LiveCellType[]): boolean {
    const hasFood = this.hasEnoughFood(neighbours, LiveCellType.Water, 1)
    const hasParents = this.hasParents(neighbours, LiveCellType.Plant, 5)
    return hasFood || hasParents
  }

  private hasEnoughFood(neighbours: LiveCellType[], foodType: LiveCellType, amount: number): boolean {
    return neighbours.filter(type => type === foodType).length >= amount
  }

  private hasParents(neighbours: LiveCellType[], cellType: LiveCellType, amount = 2): boolean {
    return neighbours.filter(type => type === cellType).length >= amount
  }

  toString() {
    return 'Empty cell'
  }
}