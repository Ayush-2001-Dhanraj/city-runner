class Particle {
  constructor(game) {
    this.game = game;
    this.markedForRemoval = false;
  }
  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;

    this.size *= 0.95;

    if (this.size < 0.1) this.markedForRemoval = true;
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 10;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "rgba(0,0,0,0.1)";
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    this.x = x;
    this.y = y;
    this.image = fire;
    this.speedX = 1;
    this.speedY = 1;
    this.size = Math.random() * 50 + 100;
    this.angle = 0;
    this.va = Math.random() * 0.2 + 0.1;
  }
  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 5);
  }
  draw(context) {
    context.save();
    context.globalAlpha = 0.8;
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}

export class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 50 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.2;
    this.image = fire;
    this.speedX = Math.random() * 20 - 10;
    this.speedY = Math.random() * 5 + 5;
    this.gravity = 0.1;
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}
