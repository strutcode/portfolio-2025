import Scene from '../rendering/Scene'
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

import {
  createBufferInfoFromArrays,
  createProgramInfo,
  drawBufferInfo,
  m4,
  setBuffersAndAttributes,
  setUniforms,
} from 'twgl.js'

export default class HeroScene extends Scene {
  protected setup() {
    const gl = this.ctx

    // Create the shader
    const programInfo = createProgramInfo(gl, [vertex, fragment])

    // Create an array buffer for the terrain
    // const vertices = new Float32Array(30 * 30 * 3)
    // for (let i = 0; i < 30; i++) {
    //   for (let j = 0; j < 30; j++) {
    //     vertices[i * 30 + j] = (i / 30) * 2 - 1
    //     vertices[i * 30 + j + 1] = Math.random() * 2 - 1
    //     vertices[i * 30 + j + 2] = (j / 30) * 2 - 1
    //   }
    // }

    const bufferInfo = createBufferInfoFromArrays(gl, {
      position: [
        1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1,
        1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1,
        1, -1, -1, 1, 1, -1, 1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1,
      ],
      normal: [
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1,
        0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
        0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
      ],
      texcoord: [
        1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
      ],
      indices: [
        0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18,
        16, 18, 19, 20, 21, 22, 20, 22, 23,
      ],
    })

    // Save data for use in the render step
    this.renderData = {
      programInfo,
      bufferInfo,
    }

    // Initialize the resize listener
    window.addEventListener('resize', this.boundResize)
    this.resize()
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
    const camera = m4.lookAt([1, 4, -6], [0, 0, 0], [0, 1, 0])
    const view = m4.inverse(camera)
    const viewProjection = m4.multiply(projection, view)
    const world = m4.rotationY(time)

    // Set up shader data
    setUniforms(programInfo, {
      time,
      resolution: [this.canvas.width, this.canvas.height],
      worldViewProjection: m4.multiply(viewProjection, world),
    })

    // Draw
    drawBufferInfo(gl, bufferInfo)

    // Wait for the next render loop
    this.animationFrame = requestAnimationFrame(this.boundRender)
  }

  protected update(delta: number) {}
}
