import IGridRenderer from './IGridRenderer'
import {ICellStyler} from '../cellStyler'
import {ICell} from '../cell'

export default class GridRenderer implements IGridRenderer{
  private readonly context: CanvasRenderingContext2D
  private readonly scaleFactor: number = 1
  private readonly cellStyler: ICellStyler

  constructor(context: CanvasRenderingContext2D, cellStyler: ICellStyler, scaleFactor = 1) {
    this.context = context
    this.scaleFactor = scaleFactor
    this.cellStyler = cellStyler
  }

  get dotSize() {
    return this.scaleFactor
  }

  scalePosition(pos: number) {
    return pos*this.scaleFactor
  }

  putDot(x: number, y: number, color: string) {
    const dotSize = this.dotSize
    this.context.fillStyle = color
    const scaledX = this.scalePosition(x)
    const scaledY = this.scalePosition(y)
    this.context.fillRect(scaledX,scaledY,dotSize,dotSize)
  }

  render(grid: ICell[][]) {
    // Suppose grid is a fair square array
    const gridSize = grid.length
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = grid[y][x]
        const color = this.cellStyler.getStyleFor(cell)
        this.putDot(x,y,color)
      }
    }
  }
}