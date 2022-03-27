import { Chess } from '../node_modules/chess.ts/src/chess'
import { Square } from '../node_modules/chess.ts/src/types';
import { clear } from '../node_modules/chessground/draw';
import {ISquare, board, getSquare, getSquareColor, canvas} from './chessboard'
import { canvasContainer, closeButton, squareMap, whitePieces, blackPieces} from './chessboard'
import { nextChar } from './utils'

let possibleMovementsAnimations: UIImage[] = []


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

//returns a list of UIImages representing the square selectors for all the possible moves of parameter piece
function displayPosibilities(piece: UIImage){
  clearPossibleMovements()
  // log(piece)
  let square:string = getSquare(piece.positionX, piece.positionY)
  let possibleMoves: string[] = chess.moves({square: square})
  for(let i:number=0; i<possibleMoves.length; i++){
    let move:string = possibleMoves[i]
    move = move.replace('#','')
    move = move.replace('+','')
    log(move)
    if(move.indexOf('x') != -1){}
    let squareColor:string = getSquareColor(move)
    let moveSelector:UIImage = squareColor=='white' ? new UIImage(canvas, new Texture('images/chessboard/move-white-square.png')) : new UIImage(canvas, new Texture('images/chessboard/move-black-square.png'))
    moveSelector.height = 64
    moveSelector.width = 64
    moveSelector.positionX = squareMap[move.substr(move.length-2)].xPosition
    moveSelector.positionY = squareMap[move.substr(move.length-2)].yPosition
    moveSelector.visible = true
    moveSelector.sourceLeft = 0
    moveSelector.sourceTop = 0
    moveSelector.sourceWidth = 90
    moveSelector.sourceHeight = 90
    if(move.indexOf('x') != -1)
      moveSelector.opacity = 0
    moveSelector.onClick = new OnPointerDown(() => {
      movePiece(piece, move)
    })
    possibleMovementsAnimations.push(moveSelector) //add it to the data structure
  }
}

function clearPossibleMovements(){
  for(let i:number = 0; possibleMovementsAnimations[i];){ //clear data 
    possibleMovementsAnimations[i].visible = false;
    possibleMovementsAnimations.splice(i, 1);
  }
}

//pre: piece can move to square
// piece makes movement 
function movePiece(piece:UIImage, movement:string){
  log(chess.moves)
  chess.move(movement)
  clearPossibleMovements()
  let movePositionX = squareMap[movement.substr(movement.length-2)].xPosition
  let movePositionY = squareMap[movement.substr(movement.length-2)].yPosition
  if(movement.indexOf('x') != -1){// if the move was a capture
    let found:boolean = false;
    let i = 0
    log (movePositionX + " " + movePositionY)
    while(!found && i<whitePieces.length){
      if (whitePieces[i].visible && whitePieces[i].positionX == movePositionX.toString()+"px" && whitePieces[i].positionY == movePositionY.toString()+"px"){
        whitePieces[i].visible = false;
        found = true;
      }
      if (blackPieces[i].visible && blackPieces[i].positionX == movePositionX.toString()+"px" && blackPieces[i].positionY == movePositionY.toString()+"px"){
        blackPieces[i].visible = false;
        found = true;
      }
      i++
    }
  } 
  piece.positionX = movePositionX
  piece.positionY = movePositionY
}

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
  for(let i = 0; i < whitePieces.length; i++){
    let whitePiece = whitePieces[i]
    whitePiece.visible = type;
    whitePiece.onClick = new OnPointerDown(()=> {
      displayPosibilities(whitePiece)
    })
    let blackPiece = blackPieces[i]
    blackPiece.visible = type;
    blackPiece.onClick = new OnPointerDown(()=> {
      displayPosibilities(blackPiece)
    })
  }
}
