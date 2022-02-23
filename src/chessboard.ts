const canvas = new UICanvas()

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
    whitePawn.positionX="-224"
    whitePawns.push(whitePawn)
    whitePawn.positionX+=32

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

