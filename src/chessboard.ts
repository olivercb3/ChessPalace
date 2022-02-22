const canvas = new UICanvas()

export const canvasContainer = new UIContainerStack(canvas) //declare parent element
canvasContainer.adaptWidth = true
canvasContainer.width = "70%"
canvasContainer.height = "100%"
canvasContainer.opacity = 0.90
canvasContainer.color = Color4.Gray() //set background-color
canvasContainer.visible = false

export const chessBoard = new UIImage(canvas, new Texture("images/chess-board.png"))
chessBoard.width = 612
chessBoard.height = 612
chessBoard.sourceLeft = 0
chessBoard.sourceTop = 0
chessBoard.sourceWidth = 1360
chessBoard.sourceHeight = 1372
chessBoard.visible = false