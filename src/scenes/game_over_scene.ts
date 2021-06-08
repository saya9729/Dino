export class gameOverScene {
    canvas: HTMLCanvasElement
    context: any
    offset: number
    restartButtonImg: any
    gameOverImg: HTMLImageElement
    constructor() {
        this.canvas = document.getElementById('gamezone') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')
        this.restartButtonImg = new Image()
        this.restartButtonImg.src = '../../assets/images/restart_button.png'
        this.gameOverImg = new Image()
        this.gameOverImg.src = '../../assets/images/game_over.png'
        this.offset=30;
    }
    drawFrame() {
        this.context.drawImage(this.gameOverImg, this.canvas.width / 2 - this.gameOverImg.width / 2, this.canvas.height / 2 - (this.gameOverImg.height + this.offset + this.restartButtonImg.height) / 2)
        this.context.drawImage(this.restartButtonImg, this.canvas.width / 2 - this.restartButtonImg.width / 2, this.canvas.height / 2 + this.offset / 2)
    }
    
}