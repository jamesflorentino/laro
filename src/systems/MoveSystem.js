import System from '../System'

export default class MoveSystem extends System {
  update(entity, dt) {
    var position = entity.get('body').position
    var velocity = entity.get('body').velocity
    position.lerp(velocity, dt)
  }
}
