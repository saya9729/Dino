import {dino} from "../objects/dino"
import {obstacle} from "../objects/obstacles"
export class gameScene {
    groundImg: HTMLImageElement
    cactus1Img: HTMLImageElement
    cactus2Img: HTMLImageElement
    cactus3Img: HTMLImageElement
    cactusBig1Img: HTMLImageElement
    cactusBig2Img: HTMLImageElement
    cactusBig3Img: HTMLImageElement
    bird1Img: HTMLImageElement
    dino1Img: HTMLImageElement
    dinoDuck1Img: HTMLImageElement
    bird2Img: HTMLImageElement
    dino2Img: HTMLImageElement
    dinoDuck2Img: HTMLImageElement
    
    level1BirdHeight: number
    level2BirdHeight: number
    level3BirdHeight: number
    canvas: HTMLCanvasElement
    context: any
    player: dino
    obstacleArray: any[]
    speed: number
    acceleration: number
    
    score: number
    highScore: any
    offset: number
    constructor() {
      this.groundImg = new Image()
      this.groundImg.src = '../../assets/images/ground.png'
      this.cactus1Img = new Image()
      this.cactus1Img.src = '../../assets/sprites/cactus_1.png'
      this.cactus2Img = new Image()
      this.cactus2Img.src = '../../assets/sprites/cactus_2.png'
      this.cactus3Img = new Image()
      this.cactus3Img.src = '../../assets/sprites/cactus_3.png'
      this.cactusBig1Img = new Image()
      this.cactusBig1Img.src = '../../assets/sprites/cactus_big_1.png'
      this.cactusBig2Img = new Image()
      this.cactusBig2Img.src = '../../assets/sprites/cactus_big_2.png'
      this.cactusBig3Img = new Image()
      this.cactusBig3Img.src = '../../assets/sprites/cactus_big_3.png'
      this.bird1Img = new Image()
      this.bird1Img.src = '../../assets/sprites/bird_1.png'
      this.dino1Img = new Image()
      this.dino1Img.src = '../../assets/sprites/dino_1.png'
      this.dinoDuck1Img = new Image()
      this.dinoDuck1Img.src = '../../assets/sprites/dino_duck_1.png'
      this.bird2Img = new Image()
      this.bird2Img.src = '../../assets/sprites/bird_2.png'
      this.dino2Img = new Image()
      this.dino2Img.src = '../../assets/sprites/dino_2.png'
      this.dinoDuck2Img = new Image()
      this.dinoDuck2Img.src = '../../assets/sprites/dino_duck_2.png'
      
  
      this.level1BirdHeight = 34// later
      this.level2BirdHeight = 98// later
      this.level3BirdHeight = 162// later
  
      this.canvas = document.getElementById('gamezone') as HTMLCanvasElement
      this.context = this.canvas.getContext('2d') 
      this.player = new dino(this.dino1Img.width, this.dino1Img.height, this.canvas.height, [this.dino1Img, this.dino2Img], [this.dinoDuck1Img, this.dinoDuck2Img], 333)
      this.obstacleArray = []
      this.speed = 7// later
      this.acceleration = 0.0001// later
      
      this.score = 0
      this.offset = 28
    }
  
    createObstacle() {
      const obstacleId = Math.round(Math.random() * 8)
      switch (obstacleId) {
        case 0:
          return new obstacle(this.cactus1Img.width, this.cactus1Img.height, this.canvas.width, this.canvas.height - this.cactus1Img.height / 2, [this.cactus1Img], 500)
        case 1:
          return new obstacle(this.cactus2Img.width, this.cactus2Img.height, this.canvas.width, this.canvas.height - this.cactus2Img.height / 2, [this.cactus2Img], 500)
        case 2:
          return new obstacle(this.cactus3Img.width, this.cactus3Img.height, this.canvas.width, this.canvas.height - this.cactus3Img.height / 2, [this.cactus3Img], 500)
        case 3:
          return new obstacle(this.cactusBig1Img.width, this.cactusBig1Img.height, this.canvas.width, this.canvas.height - this.cactusBig1Img.height / 2, [this.cactusBig1Img], 500)
        case 4:
          return new obstacle(this.cactusBig2Img.width, this.cactusBig2Img.height, this.canvas.width, this.canvas.height - this.cactusBig2Img.height / 2, [this.cactusBig2Img], 500)
        case 5:
          return new obstacle(this.cactusBig3Img.width, this.cactusBig3Img.height, this.canvas.width, this.canvas.height - this.cactusBig3Img.height / 2, [this.cactusBig3Img], 500)
        case 6:
          return new obstacle(this.bird1Img.width, this.bird1Img.height, this.canvas.width, this.canvas.height - this.level1BirdHeight, [this.bird1Img, this.bird2Img], 333)
        case 7:
          return new obstacle(this.bird1Img.width, this.bird1Img.height, this.canvas.width, this.canvas.height - this.level2BirdHeight, [this.bird1Img, this.bird2Img], 333)
        case 8:
          return new obstacle(this.bird1Img.width, this.bird1Img.height, this.canvas.width, this.canvas.height - this.level3BirdHeight, [this.bird1Img, this.bird2Img], 333)
      }
    }
  
    moveWorld(speed: number) {
      if (this.obstacleArray.length == 0) { this.obstacleArray.push(this.createObstacle()) }
      for (let i = 0; i < this.obstacleArray.length; i++) {
        if (this.obstacleArray[i].posX < 0) {
          this.obstacleArray.shift()
        } else { this.obstacleArray[i].move(speed) }
      }
      if (this.obstacleArray[this.obstacleArray.length - 1].posX <= this.canvas.width / (2.7 - Math.random())) { // later
        this.obstacleArray.push(this.createObstacle())
      }
    }
  
    isCollide(obstacle: { posX: number; width: any; posY: number; height: any }) {
      if (Math.abs(this.player.posX - obstacle.posX) < (this.player.width + obstacle.width) / 2 && Math.abs(this.player.posY - obstacle.posY) < (this.player.height + obstacle.height) / 2) { return true }
      return false
    }
  
    isLose() {
      for (let i = 0; i < this.obstacleArray.length; i++) {
        if (this.isCollide(this.obstacleArray[i])) { return true; }
      }
      return false;
    }
  
    update(delta: number, userInput: string) {
      switch (userInput) {
        case 'JUMP':
          this.player.jump(delta)
          break;
        case 'DUCK':
          this.player.duck(this.dinoDuck1Img.width, this.dinoDuck1Img.height)
          break;
        case 'UNDUCK':
          this.player.unDuck(this.dino1Img.width, this.dino1Img.height)
          break;
      }
      this.player.nextSprite(delta)
      for (let i = 0; i < this.obstacleArray.length; i++) {
        this.obstacleArray[i].nextSprite(delta)
      }
  
      this.moveWorld(this.speed)
      this.speed += this.acceleration
      this.score += this.speed * delta
    }
  
    drawFrame() {
      this.context.drawImage(this.groundImg, 0, this.canvas.height - this.groundImg.height)
      this.context.drawImage(this.player.nowSprite(), this.player.posX - this.player.width / 2, this.player.posY - this.player.height / 2 - this.offset)
  
      for (let i = 0; i < this.obstacleArray.length; i++) {
        this.context.drawImage(this.obstacleArray[i].nowSprite(), this.obstacleArray[i].posX - this.obstacleArray[i].width / 2, this.obstacleArray[i].posY - this.obstacleArray[i].height / 2 - this.offset)
      }
    } 
  }