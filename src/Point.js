/**
 * @class Point
 * @constructor
 * @param {Number} x
 * @param {Number} y
 */

export default class Point {
  constructor(x, y) {
    /**
     * @property x
     * @type {Number}
     */
    this.x = 'number' === typeof x ? x : 0

    /**
     * @property y
     * @type {Number}
     */
    this.y = 'number' === typeof y ? y : 0
  }

  /**
   * @method set
   * @param {Number} x
   * @param {Number} y
   */
  set(x, y) {
    if ('number' !== typeof x) { return }
    this.x = x || 0
    this.y = 'number' === typeof y ? y : x
  }

  /**
   * @method add
   * @param {Poiunt} point
   */
  add(point) {
    if (!(point instanceof Point)) {
      throw new Error('must be an instance of Point')
    }
    this.x += point.x
    this.y += point.y
  }

  /**
   * Linear interplation
   * @method lerp
   * @param {Point} point
   * @param {Number} delta delta time elapsed
   */
  lerp(point, dt) {
    if (!(point instanceof Point)) {
      throw new Error('must be an instance of Point')
    }
    if ('number' !== typeof dt) {
      throw new Error('must be a number')
    }
    this.x += point.x * dt
    this.y += point.y * dt
  }

  distance(point) {
    var distX = point.x - this.x
    var distY = point.y - this.y
    return Math.sqrt(distX * distX + distY * distY)
  }
}
