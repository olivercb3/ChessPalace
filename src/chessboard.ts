import { ascii } from "../node_modules/chess.ts/src/state"

export const canvas = new UICanvas()

//considering a 512*512 board
export interface ISquare{
    // square: UIImage,
    xPosition: number,
    yPosition: number,
    // square: UIImage
}

// let defaultImage:UIImage = new UIImage()
export let squareMap:{[squareName: string]: ISquare} = {
    "a1":{xPosition:-224 , yPosition:-224}, "a2": {  xPosition:-224 , yPosition:-160}, "a3":{  xPosition:-224 ,yPosition:-96},  "a4":{  xPosition:-224 ,yPosition:-32}, "a5":{  xPosition:-224 ,yPosition:32}, "a6":{  xPosition:-224 ,yPosition:96}, "a7":{  xPosition:-224 , yPosition:160}, "a8":{  xPosition:-224 ,yPosition:224},
    "b1":{xPosition:-160 , yPosition:-224}, "b2": {  xPosition:-160 , yPosition:-160}, "b3":{  xPosition:-160 ,yPosition:-96},  "b4":{  xPosition:-160 ,yPosition:-32}, "b5":{  xPosition:-160 ,yPosition:32}, "b6":{  xPosition:-160 ,yPosition:96}, "b7":{  xPosition:-160 , yPosition:160}, "b8":{  xPosition:-160 ,yPosition:224},
    "c1":{xPosition:-96 ,  yPosition:-224},  "c2": { xPosition:-96 ,  yPosition:-160},  "c3":{ xPosition:-96 , yPosition:-96},   "c4":{ xPosition:-96 , yPosition:-32},  "c5":{ xPosition:-96 , yPosition:32},  "c6":{ xPosition:-96 , yPosition:96},  "c7":{ xPosition:-96 ,  yPosition:160},  "c8":{ xPosition:-96 , yPosition:224},
    "d1":{xPosition:-32 ,  yPosition:-224},  "d2": { xPosition:-32 ,  yPosition:-160},  "d3":{ xPosition:-32 , yPosition:-96},   "d4":{ xPosition:-32 , yPosition:-32},  "d5":{ xPosition:-32 , yPosition:32},  "d6":{ xPosition:-32 , yPosition:96},  "d7":{ xPosition:-32 ,  yPosition:160},  "d8":{ xPosition:-32 , yPosition:224},
    "e1":{xPosition:32 ,   yPosition:-224},   "e2": {xPosition:32 ,   yPosition:-160},   "e3":{xPosition:32 ,  yPosition:-96},    "e4":{xPosition:32 ,  yPosition:-32},   "e5":{xPosition:32 ,  yPosition:32},   "e6":{xPosition:32 ,  yPosition:96},   "e7":{xPosition:32 ,   yPosition:160},   "e8":{xPosition:32 ,  yPosition:224},
    "f1":{xPosition:96 ,   yPosition:-224},   "f2": {xPosition:96 ,   yPosition:-160},   "f3":{xPosition:96 ,  yPosition:-96},    "f4":{xPosition:96 ,  yPosition:-32},   "f5":{xPosition:96 ,  yPosition:32},   "f6":{xPosition:96 ,  yPosition:96},   "f7":{xPosition:96 ,   yPosition:160},   "f8":{xPosition:96 ,  yPosition:224},
    "g1":{xPosition:160 ,  yPosition:-224},  "g2": { xPosition:160 ,  yPosition:-160},  "g3":{ xPosition:160 , yPosition:-96},   "g4":{ xPosition:160 , yPosition:-32},  "g5":{ xPosition:160 , yPosition:32},  "g6":{ xPosition:160 , yPosition:96},  "g7":{ xPosition:160 ,  yPosition:160},  "g8":{ xPosition:160 , yPosition:224},
    "h1":{xPosition:224 ,  yPosition:-224},  "h2": { xPosition:224 ,  yPosition:-160},  "h3":{ xPosition:224 , yPosition:-96},   "h4":{ xPosition:224 , yPosition:-32},  "h5":{ xPosition:224 , yPosition:32},  "h6":{ xPosition:224 , yPosition:96},  "h7":{ xPosition:224 ,  yPosition:160},  "h8":{ xPosition:224 , yPosition:224}
}

