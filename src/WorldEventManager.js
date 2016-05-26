import Signal from '../src/Signal'

export default class WorldEventManager {
  constructor() {
    this.onAttachComponent = new Signal()
    this.onAddEntity = new Signal()
  }
}
