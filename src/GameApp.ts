import { Game } from './Engine/Game'
import { GamePlayScene } from './Scenes/GamePlayScene'
import { GameOverScene } from './Scenes/GameOverScene'

export class GameApp extends Game {
  constructor () {
    super()
    this.scenes.create([new GamePlayScene(this), new GameOverScene(this)])
    this.renderer.create(this.scenes.currentScene(), this.scenes.currentScene().objectsToRender)
  }
}