//returns the square coordinates depending on the X and Y position provided
export function getSquare(positionX: string, positionY: string){
    let ascii_a: number = 97 //ascii code for 'a'
    let ascii_1: number = 49 //ascii code for '1'
    let column: string = String.fromCharCode(ascii_a + (parseInt(positionX)+224)/64)
    let row: string = String.fromCharCode(ascii_1 + (parseInt(positionY)+224)/64)
    return column+row
}

export function getSquareColor(square: string){
    let column:string = square.charAt(square.length-2)
    let row:string = square.charAt(square.length-1)
    let a:number = 97 // 'a' ASCII code
    let color = 'white'
    if (((column.charCodeAt(0)-a+1)+parseInt(row))%2 == 0)
        color = 'black';

    return color    
}

export const canvasContainer = new UIContainerStack(canvas) //declare parent element
canvasContainer.adaptWidth = true
canvasContainer.width = "70%"
canvasContainer.height = "100%"
canvasContainer.opacity = 1
canvasContainer.color = Color4.Gray() //set background-color
canvasContainer.visible = false


//sets all the canvas elements visibility to type's value
export const board: { [key: string]: UIImage } = {};
let boardBuilt: boolean = false
let square:string = 'a1' 
let count:number = 0 //keeps track on whether the square should be black or white
while (!boardBuilt){
    board[square] = count%2==0 ? new UIImage(canvas, new Texture("images/chessboard/black-square.png")) : new UIImage(canvas, new Texture("images/chessboard/white-square.png"))
    board[square].positionX = squareMap[square].xPosition
    board[square].positionY = squareMap[square].yPosition
    board[square].height = 64
    board[square].width = 64
    board[square].visible = false 

    if (square.charAt(0) != 'h')
        square = square.replace(square.charAt(0), String.fromCharCode(square.charCodeAt(0)+1));
    
    else{
        square = square.replace(square.charAt(0), 'a');
        count--
        if (square.charAt(1) == '8')
            boardBuilt = true
        else  
            square = square.replace(square.charAt(1), String.fromCharCode(square.charCodeAt(1)+1));
    }
    count++
}

export const blackSquare:UIImage = new UIImage(canvas, new Texture("images/chessboard/black-square.png"))
blackSquare.visible = false
blackSquare.width = 64
blackSquare.height = 64
blackSquare.sourceLeft = 0
blackSquare.sourceTop = 0
blackSquare.sourceWidth = 156
blackSquare.sourceHeight = 156
blackSquare.positionX = squareMap['a1'].xPosition
blackSquare.positionY = squareMap['a1'].yPosition
blackSquare.visible=false;

export const whiteSquare:UIImage = new UIImage(canvas, new Texture("images/chessboard/white-square.png"))
whiteSquare.visible = false
whiteSquare.width = 64
whiteSquare.height = 64
whiteSquare.sourceLeft = 0
whiteSquare.sourceTop = 0
whiteSquare.sourceWidth = 156
whiteSquare.sourceHeight = 156
blackSquare.positionX = squareMap['a1'].xPosition
blackSquare.positionY = squareMap['a1'].yPosition
whiteSquare.visible=false;

export const closeButton:UIImage = new UIImage(canvas, new Texture("images/chessboard/close-button.png"))
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
closeButton.positionY=squareMap['e1'].yPosition
closeButton.positionX=squareMap['e2'].xPosition

