/**
 * A signal is an event dispatcher
 * @class Signal
 */
export default class Signal {
  constructor() {
    /**
     * This list of events
     * @property events
     * @type {Array}
     * @private
     * @internal
     */
    this.events = []
  }

  /**
   * @method add
   * @param {Function} callback
   * @param {Object} context
   */
  add(fn, ctx) {
    if ('function' === typeof fn) {
      this.events.push([fn, ctx])
    }
  }

  /**
   * @method dispatch
   * @param {Object} [options]
   */
  dispatch() {
    for (var i = 0, len = this.events.length; i < len; i++) {
      var arr = this.events[i]
      var fn = arr[0]
      var ctx = arr[1]
      fn.apply(ctx, arguments)
    }
  }
}
