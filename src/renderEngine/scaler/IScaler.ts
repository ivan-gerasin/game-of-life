export default interface IScaler {

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
    Point(2,0) => Pixel(6,0)
    Point(3,0) => Pixel(9,0)
    scaledPositionOfCell(x) = pos*(scaleFactor+gridWidth)

  * */


  readonly scaleFactor: number
  readonly gridLineWidth: number

  scalePositionOfCell: (pos: number) => number
  scalePositionOfCellWithBorder: (pos: number) => number

}