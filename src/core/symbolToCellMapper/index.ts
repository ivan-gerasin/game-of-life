import ISymbolToCellMapper from './ISymbolToCellMapper'
import SymbolToCellMapper, {RawPresetMap} from './SymbolToCellMapper'
import {IClassicSettler} from '../settler'
import {Cell, DeadCell} from '../cell'


const DEFAULT_PRESET_MAP: RawPresetMap<IClassicSettler> = {
  '#': Cell,
  'default': DeadCell
}

const commonMapper = new SymbolToCellMapper<IClassicSettler>(DEFAULT_PRESET_MAP)

export {SymbolToCellMapper, ISymbolToCellMapper, commonMapper}