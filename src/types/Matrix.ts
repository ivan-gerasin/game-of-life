interface IMatrix<T> {

  at: (x: number, y: number) => T
  // equal: (m: IMatrix<T>) => boolean

  // readonly height: number
  // readonly width: number
  readonly data: T[][]
  readonly rotateCw: Matrix<T>
  readonly rotateCounterCw: Matrix<T>
  // readonly mirrorVertical: Matrix<T>
  // readonly mirrorHorizontal: Matrix<T>
}

export default class Matrix<T> implements IMatrix<T>{
  private readonly _data: T[][]

  private clone(d: T[][]): T[][] {
    const _d: T[][] = []
    d.forEach((row, index) => {
      _d[index] = row.concat()
    })
    return _d
  }

  constructor(data: T[][]) {
    this._data = this.clone(data)
  }
  get rotateCw(): Matrix<T> {
    const data = this._data
    const newData = []
    for (let x = 0; x < data.length ; x++) {
      const row: T[] = data[x]
      const newRow: T[] = []
      newData[x] = newRow
      for (let y = 0; y < row.length ; y++) {
        newRow[y] = data[row.length - y - 1][x]
      }
    }
    return new Matrix<T>(newData)
  }

  get rotateCounterCw(): Matrix<T> {
    const data = this._data
    const newData = []
    for (let x = 0; x < data.length ; x++) {
      const row: T[] = data[x]
      const newRow: T[] = []
      newData[x] = newRow
      for (let y = 0; y < row.length ; y++) {
        newRow[y] = data[y][row.length - x - 1]
      }
    }
    return new Matrix<T>(newData)
  }

  get data() {
    return this.clone(this._data)
  }

  at(x: number, y: number): T {
    return this._data[x][y]
  }
}