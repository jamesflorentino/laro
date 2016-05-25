> WARNING: This framework is currently under development.

laro.js
==========

Yet another Entity-Component-System game micro-framework in JavaScript. Only this time, written in ES6.

About
=====

I made this project out of need in my current project. I may or may not continue working on this depending on the outcome of said project.

Example Code
============

```javascript
import laro from 'laro'

var forest = new laro.World()

forest.addSystem(new laro.systems.CombatSystem(), ['stats' , 'combat'])

var hero = forest.addEntity()
  .attach('stats', new StatsComponent({ hp: 100, atk: 100, def: 30 }))
  .attach('character', new CharacterComponent({ name: 'Hitomi', type: 'hero'}))

var monster = forest.addEntity()
  .attach('stats', new StatsComponent({ hp: 100, atk: 10, def: 0 }))
  .attach('character', new CharacterComponent({ name: 'Bakemono', type: 'monster'}))

hero.attach('combat', new laro.components.CombatComponent(monster)) // attach new components
world.update(1) // 1 second passed

console.log(monster.components.stats.attribute.health.isEmpty()) // => true
console.log(monster.components.character.name) // => Bakemono
console.log(monster.components.character.type) // => monster
```

Acknowledgment
==============

James Florentino

License
=======

MIT
