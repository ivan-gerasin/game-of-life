import GameAssembly from 'engine/gameAssembly/GameAssembly'

import {
	ClassicCellFactory,
	blackWhiteStyler,
	presetMapper,
} from './index'

const factory = new ClassicCellFactory()
const assembly = new GameAssembly(factory, blackWhiteStyler, presetMapper)

export default assembly