export default class Scene {
  private disposeCallbacks: (() => void)[] = []
  private renderCallbacks: ((delta: number) => void)[] = []

  public dispose(): void {
    for (const callback of this.disposeCallbacks) {
      callback()
    }
  }

  public render(delta: number): void {
    for (const callback of this.renderCallbacks) {
      callback(delta)
    }
  }

  protected onDispose(callback: () => void): void {
    this.disposeCallbacks.push(callback)
  }

  protected onRender(callback: (delta: number) => void): void {
    this.renderCallbacks.push(callback)
  }
}
