class game_controller {
  constructor(high_score) {
    this.ground_img = new Image()
    this.ground_img.src = './ground.png'
    this.cactus_1_img = new Image()
    this.cactus_1_img.src = './cactus_1.png'
    this.cactus_2_img = new Image()
    this.cactus_2_img.src = './cactus_2.png'
    this.cactus_3_img = new Image()
    this.cactus_3_img.src = './cactus_3.png'
    this.cactus_big_1_img = new Image()
    this.cactus_big_1_img.src = './cactus_big_1.png'
    this.cactus_big_2_img = new Image()
    this.cactus_big_2_img.src = './cactus_big_2.png'
    this.cactus_big_3_img = new Image()
    this.cactus_big_3_img.src = './cactus_big_3.png'
    this.bird_1_img = new Image()
    this.bird_1_img.src = './bird_1.png'
    this.dino_1_img = new Image()
    this.dino_1_img.src = './dino_1.png'
    this.dino_duck_1_img = new Image()
    this.dino_duck_1_img.src = './dino_duck_1.png'
    this.bird_2_img = new Image()
    this.bird_2_img.src = './bird_2.png'
    this.dino_2_img = new Image()
    this.dino_2_img.src = './dino_2.png'
    this.dino_duck_2_img = new Image()
    this.dino_duck_2_img.src = './dino_duck_2.png'
    this.restart_button_img = new Image()
    this.restart_button_img.src = './restart_button.png'
    this.game_over_img = new Image()
    this.game_over_img.src = './game_over.png'

    this.level_1_bird_height = 34// later
    this.level_2_bird_height = 98// later
    this.level_3_bird_height = 162// later

    this.canvas = document.getElementById('gamezone')
    this.context = this.canvas.getContext('2d')
    this.scoreshow = document.getElementById('score')
    this.high_scoreshow = document.getElementById('high_score')
    this.player = new dino(this.dino_1_img.width, this.dino_1_img.height, this.canvas.height, [this.dino_1_img, this.dino_2_img], [this.dino_duck_1_img, this.dino_duck_2_img], 333)
    this.obstacle_array = []
    this.speed = 7// later
    this.acceleration = 0.0001// later
    this.is_running = true
    this.score = 0
    this.high_score = high_score
    this.offset = 28
  }

  create_obstacle() {
    const obstacle_id = Math.round(Math.random() * 8)
    switch (obstacle_id) {
      case 0:
        return new obstacle(this.cactus_1_img.width, this.cactus_1_img.height, this.canvas.width, this.canvas.height - this.cactus_1_img.height / 2, [this.cactus_1_img], 500)
      case 1:
        return new obstacle(this.cactus_2_img.width, this.cactus_2_img.height, this.canvas.width, this.canvas.height - this.cactus_2_img.height / 2, [this.cactus_2_img], 500)
      case 2:
        return new obstacle(this.cactus_3_img.width, this.cactus_3_img.height, this.canvas.width, this.canvas.height - this.cactus_3_img.height / 2, [this.cactus_3_img], 500)
      case 3:
        return new obstacle(this.cactus_big_1_img.width, this.cactus_big_1_img.height, this.canvas.width, this.canvas.height - this.cactus_big_1_img.height / 2, [this.cactus_big_1_img], 500)
      case 4:
        return new obstacle(this.cactus_big_2_img.width, this.cactus_big_2_img.height, this.canvas.width, this.canvas.height - this.cactus_big_2_img.height / 2, [this.cactus_big_2_img], 500)
      case 5:
        return new obstacle(this.cactus_big_3_img.width, this.cactus_big_3_img.height, this.canvas.width, this.canvas.height - this.cactus_big_3_img.height / 2, [this.cactus_big_3_img], 500)
      case 6:
        return new obstacle(this.bird_1_img.width, this.bird_1_img.height, this.canvas.width, this.canvas.height - this.level_1_bird_height, [this.bird_1_img, this.bird_2_img], 333)
      case 7:
        return new obstacle(this.bird_1_img.width, this.bird_1_img.height, this.canvas.width, this.canvas.height - this.level_2_bird_height, [this.bird_1_img, this.bird_2_img], 333)
      case 8:
        return new obstacle(this.bird_1_img.width, this.bird_1_img.height, this.canvas.width, this.canvas.height - this.level_3_bird_height, [this.bird_1_img, this.bird_2_img], 333)
    }
  }

