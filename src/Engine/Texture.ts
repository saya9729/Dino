import {AbstractGameObject} from './AbstractGameObject'

export class Texture extends AbstractGameObject {
    constructor(img: any, posX: any, posY: any) {
        super();
        this.img = img
        this.posX = posX
        this.posY = posY
    }
}