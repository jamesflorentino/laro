import System from '../System'


/**
 * @class InputSystem
 * @extends System
 * @constructor
 */

export default class InputSystem extends System {
  update(entity) {
    var input = entity.get('input')
    var body = entity.get('body')
    if (input.right.down) {
      body.velocity.x = body.speed.x
    }
  }
}
