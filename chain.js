class Chain {
  constructor(body1, body2, point1,point2, ) {
    var options = {
      bodyA: body1,
      bodyB: body2,
      pointB: point2,
      pointA: point1,
      stiffness: 1.7,
      length:0,
    };
    this.chain = Constraint.create(options);
    World.add(world, this.chain);
  }
  display() {
    if (this.chain.bodyA && this.chain.bodyB) {
      var startX = this.chain.bodyA.position.x + this.chain.pointA.x;
      var startY = this.chain.bodyA.position.y + this.chain.pointA.y;
      var endX = this.chain.bodyB.position.x + this.chain.pointB.x;
      var endY = this.chain.bodyB.position.y + this.chain.pointB.y;
      strokeWeight(4);
      stroke(0);
      line(startX, startY, endX, endY);
    }
  }
  remove() {
    this.chain.bodyA = null;
    this.chain.bodyB = null;
    World.remove(world, this.chain);
  }
}
