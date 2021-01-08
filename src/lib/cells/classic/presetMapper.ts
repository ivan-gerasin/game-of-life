import {Cell, DeadCell, IClassicCell, IClassicCellFactory} from './index'
import {SymbolToCellMapper} from 'core/symbolToCellMapper'

const presetMap = {
  '#': Cell,
  'default': DeadCell
}

const presetMapper = new SymbolToCellMapper<IClassicCellFactory, IClassicCell>(presetMap)

export default presetMapper