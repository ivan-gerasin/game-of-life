import {ICommonWorldFactory} from './index'
import {ICellFactory} from 'core/cellFactory'
import {ICell} from 'core/cell'
import {IWorld, Preset, World} from 'core/world'
import {ISymbolToCellMapper} from 'engine/symbolToCellMapper'
import {CellSettler} from 'engine/cellSettler'

export default class CommonWorldFactory implements ICommonWorldFactory {
  private readonly DEFAULT_SIZE = 50

  build<F extends ICellFactory<F, C>, C extends ICell<F,C>>(cellFactory: F, size = this.DEFAULT_SIZE): IWorld<F, C> {
    return new World<F, C>(cellFactory, size)
  }

  buildWithPreset<F extends ICellFactory<F, C>, C extends ICell<F,C>>(cellFactory: F, preset: Preset, symbolMapper: ISymbolToCellMapper<F, C>, size = this.DEFAULT_SIZE) {
    const world: IWorld<F, C> = this.build(cellFactory, size)
    const settler = new CellSettler(symbolMapper)
    settler.settle(world, preset)
    return world
  }
}