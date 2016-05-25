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
