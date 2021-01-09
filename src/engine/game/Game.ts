import {ICellStyler} from 'core/cellStyler'
import {ICellFactory} from 'core/cellFactory'
import {ICell} from 'core/cell'
import {IWorld, Preset} from 'core/world'

import IGlobal from 'engine/IGlobal'
import {GridRenderer} from 'engine/gridRenderer'
import CommonWorldFactory from 'engine/worldFactory/CommonWorldFactory'
import {IGameAssembly} from 'engine/gameAssembly'

import {TimerId} from 'types'

export default class Game<F extends ICellFactory<F, C>, C extends ICell<F,C>> {
  private readonly world: IWorld<F, C>
  private renderer: GridRenderer
  private global: IGlobal
  private timer: TimerId = null
  private styler: ICellStyler<F, C>

  interval = 100
  running = false

  constructor(
    globalObject: IGlobal,
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
