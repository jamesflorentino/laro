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
world.components.register([
  ['stats', StatsComponent],
  ['character', CharacterComponent],
  ['combat', CombatComponent]
])

/*
  A System object handles different kinds of logic.
 */
world.addSystem(new CombatSystem(), ['stats' , 'combat'])

/*
  Creating an entity can be configured from a .json file.

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

Design Patterns
===============

- Components are data. Extend `laro.Component` as your base class
- Systems are the logic. Extend `laro.System` as yoru base class
- Entities are just component containers with a basic API for attaching and detaching them.

Acknowledgment
==============

James Florentino

License
=======

MIT License
Copyright (c) 2016 James Florentino

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
