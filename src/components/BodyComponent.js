import Component from '../Component'
import Point from '../Point'
import isObject from '../util/isObject'

export default class BodyComponent extends Component {
  constructor(options) {
    super(options)
    this.velocity = new Point()
    this.position = new Point()
    this.speed = new Point()

    if (options) {
      if (isObject(options.velocity)) {
        this.velocity.set(options.velocity.x, options.velocity.y)
      }
      if (isObject(options.position)) {
        this.position.set(options.position.x, options.position.y)
      }
      if (isObject(options.speed)) {
        this.speed.set(options.speed.x, options.speed.y)
      }
    }
  }
}
