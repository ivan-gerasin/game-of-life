import IGridRenderer from './IGridRenderer'
import {ICellStyler} from '../cellStyler'
import {ICell} from '../cell'

export default class GridRenderer implements IGridRenderer{
  private readonly context: CanvasRenderingContext2D
  private readonly scaleFactor: number = 1

  constructor(context: CanvasRenderingContext2D, scaleFactor = 1) {
    this.context = context
    this.scaleFactor = scaleFactor
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

  render(styledGrid: string[][]) {
    // Suppose grid is a fair square array
    const gridSize = styledGrid.length
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const color = styledGrid[y][x]
        this.putDot(x,y,color)
      }
    }
  }
}