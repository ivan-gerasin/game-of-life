import Matrix from './Matrix'

describe('Matrix', () => {

	const data = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	]
	const matrix = new Matrix<number>(data)

	test('rotateCw - rotate clockwise', () => {
		const expected = [
			[7,4,1],
			[8,5,2],
			[9,6,3]
		]

		expect(matrix.rotateCw.data).toEqual(expected)
	})

	test('rotateCounterCw', () => {
		const expected = [
			[3,6,9],
			[2,5,8],
			[1,4,7]
		]

		expect(matrix.rotateCounterCw.data).toEqual(expected)
	})

	test('changing data passing in constructor does not affect values inside instance', () => {
		const originalVal = data[0][0]
		data[0][0] = 99
		expect(matrix.data[0][0]).toEqual(originalVal)
		expect(matrix.at(0,0)).toEqual(originalVal)
		data[0][0] = originalVal
	})

	test('changing output data wont change internal values', () => {
		const output = matrix.data
		const originalValue = output[0][0]
		output[0][0] = 99
		expect(data[0][0]).toEqual(originalValue)
		expect(matrix.data[0][0]).toEqual(originalValue)
	})
})