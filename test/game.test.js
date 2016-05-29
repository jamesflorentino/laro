import {
  assert
} from 'chai'
import laro from '../laro'
import entities from './entities.json'

describe('An example game world', () => {
  var world = new laro.World()
  world.fps = 1 / 1

  it('can register component classes', () => {
    world.components
      .register(laro.components.StatsComponent)
      .register(laro.components.InputComponent)
      .register(laro.components.PlayerComponent)
      .register(laro.components.CombatComponent)
      .register(laro.components.BodyComponent)
  })

  it('can register systems', () => {
    world
      .register(new laro.systems.InputSystem(), [
        laro.components.PlayerComponent,
        laro.components.InputComponent,
        laro.components.BodyComponent
      ])
      .register(new laro.systems.MoveSystem(), [
        laro.components.StatsComponent,
        laro.components.BodyComponent
      ])
      .register(new laro.systems.CombatSystem(), [
        laro.components.StatsComponent,
        laro.components.CombatComponent
      ])

    assert.equal(world.systems.length, 3, 'systems added')
    assert.equal(world.systems[0].requiredComponents.length, 3)
    assert.equal(world.systems[1].requiredComponents.length, 2)
    assert.equal(world.systems[2].requiredComponents.length, 2)
  })

  it('can create entities', () => {
    world.add(entities.ship)
    world.add(entities.ufo)
    assert.equal(world.entities.length, 2, 'entities added')
  })

  it('notifies when an entity is added', () => {
    var notified
    var data = {
      foo: 'yes'
    }
    world.events.onAddEntity.add(() => notified = true)
    world.add(data)
    assert.equal(notified, true, 'it notifies')
  })

  it('notifies when a component is attached', () => {
    var notified
    world.events.onAttachComponent.add(() => notified = true)
    world.createEntity(entities.ship)
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
