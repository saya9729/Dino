import { gameController } from './game_controller'

const controller = new gameController();
let lastTime = window.performance.now();
let delta = 0;

document.addEventListener('keydown', function (e) { controller.isKeyDown(e) });
document.addEventListener('keyup', function (e) { controller.isKeyUp(e) });

function processInput() {
  controller.processInput();
}
function update(delta: number) {
  controller.update(delta);
}
function render() {
  controller.drawFrame();
}
requestAnimationFrame(loop)
export function loop(timeStamp: number) {
  delta = timeStamp - lastTime

  processInput()
  update(delta)
  render()

  lastTime = timeStamp
  
  requestAnimationFrame(loop)
}