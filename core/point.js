class Point {
  #x
  #y
  constructor(x, y) {
    this.#x = x
    this.#y = y
  }

  static Point(x,y) {
    const strKey = Point._positionToStringKey(...arguments)
    if (Point.__globalCache.has(strKey)) {
      return Point.__globalCache.get(strKey)
    }
    const point = new Point(x,y)
    Point.__globalCache.set(strKey, point)
    return point
  }

  static _positionToStringKey(x,y) {
    return `(${x};${y})`
  }

  static __globalCache = new Map()

  static EmptyPoint = new Point(null, null)

  get isEmpty() {
    return this.#x === null || this.#y === null
  }

  get x() {
    if (this.isEmpty) {
      throw new Error('Empty point has no position')
    }
    return this.#x
  }

  get y() {
    if (this.isEmpty) {
      throw new Error('Empty point has no position')
    }
    return this.#y
  }

  get top() {
    return {x: this.x, y: this.y - 1}
  }

  get bottom() {
    return {x: this.x, y: this.y + 1}
  }

  get left() {
    return {x: this.x - 1, y: this.y}
  }

  get right() {
    return {x: this.x + 1, y: this.y}
  }

  get topRight() {
    return {x: this.x + 1, y: this.y - 1}
  }

  get topLeft() {
    return {x: this.x - 1, y: this.y - 1}
  }

  get bottomLeft() {
    return {x: this.x - 1, y: this.y + 1}
  }

  get bottomRight() {
    return {x: this.x + 1, y: this.y + 1}
  }

  same(point) {
    return this.x === point.x && this.y === point.y
  }

  toString() {
    if (this.isEmpty) {
      return `EmptyPoint`
    }
    return `Point(${this.x};${this.y})`
  }
}

module.exports = Point