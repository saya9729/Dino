import { Dino } from "../Objects/Dino"
import { Obstacle } from "../Objects/Obstacles"
import { Scene } from '../Engine/Scene'
import { Texture } from "../Engine/Texture"
export class GamePlayScene extends Scene {
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
  player: Dino
  obstacleArray: any[]
  speed: number
  acceleration: number

  score: number
  highScore: any
  offset: number
  scoreShow: HTMLElement
  highScoreShow: HTMLElement
  constructor(game: any) {
    super(game);
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
    this.player = new Dino(this.dino1Img.width, this.dino1Img.height, this.canvas.height, [this.dino1Img, this.dino2Img], [this.dinoDuck1Img, this.dinoDuck2Img], 333,this.game)
    this.obstacleArray = []
    this.speed = 7// later
    this.acceleration = 0.0001// later

    this.highScore = 0;
    this.score = 0
    this.offset = 28

    this.nextSceneID = 1;

    this.scoreShow = document.getElementById('score') as HTMLElement
    this.highScoreShow = document.getElementById('highScore') as HTMLElement
  }

  createObstacle() {
    const obstacleId = Math.round(Math.random() * 8)
    switch (obstacleId) {
      case 0:
        return new Obstacle(this.cactus1Img.width, this.cactus1Img.height, this.canvas.width, this.canvas.height - this.cactus1Img.height / 2, [this.cactus1Img], 500)
      case 1:
        return new Obstacle(this.cactus2Img.width, this.cactus2Img.height, this.canvas.width, this.canvas.height - this.cactus2Img.height / 2, [this.cactus2Img], 500)
      case 2:
        return new Obstacle(this.cactus3Img.width, this.cactus3Img.height, this.canvas.width, this.canvas.height - this.cactus3Img.height / 2, [this.cactus3Img], 500)
      case 3:
        return new Obstacle(this.cactusBig1Img.width, this.cactusBig1Img.height, this.canvas.width, this.canvas.height - this.cactusBig1Img.height / 2, [this.cactusBig1Img], 500)
      case 4:
        return new Obstacle(this.cactusBig2Img.width, this.cactusBig2Img.height, this.canvas.width, this.canvas.height - this.cactusBig2Img.height / 2, [this.cactusBig2Img], 500)
      case 5:
        return new Obstacle(this.cactusBig3Img.width, this.cactusBig3Img.height, this.canvas.width, this.canvas.height - this.cactusBig3Img.height / 2, [this.cactusBig3Img], 500)
      case 6:
        return new Obstacle(this.bird1Img.width, this.bird1Img.height, this.canvas.width, this.canvas.height - this.level1BirdHeight, [this.bird1Img, this.bird2Img], 333)
      case 7:
        return new Obstacle(this.bird1Img.width, this.bird1Img.height, this.canvas.width, this.canvas.height - this.level2BirdHeight, [this.bird1Img, this.bird2Img], 333)
      case 8:
        return new Obstacle(this.bird1Img.width, this.bird1Img.height, this.canvas.width, this.canvas.height - this.level3BirdHeight, [this.bird1Img, this.bird2Img], 333)
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

  update(delta: number) {
    this.player.update(delta);
    for (let i = 0; i < this.obstacleArray.length; i++) {
      if (this.obstacleArray[i].posX + this.obstacleArray[i].width / 2 < 0) {
        this.obstacleArray.shift()
        this.objectsToRender.splice(2,1);
        this.obstacleArray[i].update(delta, this.speed);
      }
      if (this.obstacleArray[this.obstacleArray.length - 1].posX <= this.canvas.width / (2.7 - Math.random())) { // later
        this.obstacleArray.push(this.createObstacle())
      }
      this.score += this.speed * delta

      if (this.isLose()) {
        this.event = 'next';
        if (this.highScore < this.score) {
          this.highScore = this.score;
        }
      }

      this.objectsToRender[1].img=this.player.nowSprite();
      for ( let i=2;i<this.objectsToRender.length;i++){
        this.objectsToRender[1].img=this.obstacleArray[i-2].nowSprite();
      }

      this.scoreShow.innerHTML = 'Score: ' + Math.round(this.score / 100)
      this.highScoreShow.innerHTML = 'High score: ' + Math.round(this.highScore / 100)
    }
  }
  restartScene(){
    this.isRunning=true;
    this.player = new Dino(this.dino1Img.width, this.dino1Img.height, this.canvas.height, [this.dino1Img, this.dino2Img], [this.dinoDuck1Img, this.dinoDuck2Img], 333,this.game)
    this.obstacleArray = []
    this.speed = 7// later
    this.acceleration = 0.0001// later
    this.score = 0
    this.objectsToRender=[new Texture(this.groundImg, 0, this.canvas.height - this.groundImg.height)];
    this.objectsToRender.push(new Texture(this.player.nowSprite(), this.player.posX - this.player.width / 2, this.player.posY - this.player.height / 2 - this.offset));
  }
}