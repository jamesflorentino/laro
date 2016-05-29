import MutableClass from './MutableClass'
/**
 * @class Component
 * @extends MutableClass
 * @constructor
 * @param {Object} object attributes to pass to this component
 */

export default class Component extends MutableClass {

  /**
   * @property active
   * @type {Boolean}
   */

  /**
   * @method deactivate
   */
  deactivate() {
    this.active = false
  }

  /**
   * @method activate
   */
  activate() {
    this.active = true
  }
}

/**
 * @method getName
 * @param {Function|String} ComponentClass
 * @static
 */
Component.getName = (component) => {
  var name
  if ('function' === typeof component) {
    name = component.name
  } else if ('object' === typeof component && 'function' === typeof component.constructor) {
    name = component.constructor.name
  } else {
    return
  }
  return name
    .replace('Component', '')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase()
    //.replace(/^./, (str) => str.toLowerCase())
}
