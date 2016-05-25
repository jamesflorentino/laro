import System from '../System'

export default class InputSystem extends System {
  update(entity) {
    var input = entity.get('input')
    var body = entity.get('body')
    if (input.right.down) {
      body.velocity.x = body.speed.x
    }
  }
}
