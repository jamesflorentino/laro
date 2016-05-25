import System from '../System'

export default class CombatSystem extends System {
  constructor() {
    super()
  }

  update(entity, dt) {
    var { combat, stats } = entity.components

    if (!combat.target) { return }

    // this will ensure that we only perform hits on a scheduled basis
    combat.cooldown -= dt
    if (combat.cooldown > 0) {
      return
    }
    combat.cooldown = 1

    // get the atk and hp stats of the attacker and target respsectively
    var atk = stats.attribute.atk
    var hp = combat.target.components.stats.attribute.hp
    hp.reduce(atk)

    // if the target is dead, deactivate the combat module
    if (hp.isEmpty()) {
      combat.removeTarget()
    }
  }
}
