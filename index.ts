import Game from 'core/game/Game'
import {GridRenderer} from 'core/gridRenderer'
// import {
//   ClassicCellFactory,
//   IClassicCellFactory,
//   blackWhiteStyler,
//   presetMapper,
//   IClassicCell,
// } from './src/lib/cells/classic'

import * as LivePlanet from 'lib/cells/livePlanet'

function initContext() {

  //const styler = blackWhiteStyler
  //const factory = new ClassicCellFactory()
  // const game = new Game<IClassicCellFactory, IClassicCell>(window, 50, presets.pulsar, presetMapper, createRenderer(), styler, factory)

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

  const styler = LivePlanet.styler
  const factory = new LivePlanet.LivePlanetCellFactory()
  const game = new Game<LivePlanet.ILivePlanetCellFactory, LivePlanet.ILivePlanetCell>(
    window, 50, preset,
    LivePlanet.presetMapper,
    createRenderer(), styler, factory
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