import StreamReader from './StreamReader'

/**
 * The header of a Radiance rgbe file.
 *
 * The header is a key/value pair object containing non-comment values defined by
 * the header. The keys are case-sensitive and the values are parsed as follows:
 *
 * - FORMAT: string
 * - GAMMA: number
 * - EXPOSURE: number
 * - COLORCORR: [number, number, number]
 */
export type RgbeHeader = {
  FORMAT?: string
  GAMMA?: number
  EXPOSURE?: number
  COLORCORR?: [number, number, number]
}

/**
 * Reads HDRI images in RGBe format and outputs a decoded raw format.
 *
 * This class is used to read HDRI images in the Radiance rgbe format. It
 * reads the image data from a stream and converts it to a Float32Array in RGBA
 * order.
 */
export default class RgbeReader {
  private stream: StreamReader

  public constructor(input: ArrayBuffer | StreamReader) {
    if (input instanceof StreamReader) {
      this.stream = input
    } else {
      this.stream = new StreamReader(input)
    }
  }

  /**
   * Reads the HDRI image from the stream and returns it as a Float32Array.
   *
   * The image is assumed to be in the Radiance rgbe format.
   */
  public read() {
    // Check the magic number
    if (!this.checkMagic()) {
      throw new Error('Invalid HDR image: Invalid magic number')
    }

    // Read the header
    const header = this.readHeader()

    // Read the dimensions
    const { width, height } = this.readDimensions()

    // Read the data
    const data = this.readData(width, height)

    return {
      header,
      width,
      height,
      data,
    }
  }

  /**
   * Checks that the data stream has the correct "magic number" at the pointer.
   *
   * In the case of Radiance rgbe this is the first line of the header which is an
   * 11 byte newline terminated ASCII string.
   */
  protected checkMagic() {
    // Read the raw data
    const magic = this.stream.readBytes(11)

    // Convert to a string by getting the ASCII character of each byte
    const magicString = [...magic].map((b) => String.fromCharCode(b)).join('')

    // Check the content of the string
    return magicString === '#?RADIANCE\n'
  }

  /**
   * Reads the remainder of the Radiance rgbe header from a stream. Stops when
   * it encounters an empty line (\n\n) which signifies the end of the header.
   *
   * The return value is a key/value pair object containing non-comment values
   * defined by the header.
   *
   * @see RgbeHeader
   */
  protected readHeader(): RgbeHeader {
    const lines = []
    const header: RgbeHeader = {}

    // Read the header until we encounter an empty line
    while (true) {
      const line = this.stream.readLine()

      if (line.length === 0) break

      lines.push(line)
    }

    // Parse each line
    lines.forEach((line) => {
      //Skip comments
      if (line.startsWith('#')) return

      // Skip empty lines
      if (line.length === 0) return

      // Split the line into key/value strings from the first '='
      const eqIndex = line.indexOf('=')
      const key = line.slice(0, eqIndex)
      const value = line.slice(eqIndex + 1) // Skip the '='

      // Parse each pair
      switch (key) {
        case 'FORMAT':
          header.FORMAT = value
          break
        case 'GAMMA':
          header.GAMMA = parseFloat(value)
          break
        case 'EXPOSURE':
          header.EXPOSURE = parseFloat(value)
          break
        case 'COLORCORR':
          const parts = value.split(' ').map((v) => parseFloat(v))
          header.COLORCORR = parts as [number, number, number]
          break
        default:
          console.warn(`Unrecognized header in HDR image: ${line}`)
      }
    })

    return header
  }

  /**
   * Reads the dimensions line from a Radiance rgbe file, assumed to start at the
   * current stream pointer.
   *
   * The line should take the form "[+-][XY] [size] [+-][XY] [size]" where the
   * typical format is +X [width] -Y [height] indicating a row major Y down order.
   */
  protected readDimensions() {
    const dims = this.stream.readLine()
    const parts = dims.split(' ')
    const output = {
      yDir: -1,
      xDir: 1,
      width: 0,
      height: 0,
    }

    parts.forEach((part, i) => {
      if (part == '-Y') {
        output.yDir = -1
      } else if (part == '+Y') {
        output.yDir = 1
      } else if (part == '-X') {
        output.xDir = -1
      } else if (part == '+X') {
        output.xDir = 1
      } else {
        // Must be a size section, find out if it's X or Y
        const lastPart = parts[i - 1]

        if (lastPart.endsWith('X')) {
          output.width = parseInt(part)
        } else {
          output.height = parseInt(part)
        }
      }
    })

    return output
  }

