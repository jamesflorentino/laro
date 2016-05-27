import ComponentManager from './ComponentManager'
import Entity from './Entity'
import eachKey from './util/eachKey'
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

    /**
     * Dictionary of registered entities
     * @property _entities
     * @type {Object}
     * @private
     * @internal
     */

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
     * Hash of entities to components relationships
     * @property entitiesToComponents
     * @type {Object}
     * @private
     * @internal
     */

    this.entitiesToComponents = {}

    /**
     * Hash of components to entities relationships
     * @property componentsToEntities
     * @type {Object}
     * @private
     * @internal
     */

    this.componentsToEntities = {}

    /**
     * A container for managing world events
     * @property events
     * @type {WorldEventManager}
     */

    this.events = new WorldEventManager()

  }

  /**
   * Adds an entity to the game world. It dispatches `events.onAttachComponent`
   * and `events.onAddEntity` signals.
   *
   * @method addEntity
   * @param {Object} json configuration for this entitiy
   * @return {Entity}
   */

  addEntity(json) {
    var entity = new Entity()
    entity.onAttachComponent.add(this.onAttachComponent, this)
    entity.onDetachComponent.add(this.onDetachComponent, this)
    this.entitiesToComponents[entity.id] = {}
    this.entities.push(this._entities[entity.id] = entity)
    eachKey(json, (key, value) => {
      this.events.onReadEntityProperty.dispatch(entity, key, value)
      var component = this.components.create(key, value)
      if (component) {
        entity.attach(component)
        this.events.onAttachComponent.dispatch(entity, component)
      }
    })
    this.events.onAddEntity.dispatch(entity, json)
    return entity
  }

  /**
   * When a component is attached
   * @event onAttachComponent
   * @param {Entity} entity
   * @param {Component} component
   */

  onAttachComponent(entity, component) {
    if (component instanceof Component) {
      var name = Component.getName(component)
      this.entitiesToComponents[entity.id][name] = component
      if (!this.componentsToEntities[name]) {
        this.componentsToEntities[name] = {}
      }
      this.componentsToEntities[name][entity.id] = component
    }
  }


  /**
   * When a component is detached
   * @event onDetachComponent
   * @param {Entity} entity
   * @param {Component} component
   */

  onDetachComponent(entity, component) {
    delete this.entitiesToComponents[entity.id][component.name]
    delete this.componentsToEntities[component.name][entity.id]
  }

  /**
   * @method addEntities
   * @param {Array} entities Array of json data
   */
  addEntities(array) {
    return array.map((ison) => this.addEntity(ison))
  }

  /**
   * @method register
   * @param  {System} SystemClass
   * @param  {Array} requiredComponentClasses
   * @chainable
   */
  register(SystemClass, requiredComponentClasses) {
    this.addSystem(new SystemClass(), requiredComponentClasses)
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
   * description of this method
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
    system.requiredComponents = requiredComponents || system.requiredComponents || []
    system.requiredComponents.forEach((name) => {
      if (!this.componentsToEntities[name]) {
        this.componentsToEntities[name] = {}
      }
    })
    this.systems.push(system)
    return this
  }

  /**
   * @method update
   * @param {Number} elapsed elapsed time since last update
   */

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

  /**
   * @method applySystems
   * @param {Entity} entity
   * @param {Number} elapsed time since last update
   */

  applySystems(entity, frameTime) {
    for (var i = 0, len = this.systems.length; i < len; i++) {
      var system = this.systems[i]
      this.applySystem(system, entity, frameTime)
    }
  }

  /**
   * @method applySystem
   * @param {System} system
   * @param {Entity} entity
   * @param {Number} elapsed
   */

  applySystem(system, entity, frameTime) {
    for (var i = 0, len = system.requiredComponents.length; i < len; i++) {
      var name = system.requiredComponents[i]
      var component = this.componentsToEntities[name][entity.id]
      if (!component || !component.active) {
        return
      }
    }
    if (len) {
      system.update(entity, frameTime)
    }
  }
}
