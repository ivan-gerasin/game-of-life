import ISymbolToCellMapper from './ISymbolToCellMapper'
import SymbolToCellMapper, {RawPresetMap} from './SymbolToCellMapper'
import {IClassicCellFactory} from '../cellFactory'
import {Cell, DeadCell} from '../cell'


const DEFAULT_PRESET_MAP: RawPresetMap<IClassicCellFactory> = {
  '#': Cell,
  'default': DeadCell
}

const commonMapper = new SymbolToCellMapper<IClassicCellFactory>(DEFAULT_PRESET_MAP)

export {SymbolToCellMapper, ISymbolToCellMapper, commonMapper}