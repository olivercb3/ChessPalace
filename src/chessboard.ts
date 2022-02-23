const canvas = new UICanvas()

//considering a 512*512 board
interface ISquare{
    xPosition: number,
    yPosition: number
}


export const squareMap:{[squareName: string]: ISquare} = {
    "a1":{xPosition:-224 , yPosition:-224}, "a2": {  xPosition:-224 , yPosition:-160}, "a3":{  xPosition:-224 ,yPosition:-96},  "a4":{  xPosition:-224 ,yPosition:-32}, "a5":{  xPosition:-224 ,yPosition:32}, "a6":{  xPosition:-224 ,yPosition:96}, "a7":{  xPosition:-224 , yPosition:160}, "a8":{  xPosition:-224 ,yPosition:224},
    "b1":{xPosition:-160 , yPosition:-224}, "b2": {  xPosition:-160 , yPosition:-160}, "b3":{  xPosition:-160 ,yPosition:-96},  "b4":{  xPosition:-160 ,yPosition:-32}, "b5":{  xPosition:-160 ,yPosition:32}, "b6":{  xPosition:-160 ,yPosition:96}, "b7":{  xPosition:-160 , yPosition:160}, "b8":{  xPosition:-160 ,yPosition:224},
    "c1":{xPosition:-96 ,  yPosition:-224},  "c2": { xPosition:-96 ,  yPosition:-160},  "c3":{ xPosition:-96 , yPosition:-96},   "c4":{ xPosition:-96 , yPosition:-32},  "c5":{ xPosition:-96 , yPosition:32},  "c6":{ xPosition:-96 , yPosition:96},  "c7":{ xPosition:-96 ,  yPosition:160},  "c8":{ xPosition:-96 , yPosition:224},
    "d1":{xPosition:-32 ,  yPosition:-224},  "d2": { xPosition:-32 ,  yPosition:-160},  "d3":{ xPosition:-32 , yPosition:-96},   "d4":{ xPosition:-32 , yPosition:-32},  "d5":{ xPosition:-32 , yPosition:32},  "d6":{ xPosition:-32 , yPosition:96},  "d7":{ xPosition:-32 ,  yPosition:160},  "d8":{ xPosition:-32 , yPosition:224},
    "e1":{xPosition:32 ,   yPosition:-224},   "e2": {xPosition:32 ,   yPosition:-160},   "e3":{xPosition:32 ,  yPosition:-96},    "e4":{xPosition:32 ,  yPosition:-32},   "e5":{xPosition:32 ,  yPosition:32},   "e6":{xPosition:32 ,  yPosition:96},   "e7":{xPosition:32 ,   yPosition:160},   "e8":{xPosition:32 ,  yPosition:224},
    "f1":{xPosition:96 ,   yPosition:-224},   "f2": {xPosition:96 ,   yPosition:-160},   "f3":{xPosition:96 ,  yPosition:-96},    "f4":{xPosition:96 ,  yPosition:-32},   "f5":{xPosition:96 ,  yPosition:32},   "f6":{xPosition:96 ,  yPosition:96},   "f7":{xPosition:96 ,   yPosition:160},   "f8":{xPosition:96 ,  yPosition:224},
    "g1":{xPosition:160 ,  yPosition:-224},  "g2": { xPosition:160 ,  yPosition:-160},  "g3":{ xPosition:160 , yPosition:-96},   "g4":{ xPosition:160 , yPosition:-32},  "g5":{ xPosition:160 , yPosition:32},  "g6":{ xPosition:160 , yPosition:96},  "g7":{ xPosition:160 ,  yPosition:160},  "g8":{ xPosition:160 , yPosition:224},
    "h1":{xPosition:224 ,  yPosition:-224},  "h2": { xPosition:224 ,  yPosition:-160},  "h3":{ xPosition:224 , yPosition:-96},   "h4":{ xPosition:224 , yPosition:-32},  "h5":{ xPosition:224 , yPosition:32},  "h6":{ xPosition:224 , yPosition:96},  "h7":{ xPosition:224 ,  yPosition:160},  "h8":{ xPosition:224 , yPosition:224}
}
let pawnXPosition = "-224"

