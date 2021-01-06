import World from './world'
import {Cell} from './cell'
import Point from './point'

describe('World', () => {
  test('stub', () => {
    expect(1).toBe(1)
  })

  test('buildWithPreset', () => {
    const preset = [
      ['x','x','x','x','x','x','x','x'],
      ['x','x','x','x','x','x','x','x'],
      ['x','x','x','x','x','x','x','x'],
    ]

    const pos1 = Point.Point(3, 0)
    const pos2 = Point.Point(3, 1)
    const pos3 = Point.Point(4, 1)
    preset[pos1.y][pos1.x] = '@'
    preset[pos2.y][pos2.x] = '@'
    preset[pos3.y][pos3.x] = '@'

    const emptyPoint = Point.Point(1, 1)

    const w = World.buildWithPreset(preset)
    expect(Cell.isAlive(w.at(pos1))).toBeTruthy()
    expect(Cell.isAlive(w.at(pos2))).toBeTruthy()
    expect(Cell.isAlive(w.at(pos3))).toBeTruthy()

    expect(Cell.isAlive(w.at(emptyPoint))).toBeFalsy()
  })

  test('settleCell should place provided cell into provided position', () => {
    const w = new World()
    const cell = new Cell(w)
    w.settleCell(cell, Point.Point(0,0))
    expect(w.at(Point.Point(0,0))).toBe(cell)
  })

  describe('positionOf', () => {
    const w = new World()
    test('will return position of settled cell', () => {
      const cell = new Cell(w)
      w.settleCell(cell, Point.Point(0,0))
      const pos = w.positionOf(cell)
      expect(
        pos.same(Point.Point(0,0))
      ).toBeTruthy()
    })
    test('will throw an error if cell not from this world', () => {
      const anotherWorld = new World()
      const cell = new Cell(w)
      expect(() => {
        anotherWorld.positionOf(cell)
      }).toThrowError('Cell does not belong to this world')
    })
    //Skip - need to have an ability to settle cell directly to the world w/o any checks
    //Probably this test should be removed
    test.skip('will throw an error if cell not from this world but found', () => {
      const anotherWorld = new World()
      const cell = new Cell(w)
      anotherWorld.settleCell(cell, {x: 0, y:0})
      expect(() => {
        anotherWorld.positionOf(cell)
      }).toThrowError('Cell does not belong to this world, but found')
    })
    test('will throw an error if cell does not settled', () => {
      const cell = new Cell()
      expect(() => {
        w.positionOf(cell)
      }).toThrowError('Cell is not attached to the world')
    })
  })

  test('produceCell create cell attached to this world, but not settled', () => {
    const w = new World()
    const cell = w.produceCell()
    expect(() => {
      w.positionOf(cell)
    }).toThrowError('Cell is not attached to the world')
    expect(cell.world).toBe(w)
  })
})