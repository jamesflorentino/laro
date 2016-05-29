import Component from '../Component'
import Stat from '../Stat'

/**
 * @class GunComponent
 * @extends Component
 * @constructor
 */

export default class GunComponent extends Component {
  init(options) {
    this.isShooting = false
    this.cooldown = new Stat(options.cooldown)
  }
}

