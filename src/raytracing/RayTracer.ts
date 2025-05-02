import ScreenQuadScene from '../rendering/ScreenQuadScene'
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

export default class RayTracer extends ScreenQuadScene {
  protected get vertexShaderSource() {
    return vertex
  }

  protected get fragmentShaderSource() {
    return fragment
  }

  protected setUniforms() {
    this.uniform1f('screen_width', this.canvas.width)
    this.uniform1f('screen_height', this.canvas.height)
  }
}
