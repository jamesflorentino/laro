import Component from './Component'
import MutableClass from './MutableClass'
/**
 * @class System
 */

export default class System extends MutableClass {
  constructor() {
    super()
    this.isStandalone = false
    this.requiredComponents = []
  }

  start() {}

  require(classOrClassName) {
    if (classOrClassName.prototype instanceof Component) {
      classOrClassName = Component.getName(classOrClassName)
    }
    this.requiredComponents.push(classOrClassName)
    return this
  }

  /**
   * @property requiredComponents
   * @type {Array}
   */
  // requiredComponents: []

  /**
   * @method update
   */
  update( /** dt **/ ) {}
}
