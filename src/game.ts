import { Chess } from '../node_modules/chess.ts/src/chess'
import {Chessground} from '../node_modules/chessground/src/chessground'
import { canvasContainer, chessBoard, closeButton, whiteKing, blackKing, whiteKnights, blackKnights, whitePawns, blackPawns, whiteRooks, blackRooks, whiteBishops, blackBishops, whiteQueen, blackQueen, squareMap} from './chessboard'

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
    chessBoard.visible = true;
    setBoardVisibility(true)
  })
)

closeButton.onClick = new OnPointerDown(() => {
  setBoardVisibility(false)
})

const chess = new Chess()

//sets all the canvas elements visibility to type's value
function setBoardVisibility(type: boolean){
  canvasContainer.visible = type;
  chessBoard.visible = type;
  closeButton.visible = type;
  whiteKing.visible = type;
  blackKing.visible = type;
  whiteQueen.visible = type;
  blackQueen.visible = type;
  whitePawns.forEach( (element) => {
    element.visible = type
  });
  blackPawns.forEach( (element) => {
    element.visible = type
  });
  whiteKnights.forEach((element) => {
    element.visible = type
  });
  blackKnights.forEach((element) =>{
    element.visible = type
  })

  whiteBishops.forEach((element) =>{
    element.visible = type
  })

  blackBishops.forEach((element) =>{
    element.visible = type
  })

  whiteRooks.forEach((element) =>{
    element.visible = type
  })

  blackRooks.forEach((element) =>{
    element.visible = type
  })
}

