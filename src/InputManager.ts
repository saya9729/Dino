export class InputManager {
    queueKeyDown: any[];
    queueKeyUp: any[];// responses for input handling
    watchKeyDown: any[];
    watchStateDown: any[];
    watchKeyUp: any[];
    watchStateUp: any[];
    constructor() {
        this.queueKeyDown = [];
        this.queueKeyUp = [];
        this.watchKeyDown = [];
        this.watchStateDown = [];
        this.watchKeyUp = [];
        this.watchStateUp = [];
        document.addEventListener('keydown', (e) => { this.queueKeyDown.push(e.keyCode) })
        document.addEventListener('keyup', (e) => { this.queueKeyUp.push(e) });
    }

    processInput() {
        for (let i = 0; i < this.watchKeyDown.length; i++) {
            this.watchStateDown[i][0]=false;
            for (let j=0;j<this.queueKeyDown.length;j++){
                if (this.watchKeyDown[i]==this.queueKeyDown[j]){
                    this.watchStateDown[i][0]=true;
                    break;
                }
            }
        }
        for (let i = 0; i < this.watchKeyUp.length; i++) {
            this.watchStateUp[i][0]=false;
            for (let j=0;j<this.queueKeyUp.length;j++){
                if (this.watchKeyUp[i]==this.queueKeyUp[j]){
                    this.watchStateUp[i][0]=true;
                    break;
                }
            }
        }
        this.queueKeyDown.splice(0,this.queueKeyDown.length);
        this.queueKeyUp.splice(0,this.queueKeyUp.length);
    }
    addWatch(keyCode: any, keyState: any) {
        var state = [false];
        switch (keyState) {
            case 'down':
                this.watchKeyDown.push(keyCode);
                this.watchStateDown.push(state);
                return state;
            case 'up':
                this.watchKeyUp.push(keyCode);
                this.watchStateUp.push(state);
                return state;
        }
    }
}
