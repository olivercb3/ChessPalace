import { Chess } from '../node_modules/chess.ts/src/chess'
import { Square } from '../node_modules/chess.ts/src/types';
import {movementSquare, ISquare, board, getSquare} from './chessboard'
import { canvasContainer, closeButton, whiteKing, blackKing, whiteKnights, blackKnights, whitePawns, blackPawns, whiteRooks, blackRooks, whiteBishops, blackBishops, whiteQueen, blackQueen, squareMap} from './chessboard'

import { nextChar } from './utils'
// import * as dom from '../node_modules/dts-dom/lib/index';

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

closeButton.onClick = new OnPointerDown(() => {
  // board = null
})

const chess = new Chess()


function setBoard(type: boolean){
  let boardDisplayed: boolean = false
  let square:string = 'a1' 
  while (!boardDisplayed){
      board[square].visible = true  //set the square visibility attribute
      if (square.charAt(0) != 'h')
        square = square.replace(square.charAt(0), String.fromCharCode(square.charCodeAt(0)+1));      
      else{
        square = square.replace(square.charAt(0), 'a');
        if (square.charAt(1) == '8')
            boardDisplayed = true
        else  
            square = square.replace(square.charAt(1), String.fromCharCode(square.charCodeAt(1)+1));
      }
  }
}

function setPieces(type:boolean){
  whiteKing.visible = type;
  blackKing.visible = type;
  whiteQueen.visible = type;
  blackQueen.visible = type;
  // movementSquare.visible = true;
  whitePawns.forEach( (element) => {
    element.visible = type
    element.onClick = new OnPointerDown(() => {
      let pawnSquare:string = getSquare(element.positionX, element.positionY)
      log(chess.moves({square: pawnSquare}))
    })
  });
  blackPawns.forEach( (element) => {
    element.visible = type
    element.onClick = new OnPointerDown(() => {
    let pawnSquare:string = getSquare(element.positionX, element.positionY)
      log(chess.moves({square: pawnSquare}))
    })
  });
  whiteKnights.forEach((element) => {
    element.visible = type
    element.onClick = new OnPointerDown(() => {
      let knightSquare:string = getSquare(element.positionX, element.positionY)
      log(chess.moves({square: knightSquare}))
    })  
  });
  blackKnights.forEach((element) =>{
    element.visible = type 
    element.onClick = new OnPointerDown(() => {
      let knightSquare:string = getSquare(element.positionX, element.positionY)
      log(chess.moves({square: knightSquare}))
    })
  })

  whiteBishops.forEach((element) =>{
    element.visible = type
    element.onClick = new OnPointerDown(() => {
      let bishopSquare:string = getSquare(element.positionX, element.positionY)
      log(chess.moves({square: bishopSquare}))
    })  
  })

  blackBishops.forEach((element) =>{
    element.visible = type
    element.onClick = new OnPointerDown(() => {
      let bishopSquare:string = getSquare(element.positionX, element.positionY)
      log(chess.moves({square: bishopSquare}))
    })  
  })

  whiteRooks.forEach((element) =>{
    element.visible = type
    element.onClick = new OnPointerDown(() => {
      let rookSquare:string = getSquare(element.positionX, element.positionY)
      log(chess.moves({square: rookSquare}))
    })
  })

  blackRooks.forEach((element) =>{
    element.visible = type
    element.onClick = new OnPointerDown(() => {
      let rookSquare:string = getSquare(element.positionX, element.positionY)
      log(chess.moves({square: rookSquare}))
    })
  })
}
