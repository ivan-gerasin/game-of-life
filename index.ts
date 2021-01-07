import Game from './src/core/game/Game'
import SymbolToCellMapper, {RawPresetMap} from './src/core/symbolToCellMapper/SymbolToCellMapper'
import {IClassicCellFactory} from './src/core/cellFactory'
import Cell from './src/core/cell/Cell'
import {DeadCell} from './src/core/cell'

function initContext() {
  const DEFAULT_PRESET_MAP: RawPresetMap<IClassicCellFactory> = {
    '#': Cell,
    'default': DeadCell
  }

  const commonMapper = new SymbolToCellMapper<IClassicCellFactory>(DEFAULT_PRESET_MAP)
  const game = new Game(window, '#canvas', 50, commonMapper)
  game.start()
}


declare global {
  interface Window {
    initContext: Function
  }
}

window.initContext = initContext