import PostProcessScene from '../rendering/ScreenQuadScene'

export default class BackgroundRenderer extends PostProcessScene {
  protected get vertexShaderSource() {
    return `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `
  }

  protected get fragmentShaderSource() {
    return `
      precision mediump float;
      uniform float screen_width;
      uniform float screen_height;
      void main() {
        vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);
        gl_FragColor = vec4(uv, 0.0, 1.0);
      }
    `
  }

  protected setUniforms() {
    this.uniform1f('screen_width', this.canvas.width)
    this.uniform1f('screen_height', this.canvas.height)
  }
}
