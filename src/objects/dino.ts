import { objects } from "./objects"
import { sprite } from "./sprites"
export class dino extends objects {
    timeToLand: number
    v0: number
    g: number
    state: string
    jumpHeight: number
    groundHeight: any
    timeInTheAir: number
    spriteArray: any
    spriteArrayDuck: any
    delay: any
    runSprites: sprite
    duckSprites: sprite
    jumpInput: boolean[]
    duckInput: boolean[]
    unDuckInput: boolean[]
    constructor(width: number, height: number, groundHeight: number, spriteArray: HTMLImageElement[], spriteArrayDuck: HTMLImageElement[], delay: number) {
        super()
        this.width = width
        this.height = height
        this.posX = width / 2
        this.posY = groundHeight - height / 2
        this.state = 'RUNNING'
        this.jumpHeight = 150//later
        this.groundHeight = groundHeight
        this.g = -3000//gravity
        this.v0 = Math.sqrt((-2) * this.g * this.jumpHeight)
        this.timeToLand = 2 * this.v0 * 1000 / this.g//ms questionable behavior
        this.timeInTheAir = 0

        this.runSprites = new sprite(spriteArray, delay);
        this.duckSprites = new sprite(spriteArrayDuck, delay);

        this.jumpInput=[];
        this.duckInput=[];
        this.unDuckInput=[];
    }


    jump(delta: number) {
        this.state = 'JUMPING';
        this.timeInTheAir += delta
        this.posY = this.groundHeight - (this.g * 0.5 * this.timeInTheAir * this.timeInTheAir / (1000 * 1000) + this.v0 * this.timeInTheAir / 1000) - this.height / 2
        if (this.posY > this.groundHeight - this.height / 2) {
            this.posY = this.groundHeight - this.height / 2//reset
            this.state = 'RUNNING';
            this.timeInTheAir = 0
        }
    }

    duck() {
        this.state = 'DUCKING'
        this.height = this.nowSprite().height
        this.width = this.nowSprite().width

        this.posX = this.width / 2
        this.posY = this.groundHeight - this.height / 2
    }

    unDuck() {
        this.state = 'RUNNING'
        this.height = this.nowSprite().height
        this.width = this.nowSprite().width

        this.posX = this.width / 2
        this.posY = this.groundHeight - this.height / 2
    }
    nextSprite(delta: any){
        this.runSprites.nextSprite(delta);
        this.duckSprites.nextSprite(delta);
    }
    nowSprite(){
        switch(this.state){
            case "RUNNING":
            case "JUMPING":
                return this.runSprites.nowSprite();
                
            case "DUCKING":
                return this.duckSprites.nowSprite();
                
        }
    }
    update(delta: any){
        this.nextSprite(delta);
        switch(this.state){
            case 'JUMPING':
                this.jump(delta);
                break;
            case 'DUCKING':
                if (this.unDuckInput[0]){
                    this.unDuck();
                    break;
                }
            case "RUNNING":
                if (this.jumpInput[0] && this.duckInput[0]){
                    break;
                }
                else if (this.jumpInput[0]){
                    this.jump(delta);
                }
                else if (this.duckInput[0]){
                    this.duck();
                }
                break;
        }
    }
}