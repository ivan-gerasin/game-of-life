import GameAssembly from 'engine/gameAssembly/GameAssembly'

import {
  LivePlanetCellFactory,
  styler,
  presetMapper,
} from './index'

const factory = new LivePlanetCellFactory()
const assembly = new GameAssembly(factory, styler, presetMapper)

export default assembly