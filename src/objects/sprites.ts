export class sprite {
    spriteArray: any
    lastIndex: number
    delay: any
    nowDelay: number
    constructor(spriteArray: HTMLImageElement[],delay: number) {
        this.spriteArray = spriteArray
        this.lastIndex = 0
        this.delay = delay
        this.nowDelay = 0
    }
    nextSprite(delta: number) {
        if (this.nowDelay + delta >= this.delay) {
            this.lastIndex = (this.lastIndex + 1) % this.spriteArray.length
            this.nowDelay = this.nowDelay + delta - this.delay
        } else { this.nowDelay += delta; }
    }

    nowSprite() {
        return this.spriteArray[this.lastIndex]
    }
}