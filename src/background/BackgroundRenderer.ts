import PostProcessScene from '../rendering/ScreenQuadScene'
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

export default class BackgroundRenderer extends PostProcessScene {
  protected points: Float32Array = new Float32Array([
    Math.random() * this.canvas.width,
    Math.random() * this.canvas.height,
    Math.random() * this.canvas.width,
    Math.random() * this.canvas.height,
  ])
  protected colors: Float32Array = new Float32Array([
    ...[0.5647058823529412, 0, 0.4235294117647059], // purple
    ...[0.8470588235294118, 0.08627450980392157, 0.23137254901960785], // red
    ...[1, 0.3607843137254902, 0.12941176470588237], // orange
  ])
  protected velocity = [
    [Math.random() * 2 - 1, Math.random() * 2 - 1],
    [Math.random() * 2 - 1, Math.random() * 2 - 1],
    [Math.random() * 2 - 1, Math.random() * 2 - 1],
  ]
  protected speed = 0.25

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
      if (x < 0 || x > this.canvas.width) {
        this.velocity[i][0] *= -1

        // Tweak the y velocity to introduce some variation
        this.velocity[i][1] += 0.1 * (Math.random() * 2 - 1)
      }
      if (y < 0 || y > this.canvas.height) {
        this.velocity[i][1] *= -1

        // Tweak the x velocity to introduce some variation
        this.velocity[i][0] += 0.1 * (Math.random() * 2 - 1)
      }

      // Clamp the position to the screen edges to prevent "escaping"
      this.points[i * 2] = clamp(x, 0, this.canvas.width)
      this.points[i * 2 + 1] = clamp(y, 0, this.canvas.height)
    }
  }
}
