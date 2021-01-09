import ICellFactory from 'core/cellFactory/ICellFactory'
import {ICell} from 'core/cell'
import {IWorld, Preset} from 'core/world'
import {ISymbolToCellMapper} from '../symbolToCellMapper'

export default interface ISpecifiedWorldFactory<FactoryType extends ICellFactory<FactoryType, CellType>, CellType extends ICell<FactoryType,CellType>> {
  build: (size?: number) => IWorld<FactoryType, CellType>
  buildWithPreset: (preset: Preset, symbolMapper: ISymbolToCellMapper<FactoryType, CellType>, size? :number) => IWorld<FactoryType, CellType>
}