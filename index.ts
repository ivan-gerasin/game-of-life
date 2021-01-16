import Game from 'engine/game/Game'
import {GridRenderer} from 'renderEngine/gridRenderer'
import BrowserSystemAdapter from 'engine/systemAdapter/BrowserSystemAdapter'

import {ILivePlanetCellFactory, ILivePlanetCell, assembly} from 'lib/cells/livePlanet'
import CanvasEventListener from './src/engine/CanvasEventListener'

function initContext() {

  const system = new BrowserSystemAdapter(window)
  const preset = [
    '............~|..........',
    '............~|..........',
    '............~|@.&.......',
    '............~|@@&.......',
    '............~|..........',
    '............~|..........',
    '...........~~~~.........',
    '..........~.~..~........',
    '.........~..~...~.......',
    '........~...~....~......',
  ]
  const size = 50
  const canvas = getCanvas()
  const renderer = createRenderer(canvas)
  const game = new Game<ILivePlanetCellFactory, ILivePlanetCell>(
    system,
    size,
    preset,
    renderer,
    assembly
  )

  game.start()

  const listener = new CanvasEventListener(canvas, [renderer.clickHandler])

  function createRenderer(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    if (context === null) {
      throw ReferenceError('Context not found')
    }
    return new GridRenderer(context, 10)
  }

  function getCanvas(): HTMLCanvasElement {
    const canvas = <HTMLCanvasElement>window.document.querySelector('#canvas')
    if (canvas === null) {
      throw ReferenceError('Canvas not found')
    }
    return canvas
  }
}


declare global {
  interface Window {
    initContext: Function
  }
}

window.initContext = initContext