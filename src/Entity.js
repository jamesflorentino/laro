import Signal from './Signal'
import Component from './Component'

var id = 1

/**
 * @class Entity
 * @constructor
 */

export default class Entity {
  constructor() {
    /**
     * ID of the component
     * @property id
     * @type {String}
     */
    this.id = id

    /**
     * Container of all the attached components
     * @property components
     * @type {Object}
     * @internal
     */
    this.components = {}

    /**
     * Dispatches whne a component is attached
     * @property onAttachComponent
     * @type {Signal}
     */
    this.onAttachComponent = new Signal()

    /**
     * Dispatches when a component is detached
     * @property onDetachComponent
     * @type {Signal}
     */
    this.onDetachComponent = new Signal()
    id++
  }

  /**
   * @method attach
   * @param {Component} component
   * @chainable
   */
  attach(component) {
    var key = Component.getName(component)
    this.components[key] = component
    component.activate()
    this.onAttachComponent.dispatch(this, component)
    return
  }

  /**
   * @method detach
   * @param {String} key
   * @chainable
   */
  detach(key) {
    var component = this.components[key]
    if (!component) {
      return
    }

    // Dont remove only detach
    component.deactivate()
    this.onDetachComponent.dispatch(this, component)
    return this
  }

  /**
   * @method get
   * @param {String} key
   * @return Component
   */
  get(key) {
    return this.components[key]
  }
}