  move_world(speed) {
    if (this.obstacle_array.length == 0) { this.obstacle_array.push(this.create_obstacle()) }
    for (let i = 0; i < this.obstacle_array.length; i++) {
      if (this.obstacle_array[i].pos_x < 0) {
        this.obstacle_array.shift()
      } else { this.obstacle_array[i].move(speed) }
    }
    if (this.obstacle_array[this.obstacle_array.length - 1].pos_x <= this.canvas.width / (2.7 - Math.random())) { // later
      this.obstacle_array.push(this.create_obstacle())
    }
  }

  is_collide(obstacle) {
    if (Math.abs(this.player.pos_x - obstacle.pos_x) < (this.player.width + obstacle.width) / 2 && Math.abs(this.player.pos_y - obstacle.pos_y) < (this.player.height + obstacle.height) / 2) { return true }
    return false
  }

  check_lose() {
    for (let i = 0; i < this.obstacle_array.length; i++) {
      if (this.is_collide(this.obstacle_array[i])) { this.is_running = false }
      break
    }
  }

  update(delta, user_input) {
    switch (user_input) {
      case 'JUMP':
        this.player.jump(delta)
        break;
      case 'DUCK':
        this.player.duck(this.dino_duck_1_img.width, this.dino_duck_1_img.height)
        break;
      case 'UNDUCK':
        this.player.un_duck(this.dino_1_img.width, this.dino_1_img.height)
        break;
    }
    this.player.next_sprite(delta)
    for (let i = 0; i < this.obstacle_array.length; i++) {
      this.obstacle_array[i].next_sprite(delta)
    }

    this.move_world(this.speed)
    this.speed += this.acceleration
    this.check_lose()
    if (!this.is_running) {
      if (this.high_score < this.score) {
        this.high_score = this.score
      }
      this.score = 0
    } else { this.score += this.speed * delta }
  }

  draw_frame() {
    this.context.drawImage(this.ground_img, 0, this.canvas.height - this.ground_img.height)
    this.context.drawImage(this.player.now_sprite(), this.player.pos_x - this.player.width / 2, this.player.pos_y - this.player.height / 2 - this.offset)

    for (let i = 0; i < this.obstacle_array.length; i++) {
      this.context.drawImage(this.obstacle_array[i].now_sprite(), this.obstacle_array[i].pos_x - this.obstacle_array[i].width / 2, this.obstacle_array[i].pos_y - this.obstacle_array[i].height / 2 - this.offset)
    }
    this.scoreshow.innerHTML = 'Score: ' + Math.round(this.score / 100)
    this.high_scoreshow.innerHTML = 'High score: ' + Math.round(this.high_score / 100)

    if (!this.is_running) {
      this.context.drawImage(this.game_over_img, this.canvas.width / 2 - this.game_over_img.width / 2, this.canvas.height / 2 - (this.game_over_img.height + this.offset + this.restart_button_img.height) / 2)
      this.context.drawImage(this.restart_button_img, this.canvas.width / 2 - this.restart_button_img.width / 2, this.canvas.height / 2 + this.offset / 2)
    }
  }
}

class dino {
  constructor(width, height, ground_height, sprite_array, sprite_array_duck, delay) {
    this.time_to_land = 2 * this.v0 * 1000 / this.g//ms questionable behavior
    this.width = width
    this.height = height
    this.pos_x = width / 2
    this.pos_y = ground_height - height / 2
    this.state = 'RUNNING'
    this.jump_height = 150//later
    this.ground_height = ground_height
    this.g = -3000//gravity
    this.v0 = Math.sqrt((-2) * this.g * this.jump_height)
    this.time_in_the_air = 0


    this.sprite_array = sprite_array
    this.sprite_array_duck = sprite_array_duck
    this.last_index = 0
    this.delay = delay
    this.now_delay = 0
  }

