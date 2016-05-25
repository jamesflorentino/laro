import Signal from './Signal'
var id = 1

/**
 * @class Entity
 * @constructor
 */

export default class Entity {
  constructor() {
    this.id = id
    this.components = {}
    this.onAttachComponent = new Signal()
    this.onDetachComponent = new Signal()
    id++
  }

  /**
   * @method attack
   * @param {String} key name of the component
   */
  attach(key, component) {
    this.components[key] = component
    component.name = key
    component.activate()
    this.onAttachComponent.dispatch(this, component)
  }

  detach(key) {
    var component = this.components[key]
    if (!component) {
      return
    }

    // Dont remove only detach
    component.deactivate()
    // delete this.components[key]
    this.onDetachComponent.dispatch(this, component)
  }

  get(key) {
    return this.components[key]
  }
}
