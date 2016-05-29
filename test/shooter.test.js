import { assert } from 'chai'
import laro from '../laro'

class GunComponent extends laro.Component {
  init(options) {
    this.cooldown = new laro.Stat(options.cooldown)
  }

  start() {
    if (this.isShooting) {
      return
    }

    this.isShooting = true
    this.cooldown.reset()
  }

  stop() {
    this.isShooting = false
  }
}

class BulletComponent extends laro.Component {
  constructor() {
    super()
    this.life = 1
  }
}

class ShootingSystem extends laro.System {
  constructor(world) {
    super()
    this.world = world
    this.require(GunComponent)
  }

  update(entity, dt) {
    var gun = entity.get('gun')
    if (!gun.isShooting) {
      return
    }
    if (!gun.cooldown.isEmpty()) {
      return gun.cooldown.reduce(dt)
    }
    gun.cooldown.reset()
    var e = this.world.add({ bullet: true })
  }
}


class BulletSystem extends laro.System {
  constructor(world) {
    super()
    this.world = world
    this.require(BulletComponent)
  }

  update(entity, dt) {
    var bullet = entity.get('bullet')
    bullet.life -= dt
    if (bullet.life <= 0) {
      this.world.remove(entity)
      return
    }
  }
}

describe('Space shooter', () => {
  var world;
  it('has a world', () => {
    world = new laro.World()
    world.fps = 1
    assert.isDefined(world)
  })

  it('has systems in place', () => {
    world
      .register(new BulletSystem(world))
      .register(new ShootingSystem(world))
  })

  it('has registered components', () => {
    world.components
      .register(GunComponent)
      .register(BulletComponent)

    assert.isDefined(world.components.get('gun'))
  })

  it('has a ship', () => {
    var entity = world.add({
      name: 'Ship',
      gun: { damage: 100, speed: 100, count: 10, cooldown: 1 }
    })
    assert.equal(world.entities.length, 1)
    assert.isDefined(entity.components.gun)
  })

  it('creates a bullet entity when ship shoots', () => {
    var ship = world.entities[0]
    ship.components.gun.start()
    world.update(2)
    assert.equal(world.entities.length, 2)
    ship.components.gun.stop()
    world.update(1)
    assert.equal(world.entities.length, 1)
  })
})
