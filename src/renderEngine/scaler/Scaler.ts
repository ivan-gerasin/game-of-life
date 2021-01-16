import IScaler from './IScaler'
import {ICoordinate, IRealCoordinate} from '../../types'

export default class Scaler implements IScaler {
  constructor(readonly scaleFactor: number, readonly gridLineWidth: number) {
    this.halfPixelCorrectionRequired = this.isHalfPixelCorrectionRequired()
    this.dotSize = this.scaleFactor+this.gridLineWidth
  }

  private readonly halfPixelCorrectionRequired: boolean
  private readonly dotSize: number

  private scale(pos: number) {
    return pos*this.dotSize
  }

  private isHalfPixelCorrectionRequired(): boolean {
    return this.gridLineWidth === 1
  }

  /*

    ---Example---

    scaleFactor = 2
    gridLineWidth = 1

    # - grid lines
    . - Pixels for cell

    This "world" or "grid" down below have a size 3
    scaleFactor - that will mean that each Point have 2*2 Pixel size

    Coordinate starts from (0,0) and top left corner

    --- Scaling for Cell position ---

   *---x-->
   |##########
   |#..#..#..#
   |#..#..#..#
   y##########
   |#..#..#..#
    #..#..#..#
    ##########
    #..#..#..#
    #..#..#..#
    ##########

    Point is element of world grid - Cell
    Pixel - element of canvas

    Point is resolved to Pixel,
    which should be in top left corner of Point

          x,y           x,y
    Point(0,0) => Pixel(1,1)
    Point(1,0) => Pixel(4,1)
    Point(0,1) => Pixel(1,4)
    Point(1,1) => Pixel(4,4)
    Point(2,0) => Pixel(7,1)

    scaledPositionOfCell(x) = pos*(scaleFactor+gridWidth)+gridWidth

    If pixel is on grid line - it resolves to empty point

    Pixel(0,0) => EmptyPoint
    Pixel(1,1) => Point(0,0)
    Pixel(2,1) => Point(0,0)

    Pixel(4,4) => Point(1,1)
    Pixel(4,5) => Point(1,1)

    --- Scaling for grid line position ---

    Using to eval grid position.
    cell position transformed to pixel position
    of top left corner of cell (out of this cell)

    gridWidth = 2

   *---x-->
   |##############
   |##############
   |##..##..##..##
   |##..##..##..##
   y##############
   |##..##..##..##
    ##..##..##..##
    ##############
    ##..##..##..##
    ##..##..##..##
    ##############
    ##############

    Point(0,0) => Pixel(0,0)
    Point(1,0) => Pixel(4,0)
    Point(0,1) => Pixel(0,4)
    Point(2,0) => Pixel(8,0)
    Point(3,0) => Pixel(12,0)
    scaledPositionOfCell(x) = pos*(scaleFactor+gridWidth)

  * */


  scalePositionOfCell(pos: number) {
    return this.scale(pos) + this.gridLineWidth
  }

  scalePositionOfCellWithBorder(pos: number) {
    const scaled = this.scale(pos)
    const HALF_PIXEL = 0.5
    //https://stackoverflow.com/questions/7530593/html5-canvas-and-line-width/7531540#7531540
    return this.halfPixelCorrectionRequired ? scaled+HALF_PIXEL : scaled
  }

  private evalPositionCharacteristic(scaledPosition: number): PositionCharacteristic {
    const pixelOffset = scaledPosition%this.dotSize
    const cellOffset = Math.floor(scaledPosition/this.dotSize)
    return {
      cellOffset, pixelOffset
    }
  }

  resolvePixelToCell(scaledPosition: IRealCoordinate): ICoordinate {
    const x = this.evalPositionCharacteristic(scaledPosition.x)
    const xIsOnGrid = x.pixelOffset < this.dotSize
    if (xIsOnGrid) {
      return {x: null, y: null}
    }
    const y = this.evalPositionCharacteristic(scaledPosition.y)
    const yIsOnGrid = y.pixelOffset < this.dotSize
    if (yIsOnGrid) {
      return {x: null, y: null}
    }

    return {
      x: x.cellOffset,
      y: y.cellOffset,
    }
  }
}

interface PositionCharacteristic {
  cellOffset: number // integer number of cells => position/cellSize
  pixelOffset: number // pixel offset inside current cell => position%cellSize
}