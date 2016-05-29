import Component from '../Component'
import Stat from '../Stat'


/**
 * @class StatsComponent
 * @extends Component
 * @constructor
 */

export default class StatsComponent extends Component {
  constructor(options) {
    super()
    this.attribute = {}
    this.parse(options)
  }

  parse(options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        this.attribute[key] = new Stat(options[key])
      }
    }
  }

  get(name) {
    return this.attribute[name]
  }
}
