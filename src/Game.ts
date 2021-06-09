import { InputManager } from './InputManager'
import { SceneManager } from './SceneManager'
import { Renderer } from './Renderer'

export class Game {
    renderer: Renderer;
    input: InputManager;
    scenes: SceneManager;
    lastTime: number;
    delta: number;
    constructor() {
        this.lastTime = window.performance.now();
        this.delta = 0;
        this.renderer = new Renderer();
        this.input = new InputManager();
        this.scenes = new SceneManager();
    }
    loop(timeStamp: number) {
        this.delta = timeStamp - this.lastTime

        this.input.processInput();
        this.scenes.update(this.delta);
        this.renderer.render();

        this.lastTime = timeStamp

        requestAnimationFrame(this.loop);
    }
    startGame(){
        requestAnimationFrame(this.loop);
    }
}
