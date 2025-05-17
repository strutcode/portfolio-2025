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
  primitives,
  createBufferInfoFromArrays,
} from 'twgl.js'
import WavefrontLoader from './WavefrontLoader'

export default class HeroScene extends Scene {
  protected async setup() {
    const gl = this.ctx

    // Create the shader
    const programInfo = createProgramInfo(gl, [vertex, fragment])

    // Create an array buffer for the terrain
    const bufferInfo = primitives.createPlaneBufferInfo(gl, 50, 50, 30, 30)

    // Save data for use in the render step
    this.renderData = {
      programInfo,
      bufferInfo,
    }

    // Initialize the resize listener
    window.addEventListener('resize', this.boundResize)
    this.resize()

    WavefrontLoader.load('/terrain.obj').then((data) => {
      this.renderData.bufferInfo = createBufferInfoFromArrays(gl, data)
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
    const { programInfo, bufferInfo } = this.renderData

    const now = performance.now()
    this.update(this.last - now)
    this.last = now

    // Reset the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.enable(gl.CULL_FACE)

    // Activate the shader
    gl.useProgram(programInfo.program)

    // Prepare the mesh for rendering
    setBuffersAndAttributes(gl, programInfo, bufferInfo)

    // Calculate a perspective camera
    const time = performance.now() / 1000
    const projection = m4.perspective(
      (30 * Math.PI) / 180,
      this.canvas.width / this.canvas.height,
      0.1,
      100,
    )
    const camera = m4.lookAt([1, 2, -25], [0, 0, 0], [0, 1, 0])
    const view = m4.inverse(camera)
    const viewProjection = m4.multiply(projection, view)
    const world = m4.rotationY(time)

    // Set up shader data
    setUniforms(programInfo, {
      time,
      resolution: [this.canvas.width, this.canvas.height],
      world,
      worldViewProjection: m4.multiply(viewProjection, world),
      lightDirection: v3.normalize(v3.create(0.5, 0.7, 1)),
    })

    // Draw
    drawBufferInfo(gl, bufferInfo)

    // Wait for the next render loop
    this.animationFrame = requestAnimationFrame(this.boundRender)
  }

  protected update(delta: number) {}
}
