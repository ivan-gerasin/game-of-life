import IViewController from './IViewController'
import CanvasDriver from 'renderEngine/canvasDriver/CanvasDriver'
import ICanvasDriverProperties from 'renderEngine/canvasDriver/ICanvasDriverProperties'
import {IWorld, Preset} from 'core/world'
import {ICellFactory} from '../core/cellFactory'
import {ICell} from '../core/cell'
import {IGameAssembly} from '../engine/gameAssembly'
import CommonWorldFactory from '../engine/worldFactory/CommonWorldFactory'
import {ICellStyler} from '../engine/cellStyler'
import {Game, IColoredGridConsumer} from '../engine/game'
import BrowserSystemAdapter from '../engine/systemAdapter/BrowserSystemAdapter'
import {ColoredGrid} from '../types'

export default class ApplicationController<F extends ICellFactory<F,C>, C extends ICell<F,C>> implements IColoredGridConsumer{
  
  private readonly view: IViewController
  private readonly game: Game<F,C>
  private readonly world: IWorld<F,C>

  constructor(
    private readonly size: number,
    preset: Preset,
    gameAssembly: IGameAssembly<F,C>
  ) {
    
    const canvasProps: ICanvasDriverProperties = {
      size: 50,
      scaleFactor: 5,
      gridLineWidth: 1,
      canvasNode: this.getCanvas()
    }

    
    this.view = new CanvasDriver(canvasProps, window)

    const worldFactory = new CommonWorldFactory()
    this.world = worldFactory.buildWithPreset<F,C>(<F>gameAssembly.cellFactory, preset, gameAssembly.symbolToCellMapper, size)

    const system = new BrowserSystemAdapter(window)
    this.game = new Game(system, this, this.world, gameAssembly.styler)
    this.game.start()
  }

  private getCanvas(): HTMLCanvasElement {
    const canvas = <HTMLCanvasElement>window.document.querySelector('#canvas')
    if (canvas === null) {
      throw ReferenceError('Canvas not found')
    }
    return canvas
  }


  consume(grid: ColoredGrid) {
    this.view.requestRender(grid)
  }
}