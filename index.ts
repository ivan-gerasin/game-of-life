import {assembly} from 'lib/cells/livePlanet'
import ApplicationController from './src/application/ApplicationController'

function initContext() {
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

  new ApplicationController(size, preset, assembly)
}


declare global {
  interface Window {
    initContext: Function
  }
}

window.initContext = initContext