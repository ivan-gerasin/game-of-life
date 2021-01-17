import ICanvasDriver from './ICanvasDriver'
import ICanvasDriverProperties from './ICanvasDriverProperties'
import {
	CanvasCellClickEventListener,
	ICanvasEventListener,
} from 'renderEngine/canvasEventListener'
import {ColoredGrid} from 'types'
import {GridRenderer, IGridRenderer, IRequestFrame} from 'renderEngine/gridRenderer'
import {IScaler, Scaler} from 'renderEngine/scaler'
import {ViewInputEventHandler} from 'application'

export default class CanvasDriver implements ICanvasDriver {
	private readonly size: number
	private readonly scaleFactor: number
	private readonly gridLineWidth: number
	private readonly canvasNode: HTMLCanvasElement

	private readonly scaler: IScaler
	private readonly renderer: IGridRenderer
	private readonly listener: ICanvasEventListener

	constructor(properties: ICanvasDriverProperties, private readonly requestAnimationFrameAdapter: IRequestFrame) {
		const {scaleFactor, canvasNode, gridLineWidth, size} = properties
		this.size = size
		this.scaleFactor = scaleFactor
		this.canvasNode = canvasNode
		this.gridLineWidth = gridLineWidth

		this.scaler = new Scaler(scaleFactor, gridLineWidth)
		this.renderer = this.initRenderer()
		this.listener = new CanvasCellClickEventListener(this.scaler, this.canvasNode)
	}

	private initRenderer(): IGridRenderer {
		return new GridRenderer(
			this.getCanvasContext(),
			this.requestAnimationFrameAdapter,
			this.size,
			this.scaler
		)
	}

	private getCanvasContext(): CanvasRenderingContext2D {
		const context = this.canvasNode.getContext('2d')
		if (context === null) {
			throw ReferenceError('Context not found')
		}
		return context
	}

	requestRender(grid: ColoredGrid): void {
		this.renderer.render(grid)
	}

	attachHandler(handler: ViewInputEventHandler): void {
		this.listener.attachHandler(handler)
	}

	detachHandler(handlerToDetach: ViewInputEventHandler): void {
		this.listener.detachHandler(handlerToDetach)
	}

}