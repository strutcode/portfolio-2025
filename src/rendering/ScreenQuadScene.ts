import Scene from './Scene'

/**
 * A specialization of the Scene class that is used to render a screen quad
 * with a shader program.
 */
export default class ScreenQuadScene extends Scene {
  public upsample: number = 1.0

  protected canvas: HTMLCanvasElement
  protected ctx: WebGL2RenderingContext
  protected renderData: any = {}

  private boundRender = this.render.bind(this)
  private boundResize = this.resize.bind(this)
  private animationFrame: ReturnType<typeof requestAnimationFrame> = 0
  private notices: Record<string, boolean> | undefined
  private last = performance.now()

  /**
   * Overridable getter that should return the glsl source of the screen
   * quad vertex program.
   */
  protected get vertexShaderSource() {
    return `
    attribute vec4 a_position;
    void main() {
      gl_Position = a_position;
    }
  `
  }

  /**
   * Overridable getter that should return the glsl source of the screen
   * quad fragment program.
   */
  protected get fragmentShaderSource() {
    return `
    precision mediump float;
    void main() {
      vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `
  }

  /**
   * Creates a new PostProcessScene instance.
   *
   * @param element The element to render to. The viewport will inherit its size
   */
  public constructor(protected element: HTMLElement, upsample: number = 1.0) {
    super(element)
    this.upsample = upsample

    this.canvas = document.createElement('canvas')
    const ctx = this.canvas.getContext('webgl2')

    if (!ctx) {
      throw new Error('Failed to get WebGL context')
    }

    // Allow scoped styles to be applied by copying any v-* attributes
    // to the canvas element.
    for (const attr of element.attributes) {
      if (attr.name.startsWith('data-v-')) {
        this.canvas.setAttribute(attr.name, attr.value)
      }
    }

    this.ctx = ctx
    element.prepend(this.canvas)

    try {
      this.setup()
      requestAnimationFrame(this.boundRender)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  /**
   * Cleans up any dom elements, hanging resources and removes event listeners.
   */
  public destroy() {
    if (this.canvas) {
      this.canvas.remove()
    }

    window.removeEventListener('resize', this.boundResize)

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

    // Reserve shader program space
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) {
      throw new Error('Failed to create shaders')
    }

    // Compile shaders
    gl.shaderSource(vertexShader, this.vertexShaderSource)
    gl.shaderSource(fragmentShader, this.fragmentShaderSource)

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

    // Create an array buffer for the quad
    const vertices = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0])
    const positionBuffer = gl.createBuffer()
    if (!positionBuffer) {
      throw new Error('Failed to create buffer')
    }

    // Save data for use in the render step
    this.renderData = {
      vertexShader,
      fragmentShader,
      program,
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

  private uniformx(type: string, name: string, value: number | Float32Array) {
    const gl = this.ctx

    if (!this.renderData.program) {
      throw new Error('Program not initialized')
    }

    const location = gl.getUniformLocation(this.renderData.program, name)
    if (location) {
      ;(<any>gl)[type](location, value)
    } else {
      if (!this.notices?.[name]) {
        console.warn(`Set Uniform: '${name}' not found`)
        this.notices ??= {}
        this.notices[name] = true
      }
    }
  }

  public uniform1f(name: string, value: number) {
    this.uniformx('uniform1f', name, value)
  }

  public uniform2v(name: string, value: Float32Array) {
    this.uniformx('uniform2fv', name, value)
  }

  public uniform3v(name: string, value: Float32Array) {
    this.uniformx('uniform3fv', name, value)
  }

  public uniformsampler(name: string, value: number) {
    this.uniformx('uniform1i', name, value)
  }
}
