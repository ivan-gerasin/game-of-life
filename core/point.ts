import {NullableNumber} from '../src/types'
import IPoint from './IPoint'

export default class Point implements IPoint {
  private readonly _x: NullableNumber = null
  private readonly _y: NullableNumber = null
  constructor(x?: number, y?: number) {
    if ('number' === typeof x && 'number' === typeof y) {
      this._x = x
      this._y = y
    }
  }

  static Point(x:number, y:number) {
    const strKey = Point._positionToStringKey(x,y)
    if (Point.__globalCache.has(strKey)) {
      return Point.__globalCache.get(strKey)
    }
    const point = new Point(x,y)
    Point.__globalCache.set(strKey, point)
    return point
  }

  static _positionToStringKey(x: number, y: number) {
    return `(${x};${y})`
  }

  static __globalCache = new Map()

  static EmptyPoint = new Point()

  get isEmpty() {
    return this._x === null || this._y === null
  }

  get x(): number {
    if (this.isEmpty) {
      throw new Error('Empty point has no position')
    }
    return this._x as number
  }

  get y(): number {
    if (this.isEmpty) {
      throw new Error('Empty point has no position')
    }
    return this._y as number
  }

  get top() {
    return new Point(this.x, this.y - 1)
  }

  get bottom() {
    return new Point(this.x, this.y + 1)
  }

  get left() {
    return new Point(this.x - 1, this.y)
  }

  get right() {
    return new Point(this.x + 1, this.y)
  }

  get topRight() {
    return new Point(this.x + 1, this.y - 1)
  }

  get topLeft() {
    return new Point(this.x - 1, this.y - 1)
  }

  get bottomLeft() {
    return new Point(this.x - 1, this.y + 1)
  }

  get bottomRight() {
    return new Point(this.x + 1, this.y + 1)
  }

  same(point: IPoint) {
    return this.x === point.x && this.y === point.y
  }

  toString() {
    if (this.isEmpty) {
      return `EmptyPoint`
    }
    return `Point(${this.x};${this.y})`
  }
}