export const whitePawns: UIImage[] = []
let ascii_code = 'a'.charCodeAt(0) 
for (let i = 0; i < 8; i++){
    const whitePawn = new UIImage(canvas, new Texture("images/chessboard/white-pawn.png"))
    whitePawn.visible = false
    whitePawn.width = 32
    whitePawn.height = 48
    whitePawn.sourceLeft = 0
    whitePawn.sourceTop = 0
    whitePawn.sourceWidth = 60
    whitePawn.sourceHeight = 78
    whitePawn.positionY=squareMap[String.fromCharCode(ascii_code)+'2'].yPosition
    whitePawn.positionX=squareMap[String.fromCharCode(ascii_code)+'2'].xPosition
    whitePawns.push(whitePawn)
    ascii_code++;
}


export const blackPawns: UIImage[] = []
ascii_code = 'a'.charCodeAt(0) 
for (let i = 0; i < 8; i++){
    const blackPawn = new UIImage(canvas, new Texture("images/chessboard/black-pawn.png"))
    blackPawn.visible = false
    blackPawn.width = 32
    blackPawn.height = 48
    blackPawn.sourceLeft = 0
    blackPawn.sourceTop = 0
    blackPawn.sourceWidth = 60
    blackPawn.sourceHeight = 78
    blackPawn.positionY=squareMap[String.fromCharCode(ascii_code)+'7'].yPosition
    blackPawn.positionX=squareMap[String.fromCharCode(ascii_code)+'7'].xPosition
    blackPawns.push(blackPawn)
    ascii_code++;
}


export const blackKnights: UIImage[] = []
for (let i = 0; i < 2; i++){
    const blackKnight = new UIImage(canvas, new Texture("images/chessboard/black-knight.png"))
    blackKnight.visible = false
    blackKnight.width = 48
    blackKnight.height = 48
    blackKnight.sourceLeft = 0
    blackKnight.sourceTop = 0
    blackKnight.sourceWidth = 82
    blackKnight.sourceHeight = 83
    if(i==0){
        blackKnight.positionY=squareMap['b8'].yPosition
        blackKnight.positionX=squareMap['b8'].xPosition
    }
    else{
        blackKnight.positionY=squareMap['g8'].yPosition
        blackKnight.positionX=squareMap['g8'].xPosition
    }
    blackKnights.push(blackKnight)
}


export const whiteBishops: UIImage[] = []
for (let i = 0; i < 2; i++){
    const whiteBishop = new UIImage(canvas, new Texture("images/chessboard/white-bishop.png"))
    whiteBishop.visible = false
    whiteBishop.width = 48
    whiteBishop.height = 48
    whiteBishop.sourceLeft = 0
    whiteBishop.sourceTop = 0
    whiteBishop.sourceWidth = 82
    whiteBishop.sourceHeight = 82
    if(i==0){
        whiteBishop.positionY=squareMap['c1'].yPosition
        whiteBishop.positionX=squareMap['c1'].xPosition
    }
    else{
        whiteBishop.positionY=squareMap['f1'].yPosition
        whiteBishop.positionX=squareMap['f1'].xPosition
    }
    whiteBishops.push(whiteBishop)
}


export const blackBishops: UIImage[] = []
for (let i = 0; i < 2; i++){
    const blackBishop = new UIImage(canvas, new Texture("images/chessboard/black-bishop.png"))
    blackBishop.visible = false
    blackBishop.width = 48
    blackBishop.height = 48
    blackBishop.sourceLeft = 0
    blackBishop.sourceTop = 0
    blackBishop.sourceWidth = 82
    blackBishop.sourceHeight = 82
    if(i==0){
        blackBishop.positionY=squareMap['c8'].yPosition
        blackBishop.positionX=squareMap['c8'].xPosition
    }
    else{
        blackBishop.positionY=squareMap['f8'].yPosition
        blackBishop.positionX=squareMap['f8'].xPosition
    }
    blackBishops.push(blackBishop)
}

