import extend from './util/extend'

/**
 * The Base class
 * @class MutableClass
 * @constructor
 * @param {Object} options
 */
export default class MutableClass {
  constructor(options) {
    extend(this, options)
    this.init(options)
  }

  /**
   * Fired during initialization
   * @event init
   */
  init() {
  }
}
