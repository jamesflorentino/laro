import Entity from '../src/Entity'
import eachKey from '../src/util/eachKey'

export default class World {
  constructor() {
    this.entities = []
    this._entities = {}
    this.systems = []
    this.components = {}
    this.lastUpdate = Date.now()
    this.pool = {}
    this.fps = 1/30

    this.entitiesToComponents = {}
    this.componentsToEntities = {}
  }

  addEntity(json) {
    var entity = new Entity()
    entity.onAttachComponent.add(this.onAttachComponent, this)
    entity.onDetachComponent.add(this.onDetachComponent, this)
    this.entitiesToComponents[entity.id] = {}
    this.entities.push(this._entities[entity.id] = entity)
    eachKey(json, (key, value) => {
      var ComponentClass = this.components[key]
      if (ComponentClass) {
        entity.attach(key, new ComponentClass(value))
      }
    })
    return entity
  }

  onAttachComponent(entity, component) {
    if (component && component.name) {
      this.entitiesToComponents[entity.id][component.name] = component
      if (!this.componentsToEntities[component.name]) {
        this.componentsToEntities[component.name] = {}
      }
      this.componentsToEntities[component.name][entity.id] = component
    }
  }

  onDetachComponent(entity, component) {
    delete this.entitiesToComponents[entity.id][component.name]
    delete this.componentsToEntities[component.name][entity.id]
  }

  addEntities(array) {
    array.forEach((ison) => this.addEntity(ison))
    return this
  }

  addComponent(name, ComponentClass) {
    this.components[name] = ComponentClass
    return this
  }

  addComponents(array) {
    array.forEach((arr) => this.addComponent(arr[0], arr[1]))
    return this
  }

  addSystems(array) {
    array.forEach((arr) => this.addSystem(arr[0], arr[1]))
    return this
  }

  addSystem(system, requiredComponents) {
    system.requiredComponents = requiredComponents || system.requiredComponents || []
    this.systems.push(system)
    system.requiredComponents.forEach((name) => {
      if (!this.componentsToEntities[name]) {
        this.componentsToEntities[name] = {}
      }
    })
    return this
  }

  update(elapsed) {
    var fps = this.fps
    while (elapsed > 0) {
      var frameTime = elapsed > fps ? fps : elapsed
      for (var i = 0; i < this.entities.length; i++) {
        var entity = this.entities[i]
        this.applySystems(entity, frameTime)
      }
      elapsed -= fps
    }
  }

  applySystems(entity, frameTime) {
    for (var i = 0, len = this.systems.length; i < len; i++) {
      var system = this.systems[i]
      this.applySystem(system, entity, frameTime)
    }
  }

  applySystem(system, entity, frameTime) {
    for (var i = 0, len = system.requiredComponents.length; i < len; i++) {
      var component = this.componentsToEntities[system.requiredComponents[i]][entity.id]
      if (!component || !component.active) {
        // console.log(this.componentsToEntities[system.requiredComponents[i]]);
        return
      }
    }
    if (len) {
      system.update(entity, frameTime)
    }
  }
}
