import {TimerId} from '../../types'

import {IWorld, Preset, World} from '../world'
import IGlobal from '../IGlobal'
import {ICellStyler} from '../cellStyler'
import {GridRenderer} from '../gridRenderer'
import {ICellFactory} from '../cellFactory'
import {ISymbolToCellMapper} from '../symbolToCellMapper'
import {ICell} from '../cell'

export default class Game<FactoryType extends ICellFactory<FactoryType, CellType>, CellType extends ICell<FactoryType,CellType>> {
  private readonly world: IWorld<FactoryType, CellType>
  private renderer: GridRenderer
  private global: IGlobal
  private timer: TimerId = null
  private styler: ICellStyler<FactoryType, CellType>

  interval = 100
  running = false

  constructor(
    globalObject: IGlobal,
    size: number,
    preset: Preset,
    symbolToCellMapper: ISymbolToCellMapper<FactoryType, CellType>,
    renderer: GridRenderer,
    styler: ICellStyler<FactoryType, CellType>,
    cellFactory: FactoryType
  ) {
    this.renderer = renderer
    this.global = globalObject
    this.styler = styler
    this.world = World.buildWithPreset(cellFactory, preset, symbolToCellMapper, size)

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
