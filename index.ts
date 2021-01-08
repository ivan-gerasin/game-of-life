import Game from './src/core/game/Game'
import {GridRenderer} from './src/core/gridRenderer'
import {
  ClassicCellFactory,
  IClassicCellFactory,
  blackWhiteStyler,
  presetMapper,
  IClassicCell,
} from './src/lib/cells/classic'

function initContext() {

  const styler = blackWhiteStyler
  const factory = new ClassicCellFactory()

  const game = new Game<IClassicCellFactory, IClassicCell>(window, 50, presetMapper, createRenderer(), styler, factory)
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
}


declare global {
  interface Window {
    initContext: Function
  }
}

window.initContext = initContext