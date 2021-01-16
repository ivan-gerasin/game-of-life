import ICanvasDriver from './ICanvasDriver'
import ICanvasDriverProperties from './ICanvasDriverProperties'
import {GridRenderer, IGridRenderer} from '../gridRenderer'
import {CanvasEventListener, ICanvasEventListener} from '../canvasEventListener'
import {ColoredGrid} from 'types'
import IRequestFrame from '../gridRenderer/IRequestFrame'

export default class CanvasDriver implements ICanvasDriver {
  private readonly size: number
  private readonly scaleFactor: number
  private readonly gridLineWitdh: number
  private readonly canvasNode: HTMLCanvasElement

  private readonly renderer: IGridRenderer
  private readonly listener: ICanvasEventListener

  constructor(properties: ICanvasDriverProperties, private readonly requestAnimationFrameAdapter: IRequestFrame) {
    const {scaleFactor, canvasNode, gridLineWidth, size} = properties
    this.size = size
    this.scaleFactor = scaleFactor
    this.canvasNode = canvasNode
    this.gridLineWitdh = gridLineWidth

    this.renderer = this.initRenderer()
    this.listener = new CanvasEventListener(this.canvasNode)
  }

  private initRenderer(): IGridRenderer {
    return new GridRenderer(this.getCanvasContext(), this.requestAnimationFrameAdapter, this.scaleFactor, this.gridLineWitdh, this.size)
  }

  private getCanvasContext(): CanvasRenderingContext2D {
    const context = this.canvasNode.getContext('2d')
    if (context === null) {
      throw ReferenceError('Context not found')
    }
    return context
  }

  requestRender(grid: ColoredGrid) {
    this.renderer.render(grid)
  }

}