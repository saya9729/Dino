import { AbstractGameObject } from "../Engine/AbstractGameObject"
import {Sprite} from "./Sprites"
export class Obstacle extends AbstractGameObject {
    spriteArray: any
    lastIndex!: number
    delay: any
    nowDelay!: number
    sprites: Sprite
    constructor(width: number, height: number, posX: number, posY: number, spriteArray: HTMLImageElement[], delay: number) {
        super();
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY
        this.sprites=new Sprite(spriteArray,delay)
    }
    move(speed: number) {
        this.posX -= speed
    }
    nextSprite(delta: number){
        this.sprites.nextSprite(delta);
    }
    nowSprite(){
        return this.sprites.nowSprite();
    }
    update(delta: number,speed:number){
        this.nextSprite(delta);
        this.move(speed)
    }
}