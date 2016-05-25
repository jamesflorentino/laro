> WARNING: This framework is currently under development.

# laro.js

Yet another Entity-Component-System game micro-framework in JavaScript. Only this time, written in ES6.

# About

I made this project out of need in my current project. I may or may not continue working on this depending on the outcome of said project.

# Basic Usaage

```javascript
// import the library
import laro from 'laro'
import StatsComponent from './components/StatsComponent'
import CharacterComponent from './components/CharacterComponent'
import CombatComponent from './components/CombatComponent'
import CombatSystem from './systems/CombatSystem'

// A world object ties the entities and systems together
let world = new laro.World()

// A system handles logic. The first parameter is the system instance and the
// second parameter is for its reuired dependencies
world.addSystem(new CombatSystem(), ['stats' , 'combat'])

// We register pre-defined components in our game world
world.addComponents([
  ['stats', StatsComponent],
  ['character', CharacterComponent],
  ['combat', CombatComponent]
])

// Creating an entity can be purely done from a .json file if wanted.
// This enables to loosely configure characters programmatically
// without hardcoding the configuration inside the actual game level code.
//
// ./data/entities/hero.json
// {
//   "stats": { "hp": 100, "atk": 100, "def": 30 }
//   "character": { "name": "Hitomi", "type": "hero"},
//   "player": true,
//   "combat": true
// }
//
// ./data/entities/monster.json
// {
//   "stats": { "hp": 100, "atk": 10, "def": 0 }
//   "character": { "name": "Bakemono", "type": "hero"},
//   "combat": true
// }
let hero = world.addEntity(require('./data/entities/hero.json'))
let monster = world.addEntity()

// You can expose and call functions of your component.
hero.components.combat.setTarget(monster)

// Updates are ticks that advances the frame of the game. All system logic
// are executed.
world.update(1)

console.log(monster.components.stats.attribute.health.isEmpty()) // => true
console.log(monster.components.character.name) // => Bakemono
console.log(monster.components.character.type) // => monster
```

# Acknowledgment

James Florentino

# License

MIT
