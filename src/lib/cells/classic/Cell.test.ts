// import {World, IWorld} from '../../../core/world'
// import {Point} from '../../../core/point'
// import {ICell} from '../../../core/cell'
//
// import Cell from './Cell'
// import IClassicCellFactory from './IClassicCellFactory'
// import ClassicCellFactory from './ClassicCellFactory'
// import DeadCell from './DeadCell'
// import SymbolToCellMapper, {RawPresetMap} from '../../../core/symbolToCellMapper/SymbolToCellMapper'
//
// const DEFAULT_PRESET_MAP: RawPresetMap<IClassicCellFactory> = {
//   '#': Cell,
//   'default': DeadCell
// }
//
// const commonMapper = new SymbolToCellMapper<IClassicCellFactory>(DEFAULT_PRESET_MAP)
//
// describe('Cell', () => {
//
//   let cellFactory: IClassicCellFactory
//   beforeEach(() => {
//     cellFactory = new ClassicCellFactory()
//   })
//
//   let worldMock: IWorld<IClassicCellFactory>, cell: ICell<IClassicCellFactory>
//   let cellPosition = Point.Point(0,0)
//
//   beforeEach(() => {
//     // @ts-ignore
//     worldMock = {
//       // @ts-ignore
//       at: jest.fn(({x,y}) => ({x,y})),
//       settleCell: jest.fn(),
//       positionOf: jest.fn(() => cellPosition)
//     }
//     cell = new Cell(worldMock)
//   })
//
//   describe('nextGeneration of Cell', () => {
//
//     const position = Point.Point(1,1)
//
//     test('return dead cell, if there is 0 cells around', () => {
//       const w = World.buildWithPreset(cellFactory,[
//         'xxx',
//         'x@x',
//         'xxx'
//       ], commonMapper)
//       const nextGeneration = w.at(position).nextGeneration()
//       expect(nextGeneration.isAlive).toBeFalsy()
//     })
//     test('return dead cell, if there is 1 cells around', () => {
//       const w = World.buildWithPreset(cellFactory, [
//         'x@x',
//         'x@x',
//         'xxx'
//       ], commonMapper)
//       const nextGeneration = w.at(position).nextGeneration()
//       expect(nextGeneration.isAlive).toBeFalsy()
//     })
//     test('return same cell, if there is 2 cells around', () => {
//       const w = World.buildWithPreset(cellFactory, [
//         'x@x',
//         'x@@',
//         'xxx'
//       ], commonMapper)
//       const nextGeneration = w.at(position).nextGeneration()
//       expect(nextGeneration.isAlive).toBeTruthy()
//       expect(nextGeneration).toBe(w.at(position))
//     })
//     test('return same cell, if there is 3 cells around', () => {
//       const w = World.buildWithPreset(cellFactory, [
//         'x@x',
//         'x@@',
//         'x@x'
//       ], commonMapper)
//       const nextGeneration = w.at(position).nextGeneration()
//       expect(nextGeneration.isAlive).toBeTruthy()
//       expect(nextGeneration).toBe(w.at(position))
//     })
//     test('return dead cell, if there is 4 cells around', () => {
//       const w = World.buildWithPreset(cellFactory, [
//         'x@x',
//         'x@@',
//         'x@@'
//       ], commonMapper)
//       const nextGeneration = w.at(position).nextGeneration()
//       expect(nextGeneration.isAlive).toBeFalsy()
//     })
//     test('return dead cell, if there is 5 cells around', () => {
//       const w = World.buildWithPreset(cellFactory, [
//         'x@x',
//         '@@@',
//         'x@@'
//       ], commonMapper)
//       const nextGeneration = w.at(position).nextGeneration()
//       expect(nextGeneration.isAlive).toBeFalsy()
//     })
//     test('return dead cell, if there is 6 cells around', () => {
//       const w = World.buildWithPreset(cellFactory, [
//         'x@@',
//         '@@@',
//         'x@@'
//       ], commonMapper)
//       const nextGeneration = w.at(position).nextGeneration()
//       expect(nextGeneration.isAlive).toBeFalsy()
//     })
//     test('return dead cell, if there is 7 cells around', () => {
//       const w = World.buildWithPreset(cellFactory, [
//         '@@@',
//         '@@@',
//         'x@@'
//       ], commonMapper)
//       const nextGeneration = w.at(position).nextGeneration()
//       expect(nextGeneration.isAlive).toBeFalsy()
//     })
//     test('return dead cell, if there is 8 cells around', () => {
//       const w = World.buildWithPreset(cellFactory, [
//         '@@@',
//         '@@@',
//         '@@@'
//       ], commonMapper)
//       const nextGeneration = w.at(position).nextGeneration()
//       expect(nextGeneration.isAlive).toBeFalsy()
//     })
//
//   })
//
// })