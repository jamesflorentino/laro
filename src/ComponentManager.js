export default class ComponentManager {
  constructor() {
    this.components = {}
  }

  register(array) {
    array.forEach((record) => {
      this.add(record[0], record[1])
    }, this)
  }

  add(name, ComponentClass) {
    this.components[name] = ComponentClass
  }

  create(name, params) {
    var ComponentClass = this.components[name]
    if (!ComponentClass) { return }
    return new ComponentClass(params)
  }
}