export const whiteKnights: UIImage[] = []
for (let i = 0; i < 2; i++){
    const whiteKnight = new UIImage(canvas, new Texture("images/chessboard/white-knight.png"))
    whiteKnight.visible = false
    whiteKnight.width = 48
    whiteKnight.height = 48
    whiteKnight.sourceLeft = 0
    whiteKnight.sourceTop = 0
    whiteKnight.sourceWidth = 82
    whiteKnight.sourceHeight = 82
    if(i==0){
        whiteKnight.positionY=squareMap['b1'].yPosition
        whiteKnight.positionX=squareMap['b1'].xPosition
    }
    else{
        whiteKnight.positionY=squareMap['g1'].yPosition
        whiteKnight.positionX=squareMap['g1'].xPosition
    }
    whiteKnights.push(whiteKnight)
}

export const whiteRooks: UIImage[] = []
for (let i = 0; i < 2; i++){
    const whiteRook = new UIImage(canvas, new Texture("images/chessboard/white-rook.png"))
    whiteRook.visible = false
    whiteRook.width = 42
    whiteRook.height = 48
    whiteRook.sourceLeft = 0
    whiteRook.sourceTop = 0
    whiteRook.sourceWidth = 69
    whiteRook.sourceHeight = 78
    if (i==0){
        whiteRook.positionY=squareMap['a1'].yPosition
        whiteRook.positionX=squareMap['a1'].xPosition
    }
    else{
        whiteRook.positionY=squareMap['h1'].yPosition
        whiteRook.positionX=squareMap['h1'].xPosition
    }
    whiteRooks.push(whiteRook)
}

export const blackRooks: UIImage[] = []
for (let i = 0; i < 2; i++){
    const blackRook = new UIImage(canvas, new Texture("images/chessboard/black-rook.png"))
    blackRook.visible = false
    blackRook.width = 42
    blackRook.height = 48
    blackRook.sourceLeft = 0
    blackRook.sourceTop = 0
    blackRook.sourceWidth = 70
    blackRook.sourceHeight = 77
    if (i==0){
        blackRook.positionY=squareMap['a8'].yPosition
        blackRook.positionX=squareMap['a8'].xPosition
    }
    else{
        blackRook.positionY=squareMap['h8'].yPosition
        blackRook.positionX=squareMap['h8'].xPosition
    }
    blackRooks.push(blackRook)
}

export const whiteQueen:UIImage = new UIImage(canvas, new Texture("images/chessboard/white-queen.png"))
whiteQueen.visible = false
whiteQueen.width = 48
whiteQueen.height = 48
whiteQueen.sourceLeft = 0
whiteQueen.sourceTop = 0
whiteQueen.sourceWidth = 95
whiteQueen.sourceHeight = 85
whiteQueen.positionY=squareMap['d1'].yPosition
whiteQueen.positionX=squareMap['d1'].xPosition

export const blackQueen:UIImage = new UIImage(canvas, new Texture("images/chessboard/black-queen.png"))
blackQueen.visible = false
blackQueen.width = 48
blackQueen.height = 48
blackQueen.sourceLeft = 0
blackQueen.sourceTop = 0
blackQueen.sourceWidth = 94
blackQueen.sourceHeight = 90
blackQueen.positionY=squareMap['d8'].yPosition
blackQueen.positionX=squareMap['d8'].xPosition



export const whiteKing:UIImage = new UIImage(canvas, new Texture("images/chessboard/white-king.png"))
whiteKing.visible = false
whiteKing.width = 48
whiteKing.height = 48
whiteKing.sourceLeft = 0
whiteKing.sourceTop = 0
whiteKing.sourceWidth = 87
whiteKing.sourceHeight = 85
whiteKing.positionY=squareMap['e1'].yPosition
whiteKing.positionX=squareMap['e1'].xPosition

export const blackKing:UIImage = new UIImage(canvas, new Texture("images/chessboard/black-king.png"))
blackKing.visible = false
blackKing.width = 48
blackKing.height = 48
blackKing.sourceLeft = 0
blackKing.sourceTop = 0
blackKing.sourceWidth = 88
blackKing.sourceHeight = 87
blackKing.positionY=squareMap['e8'].yPosition
blackKing.positionX=squareMap['e8'].xPosition


whitePieces.push(whitePawns)