let sketch = function (p) {
  const THE_SEED = p.floor(p.random(9999999));
  const particle_set_size = 3000;
  const number_of_sets = 1;
  const band_width = 0.06;
  const band_dist = 0.068;
  const zoom = 1.8;

  let particle_sets = [];

  p.setup = function () {
    p.createCanvas(1200, 1200);
    p.background('#e7e7db');

    p.randomSeed(THE_SEED);

    p.stroke(25, 35, 60, 20);
    p.smooth();

    for (var j = 0; j < number_of_sets; j++) {
      let set = [];
      for (var i = 0; i < particle_set_size; i++) {
        set.push(
          new Particle(
            p.randomGaussian(p.width / 2, 140),
            p.randomGaussian(p.height / 2, 140),
            p.random(p.TWO_PI)
          )
        );
      }
      particle_sets.push(set);
    }
  };

  p.draw = function () {
    particle_sets.forEach(function (particles, index) {
      particles.forEach(function (particle) {
        particle.update(index);
        particle.display(index);
      });
    });
  };

  p.keyPressed = function () {
    if (p.keyCode === 80) p.saveCanvas('aquarelle_' + THE_SEED, 'jpeg'); // Press P to download image
  };

  class Particle {
    constructor(x, y, angle) {
      this.pos = p.createVector(x, y);
      this.angle = angle;
    }

    update(index) {
      this.pos.x += p.cos(this.angle);
      this.pos.y += p.sin(this.angle);

      let nx = zoom * p.map(this.pos.x, 0, p.width, -1, 1);
      let ny = zoom * p.map(this.pos.y, 0, p.height, -1, 1);

      this.altitude =
        p.noise(nx + 423.2, ny - 231.1) +
        0.1 * p.noise(nx * 15 + 113.3, ny * 15 + 221.1);

      this.val = (this.altitude + band_dist * (index - number_of_sets / 2)) % 1;
      this.angle += 3 * p.map(this.val, 0, 1, -1, 1);
    }

    display() {
      if (this.val > 0.5 - band_width / 2 && this.val < 0.5 + band_width / 2) {
        p.point(this.pos.x, this.pos.y);
      }
    }
  }
};

new p5(sketch);
