import {ICellFactory} from 'core/cellFactory'
import {ICell} from 'core/cell'
import {IWorld} from 'core/world'
import {ICellStyler} from 'engine/cellStyler'

import {TimerId} from 'types/types'
import {ISystemAdapter} from '../systemAdapter'
import IColoredGridConsumer from './IColoredGridConsumer'

export default class Game<F extends ICellFactory<F, C>, C extends ICell<F,C>> {
  private timerId: TimerId = null
  interval = 1000
  running = false

  constructor(
    private readonly global: ISystemAdapter,
    private readonly gridConsumer: IColoredGridConsumer,
    private readonly world: IWorld<F,C>,
    private readonly styler: ICellStyler<F, C>
  ) {
  }


  start() {
    this.running = true
    this.timerId = this.global.setInterval(() => {
      const styledGrid = this.styler.exportStyledGridFromWorld(this.world)
      this.gridConsumer.consume(styledGrid)
      this.world.nextGeneration()
    }, this.interval)
  }

  stop() {
    if (this.timerId) {
      this.running = false
      this.global.clearInterval(this.timerId)
      this.timerId = null
    }
  }

}
