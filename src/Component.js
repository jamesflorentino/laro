/**
 * @class Component
 * @constructor
 * @param {Object} object attributes to pass to this component
 */

export default class Component {
  constructor(object) {
    for (var variable in object) {
      if (object.hasOwnProperty(variable)) {
        this[variable] = object[variable]
      }
    }
  }

  deactivate() {
    this.active = false
  }

  activate() {
    this.active = true
  }
}

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
    .replace(/^./, (str) => str.toLowerCase())
}
