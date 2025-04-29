import ScreenQuadScene from '../rendering/ScreenQuadScene'

export default class RayTracer extends ScreenQuadScene {
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

  public constructor(protected element: HTMLElement) {
    super(element)
  }

  protected setUniforms() {
    const gl = this.ctx
    const { program } = this.renderData

    const screenWidthLocation = gl.getUniformLocation(program, 'screen_width')
    if (screenWidthLocation) {
      gl.uniform1f(screenWidthLocation, this.canvas.width)
    }

    const screenHeightLocation = gl.getUniformLocation(program, 'screen_height')
    if (screenHeightLocation) {
      gl.uniform1f(screenHeightLocation, this.canvas.height)
    }
  }
}
