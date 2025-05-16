import Scene from '../rendering/Scene'
import terrainVertex from './shaders/terrainVertex.glsl'
import terrainFragment from './shaders/terrainFragment.glsl'

export default class HeroScene extends Scene {
  /**
   * Creates a new PostProcessScene instance.
   *
   * @param element The element to render to. The viewport will inherit its size
   */
  public constructor(protected element: HTMLElement) {
    super(element)
  }

  /**
   * Cleans up any dom elements, hanging resources and removes event listeners.
   */
  public destroy() {
    super.destroy()

    if (this.ctx) {
      const gl = this.ctx

      if (this.renderData.program) {
        gl.deleteProgram(this.renderData.program)
      }

      if (this.renderData.positionBuffer) {
        gl.deleteBuffer(this.renderData.positionBuffer)
      }

      if (gl.getSupportedExtensions()?.includes('WEBGL_lose_context')) {
        gl.getExtension('WEBGL_lose_context')?.loseContext()
      }

      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
      }
    }
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

  /** Adjusts the rendered scene to match the element's size. */
  protected resize() {
    const rect = this.element.getBoundingClientRect()

    this.canvas.width = (rect.width * this.upsample) / window.devicePixelRatio
    this.canvas.height = (rect.height * this.upsample) / window.devicePixelRatio
  }

  /** Sets up the WebGL context and compiles the shaders. */
  protected setup() {
    const gl = this.ctx

    // Create an array buffer for the terrain
    const vertices = new Float32Array(30 * 30)
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        vertices[i * 30 + j] = (i / 30) * 2 - 1
        vertices[j * 30 + i] = (j / 30) * 2 - 1
      }
    }

    const positionBuffer = gl.createBuffer()
    if (!positionBuffer) {
      throw new Error('Failed to create buffer')
    }

    // Load the terrain shader
    const terrainShader = this.createShader(terrainVertex, terrainFragment)

    // Save data for use in the render step
    this.renderData = {
      terrainShader,
      positionBuffer,
      vertices,
    }

    // Initialize the resize listener
    window.addEventListener('resize', this.boundResize)
    this.resize()
  }

  /**
   * Sets the uniforms for the shader program. This should be overridden by
   * subclasses to set their own uniforms.
   */
  protected setUniforms() {}

  /** The main render loop iterator. */
  protected render() {
    const gl = this.ctx
    const { positionBuffer, vertices, program } = this.renderData

    const now = performance.now()
    this.update(this.last - now)
    this.last = now

    // Reset the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Activate the shader
    gl.useProgram(program)

    // Set up shader data
    this.setUniforms()

    // Prepare the quad for rendering
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    if (positionLocation === -1) {
      throw new Error('Failed to get attribute location')
    }

    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Draw the quad
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    gl.flush()

    // Wait for the next render loop
    this.animationFrame = requestAnimationFrame(this.boundRender)
  }

  protected update(delta: number) {}

  private createShader(vertexSrc: string, fragmentSrc: string): WebGLProgram | undefined {
    const gl = this.ctx

    // Reserve shader program space
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) {
      throw new Error('Failed to create shaders')
    }

    // Compile shaders
    gl.shaderSource(vertexShader, vertexSrc)
    gl.shaderSource(fragmentShader, fragmentSrc)

    const program = gl.createProgram()
    if (!program) {
      throw new Error('Failed to create program')
    }

    gl.compileShader(vertexShader)
    if (gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) === false) {
      console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vertexShader))
      gl.deleteShader(vertexShader)
      return
    }
    gl.compileShader(fragmentShader)
    if (gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) === false) {
      console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fragmentShader))
      gl.deleteShader(fragmentShader)
      return
    }

    // Link the final shader program
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program)
      throw new Error(`Could not compile WebGL program. \n\n${info}`)
    }
  }
}
