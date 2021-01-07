import {TimerId} from '../../types'

import {IWorld, World} from '../world'
import IGlobal from '../IGlobal'
import {CellStyler, ICellStyler} from '../cellStyler'
import {GridRenderer} from '../gridRenderer'
import world from '../world/world'
import {IClassicCellFactory, ICellFactory, ClassicCellFactory} from '../cellFactory'
import {ISymbolToCellMapper} from '../symbolToCellMapper'

// TODO: just for dev/testing, should not be here
const presets = require('../../lib/presets')

export default class Game<T extends ICellFactory<T>> {
  private world: IWorld<T>
  private renderer
  private global: IGlobal
  private timer: TimerId = null
  private styler: ICellStyler<T>

  interval = 700
  running = false

  constructor(globalObject: IGlobal, canvasSelector: string, size: number, symbolToCellMapper: ISymbolToCellMapper<T>) {
    const canvas = <HTMLCanvasElement>globalObject.document.querySelector(canvasSelector)
    if (canvas === null) {
      // TODO: we should provide context itself - to know as less as possible about IGlobal
      throw ReferenceError('Canvas not found')
    }
    const context = canvas.getContext('2d')
    if (context === null) {
      throw ReferenceError('Context not found')
    }
    this.styler = new CellStyler()
    this.global = globalObject

    const cellFactory = new ClassicCellFactory() as any //TODO remove this hack

    this.world = World.buildWithPreset(cellFactory, presets.pulsar, symbolToCellMapper, size) as IWorld<any>
    this.renderer = new GridRenderer(context, 10)
  }

  start() {
    this.running = true
    this.timer = this.global.setInterval(() => {
      this.global.requestAnimationFrame(() => {
        this.renderer.render(this.styler.exportStyledGridFromWorld(this.world))
        this.world.nextGeneration()
        console.log('tick')
      })
    }, this.interval)
  }

  stop() {
    if (this.timer) {
      this.running = false
      this.global.clearInterval(this.timer)
      this.timer = null
    }
  }

}
