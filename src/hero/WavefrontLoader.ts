type WavefrontData = {
  position: number[]
  normal: number[]
  texcoord: number[]
  indices: number[]
}

/**
 * A quick and dirty Wavefront OBJ loader as it's a very simple format to parse.
 */
export default class WavefrontLoader {
  public static async load(url: string): Promise<WavefrontData>
  public static async load(data: ArrayBuffer): Promise<WavefrontData>
  public static async load(input: ArrayBuffer | string): Promise<WavefrontData> {
    let data: ArrayBuffer

    if (typeof input === 'string') {
      // If the input is a url, fetch it first
      const url = input
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.statusText}`)
      }

      data = await response.arrayBuffer()
    } else {
      data = input
    }

    // Convert the array buffer into a string for parsing
    const text = new TextDecoder().decode(data)

    // Parser state
    let pos = 0
    const raw = {
      vertex: <number[]>[],
      normal: <number[]>[],
      texture: <number[]>[],
    }
    const position = []
    const normal = []
    const texcoord = []
    const indices = []

    const skipWhiteSpace = () => {
      while (text[pos] === ' ' || text[pos] === '\n') {
        pos++
      }
    }
    const readLine = () => {
      let res = ''
      while (text[pos] !== '\n' && pos < text.length) {
        res += text[pos]
        pos++
      }
      return res
    }
    const readFloat = () => {
      let res = ''

      while (text[pos] !== ' ' && text[pos] !== '\n' && pos < text.length) {
        res += text[pos]
        pos++
      }

      return parseFloat(res)
    }
    const readInt = () => {
      let res = ''

      while (text[pos] !== ' ' && text[pos] != '/' && text[pos] !== '\n' && pos < text.length) {
        res += text[pos]
        pos++
      }

      return parseInt(res, 10)
    }
    const readFace = () => {
      // According to the spec, a face can be optionally up to three elements separated by
      // slashes. The first element is the vertex index, the second is the texture coordinate
      // index, and the third is the normal index. The indices are 1-based, so we need to
      // subtract 1 from them to get the correct index in the array.
      const res = []

      for (let i = 0; i < 3; i++) {
        res.push(readInt() - 1) // Read the index, converting from 1-base to 0-base

        // If there's a white space, we're done
        if (text[pos] === ' ' || text[pos] === '\n') {
          break
        }

        // If there's not a space, the definition must continue so expect a /
        if (text[pos] !== '/') {
          throw new Error(`Invalid face definition, expected '/', got '${text[pos]}'`)
        }

        pos++ // Skip the slash and continue
      }

      return res
    }

    while (pos < text.length) {
      // Skip white space
      skipWhiteSpace()

      // Handle comments
      if (text[pos] === '#') {
        readLine()
        continue
      }

      // Vertex definition
      // "v <x> <y> <z>"
      if (text[pos] === 'v' && text[pos + 1] === ' ') {
        pos++
        skipWhiteSpace()

        for (let i = 0; i < 3; i++) {
          raw.vertex.push(readFloat())
          skipWhiteSpace()
        }
        continue
      }

      // Normal definition
      // "vn <x> <y> <z>"
      else if (text[pos] === 'v' && text[pos + 1] === 'n') {
        pos += 2
        skipWhiteSpace()

        for (let i = 0; i < 3; i++) {
          raw.normal.push(readFloat())
          skipWhiteSpace()
        }
        continue
      }

      // Texture coordinate definition
      // "vt <u> <v>"
      else if (text[pos] === 'v' && text[pos + 1] === 't') {
        pos += 2
        skipWhiteSpace()

        for (let i = 0; i < 2; i++) {
          raw.texture.push(readFloat())
          skipWhiteSpace()
        }
        continue
      }

      // Face definition
      // "f <i[/[t][/n]]> <i[/[t][/n]]> <i[/[t][/n]]>"
      else if (text[pos] === 'f') {
        pos++
        skipWhiteSpace()

        for (let i = 0; i < 3; i++) {
          const [vert, tex, norm] = readFace()
          indices.push(position.length / 3)
          position.push(raw.vertex[vert * 3])
          position.push(raw.vertex[vert * 3 + 1])
          position.push(raw.vertex[vert * 3 + 2])
          normal.push(raw.normal[norm * 3])
          normal.push(raw.normal[norm * 3 + 1])
          normal.push(raw.normal[norm * 3 + 2])
          texcoord.push(raw.texture[tex * 2])
          texcoord.push(raw.texture[tex * 2 + 1])
          skipWhiteSpace()
        }
        continue
      }

      // Skip unknown elements
      readLine()
    }

    console.log(position.length, normal.length)

    return {
      position,
      normal,
      texcoord,
      indices,
    }
  }
}
