import Component from './Component'

export default class ComponentManager {
  constructor() {
    this.components = {}
  }

  register(component) {
    if (component instanceof Array) {
      component.forEach(this.add, this)
    } else if (component.prototype instanceof Component) {
      this.add(component)
    }

    return this
  }

  add(ComponentClass) {
    var name = Component.getName(ComponentClass)
    this.components[name] = ComponentClass
  }

  create(name, params) {
    var ComponentClass = this.components[name]
    if (!ComponentClass) { return }
    return new ComponentClass(params)
  }
}
