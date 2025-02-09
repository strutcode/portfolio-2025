import Camera from './Camera'

export default abstract class Scene {
  public camera: Camera

  protected context: WebGLRenderingContext | null
  protected canvas: HTMLCanvasElement

  // This prevents unnecessarily costly rebinds on every frame drawn
  private boundRender = this.render.bind(this)
  private renderHandle?: number
  private previousTime = performance.now()
  private frameCount = 0
  private frameTime = performance.now()
  private frameRate = 0

  public constructor(canvas: HTMLCanvasElement) {
    // Initialize WebGL
    this.context = canvas.getContext('webgl')

    if (!this.context) {
      throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.')
    }

    if (this.context.canvas instanceof OffscreenCanvas) {
      throw new Error('OffscreenCanvas is not supported')
    }

    this.canvas = this.context.canvas

    // Create a simple camera
    this.camera = new Camera(canvas)

    // Start the render loop
    requestAnimationFrame(this.boundRender)

    setInterval(this.captureFramerate.bind(this), 1000)
  }

  public getContext() {
    if (!this.context) {
      throw new Error('getContext: Invalid scene')
    }

    return this.context
  }

  public render() {
    // If this context is no longer valid, exit the render loop immediately
    if (!this.context) return

    const gl = this.context

    // Set up display
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.camera.setAspectRatio(this.canvas.clientWidth, this.canvas.clientHeight)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Turn off depth test because everything is transparent
    gl.disable(gl.DEPTH_TEST)

    // Enable blending
    // Because the final frame is also transparent we have to use two blend functions to get the correct result
    gl.enable(gl.BLEND)
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    // Prepare the camera for the frame
    this.camera.render(gl)

    // Keep speed constant with varying framerate
    const presentTime = performance.now()
    const deltaSeconds = (presentTime - this.previousTime) / 1000

    this.animate(deltaSeconds)

    this.previousTime = presentTime
    this.frameCount++

    this.renderHandle = requestAnimationFrame(this.boundRender)
  }

  public dispose() {
    if (this.renderHandle) {
      cancelAnimationFrame(this.renderHandle)
    }

    if (this.context) {
      const gl = this.context

      // Minimize frame buffers before GC
      gl.canvas.width = 1
      gl.canvas.height = 1

      // If the lose context extension is available clean up after ourselves
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }

    // Clear the context to stop the animation frame loop
    this.context = null
  }

  protected abstract animate(deltaSeconds: number): void

  private captureFramerate() {
    const now = performance.now()
    const delta = now - this.frameTime

    this.frameRate = (this.frameCount * 1000) / delta
    this.frameCount = 0
    this.frameTime = performance.now()
  }
}
