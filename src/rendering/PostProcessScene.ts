import Scene from './Scene'

export default class PostProcessScene extends Scene {
  private canvas: HTMLCanvasElement
  private ctx: WebGL2RenderingContext
  private renderData: any = {}

  private boundRender = this.render.bind(this)
  private boundResize = this.resize.bind(this)
  private animationFrame: ReturnType<typeof requestAnimationFrame> = 0

  public constructor(protected element: HTMLElement) {
    super(element)

    this.canvas = document.createElement('canvas')
    const ctx = this.canvas.getContext('webgl2')

    if (!ctx) {
      throw new Error('Failed to get WebGL context')
    }

    this.ctx = ctx
    element.prepend(this.canvas)

    this.setup()
    requestAnimationFrame(this.boundRender)
  }

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

  protected resize() {
    const rect = this.element.getBoundingClientRect()

    this.canvas.width = rect.width
    this.canvas.height = rect.height
  }

  protected setup() {
    const gl = this.ctx

    // Set up a simple shader program
    const vertexShaderSource = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `
    const fragmentShaderSource = `
      precision mediump float;
      uniform float screen_width;
      uniform float screen_height;
      void main() {
        vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);
        gl_FragColor = vec4(uv, 0.0, 1.0);
      }
    `

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) {
      throw new Error('Failed to create shaders')
    }

    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.shaderSource(fragmentShader, fragmentShaderSource)

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

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program)
      throw new Error(`Could not compile WebGL program. \n\n${info}`)
    }

    const vertices = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0])
    const positionBuffer = gl.createBuffer()
    if (!positionBuffer) {
      throw new Error('Failed to create buffer')
    }

    this.renderData = {
      vertexShader,
      fragmentShader,
      program,
      positionBuffer,
      vertices,
    }

    window.addEventListener('resize', this.boundResize)
    this.resize()
  }

  protected render() {
    // Draw a simple viewport rectangle using WebGL2
    const gl = this.ctx
    const { positionBuffer, vertices, program } = this.renderData

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    gl.useProgram(program)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    if (positionLocation === -1) {
      throw new Error('Failed to get attribute location')
    }

    const screenWidthLocation = gl.getUniformLocation(program, 'screen_width')
    if (screenWidthLocation) {
      gl.uniform1f(screenWidthLocation, this.canvas.width)
    }
    const screenHeightLocation = gl.getUniformLocation(program, 'screen_height')
    if (screenHeightLocation) {
      gl.uniform1f(screenHeightLocation, this.canvas.height)
    }

    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    gl.flush()

    this.animationFrame = requestAnimationFrame(this.boundRender)
  }
}
