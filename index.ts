import Game from './src/core/game/Game'
import SymbolToCellMapper from './src/core/symbolToCellMapper/SymbolToCellMapper'
import {ClassicCellFactory, IClassicCellFactory} from './src/core/cellFactory'
import Cell from './src/core/cell/Cell'
import {DeadCell} from './src/core/cell'
import {GridRenderer} from './src/core/gridRenderer'
import {CellStyler} from './src/core/cellStyler'

function initContext() {

  const styler = new CellStyler<IClassicCellFactory>()
  const factory = new ClassicCellFactory()

  const game = new Game<IClassicCellFactory>(window, 50, createMapper(), createRenderer(), styler, factory)
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
    const DEFAULT_PRESET_MAP = {
      '#': Cell,
      'default': DeadCell
    }

    return  new SymbolToCellMapper(DEFAULT_PRESET_MAP)
  }
}


declare global {
  interface Window {
    initContext: Function
  }
}

window.initContext = initContext