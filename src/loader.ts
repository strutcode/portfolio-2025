/**
 * This minimal script is loaded before everything else
 * to pre-warm data for the rest of the site.
 */

/** Augment the window object with custom data */
declare global {
  interface Window {
    sceneBlob?: string
  }
}

/**
 * Manually executes the body reader on a fetch object
 * to track progress.
 */
async function trackProgress(response: Response): Promise<Blob> {
  const total = Number(response.headers.get('content-length'))
  const buffer = new Uint8Array(total)
  const reader = response.body?.getReader()

  if (!reader) throw new Error('Failed to create a reader')

  const bar = document.querySelector('.progress') as HTMLElement
  let loaded = 0

  while (true) {
    const { done, value } = await reader.read()

    // If the reader reports done, exit the loops
    if (done) break

    // Update the total bytes loaded
    loaded += value?.byteLength ?? 0

    // Update the progress bar
    bar.style.width = `${(loaded / total) * 75}%`

    // Copy the bytes into the buffer
    buffer.set(new Uint8Array(value), loaded - value.byteLength)
  }

  // Return the buffer as a blob to fulfill the type contract
  return new Blob([buffer])
}

/** Creates the loading screen DOM and utilities. */
function createLoader() {
  const loader = document.createElement('div')
  loader.id = 'loader'
  loader.innerHTML = `
    <div class="loader">
      <div class="loadingBar">
        <div class="progress"></div>
      </div>
    </div>
  `
  document.body.appendChild(loader)
}

/** Tears down the loading screen and its associated objects. */
function cleanupLoader() {
  const loader = document.getElementById('loader')
  if (loader) {
    loader.remove()
  }
}

async function preloadScene() {
  const buffer = await fetch('/models/meteor.glb').then(trackProgress)
  const blobUrl = URL.createObjectURL(buffer)
  window.sceneBlob = blobUrl
}

/** The main loading function responsible for prelaoding the app. */
async function preload() {
  // Create the loader screen
  createLoader()

  // Preload the 3d scene
  preloadScene()

  // Load the main app using Vite's module loader
  const { start } = await import('./index')

  // Manually run the start function from the app
  // once the module requirements are all satisfied
  start()

  // Remove the loader after the app is officially loaded
  cleanupLoader()
}

preload()

export {}
