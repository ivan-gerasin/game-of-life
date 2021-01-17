import {ICellFactory} from 'core/cellFactory'
import {ICell} from 'core/cell'
import {IWorld} from 'core/world'
import {ICellStyler} from 'engine/cellStyler'

import {IColoredGridConsumer} from 'engine/game'
import {IIntervalTimer} from 'types'

export default class Game<F extends ICellFactory<F, C>, C extends ICell<F,C>> {
	interval = 1000
	running = false

	constructor(
		private readonly timer: IIntervalTimer,
		private readonly gridConsumer: IColoredGridConsumer,
		private readonly world: IWorld<F,C>,
		private readonly styler: ICellStyler<F, C>
	) {
	}


	start(): void {
		this.running = true
		this.timer.start(this.interval,() => {
			const styledGrid = this.styler.exportStyledGridFromWorld(this.world)
			this.gridConsumer.consume(styledGrid)
			this.world.nextGeneration()
		})
	}

	stop(): void {
		if (this.running) {
			this.running = false
			this.timer.stop
		}
	}

}
