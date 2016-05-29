import ComponentManager from './ComponentManager'
import Entity from './Entity'
import WorldEventManager from './WorldEventManager'
import Component from './Component'

/**
 * @class World
 * @constructor
 */

export default class World {
  constructor() {

    /**
     * @property entities
     * @type {Array}
     */

    this.entities = []

    this._entities = {}

    /**
     * list of registered systems
     * @property systems
     * @type {Array}
     * @internal
     */

    this.systems = []

    /**
     * For managing components
     * @property components
     * @type {ComponentManager}
     */

    this.components = new ComponentManager()

    /**
     * Timestamp of the last update
     * @property lastUpdate
     * @type {Number}
     */

    this.lastUpdate = Date.now()

    /**
     * Ticks per second
     * @property fps
     * @type {Number}
     */

    this.fps = 1 / 30

    /**
     * A container for managing world events
     * @property events
     * @type {WorldEventManager}
     */

    this.events = new WorldEventManager()

    this.systemsToEntities = {}
    this._entitiesToSystems = {}
    this._systems = {}

  }

  get(id) {
    return this._entities[id]
  }

  remove(entity) {
    // remove all references
    this.entities.splice(this.entities.indexOf(entity), 1)
    var systems = this._entitiesToSystems[entity.id]
    systems.forEach(system => {
      var entities = this.systemsToEntities[system.constructor.name]
      entities.splice(entities.indexOf(entity), 1)
    })
    delete this._entitiesToSystems[entity.id]
    this.events.onRemoveEntity.dispatch(entity)
  }

  add(json) {
    var entity = json instanceof Entity ? json : this.createEntity(json)
    this._entitiesToSystems[entity.id] = []
    this._entities[entity.id] = entity
    this.entities.push(entity)
    this.events.onAddEntity.dispatch(entity, json)
    this.registerEntitytoSystems(entity)
    entity.onAttachComponent.add(this.onAttachComponent, this)
    return entity
  }

  /**
   * @method createEntity
   * @param {Object} json configuration for this entitiy
   * @return {Entity}
   */

  createEntity(json) {
    var entity = new Entity()

    for (var key in json) {
      var value = json[key]
      this.events.onReadEntityProperty.dispatch(entity, key, value)
      var component = this.components.create(key, value)

      if (component) {
        entity.attach(component)
        this.events.onAttachComponent.dispatch(entity, component)
      }
    }
    
    return entity
  }


  onAttachComponent(entity) {
    this.registerEntitytoSystems(entity)
  }

  registerEntitytoSystems(entity) {
    this.systems.forEach((system) => {
      for (var i = 0; i < system.requiredComponents.length; i++) {
        var name = system.requiredComponents[i]
        if (!entity.get(name)) {
          return
        }
      }

      if (system.requiredComponents.length > 0) {
        var systemEntities = this.systemsToEntities[system.constructor.name]
        if (systemEntities.indexOf(entity) > -1) {
          return
        }
        systemEntities.push(entity)
        this._entitiesToSystems[entity.id].push(system)
      }
    })
  }

  /**
   * @method addEntities
   * @param {Array} entities Array of json data
   */
  addEntities(array) {
    return array.map((ison) => this.createEntity(ison))
  }

  /**
   * @method register
   * @param  {System} system
   * @param  {Array} requiredComponentClasses
   * @chainable
   */
  register(system, requiredComponentClasses) {
    this.addSystem(system, requiredComponentClasses)
    return this
  }

  /**
   * @method addSystems
   * @param {Array} systems Array of systems
   * @chainable
   */

  addSystems(array) {
    array.forEach((arr) => this.addSystem(arr[0], arr[1]))
    return this
  }

  /**
   * @method addSystem
   * @param {System} system System to register
   * @param {Array} [requiredComponents] Explicit required components by name
   */

  addSystem(system, requiredComponents) {
    if (requiredComponents instanceof Array) {
      requiredComponents = requiredComponents.map((c) => {
        var isComponentClass = c.prototype instanceof Component
        if (isComponentClass) {
          this.components.add(c)
        }
        return isComponentClass ? Component.getName(c) : c
      })
    }
    system.world = this
    if (requiredComponents) {
      system.requiredComponents = requiredComponents
    }
    this.systems.push(system)
    this.systemsToEntities[system.constructor.name] = []
    this._systems[system.constructor.name] = system
    return this
  }

  getSystem(SystemClass) {
    if ('function' !== typeof SystemClass) {
      throw new Error(`must be a system class`)
    }
    return this._systems[SystemClass.name]
  }

  /**
   * @method update
   * @param {Number} elapsed elapsed time since last update
   */

  update(elapsed) {
    var fps = this.fps
    elapsed = elapsed || fps
    while (elapsed > 0) {
      var frameTime = elapsed > fps ? fps : elapsed
      for (var i = 0, len = this.systems.length; i < len; i++) {
        this.updateSystem(this.systems[i], frameTime)
      }
      elapsed -= fps
    }
  }

  /**
   * @method updateSystem
   * @param {System} system
   * @param {Number} deltaTime
   * @private
   */

  updateSystem(system, frameTime) {
    var entities = this.systemsToEntities[system.constructor.name]
    if (system.isStandalone) {
      return system.update(null, frameTime)
    }

    for(var i = 0; i < entities.length; i++) {
      var entity = entities[i]
      system.update(entity, frameTime)
    }
  }
}
