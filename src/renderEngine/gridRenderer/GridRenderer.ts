import IGridRenderer from './IGridRenderer'
import {ColoredGrid} from 'types'
import IRequestFrame from './IRequestFrame'
import {IScaler} from 'renderEngine/scaler'

export default class GridRenderer implements IGridRenderer {
	constructor(
		private readonly context: CanvasRenderingContext2D,
		private readonly canvasRequestFrameAdapted: IRequestFrame,
		private readonly size: number,
		private readonly scaler: IScaler
	) {
		this.drawGrid()
	}

	private scalePositionOfCell(pos: number): number {
		return this.scaler.scalePositionOfCell(pos)
	}

	private scalePositionOfCellWithBorder(pos: number): number {
		return this.scaler.scalePositionOfCellWithBorder(pos)
	}

	putDot(x: number, y: number, color: string): void {
		const dotSize = this.scaler.scaleFactor
		this.context.fillStyle = color
		const scaledX = this.scalePositionOfCell(x)
		const scaledY = this.scalePositionOfCell(y)
		this.context.fillRect(scaledX, scaledY, dotSize, dotSize)
	}

	drawGrid(): void {
		this.context.beginPath()
		this.context.strokeStyle = 'rgb(0,0,0)'
		this.context.lineWidth = this.scaler.gridLineWidth
		const upperBound = 0
		const lowerBound = this.scalePositionOfCellWithBorder(this.size)
		for (let x = 0; x < this.size; x++) {
			const xPos = this.scalePositionOfCellWithBorder(x)
			this.context.moveTo(xPos, upperBound)
			this.context.lineTo(xPos, lowerBound)
			this.context.closePath()
			this.context.stroke()
		}

		const leftBound = 0
		const rightBound = this.scalePositionOfCellWithBorder(this.size)
		for (let y = 0; y < this.size; y++) {
			const yPos = this.scalePositionOfCellWithBorder(y)
			this.context.moveTo(leftBound, yPos)
			this.context.lineTo(rightBound, yPos)
			this.context.closePath()
			this.context.stroke()
		}
	}

	render(styledGrid: ColoredGrid): void {
		// Suppose grid is a fair square array
		this.canvasRequestFrameAdapted.requestAnimationFrame(() => {
			const gridSize = styledGrid.length
			for (let y = 0; y < gridSize; y++) {
				for (let x = 0; x < gridSize; x++) {
					const color = styledGrid[y][x]
					this.putDot(x, y, color)
				}
			}
		})
	}
}
