import { Square } from '../node_modules/chess.ts/src/types';
import { clear } from '../node_modules/chessground/draw';
import {setBoard, setPieces, canvasContainer} from './chessboard'
// import { canvasContainer, closeButton, squareMap, whitePieces, blackPieces, movePiece} from './chessboard'
import { nextChar } from './utils'


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
cube.addComponent(
  new OnPointerDown(() => {
    cube.getComponent(Transform).scale.z *= 1.1
    cube.getComponent(Transform).scale.x *= 0.9
    canvasContainer.visible = true;
    // chessBoard.visible = true;
    setBoard(true)
    setPieces(true)
  })
)

// closeButton.onClick = new OnPointerDown(() => {
//   // board = null
// })