export const canvasContainer = new UIContainerStack(canvas) //declare parent element
canvasContainer.adaptWidth = true
canvasContainer.width = "70%"
canvasContainer.height = "100%"
canvasContainer.opacity = 0.90
canvasContainer.color = Color4.Gray() //set background-color
canvasContainer.visible = false

export const chessBoard = new UIImage(canvas, new Texture("images/chessboard/chess-board.png"))
chessBoard.width = 512
chessBoard.height = 512
chessBoard.sourceLeft = 48
chessBoard.sourceTop = 20
chessBoard.sourceWidth = 1296
chessBoard.sourceHeight = 1294
chessBoard.visible = false

export const closeButton = new UIImage(canvas, new Texture("images/chessboard/close-button.png"))
closeButton.visible = false
closeButton.width = 32
closeButton.height = 32
closeButton.sourceLeft = 0
closeButton.sourceTop = 0
closeButton.sourceWidth = 860
closeButton.sourceHeight = 896
closeButton.hAlign="right"
closeButton.vAlign="top"
closeButton.positionX="-240"

export const whitePawns: UIImage[] = []
pawnXPosition = "-224"
for (let i = 0; i < 8; i++){
    const whitePawn = new UIImage(canvas, new Texture("images/chessboard/white-pawn.png"))
    whitePawn.visible = false
    whitePawn.width = 32
    whitePawn.height = 48
    whitePawn.sourceLeft = 0
    whitePawn.sourceTop = 0
    whitePawn.sourceWidth = 60
    whitePawn.sourceHeight = 78
    whitePawn.positionY="-160"
    whitePawn.positionX=pawnXPosition
    whitePawns.push(whitePawn)
    pawnXPosition = (parseInt(pawnXPosition) + 64).toString()
}

export const whiteKnights: UIImage[] = []
pawnXPosition = "-224"
for (let i = 0; i < 2; i++){
    const whiteKnight = new UIImage(canvas, new Texture("images/chessboard/white-pawn.png"))
    whiteKnight.visible = false
    whiteKnight.width = 32
    whiteKnight.height = 48
    whiteKnight.sourceLeft = 0
    whiteKnight.sourceTop = 0
    whiteKnight.sourceWidth = 60
    whiteKnight.sourceHeight = 78
    whiteKnight.positionY="-224"
    whiteKnight.positionX=pawnXPosition
    whitePawns.push(whitePawn)
    pawnXPosition = (parseInt(pawnXPosition) + 64).toString()
}

export const whiteKing = new UIImage(canvas, new Texture("images/chessboard/white-king.png"))
whiteKing.visible = false
whiteKing.width = 48
whiteKing.height = 48
whiteKing.sourceLeft = 0
whiteKing.sourceTop = 0
whiteKing.sourceWidth = 87
whiteKing.sourceHeight = 85
whiteKing.positionY="-224"
whiteKing.positionX="32"

export const blackKing = new UIImage(canvas, new Texture("images/chessboard/black-king.png"))
blackKing.visible = false
blackKing.width = 48
blackKing.height = 48
blackKing.sourceLeft = 0
blackKing.sourceTop = 0
blackKing.sourceWidth = 88
blackKing.sourceHeight = 87
blackKing.positionY="+224"
blackKing.positionX="32"

export const blackPawns: UIImage[] = []
pawnXPosition = "-224"
for (let i = 0; i < 8; i++){
    const blackPawn = new UIImage(canvas, new Texture("images/chessboard/white-pawn.png"))
    blackPawn.visible = false
    blackPawn.width = 32
    blackPawn.height = 48
    blackPawn.sourceLeft = 0
    blackPawn.sourceTop = 0
    blackPawn.sourceWidth = 60
    blackPawn.sourceHeight = 78
    blackPawn.positionY="+160"
    blackPawn.positionX=pawnXPosition
    blackPawns.push(blackPawn)
    pawnXPosition = (parseInt(pawnXPosition) + 64).toString()
}