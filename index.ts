import Game from './src/core/game/Game'
import SymbolToCellMapper, {RawPresetMap} from './src/core/symbolToCellMapper/SymbolToCellMapper'
import {IClassicCellFactory} from './src/core/cellFactory'
import Cell from './src/core/cell/Cell'
import {DeadCell} from './src/core/cell'
import {GridRenderer} from './src/core/gridRenderer'

function initContext() {

  const game = new Game(window, 50, createMapper(), createRenderer())
  game.start()

  function createRenderer() {
    const canvas = <HTMLCanvasElement>window.document.querySelector('#canvas')
    if (canvas === null) {
      throw ReferenceError('Canvas not found')
    }
    const context = canvas.getContext('2d')
    if (context === null) {
      throw ReferenceError('Context not found')
    }
    return new GridRenderer(context, 10)
  }
  function createMapper() {
    const DEFAULT_PRESET_MAP: RawPresetMap<IClassicCellFactory> = {
      '#': Cell,
      'default': DeadCell
    }

    return  new SymbolToCellMapper<IClassicCellFactory>(DEFAULT_PRESET_MAP)
  }
}


declare global {
  interface Window {
    initContext: Function
  }
}

window.initContext = initContext