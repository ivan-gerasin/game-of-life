import CanvasPixelClickEventListener from './CanvasPixelClickEventListener'
import {CanvasClickHandler} from './ICanvasEventListener'
import {IScaler} from '../scaler'

export default class CanvasCellClickEventListener extends CanvasPixelClickEventListener {
	constructor(
		private readonly scaler: IScaler,
		canvasElement: HTMLCanvasElement,
		handlers: CanvasClickHandler[] = []
	) {
		super(canvasElement, handlers)
	}

	protected eventDispatcher = (event: MouseEvent): void => {
		console.log('cell dispatcher')
		const {offsetX: x, offsetY: y} = event
		const cellPosition = this.scaler.resolvePixelToCell({x, y})
		this.handlers.forEach(handler => handler(cellPosition))
	}
}
