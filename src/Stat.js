/**
 * @class Stat
 * @constructor
 * @param {Number} min
 * @param {Number} max
 */

export default class Stat {
  constructor(min, max) {
    if ('number' !== typeof max) {
      max = min
      min = 0
    }
    this._min = min
    this._max = max
    this._current = max
  }

  /**
   * @method min
   * @return {Number}
   */

  min() {
    return this._min
  }


  /**
   * @method max
   * @return {Number}
   */

  max() {
    return this._max
  }

  /**
   * @method current
   * @return {Number}
   */

  current() {
    return this._current
  }

  /**
   * @method reduce
   * @param {Stat|Number} stat stat instance or number
   * @chainable
   */

  reduce(stat) {
    if (stat instanceof Stat) {
      stat = stat.current()
    }
    this._current = Math.max(this._min, this.current() - stat)
    return this
  }

  /**
   * @method empty
   * @return {Boolean}
   */

  isEmpty() {
    return this.current() === this.min()
  }
}
