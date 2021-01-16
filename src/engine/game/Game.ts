import {ICellFactory} from 'core/cellFactory'
import {ICell} from 'core/cell'
import {IWorld, Preset} from 'core/world'

import {GridRenderer} from 'renderEngine/gridRenderer'
import CommonWorldFactory from 'engine/worldFactory/CommonWorldFactory'
import {IGameAssembly} from 'engine/gameAssembly'
import {ICellStyler} from 'engine/cellStyler'

import {TimerId} from 'types/types'
import {ISystemAdapter} from '../systemAdapter'

export default class Game<F extends ICellFactory<F, C>, C extends ICell<F,C>> {
  private readonly world: IWorld<F, C>
  private renderer: GridRenderer
  private global: ISystemAdapter
  private timer: TimerId = null
  private styler: ICellStyler<F, C>

  interval = 2000
  running = false

  constructor(
    globalObject: ISystemAdapter,
    size: number,
    preset: Preset,
    renderer: GridRenderer,
    gameAssembly: IGameAssembly<F,C>
  ) {
    this.renderer = renderer
    this.global = globalObject
    this.styler = gameAssembly.styler

    const worldFactory = new CommonWorldFactory()
    this.world = worldFactory.buildWithPreset<F,C>(<F>gameAssembly.cellFactory, preset, gameAssembly.symbolToCellMapper, size)

  }


  start() {
    this.running = true
    this.timer = this.global.setInterval(() => {
      this.global.requestFrame(() => {
        const styledGrid = this.styler.exportStyledGridFromWorld(this.world)
        this.renderer.render(styledGrid)
        this.world.nextGeneration()
        // console.log('tick')
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
