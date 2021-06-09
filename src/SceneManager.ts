export class SceneManager {
    scenes: any[];//manage all the scenes
    currentSceneIndex: number;
    constructor() {
        this.scenes = [];
        this.currentSceneIndex = 0;
    }
    create(scenes: any[]) {
        this.scenes = scenes;
        this.startScene(this.currentSceneIndex);
    }
    startScene(index: number) {
        if (this.scenes[index].restartScene){
            this.scenes[index].restartScene();
        }
        else
            this.scenes[index].isRunning = true;
    }
    stopScene(index: number) {
        this.scenes[index].isRunning = false;
    }
    switchToScene(index: number, stop: boolean) {
        if (stop)
            this.stopScene(this.currentSceneIndex);
        this.currentSceneIndex = index;
        this.startScene(this.currentSceneIndex);
    }
    update(delta: number) {//need changing
        switch (this.scenes[this.currentSceneIndex].event) {
            case 'next':
                this.switchToScene(this.scenes[this.currentSceneIndex].nextSceneID,this.scenes[this.currentSceneIndex].continueScene)
                break;
            case 'continue':
                break;
        }
        for (let i=0;i<this.scenes.length;i++){
            if (this.scenes[i].isRunning)
                this.scenes[i].update(delta);
        }
    }
    currentScene(){
        return this.scenes[this.currentSceneIndex];
    }
}