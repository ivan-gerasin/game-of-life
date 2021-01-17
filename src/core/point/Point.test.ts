import Point from './Point'

describe('Point', function () {
	const x = 10
	const y = 20
	let p: Point

	beforeEach(() => {
		p = new Point(x, y)
	})

	test('return same position', () => {
		expect(p.x).toBe(x)
		expect(p.y).toBe(y)
	})

	test('position at top', () => {
		expect(p.top.x).toBe(x)
		expect(p.top.y).toBe(y - 1)
	})
	test('position at bottom', () => {
		expect(p.bottom.x).toBe(x)
		expect(p.bottom.y).toBe(y+1)
	})
	test('position at left', () => {
		expect(p.left.x).toBe(x-1)
		expect(p.left.y).toBe(y)
	})
	test('position at right', () => {
		expect(p.right.x).toBe(x+1)
		expect(p.left.y).toBe(y)
	})
	test('position at top right', () => {
		expect(p.topRight.x).toBe(x+1)
		expect(p.topRight.y).toBe(y-1)
	})
	test('position at top left', () => {
		expect(p.topLeft.x).toBe(x-1)
		expect(p.topLeft.y).toBe(y-1)
	})
	test('position at bottom right', () => {
		expect(p.bottomRight.x).toBe(x+1)
		expect(p.bottomRight.y).toBe(y+1)
	})
	test('position at bottom left', () => {
		expect(p.bottomLeft.x).toBe(x-1)
		expect(p.bottomRight.y).toBe(y+1)
	})
})