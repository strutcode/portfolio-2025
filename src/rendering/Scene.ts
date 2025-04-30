/** An abstract class that defines the interface for a renderable viewport. */
export default abstract class Scene {
  public constructor(protected element: HTMLElement) {}

  /** Called to initialize the renderer. */
  protected abstract setup(): void

  /** Should be called when the scene is no longer needed. */
  public abstract destroy(): void

  /** Should be called when the element resizes. */
  protected abstract resize(): void

  /** Called before rendering to do any work to prepare for rendering the scene. */
  protected abstract update(delta: number): void

  /** Called by the render loop function. */
  protected abstract render(): void
}
