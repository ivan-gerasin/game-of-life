import IGridRenderer from './IGridRenderer'

export default class GridRenderer implements IGridRenderer{
  private readonly context: CanvasRenderingContext2D
  private readonly scaleFactor: number = 1
  private readonly gridWidth = 1
  private readonly size = 50

  constructor(context: CanvasRenderingContext2D, scaleFactor = 1) {
    this.context = context
    this.scaleFactor = scaleFactor
    this.drawGrid()
  }

  get dotSize() {
    return this.scaleFactor
  }

  scalePosition(pos: number) {
    return pos*(this.scaleFactor + 2*this.gridWidth)
  }

  scalePositionWithGrid(pos: number) {
    return this.scalePosition(pos)+this.gridWidth
  }

  putDot(x: number, y: number, color: string) {
    const dotSize = this.dotSize
    this.context.fillStyle = color
    const scaledX = this.scalePositionWithGrid(x)
    const scaledY = this.scalePositionWithGrid(y)
    this.context.fillRect(scaledX,scaledY,dotSize,dotSize)
  }

  drawGrid() {
    this.context.beginPath()
    this.context.strokeStyle = 'rgb(0,0,0)'
    this.context.lineWidth = this.gridWidth
    const upperBound = 0
    const lowerBound = this.scalePosition(this.size)
    for (let x = 0; x < this.size; x++) {
      const xPos = this.scalePosition(x)
      this.context.moveTo(xPos, upperBound)
      this.context.lineTo(xPos, lowerBound)
      this.context.closePath()
      this.context.stroke()
    }

    const leftBound = 0
    const rightBound = this.scalePosition(this.size)
    for (let y = 0; y < this.size; y++) {
      const yPos = this.scalePosition(y)
      this.context.moveTo(leftBound, yPos)
      this.context.lineTo(rightBound, yPos)
      this.context.closePath()
      this.context.stroke()
    }
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

  resolveCanvasCoordinateToPosition(x:number, y:number) {
    return {x,y}
  }

  clickHandler = (x:number, y:number) => {
    const pos = this.resolveCanvasCoordinateToPosition(x,y)
    this.putDot(pos.x, pos.y, 'rgb(255,50,100)')
  }
}