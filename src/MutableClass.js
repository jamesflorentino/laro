import extend from './util/extend'

export default class MutableClass {
  constructor(options) {
    extend(this, options)
    this.init(options)
  }

  init() {
  }
}
