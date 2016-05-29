import Component from './Component'

/**
 * Stores Component classes
 * @class ComponentManager
 */
export default class ComponentManager {
  constructor() {
    /**
     * Dictionary of Component names
     * @property components
     * @type {Object}
     * @private
     * @internal
     */
    this.components = {}
  }

  /**
   * Registers a component class
   * @method register
   * @param {Array|Function} Component A Component subclass or an array of them
   * @chainable
   */
  register(component) {
    if (!component) {
      throw new Error('undefined component')
    }
    if (component instanceof Array) {
      component.forEach(this.add, this)
    } else if (component.prototype instanceof Component) {
      this.add(component)
    }

    return this
  }

  /**
   * Adds a Component class
   * @method add
   * @chainable
   */
  add(ComponentClass) {
    var name = Component.getName(ComponentClass)
    this.components[name] = ComponentClass
    return this
  }

  /**
   * Creates a new Component instance based on its key
   * @method create
   * @param {String} key key of the component
   * @param {Object} data data to pass to the component during initialization
   * @return {Component}
   */
  create(name, params) {
    var ComponentClass = this.components[name]
    if (!ComponentClass) { return }
    return new ComponentClass(params)
  }

  get(name) {
    return this.components[name]
  }
}
