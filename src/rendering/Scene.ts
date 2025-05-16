/** An abstract class that defines the interface for a renderable viewport. */
export default abstract class Scene {
  protected canvas: HTMLCanvasElement
  protected ctx: WebGL2RenderingContext
  protected renderData: any = {}

  protected boundRender = this.render.bind(this)
  protected boundResize = this.resize.bind(this)
  protected animationFrame: ReturnType<typeof requestAnimationFrame> = 0
  protected notices: Record<string, boolean> | undefined
  protected last = performance.now()

  public constructor(protected element: HTMLElement) {
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
      // Late setup to allow subclasses to prepare
      setTimeout(() => {
        this.setup()
        requestAnimationFrame(this.boundRender)
      })
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  /** Called to initialize the renderer. */
  protected abstract setup(): void

  /** Should be called when the scene is no longer needed. */
  public destroy(): void {
    if (this.canvas) {
      this.canvas.remove()
    }

    window.removeEventListener('resize', this.boundResize)
  }

  /** Should be called when the element resizes. */
  protected resize(): void {
    const rect = this.element.getBoundingClientRect()

    this.canvas.width = rect.width
    this.canvas.height = rect.height
  }

  /** Called before rendering to do any work to prepare for rendering the scene. */
  protected abstract update(delta: number): void

  /** Called by the render loop function. */
  protected abstract render(): void

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