  next_sprite(delta) {
    if (this.now_delay + delta >= this.delay) {
      this.last_index = (this.last_index + 1) % this.sprite_array.length
      this.now_delay = this.now_delay + delta - this.delay
    } else { this.now_delay += delta; }
  }

  now_sprite() {
    if (this.state == 'DUCKING') {
      return this.sprite_array_duck[this.last_index]
    }
    return this.sprite_array[this.last_index]
  }

  jump(delta) {
    this.state = 'JUMPING';
    this.time_in_the_air += delta
    this.pos_y = this.ground_height - (this.g * 0.5 * this.time_in_the_air * this.time_in_the_air / (1000 * 1000) + this.v0 * this.time_in_the_air / 1000) - this.height / 2
    if (this.pos_y > this.ground_height - this.height / 2) {
      this.pos_y = this.ground_height - this.height / 2//reset
      this.state = 'RUNNING';
      this.time_in_the_air = 0
    }
  }

  duck(width, height) {
    this.state = 'DUCKING'
    this.height = height
    this.width = width

    this.pos_x = this.width / 2
    this.pos_y = this.ground_height - this.height / 2
  }

  un_duck(width, height) {
    this.state = 'RUNNING'
    this.height = height
    this.width = width

    this.pos_x = this.width / 2
    this.pos_y = this.ground_height - this.height / 2
  }
}

class obstacle {
  constructor(width, height, pos_x, pos_y, sprite_array, delay) {
    this.width = width
    this.height = height
    this.pos_x = pos_x
    this.pos_y = pos_y


    this.sprite_array = sprite_array
    this.last_index = 0
    this.delay = delay
    this.now_delay = 0
  }

  next_sprite(delta) {
    if (this.now_delay + delta >= this.delay) {
      this.last_index = (this.last_index + 1) % this.sprite_array.length
      this.now_delay = this.now_delay + delta - this.delay
    } else { this.now_delay += delta; }
  }

  now_sprite() {
    return this.sprite_array[this.last_index]
  }

  move(speed) {
    this.pos_x -= speed
  }
}

let input_queue = []
let user_input = 'NONE'
var controller = new game_controller(0)
let lastTime = window.performance.now()
let delta = 0
let game_tick = 16// ms

document.addEventListener('keydown', function (e) {
  if (e.keyCode == 32 || e.keyCode == 38) {
    input_queue.push('JUMP')
    if (!controller.is_running) {
      controller.is_running = true
      controller = new game_controller(controller.high_score)

      requestAnimationFrame(loop)
    }
  }
  if (e.keyCode == 40) { input_queue.push('DUCK') }
})
document.addEventListener('keyup', function (e) {
  if (e.keyCode == 40) {
    input_queue.push('UNDUCK')
  }
})

function processInput() {
  switch (controller.player.state) {
    case 'JUMPING':
      user_input = 'JUMP';
      break
    case 'DUCKING':
      for (let i = 0; i < input_queue.length; i++) {
        if (input_queue[i] == 'UNDUCK' || input_queue[i] == 'UNDUCK') {
          user_input = "UNDUCK";
          input_queue = []
          return
        }
      }
      user_input = 'DUCK';
      break
    case 'RUNNING':
      if (input_queue.length > 0) { user_input = input_queue[0]; }
      else { user_input = "NONE"; }
      break
  }
  input_queue = []
}

function update(delta, user_input) {
  controller.update(delta, user_input)
}

function render() {
  controller.draw_frame()
}

requestAnimationFrame(loop)
function loop(timeStamp) {
  delta = timeStamp - lastTime

  processInput()
  update(delta, user_input)
  render()

  lastTime = timeStamp

  if (controller.is_running) {
    requestAnimationFrame(loop)
  }
}
