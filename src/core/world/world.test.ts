import World from './world'
import {Point} from '../point'
import {Cell, DeadCell} from '../cell'
import {IClassicSettler, Settler} from '../settler'
import SymbolToCellMapper, {RawPresetMap} from '../symbolToCellMapper/SymbolToCellMapper'


const DEFAULT_PRESET_MAP: RawPresetMap<IClassicSettler> = {
  '#': Cell,
  'default': DeadCell
}

const commonMapper = new SymbolToCellMapper<IClassicSettler>(DEFAULT_PRESET_MAP)

describe('World', () => {
  let settler: IClassicSettler
  beforeEach(() => {
    settler = new Settler()
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

    const w = World.buildWithPreset(settler, preset, commonMapper)
    expect(w.at(pos1).isAlive).toBeTruthy()
    expect(w.at(pos2).isAlive).toBeTruthy()
    expect(w.at(pos3).isAlive).toBeTruthy()

    expect(w.at(emptyPoint).isAlive).toBeFalsy()
  })

  // test('settleCell should place provided cell into provided position', () => {
  //   const w = new World(settler)
  //   const cell = new Cell(w)
  //   w.settleCell(cell, Point.Point(0,0))
  //   expect(w.at(Point.Point(0,0))).toBe(cell)
  // })
  //
  // describe('positionOf', () => {
  //   const w = new World(settler)
  //   test('will return position of settled cell', () => {
  //     const cell = new Cell(w)
  //     w.settleCell(cell, Point.Point(0,0))
  //     const pos = w.positionOf(cell)
  //     expect(
  //       pos.same(Point.Point(0,0))
  //     ).toBeTruthy()
  //   })
  //   test('will throw an error if cell not from this world', () => {
  //     const anotherWorld = new World(settler)
  //     const cell = new Cell(w)
  //     expect(() => {
  //       anotherWorld.positionOf(cell)
  //     }).toThrowError('Cell does not belong to this world')
  //   })
  //   //Skip - need to have an ability to settle cell directly to the world w/o any checks
  //   //Probably this test should be removed
  //   test.skip('will throw an error if cell not from this world but found', () => {
  //     const anotherWorld = new World(settler)
  //     const cell = new Cell(w)
  //     anotherWorld.settleCell(cell, {x: 0, y:0})
  //     expect(() => {
  //       anotherWorld.positionOf(cell)
  //     }).toThrowError('Cell does not belong to this world, but found')
  //   })
  //   test('will throw an error if cell does not settled', () => {
  //     const cell = new Cell<IClassicSettler>()
  //     expect(() => {
  //       w.positionOf(cell)
  //     }).toThrowError('Cell is not attached to the world')
  //   })
  // })
  //
  // test('produceCell create cell attached to this world, but not settled', () => {
  //   const w = new World(settler)
  //   const cell = w.produceCell()
  //   expect(() => {
  //     w.positionOf(cell)
  //   }).toThrowError('Cell is not attached to the world')
  //   expect(cell.world).toBe(w)
  // })
})