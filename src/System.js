import MutableClass from './MutableClass'
/**
 * @class System
 */

export default class System extends MutableClass {

  /**
   * @property requiredComponents
   * @type {Array}
   */
  // requiredComponents: []

  /**
   * @method update
   */
  update( /** dt **/ ) {}

  /**
   * @method isAcceptedEntity
   * @param {Entity} entity
   * @return {Boolean}
   */
  isAcceptedEntity(entity) {
    var required = this.requiredComponents
    if (!required) {
      return
    }
    var total = required.length
    if (!total) {
      return
    }
    for (var i = 0; i < total; i++) {
      if (!entity.get(required[i])) {
        return false
      }
    }
    return true
  }
}
