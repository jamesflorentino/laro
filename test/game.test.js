import {
  assert
} from 'chai'
import laro from '../laro'
import entities from './entities.json'

describe('game', () => {
  var world = new laro.World()
  world.fps = 1 / 1

  world.components.register([
    ['stats', laro.components.StatsComponent],
    ['input', laro.components.InputComponent],
    ['player', laro.components.PlayerComponent],
    ['combat', laro.components.CombatComponent],
    ['body', laro.components.BodyComponent],
    ['your_component', function() {}],
  ])

  it('can register systems', () => {
    world.addSystems([
      [new laro.systems.InputSystem(), ['player', 'input', 'body']],
      [new laro.systems.MoveSystem(), ['stats', 'body']],
      [new laro.systems.CombatSystem(), ['stats', 'combat']]
    ])
    assert.equal(world.systems.length, 3, 'systems added')
  })

  it('can create entities', () => {
    world.addEntity(entities.ship)
    world.addEntity(entities.ufo)
    assert.equal(world.entities.length, 2, 'entities added')
  })

  it('notifies when an entity is added', () => {
    var notified
    var data = { foo: 'yes' }
    world.events.onAddEntity.add(() => notified = true)
    world.addEntity(data)
    assert.equal(notified, true, 'it notifies')
  })

  it('notifies when a component is attached', () => {
    var notified
    world.events.onAttachComponent.add(() => notified = true)
    world.addEntity(entities.ship)
    assert.equal(notified, true, 'it notifies')
  })

  it('can run an update', () => {
    world.update(1)
  })

  it('has a combat system', () => {
    var a = world.entities[0]
    var b = world.entities[1]
    a.components.combat.setTarget(b, 1)
    assert.equal(a.components.combat.target, b, 'target is set')
  })

  it('allows entities to engage combat with another', () => {
    var a = world.entities[0]
    var b = world.entities[1]
    var atk = a.components.stats.attribute.atk
    var hp = b.components.stats.attribute.hp

    world.update(1)
    assert.equal(hp.current(), hp.max() - atk.current(), 'target hp is correct')
  })

  it('should not perform further combat update if target is dead', () => {
    var a = world.entities[0]
    var b = world.entities[1]
    var atk = a.components.stats.attribute.atk
    var hp = b.components.stats.attribute.hp

    world.update(atk.current())
    assert.equal(hp.current(), 0, 'should have zero hp')
    assert.isUndefined(a.components.combat.target, 'target is unset')
  })

  it('allows handling of input', () => {
    var key = 'player'
    var entity = world.entities.find((entity) => !!entity.get(key))
    entity.get('input').right.down = true
    world.update(1)
    assert.equal(entity.get('body').position.x, 1000)
  })

})
