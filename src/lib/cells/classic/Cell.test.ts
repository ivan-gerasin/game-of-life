import {IWorld} from 'core/world'
import {Point} from 'core/point'
import {ICell} from 'core/cell'

import SymbolToCellMapper, {RawPresetMap} from 'engine/symbolToCellMapper/SymbolToCellMapper'
import CommonWorldFactory from 'engine/worldFactory/CommonWorldFactory'

import {IClassicCell, DeadCell, ClassicCellFactory, IClassicCellFactory, Cell} from './index'



const DEFAULT_PRESET_MAP: RawPresetMap<IClassicCellFactory, IClassicCell> = {
  '#': Cell,
  'default': DeadCell
}

const commonMapper = new SymbolToCellMapper<IClassicCellFactory, IClassicCell>(DEFAULT_PRESET_MAP)

describe('Cell', () => {

  let cellFactory: IClassicCellFactory
  beforeEach(() => {
    cellFactory = new ClassicCellFactory()
  })

  let worldMock: IWorld<IClassicCellFactory, IClassicCell>, cell: ICell<IClassicCellFactory, IClassicCell>
  let cellPosition = Point.Point(0,0)

  const worldFactory = new CommonWorldFactory()

  beforeEach(() => {
    // @ts-ignore
    worldMock = {
      // @ts-ignore
      at: jest.fn(({x,y}) => ({x,y})),
      settleCell: jest.fn(),
      positionOf: jest.fn(() => cellPosition)
    }
    cell = new Cell(worldMock)
  })

  describe('nextGeneration of Cell', () => {

    const position = Point.Point(1,1)

    test('return dead cell, if there is 0 cells around', () => {

      const w = worldFactory.buildWithPreset(cellFactory,[
        '...',
        '.#.',
        '...'
      ], commonMapper)
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 1 cells around', () => {
      const w = worldFactory.buildWithPreset(cellFactory, [
        '.#.',
        '.#.',
        '...'
      ], commonMapper)
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return same cell, if there is 2 cells around', () => {
      const w = worldFactory.buildWithPreset(cellFactory, [
        '.#.',
        '.##',
        '...'
      ], commonMapper)
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeTruthy()
      expect(nextGeneration).toBe(w.at(position))
    })
    test('return same cell, if there is 3 cells around', () => {
      const w = worldFactory.buildWithPreset(cellFactory, [
        '.#.',
        '.##',
        '.#.'
      ], commonMapper)
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeTruthy()
      expect(nextGeneration).toBe(w.at(position))
    })
    test('return dead cell, if there is 4 cells around', () => {
      const w = worldFactory.buildWithPreset(cellFactory, [
        '.#.',
        '.##',
        '.##'
      ], commonMapper)
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 5 cells around', () => {
      const w = worldFactory.buildWithPreset(cellFactory, [
        '.#.',
        '###',
        '.##'
      ], commonMapper)
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 6 cells around', () => {
      const w = worldFactory.buildWithPreset(cellFactory, [
        '.##',
        '###',
        '.##'
      ], commonMapper)
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 7 cells around', () => {
      const w = worldFactory.buildWithPreset(cellFactory, [
        '###',
        '###',
        '.##'
      ], commonMapper)
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })
    test('return dead cell, if there is 8 cells around', () => {
      const w = worldFactory.buildWithPreset(cellFactory, [
        '###',
        '###',
        '###'
      ], commonMapper)
      const nextGeneration = w.at(position).nextGeneration()
      expect(nextGeneration.isAlive).toBeFalsy()
    })

  })

})