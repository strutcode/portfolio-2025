import { Preloader, ProgressIndicator } from '../src/loader'

let ctx = {
  createLoader: vi.fn(),
  cleanupLoader: vi.fn(),
  preloadScene: vi.fn(() => Promise.resolve()),
  preloadBundle: vi.fn(() => Promise.resolve()),
}

beforeEach(() => {
  const mockElement = () => {
    return {
      prepend: vi.fn(),
      appendChild: vi.fn(),
    }
  }

  ctx = {
    createLoader: vi.fn(),
    cleanupLoader: vi.fn(),
    preloadScene: vi.fn(() => Promise.resolve()),
    preloadBundle: vi.fn(() => Promise.resolve()),
  }

  // Provide a minimal document object
  vi.stubGlobal('document', {
    createElement: vi.fn(mockElement),
    body: {
      appendChild: vi.fn(),
    },
    querySelector: vi.fn(mockElement),
  })

  // Mock fetch to always succeed
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve({ ok: true })),
  )

  // Mock the main bundle
  vi.mock('../src/index', async () => {
    return {
      start: vi.fn(),
    }
  })
})

describe('Preloader', () => {
  it('should create a loading element', async () => {
    await new Preloader().start.call(ctx)

    expect(ctx.createLoader).toHaveBeenCalled()
  })

  it('should clean up the loading element after preloading', async () => {
    await new Preloader().start.call(ctx)

    expect(ctx.cleanupLoader).toHaveBeenCalled()
  })

  it('should preload the 3d scene and code bundle', async () => {
    await new Preloader().start.call(ctx)

    expect(ctx.preloadScene).toHaveBeenCalled()
    expect(ctx.preloadBundle).toHaveBeenCalled()
  })

  it('should handle progress updates during preloading', async () => {
    vi.stubGlobal('Blob', class {})
    const progressIndicator = {
      track: vi.fn(),
      load: vi.fn(),
    }
    const response = {
      ok: true,
      body: {
        getReader: () => {
          let bytesRead = 0
          const totalBytes = 4096 // Simulate a total of 4096 bytes

          return {
            read: () => {
              if (bytesRead < totalBytes) {
                const chunkSize = Math.min(256, totalBytes - bytesRead) // Read in chunks of 256 bytes
                const chunk = new Uint8Array(chunkSize).fill(0) // Simulate a chunk of data
                bytesRead += chunkSize

                return Promise.resolve({ done: false, value: chunk })
              } else {
                return Promise.resolve({ done: true, value: null }) // End of stream
              }
            },
          }
        },
      },
      headers: {
        get(name: string) {
          return {
            'content-length': '4096',
          }[name]
        },
      },
    }

    await new Preloader()['trackProgress'].call(
      ctx,
      response as Response,
      progressIndicator as unknown as ProgressIndicator,
    )
  })

  it('should handle fetch errors gracefully', async () => {
    // Simulate a fetch error
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Fetch failed'))),
    )

    try {
      await new Preloader().start.call(ctx)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect((<Error>error).message).toBe('Fetch failed')
    }

    expect(ctx.cleanupLoader).toHaveBeenCalled()
  })

  it('should start the main app after preloading', async () => {
    const { start } = await import('../src/index')

    await new Preloader().start.call(ctx)

    expect(start).toHaveBeenCalled()
  })
})
