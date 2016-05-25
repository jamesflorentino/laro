import Component from '../Component'

export default class CombatComponent extends Component {
  setTarget(target, cooldown) {
    if (target) {
      var stats = target.components.stats
      if (stats && stats.attribute.hp) {
        this.target = target
        this.cooldown = cooldown || 1
        this.activate()
      }
    }
  }

  removeTarget() {
    delete this.target
    this.deactivate()
  }
}
