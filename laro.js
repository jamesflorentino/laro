export default {
  components: {
    BodyComponent: require('./src/components/BodyComponent').default,
    CombatComponent: require('./src/components/CombatComponent').default,
    InputComponent: require('./src/components/InputComponent').default,
    PlayerComponent: require('./src/components/PlayerComponent').default,
    StatsComponent: require('./src/components/StatsComponent').default,
  },

  systems: {
    CombatSystem: require('./src/systems/CombatSystem').default,
    InputSystem: require('./src/systems/InputSystem').default,
    MoveSystem: require('./src/systems/MoveSystem').default,
  },

  util: {
    eachKey: require('./src/util/eachKey').default,
    extend: require('./src/util/extend').default,
    findBy: require('./src/util/findBy').default,
    isFunction: require('./src/util/isFunction').default,
    isArray: require('./src/util/isArray').default,
    isObject: require('./src/util/isObject').default,
  },

  Component: require('./src/Component').default,
  Entity: require('./src/Entity').default,
  Point: require('./src/Point').default,
  Stat: require('./src/Stat').default,
  System: require('./src/System').default,
  World: require('./src/World').default,
}
