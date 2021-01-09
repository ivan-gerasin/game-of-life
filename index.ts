import Game from 'engine/game/Game'
import {GridRenderer} from 'engine/gridRenderer'
import BrowserSystemAdapter from 'engine/systemAdapter/BrowserSystemAdapter'

import {ILivePlanetCellFactory, ILivePlanetCell, assembly} from 'lib/cells/livePlanet'

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
  const game = new Game<ILivePlanetCellFactory, ILivePlanetCell>(
    system,
    size,
    preset,
    createRenderer(),
    assembly
  )

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