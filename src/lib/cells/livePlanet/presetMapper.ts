import {EmptyCell, Plant, Water, ILivePlanetCell, ILivePlanetCellFactory} from './index'
import {SymbolToCellMapper} from 'core/symbolToCellMapper'
import Predator from './Predator'
import Herbivore from './Herbivore'

const presetMap = {
  '.': EmptyCell,
  '~': Water,
  '|': Plant,
  '@': Herbivore,
  '&': Predator,
  'default': EmptyCell
}

const presetMapper = new SymbolToCellMapper<ILivePlanetCellFactory, ILivePlanetCell>(presetMap)
export default presetMapper