import ICellFactory from 'core/cellFactory/ICellFactory'
import {ICell} from 'core/cell'
import {IWorld, Preset} from 'core/world'
import {ISymbolToCellMapper} from '../symbolToCellMapper'


export default interface ICommonWorldFactory {
  build: <F extends ICellFactory<F, C>, C extends ICell<F,C>>(cellFactory: F, size?: number) => IWorld<F, C>
  buildWithPreset: <F extends ICellFactory<F, C>, C extends ICell<F,C>>(cellFactory: F, preset: Preset, symbolMapper: ISymbolToCellMapper<F, C>, size? :number) => IWorld<F, C>
}