  /**
   * Reads the main body of a Radiance rgbe file assuming the Radiance 2.0+
   * component-wise run length encoded format.
   */
  protected readData(width: number, height: number) {
    // Allocate the final color data
    const data = new Float32Array(width * height * 3)

    // Assume Y down column major order
    // TODO: Utilize xDir and yDir
    for (let y = 0; y < height; y++) {
      // Read the whole line into an rgbe array
      const line = this.readScanline(width)

      // For each horizontal pixel
      for (let x = 0; x < width; x++) {
        // Convert from rgbe to rgb
        const [r, g, b] = this.readPixel(line, x)

        // Find the right place for the pixel in the 1D data array
        const offset = (y * width + x) * 3

        // Copy the color data into the output array
        data[offset + 0] = r
        data[offset + 1] = g
        data[offset + 2] = b
      }
    }

    return data
  }

  /**
   * Reads a single "scanline" from a component-wise run length encoded file.
   *
   * A scan line must start with a header of 0x0202 followed by the length of the
   * scanline in pixels which should equal the image width.
   *
   * Returns the scanline in the format rgbergbe from the input format of rrggbbee.
   */
  protected readScanline(width: number) {
    // Allocate the output array
    const line = new Uint8Array(width * 4)

    // Get the first two bytes
    const header = this.stream.readUint16()

    // Check if the header if correct
    if (header !== 0x0202) {
      // If not, reset the stream pointer and throw an error
      this.stream.rewind(2)
      throw new Error(`Invalid scanline header: ${header}, expected ${0x0202}`)
    }

    // Get the length header which should be a 2 byte integer equal to the image width
    const scanlineWidth = this.stream.readUint16()

    if (scanlineWidth !== width) {
      throw new Error(`Invalid scanline width: ${scanlineWidth}, expected ${width}`)
    }

    // Each scanline is stored component-wise so we'll read one color component
    // at a time, sorting them into the correct output order
    this.readComponent(line, 0) // r
    this.readComponent(line, 1) // g
    this.readComponent(line, 2) // b
    this.readComponent(line, 3) // e

    return line
  }

  /**
   * Reads one whole component (1/4 of total values) from the current stream pointer
   * into the `line` array at intervals of 4 starting from `offset`.
   */
  protected readComponent(line: Uint8Array, offset: number) {
    // We'll be reading 1/4 of the values, so for each iteration (i) of 0..length/4
    for (let i = 0; i < line.length / 4; ) {
      // Get the current value
      const length = this.stream.readByte()

      /*
       * Calculate a pointer to the current value in the output array.
       *
       * Each value is the same component for a new pixel, so we skip ahead by
       * 4 each time. e.g. [i---][i---]...
       *
       * offset allows us to select which component (0, 1, 2, or 3) we're
       * writing to. e.g. for 1 [-i--][-i--]...
       */
      let pos = offset + i * 4

      // If the value is greater than 128, it represents a run of the same value
      if (length > 128) {
        // The length of the run is how much over 128 the byte is (so a maximum of 128)
        const repeat = length - 128
        // The value to repeat is the next byte
        const value = this.stream.readByte()

        // Iterate over the run
        for (let rle = 0; rle < repeat; rle++) {
          // Copy the value into the line
          line[pos] = value

          // Move to the next pixel each time
          i++
          pos += 4
        }
      }
      // Values of 128 or less indicate a run of single values of that length
      else {
        // Iterate over the specified length
        for (let rle = 0; rle < length; rle++) {
          // Directly copy the next byte
          line[pos] = this.stream.readByte()

          // Move to the next pixel
          i++
          pos += 4
        }
      }
    }
  }

  /** Converts an rgbe value into rgb. */
  protected readPixel(line: Uint8Array, x: number) {
    // Get the exponent first
    const e = line[x * 4 + 3]

    /*
     * Calculate the exponent value.
     *
     * An exponent of 0 means 0 for all components.
     *
     * Any other exponent is a power of 2, with an offset of 136 which somewhat
     * prefers more precise values over larger values.
     */
    const factor = e ? Math.pow(2, e - 136) : 0

    // Get each component from its place in the array and apply the exponent
    const r = line[x * 4 + 0] * factor
    const g = line[x * 4 + 1] * factor
    const b = line[x * 4 + 2] * factor

    return [r, g, b]
  }
}
