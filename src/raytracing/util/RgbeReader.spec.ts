import { describe, it, expect } from 'vitest'
import { readComponent, readPixel, readScanline } from './RgbeReader'
import StreamReader from './StreamReader'

describe('RGBE file reader', () => {
  it('can verify the magic string of an rgbe file', () => {})

  it('can read a single pixel correctly', () => {
    const data = new Uint8Array([10, 20, 30, 136, 40, 50, 60, 137, 70, 80, 90, 128])

    expect(readPixel(data, 0)).to.deep.equal([10, 20, 30])
    expect(readPixel(data, 1)).to.deep.equal([80, 100, 120])
    expect(readPixel(data, 2)).to.deep.equal([0.2734375, 0.3125, 0.3515625])
  })

  it('can read a component from a component-wise RLE file', () => {
    // prettier-ignore
    const data = new Uint8Array([
      4, 1, 2, 3, 4, // Red
      128 + 2, 10, 2, 11, 12,// Green with RLE
      2, 21, 22, 128 + 2, 23, // Blue with RLE
      128 + 4, 136, // Exponent with RLE
    ]).buffer
    const stream = new StreamReader(data)
    const output = new Uint8Array(16)

    readComponent(stream, output, 0)
    readComponent(stream, output, 1)
    readComponent(stream, output, 2)
    readComponent(stream, output, 3)

    // prettier-ignore
    expect([...output]).to.deep.equal([
      1, 10, 21, 136,
      2, 10, 22, 136,
      3, 11, 23, 136,
      4, 12, 23, 136,
    ])
  })

  it('can read a a whole scanline from a component-wise RLE file', () => {
    // prettier-ignore
    const data = new Uint8Array([
      2, 2, // Header
      0, 4, // Width
      4, 1, 2, 3, 4, // Red
      128 + 2, 10, 2, 11, 12,// Green with RLE
      2, 21, 22, 128 + 2, 23, // Blue with RLE
      128 + 4, 136, // Exponent with RLE
    ]).buffer
    const stream = new StreamReader(data)

    const output = readScanline(stream, 4)

    // prettier-ignore
    expect([...output]).to.deep.equal([
      1, 10, 21, 136,
      2, 10, 22, 136,
      3, 11, 23, 136,
      4, 12, 23, 136,
    ])
  })

  it('can read multiple scanlines correctly with RLE', () => {
    // prettier-ignore
    const data = new Uint8Array([
      2, 2, 0, 4, 128 + 4, 1, 128 + 4, 2, 128 + 4, 3, 128 + 4, 4, // Line 1
      2, 2, 0, 4, 128 + 4, 9, 128 + 4, 8, 128 + 4, 7, 128 + 4, 6, // Line 2
    ]).buffer
    const stream = new StreamReader(data)

    const line1 = readScanline(stream, 4)
    const line2 = readScanline(stream, 4)

    expect([...line1]).to.deep.equal([1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4])
    expect([...line2]).to.deep.equal([9, 8, 7, 6, 9, 8, 7, 6, 9, 8, 7, 6, 9, 8, 7, 6])
  })
})
