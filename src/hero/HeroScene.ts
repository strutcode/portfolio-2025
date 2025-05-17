import Scene from '../rendering/Scene'
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

import {
  createProgramInfo,
  drawBufferInfo,
  m4,
  setBuffersAndAttributes,
  setUniforms,
  v3,
  createBufferInfoFromArrays,
  type ProgramInfo,
  type BufferInfo,
} from 'twgl.js'
import WavefrontLoader from './WavefrontLoader'

export default class HeroScene extends Scene {
  private objects: { programInfo: ProgramInfo; bufferInfo: BufferInfo }[] = []

  protected async setup() {
    const gl = this.ctx

    // Create the shader
    const programInfo = createProgramInfo(gl, [vertex, fragment])

    // Initialize the resize listener
    window.addEventListener('resize', this.boundResize)
    this.resize()

    // Load the model from the server
    WavefrontLoader.load('/terrain.obj').then((data) => {
      this.objects.push({
        programInfo,
        bufferInfo: createBufferInfoFromArrays(gl, data),
      })
    })
  }

  /** Pauses the render loop. */
  protected pause() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  }

  /** Resumes the render loop if it's paused. */
  protected resume() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }

    this.animationFrame = requestAnimationFrame(this.boundRender)
  }

  protected render() {
    const gl = this.ctx
    const darkMode = document.documentElement.classList.contains('dark-theme')

    const now = performance.now()
    this.update(this.last - now)
    this.last = now

    // Reset the canvas
    if (darkMode) {
      gl.clearColor(0.03, 0.03, 0.1, 1.0)
    } else {
      gl.clearColor(0.7, 0.8, 1.0, 1.0)
    }
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Enable basic features
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)

    // Calculate all global data
    const time = performance.now() / 1000
    const projection = m4.perspective(
      (30 * Math.PI) / 180,
      this.canvas.width / this.canvas.height,
      0.1,
      100,
    )
    const camera = m4.lookAt([1, 1.2, -8], [0, 1, 0], [0, 1, 0])
    const view = m4.inverse(camera)
    const viewProjection = m4.multiply(projection, view)

    for (let object of this.objects) {
      const { programInfo, bufferInfo } = object
      const world = m4.identity()

      // Activate the shader
      gl.useProgram(programInfo.program)

      // Prepare the mesh for rendering
      setBuffersAndAttributes(gl, programInfo, bufferInfo)

      // Set up shader data
      setUniforms(programInfo, {
        time,
        resolution: [this.canvas.width, this.canvas.height],
        world,
        worldViewProjection: m4.multiply(viewProjection, world),
        lightDirection: v3.normalize(v3.create(0.5, -0.2, 1)),
        shadowColor: darkMode ? [0.01, 0.03, 0.1] : [0.1, 0.3, 0.14],
        lightColor: darkMode ? [0.05, 0.14, 0.05] : [0.6, 0.87, 0.6],
      })

      // Draw
      drawBufferInfo(gl, bufferInfo)
    }

    // Wait for the next render loop
    this.animationFrame = requestAnimationFrame(this.boundRender)
  }

  protected update(delta: number) {}
}
