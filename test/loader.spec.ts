import { Preloader } from '../src/loader'

beforeEach(() => {
  const mockElement = () => {
    return {
      prepend: vi.fn(),
      appendChild: vi.fn(),
    }
  }

  vi.stubGlobal('document', {
    createElement: vi.fn(mockElement),
    body: {
      appendChild: vi.fn(),
    },
    querySelector: vi.fn(mockElement),
  })
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve({ ok: true })),
  ) // Mock fetch to always succeed
  vi.mock('../src/index', async () => {
    return {
      start: vi.fn(),
    }
  })
})

describe('Preloader', () => {
  it('should create a loading element', () => {
    const ctx = {
      createLoader: vi.fn(),
      cleanupLoader: vi.fn(),
      preloadScene: vi.fn(),
      preloadBundle: vi.fn(),
    }

    const loader = new Preloader()
    loader.start.call(ctx)

    expect(ctx.createLoader).toHaveBeenCalled()
  })
})
