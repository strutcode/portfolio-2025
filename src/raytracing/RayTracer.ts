import ScreenQuadScene from '../rendering/ScreenQuadScene'
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'
import RgbeReader from './util/RgbeReader'

export default class RayTracer extends ScreenQuadScene {
  protected get vertexShaderSource() {
    return vertex
  }

  protected get fragmentShaderSource() {
    return fragment
  }

  protected setup() {
    super.setup()

    this.loadHDRImage('/HDR_029_Sky_Cloudy_Env.hdr', 0)
    this.loadHDRImage('/rogland_clear_night_1k.hdr', 1)
  }

  /**
   * Loads an HDR image and sets it as a texture.
   * @param image The HDR image to load.
   */
  protected async loadHDRImage(url: string, index: number) {
    const gl = this.ctx

    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to load HDR image: ${res.statusText}`)
    }
    const arrayBuffer = await res.arrayBuffer()

    const reader = new RgbeReader(arrayBuffer)
    const { width, height, data } = reader.read()

    // Create a texture
    const texture = gl.createTexture()
    if (!texture) {
      throw new Error('Failed to create texture')
    }

    // Activate the appropriate texture unit
    gl.activeTexture(gl.TEXTURE0 + index)

    // Bind the texture
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // Set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    // Upload the image to the GPU
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB16F, width, height, 0, gl.RGB, gl.FLOAT, data)
  }

  protected setUniforms() {
    this.uniform1f('screen_width', this.canvas.width)
    this.uniform1f('screen_height', this.canvas.height)
    this.uniform1f('time', performance.now())

    const isDarkMode = document.documentElement.classList.contains('dark-theme')

    // Set the texture based on light or dark mode
    this.uniformsampler('background', isDarkMode ? 1 : 0)
  }
}
