import {Board} from './board'
import {Clock} from './clock'

import {squareMap, chessColor, PieceType, resizeFactor, ISquare, getSquareColor} from './utils'

let white_timer:number = 300
let black_timer:number = 300

class RotatorSystem {
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)

  update(dt: number) {
    // iterate over the entities of the group
    for (let entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 10)
    }
  }
}

//updates boards timer values
class TimerSystem {
  group = engine.getComponentGroup(Transform)
  update(dt: number) {
    board.chessgame.turn() == 'w' ? white_clock.timer -= dt : black_clock.timer -= dt
    board.chessgame.turn() == 'w' ? white_clock.updateTimer() : black_clock.updateTimer()
    if (white_clock.timer <= 0){
      // board.chessgame.gameOver()
    }
    else if(black_clock.timer <= 0){
      // board.chessgame.move('w', 'resign')
    }
  }
}


// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))

  // add a shape to the entity
  cube.addComponent(new BoxShape())

  // add the entity to the engine
  engine.addEntity(cube)

  return cube
}

const cube = spawnCube(8, 1, 8)
let board:Board
let white_clock:Clock
let black_clock:Clock
cube.addComponent(
  new OnPointerDown(() => {
    cube.getComponent(Transform).scale.z *= 1.1
    cube.getComponent(Transform).scale.x *= 0.9
    board = new Board()
    white_clock = new Clock('white', white_timer, board.canvas)
    black_clock = new Clock('black', white_timer, board.canvas)

    engine.addSystem(new TimerSystem())
  })
)




