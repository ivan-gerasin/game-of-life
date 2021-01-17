import {IWorld} from 'core/world'
import {ICell} from 'core/cell'
import {BaseCell, IBaseCell, IBaseCellFactory} from 'core/testsHelpers'
import {Point} from '../point'

describe('Cell', () => {

	let worldMock: IWorld<IBaseCellFactory, IBaseCell>, cell: ICell<IBaseCellFactory, IBaseCell>
	const cellPosition = Point.Point(0,0)

	beforeEach(() => {
		// @ts-ignore
		worldMock = {
			// @ts-ignore
			at: jest.fn(({x,y}) => ({x,y})),
			settleCell: jest.fn(),
			positionOf: jest.fn(() => cellPosition)
		}
		cell = new BaseCell(worldMock)
	})

	test('created with provided world attached', () => {
		const c = new BaseCell(worldMock)
		expect(c.world).toBe(worldMock)
	})

	test('if no world provided, will throw an error when trying to access to the world', () => {
		const c = new BaseCell()
		expect(() => {
			c.world
		}).toThrowError('Cell is not attached to the world')
	})

	test('position will call to world method positionOf', () => {
		const c = new BaseCell(worldMock)
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
})