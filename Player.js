class Player {
  constructor(x, y, width, height, angle) {
    var options = {
      friction: 1.0,
      density: 2.5,
      isStatic: false,
      frictionStatic: 10,
    };
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    this.image = loadImage("sprites/base.png");
    World.add(world, this.body);
  }
  display() {
    var angle = this.body.angle;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }

  isTouching(obj) {
    var bodyPOS = obj.body.position;
    var malletPOS = this.body.position;
    if (
      bodyPOS.y - malletPOS.y <= obj.height / 2 + this.height / 2 &&
      malletPOS.y - bodyPOS.y <= obj.height / 2 + this.height / 2 &&
      bodyPOS.x - malletPOS.x <= obj.width / 2 + this.width / 2 &&
      malletPOS.x - bodyPOS.x <= obj.width / 2 + this.width / 2
    ) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }
}
