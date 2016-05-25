export default class Signal {
  constructor() {
    this.events = []
  }

  add(fn, ctx) {
    if ('function' === typeof fn) {
      this.events.push([fn, ctx])
    }
  }

  dispatch() {
    for (var i = 0, len = this.events.length; i < len; i++) {
      var arr = this.events[i]
      var fn = arr[0]
      var ctx = arr[1]
      fn.apply(ctx, arguments)
    }
  }
}
