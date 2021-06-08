import { gameScene } from './scenes/game_scene'
import { gameOverScene } from "./scenes/game_over_scene"
export class gameController {
    scene: gameScene;
    inputQueue: any[];
    userInput: string;
    isRunning: boolean;
    gameOverScene: gameOverScene;
    highScore: number;
    scoreShow: HTMLElement;
    highScoreShow: HTMLElement;
    constructor() {
        this.scene = new gameScene();
        this.gameOverScene = new gameOverScene();
        this.isRunning = true;

        this.highScore = 0;
        this.inputQueue = [];
        this.userInput = 'NONE';


        this.scoreShow = document.getElementById('score') as HTMLElement
        this.highScoreShow = document.getElementById('highScore') as HTMLElement

    }

    processInput() {
        switch (this.scene.player.state) {
            case 'JUMPING':
                this.userInput = 'JUMP'
                break
            case 'DUCKING':
                for (let i = 0; i < this.inputQueue.length; i++) {
                    if (this.inputQueue[i] == 'UNDUCK' || this.inputQueue[i] == 'UNDUCK') {
                        this.userInput = 'UNDUCK';
                        this.inputQueue = []
                        return
                    }
                }
                this.userInput = 'DUCK'
                break
            case 'RUNNING':
                if (this.inputQueue.length > 0) { this.userInput = this.inputQueue[0] } else { this.userInput = 'NONE'; }
                break
        }
        this.inputQueue = []
    }
    update(delta: any) {
        if (this.isRunning) {
            this.scene.update(delta, this.userInput);
        }
        if (!this.isRunning && this.userInput=="JUMP") {
            this.isRunning = true
            this.scene = new gameScene()
        }
        if (this.scene.isLose()) {
            this.isRunning = false;
            if (this.scene.score > this.highScore)
                this.highScore = this.scene.score;
        }
    }
    drawFrame() {
        this.scene.drawFrame();
        if (!this.isRunning) {
            this.gameOverScene.drawFrame();
        }
        this.scoreShow.innerHTML = 'Score: ' + Math.round(this.scene.score / 100)
        this.highScoreShow.innerHTML = 'High score: ' + Math.round(this.highScore / 100)
    }
    isKeyDown(e: KeyboardEvent) {
        if (e.keyCode == 32 || e.keyCode == 38) {
            this.inputQueue.push('JUMP')
        }
        if (e.keyCode == 40) { this.inputQueue.push('DUCK') }
    }
    isKeyUp(e: KeyboardEvent) {
        if (e.keyCode == 40) {
            this.inputQueue.push('UNDUCK')
        }
    }
}
