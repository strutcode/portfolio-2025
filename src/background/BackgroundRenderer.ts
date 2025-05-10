import PostProcessScene from '../rendering/ScreenQuadScene'
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

export default class BackgroundRenderer extends PostProcessScene {
  protected points: Float32Array = new Float32Array([
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
  ])
  protected colors: Float32Array = new Float32Array([
    ...[0.27450980392156865, 0.4, 0.9019607843137255],
    ...[0.09803921568627451, 0.15098039215686274, 0.8619607843137255],
    ...[0.03137254901960784, 0.996078431372549, 0.996078431372549],
  ])
  protected velocity = [
    [Math.random() * 2 - 1, Math.random() * 2 - 1],
    [Math.random() * 2 - 1, Math.random() * 2 - 1],
    [Math.random() * 2 - 1, Math.random() * 2 - 1],
  ]
  protected speed = 0.0003

  protected get vertexShaderSource() {
    return vertex
  }

  protected get fragmentShaderSource() {
    return fragment
  }

  protected setUniforms() {
    this.uniform1f('screen_width', this.canvas.width)
    this.uniform1f('screen_height', this.canvas.height)
    this.uniform3v('colors', this.colors)
    this.uniform2v('points', this.points)
  }

  protected update(delta: number) {
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

    // Update the points so that they move with velocity and bounce off the screen edges
    let x, y
    for (let i = 0; i < 2; i++) {
      x = this.points[i * 2]
      y = this.points[i * 2 + 1]

      // Update the position based on the velocity and speed
      x += this.velocity[i][0] * delta * this.speed
      y += this.velocity[i][1] * delta * this.speed

      // Reverse velocity when hitting the screen edges
      if (x < 0 || x > 1) {
        this.velocity[i][0] *= -1

        // Tweak the y velocity to introduce some variation
        this.velocity[i][1] += 0.1 * (Math.random() * 2 - 1)
      }
      if (y < 0 || y > 1) {
        this.velocity[i][1] *= -1

        // Tweak the x velocity to introduce some variation
        this.velocity[i][0] += 0.1 * (Math.random() * 2 - 1)
      }

      // Clamp the position to the screen edges to prevent "escaping"
      this.points[i * 2] = clamp(x, 0, 1)
      this.points[i * 2 + 1] = clamp(y, 0, 1)
    }
  }
}
