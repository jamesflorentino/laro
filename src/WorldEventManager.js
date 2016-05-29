import Signal from '../src/Signal'

/**
 * @class WorldEventManager
 */
export default class WorldEventManager {
  constructor() {
    /**
     * @property onAttachComponent
     * @type {Signal}
     */

    this.onAttachComponent = new Signal()

    /**
     * @property onAddEntity
     * @type {Signal}
     */

    this.onAddEntity = new Signal()


    /**
     * @property onRemoveEntity
     * @type {Signal}
     */

    this.onRemoveEntity = new Signal()

    /**
     * @property onReadEntityProperty
     * @type {Signal}
     */

    this.onReadEntityProperty = new Signal()
  }
}
