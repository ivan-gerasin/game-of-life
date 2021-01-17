import World from './world'
import {Point} from 'core/point'
import {BaseCell, IBaseCellFactory, BaseCellFactory, IBaseCell} from 'core/testsHelpers'


describe('World', () => {
	let cellFactory: IBaseCellFactory
	beforeEach(() => {
		cellFactory = new BaseCellFactory()
	})

	test('settleCell should place provided cell into provided position', () => {
		const w = new World<IBaseCellFactory, IBaseCell>(cellFactory)
		const cell = new BaseCell(w)
		w.settleCell(cell, Point.Point(0,0))
		expect(w.at(Point.Point(0,0))).toBe(cell)
	})

	describe('positionOf', () => {
		cellFactory = new BaseCellFactory()
		const w = new World<IBaseCellFactory, IBaseCell>(cellFactory)
		test('will return position of settled cell', () => {
			const cell = new BaseCell(w)
			w.settleCell(cell, Point.Point(0,0))
			const pos = w.positionOf(cell)
			expect(
				pos.same(Point.Point(0,0))
			).toBeTruthy()
		})
		test('will throw an error if cell not from this world', () => {
			const anotherWorld = new World<IBaseCellFactory, IBaseCell>(cellFactory)
			const cell = new BaseCell(w)
			expect(() => {
				anotherWorld.positionOf(cell)
			}).toThrowError('Cell does not belong to this world')
		})

		test('will throw an error if cell does not settled', () => {
			const cell = new BaseCell()
			expect(() => {
				w.positionOf(cell)
			}).toThrowError('Cell is not attached to the world')
		})
	})
})