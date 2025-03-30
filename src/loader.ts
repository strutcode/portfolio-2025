/**
 * This minimal script is loaded before everything else
 * to pre-warm data for the rest of the site.
 */

// Load this statically to ensure it's part of the initial bundle
import logo from '@/assets/logo.svg?raw'

// Embed minimal loader styles into this bundle
import './loader.css'

/** Augment the window object with custom data */
declare global {
  interface Window {
    sceneBlob?: string
  }

  interface ImportMeta {
    bundle: Record<string, string>
  }
}

/** A simple progress indicator class */
export class ProgressIndicator {
  private bytesLoaded = 0
  private bytesTotal = 0

  constructor(private element: HTMLElement) {}

  /** Adds N bytes to the total expected size. */
  public track(bytesToAdd: number) {
    this.bytesTotal += bytesToAdd
    this.update()
  }

  /** Adds N bytes of progress to the progress meter. */
  public load(bytesToAdd: number) {
    this.bytesLoaded += bytesToAdd
    this.update()
  }

  /** Updates the visual progress bar. */
  update() {
    this.element.style.width = `${(this.bytesLoaded / this.bytesTotal) * 100}%`
  }
}

export class Preloader {
  /** The main loading function responsible for prelaoding the app. */
  public async start() {
    // Create the loader screen
    this.createLoader()

    // Create a progress indicator
    const progress = new ProgressIndicator(document.querySelector('.progress') as HTMLElement)

    // Preload the scene and scripts concurrently
    await Promise.all([this.preloadScene(progress), this.preloadBundle(progress)])

    // Load the main app using Vite's module loader
    const { start } = await import('./index')

    // Manually run the start function from the app
    // once the module requirements are all satisfied
    start()

    // Remove the loader after the app is officially loaded
    this.cleanupLoader()
  }

  /**
   * Manually executes the body reader on a fetch object
   * to track progress.
   */
  protected async trackProgress(response: Response, progress: ProgressIndicator): Promise<Blob> {
    const size = Number(response.headers.get('content-length'))
    const reader = response.body?.getReader()

    if (!reader) throw new Error('Failed to create a reader')

    let buffer = new Uint8Array(size)
    let loaded = 0

    progress.track(size)

    while (true) {
      const { done, value } = await reader.read()
      const length = value?.byteLength ?? 0

      // If the reader reports done, exit the loops
      if (done) break

      // Update the progress bar
      progress.load(length)

      // Expand the buffer if needed (bad content-size header)
      if (loaded + length > buffer.byteLength) {
        const newBuffer = new Uint8Array(loaded + length)
        newBuffer.set(buffer)
        buffer = newBuffer
      }

      // Copy the bytes into the buffer
      buffer.set(new Uint8Array(value), loaded)

      // Update the total bytes loaded
      loaded += length
    }

    // Return the buffer as a blob to fulfill the type contract
    return new Blob([buffer])
  }

  /** Creates the loading screen DOM and utilities. */
  protected createLoader() {
    const loader = document.createElement('div')
    loader.id = 'loader'
    loader.innerHTML = `
      <div class="loadingBar">
        <div class="progress"></div>
      </div>
    `

    // Use the raw SVG data to create an image element
    const loaderLogo = document.createElement('img')
    loaderLogo.src = `data:image/svg+xml,${encodeURIComponent(logo)}`
    loader.prepend(loaderLogo)

    document.body.appendChild(loader)
  }

  /** Tears down the loading screen and its associated objects. */
  protected cleanupLoader() {
    const loader = document.getElementById('loader')
    if (loader) {
      loader.remove()
    }
  }

  protected async preloadScene(progress: ProgressIndicator) {
    const buffer = await fetch('/models/meteor.glb').then((res) =>
      this.trackProgress(res, progress),
    )
    const blobUrl = URL.createObjectURL(buffer)
    window.sceneBlob = blobUrl
  }

  protected async preloadBundle(progress: ProgressIndicator) {
    const bundleUrl = import.meta.bundle?.app ?? import.meta.resolve('./index.ts')

    await fetch(bundleUrl).then((res) => this.trackProgress(res, progress))
  }
}

// Kick off the whole process
if (process.env.NODE_ENV !== 'test') new Preloader().start()
