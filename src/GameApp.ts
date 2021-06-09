import { Game } from './Game'
import { gameScene } from './scenes/game_scene'
import { gameOverScene } from './scenes/game_over_scene'

export class GameApp extends Game {
  constructor() {
    super();
    this.scenes.create([new gameScene(), new gameOverScene()])
    this.renderer.create(this.scenes.currentScene(), this.scenes.currentScene().objectsToRender)

    this.scenes.scenes[0].player.jumpInput = this.input.addWatch(32, 'down')
    this.scenes.scenes[0].player.duckInput = this.input.addWatch(40, 'down')
    this.scenes.scenes[0].player.unDuckInput = this.input.addWatch(40, 'up')
  }
}
