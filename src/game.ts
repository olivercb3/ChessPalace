import { Chess } from '../node_modules/chess.ts/src/chess'
import {Chessground} from '../node_modules/chessground/src/chessground'

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

/// --- Spawn a cube ---

const cube = spawnCube(8, 1, 8)

cube.addComponent(
  new OnPointerDown(() => {
    cube.getComponent(Transform).scale.z *= 1.1
    cube.getComponent(Transform).scale.x *= 0.9
  
    // spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
    displayCanvas()
  })
)

//displays a cavas with a chessboard
function displayCanvas(){
  const canvas = new UICanvas()

  const canvasContainer = new UIContainerStack(canvas) //declare parent element
  // canvasContainer.adaptWidth = true
  canvasContainer.width = "70%"
  canvasContainer.height = "100%"
  canvasContainer.opacity = 0.90
  canvasContainer.color = Color4.Gray() //set background-color

  const chessBoard = new UIImage(canvas, new Texture("chess-board.png"))
  chessBoard.width = "50%"
  chessBoard.height = "100%"


  const close = new UIImage(canvas, new Texture("icon.png"))
  close.name = "clickable-image"
  close.width = "120px"
  close.height = "30px"
  close.sourceWidth = 92
  close.sourceHeight = 91
  close.vAlign = "bottom"
  close.isPointerBlocker = true
  close.onClick = new OnPointerDown(() => {
    log("clicked on the close image")
    canvas.visible = false
    canvas.isPointerBlocker = false
  })
  const text = new UIText(canvas)
  const chess = new Chess()
  // new UI
  // const config = {};
  // const ground = Chessground(text.value, config);
  // Create a textShape component, setting the canvas as parent
  if (!chess.gameOver()){
    text.value = "<script>alert('')</script>"
  }
}
