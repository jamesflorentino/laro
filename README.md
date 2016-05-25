> WARNING: This framework is currently under development.

# laro.js

Yet another Entity-Component-System game micro-framework in JavaScript. Only
this time, written in ES6. It also auto-generates a documentation page of your
code if you write them in jsdoc syntax in your actual code.

Goals
=====

- To provide a sustainable design pattern for writing large, complex and ambitious HTML5 JavaScript games
- To be easy to integrate with other JavaScript frameworks.
- To provide a deterministic architecture that can be used for server-side logic

Installation
============

- `npm install laro --save`

Basic Usaage
============

```javascript
import laro from 'laro'
import StatsComponent from './components/StatsComponent'
import CharacterComponent from './components/CharacterComponent'
import CombatComponent from './components/CombatComponent'
import CombatSystem from './systems/CombatSystem'

/*
  A world object ties the entities and systems together
 */
let world = new laro.World()

/*
  We register pre-defined component classes in our game world to be instantiated
  and used later by generated entities.
 */
world.addComponents([
  ['stats', StatsComponent],
  ['character', CharacterComponent],
  ['combat', CombatComponent]
])

/*
  A System object handles different kinds of logic. The second argument
  is the required components
 */
world.addSystem(new CombatSystem(), ['stats' , 'combat'])


/*
  Creating an entity can be purely done from a .json file if wanted.
  This enables to loosely configure characters programmatically
  without hardcoding the configuration inside the actual game level code.

  file: ./data/entities/hero.json

  {
    "stats": { "hp": 100, "atk": 100, "def": 30 }
    "character": { "name": "Hitomi", "type": "hero"},
    "player": true,
    "combat": true
  }

  file: ./data/entities/monster.json

  {
    "stats": { "hp": 100, "atk": 10, "def": 0 }
    "character": { "name": "Bakemono", "type": "hero"},
    "combat": true
  }
 */
let hero = world.addEntity(require('./data/entities/hero.json'))
let monster = world.addEntity(require('./data/entities/monster.json'))

/*
  You can expose and call functions of your component.
 */
hero.components.combat.setTarget(monster)

/*
  Updates are ticks that advances the frame of the game. All system logic
  are executed.
 */
world.update(1)

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
