import World from '../world'
import Point from '../point'
import IWorld from '../IWorld'
import ICell from './ICell'
import Cell from './Cell'

describe('Cell', () => {

  let worldMock: IWorld, cell: ICell
  let cellPosition = Point.Point(0,0)

  beforeEach(() => {
    worldMock = {
      // @ts-ignore
      at: jest.fn(({x,y}) => ({x,y})),
      settleCell: jest.fn(),
      positionOf: jest.fn(() => cellPosition)
    }
    cell = new Cell(worldMock)
  })

  test('created with provided world attached', () => {
    const c = new Cell(worldMock)
    expect(c.world).toBe(worldMock)
  })

  test('if no world provided, will throw an error when trying to access to the world', () => {
    const c = new Cell()
    expect(() => {
      c.world
    }).toThrowError('Cell is not attached to the world')
  })

  test('position will call to world method positionOf', () => {
    const c = new Cell(worldMock)
    expect(c.position).toBeInstanceOf(Point)
    expect(worldMock.positionOf).toBeCalledWith(c)
  })

  describe('positions of neighbours', () => {

    test('atTop', () => {
      cell.atTop()
      expect(worldMock.at).toBeCalledWith(new Point(cellPosition.x,cellPosition.y-1))
    })

    test('atBottom', () => {
      cell.atBottom()
      expect(worldMock.at).toBeCalledWith(new Point(cellPosition.x,cellPosition.y+1))
    })

    test('atLeft', () => {
      cell.atLeft()
      expect(worldMock.at).toBeCalledWith(new Point(cellPosition.x-1,cellPosition.y))
    })

    test('atRight', () => {
      cell.atRight()
      expect(worldMock.at).toBeCalledWith(new Point(cellPosition.x+1,cellPosition.y))
    })

    test('atTopRight', () => {
      cell.atTopRight()
      expect(worldMock.at).toBeCalledWith(new Point(cellPosition.x+1,cellPosition.y-1))
    })
    test('atTopLeft', () => {
      cell.atTopLeft()
      expect(worldMock.at).toBeCalledWith(new Point(cellPosition.x-1,cellPosition.y-1))
    })
    test('atBottomLeft', () => {
      cell.atBottomLeft()
      expect(worldMock.at).toBeCalledWith(new Point(cellPosition.x-1,cellPosition.y+1))
    })
    test('atBottomRight', () => {
      cell.atBottomRight()
      expect(worldMock.at).toBeCalledWith(new Point(cellPosition.x+1,cellPosition.y+1))
    })
  })

  describe('nextGeneration of Cell', () => {

    const position = Point.Point(1,1)

    test('return dead cell, if there is 0 cells around', () => {
      const w = World.buildWithPreset([
        'xxx',
        'x@x',
        'xxx'
      ])
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 1 cells around', () => {
      const w = World.buildWithPreset([
        'x@x',
        'x@x',
        'xxx'
      ])
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return same cell, if there is 2 cells around', () => {
      const w = World.buildWithPreset([
        'x@x',
        'x@@',
        'xxx'
      ])
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeTruthy()
      expect(nextGeneration).toBe(w.at(position))
    })
    test('return same cell, if there is 3 cells around', () => {
      const w = World.buildWithPreset([
        'x@x',
        'x@@',
        'x@x'
      ])
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeTruthy()
      expect(nextGeneration).toBe(w.at(position))
    })
    test('return dead cell, if there is 4 cells around', () => {
      const w = World.buildWithPreset([
        'x@x',
        'x@@',
        'x@@'
      ])
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 5 cells around', () => {
      const w = World.buildWithPreset([
        'x@x',
        '@@@',
        'x@@'
      ])
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 6 cells around', () => {
      const w = World.buildWithPreset([
        'x@@',
        '@@@',
        'x@@'
      ])
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 7 cells around', () => {
      const w = World.buildWithPreset([
        '@@@',
        '@@@',
        'x@@'
      ])
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 8 cells around', () => {
      const w = World.buildWithPreset([
        '@@@',
        '@@@',
        '@@@'
      ])
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })

  })

})