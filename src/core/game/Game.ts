import IGlobal from 'core/IGlobal'
import {ICellStyler} from 'core/cellStyler'
import {GridRenderer} from 'core/gridRenderer'
import {ICellFactory} from 'core/cellFactory'
import {ISymbolToCellMapper} from 'core/symbolToCellMapper'
import {ICell} from 'core/cell'
import {IWorld, Preset, World} from 'core/world'

import {TimerId} from 'types'

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
