import {Texture} from './Texture'

export class Renderer {
    context: any;
    objectsToRender: any;//responses for render all objects
    constructor(){
        this.context=0;
        this.objectsToRender=[];
    }
    create(scene: any,objectsToRender: Texture[]){
        this.context=scene.context;
        this.objectsToRender=objectsToRender;
    }
    render() {
        for (let i = 0; i < this.objectsToRender.length; i++) {
            this.context.drawImage(this.objectsToRender[i].img, this.objectsToRender[i].posX, this.objectsToRender[i].posY)
        }
    }
}