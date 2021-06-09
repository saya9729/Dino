import {Texture} from './Texture'
export class Scene {
    isRunning: boolean
    event: string
    nextSceneID: number
    continueScene: boolean
    canvas: any
    context: any
    objectsToRender: Texture[]
    constructor() {
        this.isRunning = false
        this.event = 'continue'
        this.nextSceneID = 1
        this.continueScene = false //continue the scene after switching it for another scene
        this.canvas=0;
        this.context=0;
        this.objectsToRender=[];
    }
    update(delta: any){
        
    }
}
